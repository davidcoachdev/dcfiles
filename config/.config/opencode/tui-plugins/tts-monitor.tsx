/** @jsxImportSource @opentui/solid */
import type { TuiPlugin } from "@opencode-ai/plugin/tui"
import { createSignal, createRoot, createEffect } from "solid-js"
import { registerExCommands } from "@opentui/keymap/addons"
// ── nav-logic (INLINED on purpose) ──────────────────────────────────
// OpenCode TUI plugins are loaded as SINGLE FILES: the plugin loader only
// resolves bare specifiers (@opencode-ai/plugin, solid-js, @opentui/...).
// A relative import like `./nav-logic` is NOT resolved and throws silently
// at load time, killing the ENTIRE plugin (all shortcuts dead). So the pure
// nav core is inlined here. The standalone nav-logic.ts + nav-logic.test.ts
// in this folder remain the canonical unit-test source (`bun test`).
export type NavDirection = "prev" | "next"
export type NavResult = { target: number; action: "speak" | "noop" }

// Limpia markdown para que el TTS no lea "asteriscos" ni símbolos.
export function stripMarkdown(text: string): string {
  let s = text
  s = s.replace(/```[\s\S]*?```/g, " ")
  s = s.replace(/~~~[\s\S]*?~~~/g, " ")
  s = s.replace(/`([^`]+)`/g, "$1")
  s = s.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
  s = s.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
  s = s.replace(/\*\*([^*]+)\*\*/g, "$1")
  s = s.replace(/__([^_]+)__/g, "$1")
  s = s.replace(/~~([^~]+)~~/g, "$1")
  s = s.replace(/(^|[^*])\*([^*]+)\*/g, "$1$2")
  s = s.replace(/(^|[^_])_([^_]+)_/g, "$1$2")
  s = s.replace(/^\s{0,3}#{1,6}\s+/gm, "")
  s = s.replace(/^\s{0,3}>\s?/gm, "")
  s = s.replace(/^\s{0,3}([-*_])(\s*\1){2,}\s*$/gm, " ")
  s = s.replace(/^\s{0,3}([-*+]|\d+[.)])\s+/gm, "")
  s = s.replace(/<\/?[^>]+>/g, " ")
  s = s.replace(/\\([*_`~])/g, "$1")
  return s
}

// Divide texto largo en chunks para evitar límite del TTS.
export function chunkText(text: string, maxLen = 180): string[] {
  const cleaned = stripMarkdown(text).replace(/\s+/g, " ").trim()
  if (cleaned.length <= maxLen) return [cleaned]
  const chunks: string[] = []
  const segments = cleaned.split(/(?<=[.!?…])\s+/)
  let current = ""
  for (const seg of segments) {
    const candidate = current ? current + " " + seg : seg
    if (candidate.length > maxLen) {
      if (current) chunks.push(current.trim())
      if (seg.length > maxLen) {
        for (let i = 0; i < seg.length; i += maxLen) {
          chunks.push(seg.slice(i, i + maxLen).trim())
        }
        current = ""
      } else {
        current = seg
      }
    } else {
      current = candidate
    }
  }
  if (current.trim()) chunks.push(current.trim())
  return chunks.filter((c) => c.length > 0)
}

// R-001: paragraph splitting on blank-line boundaries.
export function splitByParagraph(text: string): string[] {
  const lines = text.split(/\r?\n/)
  const paras: string[] = []
  let current: string[] = []
  const flush = () => {
    const joined = current.join("\n").trim()
    if (joined.length > 0) paras.push(joined)
    current = []
  }
  for (const line of lines) {
    if (line.trim() === "") flush()
    else current.push(line)
  }
  flush()
  return paras
}

// R-002: two-level piece model (paras[i] = ≤180-char pieces).
export function buildParagraphPieces(text: string): string[][] {
  return splitByParagraph(text).map((para) => chunkText(para, 180))
}

// R-003: navigation index math (boundary rules for Back/Forward).
export function navigate(
  current: number,
  count: number,
  dir: NavDirection
): NavResult {
  if (count <= 0) return { target: current, action: "noop" }
  if (dir === "prev") {
    return { target: current <= 0 ? 0 : current - 1, action: "speak" }
  }
  if (count === 1) return { target: 0, action: "noop" }
  if (current >= count - 1) return { target: current, action: "noop" }
  return { target: current + 1, action: "speak" }
}

// R-004: sequential paragraph speaker (injected IO, no network here).
export async function speakParagraphSequentially(
  pieces: string[],
  speakOne: (p: string) => Promise<void>,
  gapMs = 150,
  shouldAbort?: () => boolean
): Promise<void> {
  for (let i = 0; i < pieces.length; i++) {
    if (shouldAbort && shouldAbort()) return
    await speakOne(pieces[i])
    if (i < pieces.length - 1) {
      await new Promise<void>((resolve) => setTimeout(resolve, gapMs))
    }
  }
}

const id = "tts-monitor"
const BRIDGE_PORT = 9877
const BRIDGE_URL = `http://127.0.0.1:${BRIDGE_PORT}`

interface TtsStatus {
  status: string
  queue: number
  autoRead?: boolean
  voice?: string
  rate?: number
  volume?: number
}

async function fetchStatus(): Promise<TtsStatus | null> {
  try {
    const ac = new AbortController()
    const timer = setTimeout(() => ac.abort(), 2000)
    const res = await fetch(`${BRIDGE_URL}/status`, { signal: ac.signal })
    clearTimeout(timer)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

// ─── Plugin ──────────────────────────────────────────────────────

const tui: TuiPlugin = async (api) => {
  createRoot((disposeRoot) => {
    api.lifecycle.onDispose(disposeRoot)

    // ── State ──────────────────────────────────────────────────
    const [connected, setConnected] = createSignal(false)
    const [label, setLabel] = createSignal("● tts ?")
    const [statusText, setStatusText] = createSignal("unknown")
    const [queueCount, setQueueCount] = createSignal(0)
    // Persistir auto-read entre sesiones: leer de api.kv, default true
    const [autoRead, setAutoRead] = createSignal(
      api.kv.get<boolean>("tts.autoRead", true)
    )
    const [soundOn, setSoundOn] = createSignal(
      api.kv.get<boolean>("tts.sound", true)
    )
    const [voice, setVoice] = createSignal<string>("")
    const [voices, setVoices] = createSignal<{ name: string; culture: string; gender: string }[]>([])
    const [rate, setRate] = createSignal<number>(1)
    const [rates, setRates] = createSignal<number[]>([0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2])
    const [volume, setVolume] = createSignal<number>(100)
    const [volumes, setVolumes] = createSignal<number[]>([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100])

    // ── Speak helper ──────────────────────────────────────────
    async function speakText(text: string) {
      try {
        await fetch(`${BRIDGE_URL}/speak`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        })
      } catch {
        // silent fail — bridge offline o text inválido
      }
    }

    // ── Beep de alerta (antes del primer chunk de cada respuesta) ──
    async function playBeep(kind: "alert" | "result" | "error" | "info" = "alert") {
      if (!soundOn()) return
      try {
        await fetch(`${BRIDGE_URL}/beep`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kind }),
        })
      } catch {
        // silent fail
      }
    }

    // ── Notificación TUI (mismo patrón que el plugin de subagents:
    //    api.ui.toast → toast DENTRO de la TUI, siempre visible).
    //    api.attention.notify se salta solo cuando la app está enfocada,
    //    por eso lo usamos solo para el SONIDO (campana), no para el visual. ──
    async function notifyTts(
      message: string,
      opts?: { title?: string; variant?: "info" | "success" | "warning" | "error"; sound?: "default" | "question" | "permission" | "error" | "done" | "subagent_done" }
    ) {
      // Toast visual: siempre se muestra en la TUI (como el plugin de subagents).
      try {
        api.ui.toast({
          variant: opts?.variant ?? "info",
          title: opts?.title ?? "TTS",
          message,
        })
      } catch {
        /* silent — el toast no debe romper el flujo */
      }
      // Campana opcional (sonido del sistema de attention de OpenCode).
      if (opts?.sound) {
        try {
          await api.attention.notify({
            title: opts?.title ?? "TTS",
            message,
            notification: false,
            sound: { name: opts.sound },
          })
        } catch {
          /* silent */
        }
      }
    }

    // ── Control helpers (llaman al bridge directo) ────────────
    async function bridgeCommand(endpoint: "pause" | "resume" | "stop" | "toggle" | "status") {
      try {
        const res = await fetch(`${BRIDGE_URL}/${endpoint}`, { method: "POST" })
        // Refresca status para que la UI se actualice
        void poll()
        return await res.json().catch(() => null)
      } catch {
        return null
      }
    }

    // ── Cargar voces instaladas del OS (para el selector) ──────
    async function fetchVoices() {
      try {
        const ac = new AbortController()
        const timer = setTimeout(() => ac.abort(), 2000)
        const res = await fetch(`${BRIDGE_URL}/voices`, { signal: ac.signal })
        clearTimeout(timer)
        if (res.ok) {
          setVoices((await res.json()) as { name: string; culture: string; gender: string }[])
        }
      } catch {
        /* silent */
      }
    }

    // ── Cargar pasos de velocidad disponibles ───────────────────
    async function fetchRates() {
      try {
        const ac = new AbortController()
        const timer = setTimeout(() => ac.abort(), 2000)
        const res = await fetch(`${BRIDGE_URL}/rates`, { signal: ac.signal })
        clearTimeout(timer)
        if (res.ok) {
          const data = (await res.json()) as number[]
          if (Array.isArray(data) && data.length > 0) setRates(data)
        }
      } catch {
        /* silent */
      }
    }

    // ── Cargar pasos de volumen disponibles ────────────────────
    async function fetchVolumes() {
      try {
        const ac = new AbortController()
        const timer = setTimeout(() => ac.abort(), 2000)
        const res = await fetch(`${BRIDGE_URL}/volumes`, { signal: ac.signal })
        clearTimeout(timer)
        if (res.ok) {
          const data = (await res.json()) as number[]
          if (Array.isArray(data) && data.length > 0) setVolumes(data)
        }
      } catch {
        /* silent */
      }
    }

    // ── Player state (two-level model: paragraphs -> ≤180-char pieces) ──
    // Plain mutable closure vars (not signals — minimal). `speakingToken`
    // invalidates any in-flight auto-advance loop on nav/restart.
    let paras: string[][] = []
    let currentPara = 0
    let speakingToken = 0
    let lastSessionID = "" // último sessionID visto en session.idle (para navegar on-demand)
    let lastNotifiedMsgId = "" // último id de assistant notificado (beep en pregunta nueva)
    let seededIdle = false // semilla en el primer session.idle (evita beep de arranque)

    // ── Extrae el texto completo del último assistant completado ─
    function lastAssistantText(sessionID: string): string {
      const messages = api.state.session.messages(sessionID)
      for (let i = messages.length - 1; i >= 0; i--) {
        const m = messages[i] as any
        if (m.role !== "assistant") continue
        if (!m.time?.completed) continue
        const parts = api.state.part(m.id) as any[]
        return parts
          .filter((p) => p.type === "text" && !p.synthetic && p.text)
          .map((p) => p.text)
          .join("\n\n")
      }
      return ""
    }

    // ── Id del último assistant completado (para detectar turno nuevo) ─
    function lastAssistantId(sessionID: string): string {
      const messages = api.state.session.messages(sessionID)
      for (let i = messages.length - 1; i >= 0; i--) {
        const m = messages[i] as any
        if (m.role !== "assistant") continue
        if (!m.time?.completed) continue
        return m.id
      }
      return ""
    }

    // ── Asegura que `paras` esté poblado antes de navegar ───────
    // La navegación manual (Alt+, / Alt+.) necesita el modelo de
    // párrafos aunque el auto-read esté apagado. Si `paras` está
    // vacío, lo reconstruye desde el último texto del assistant de
    // la sesión activa (o la última vista en session.idle).
    function ensureParas(): boolean {
      if (paras.length > 0) return true
      let sid = lastSessionID
      if (!sid) {
        try {
          const a = (api.state.session as any).active?.()
          if (a?.id) sid = a.id
        } catch {
          /* ignore */
        }
      }
      if (!sid) return false
      const txt = lastAssistantText(sid)
      if (!txt) return false
      paras = buildParagraphPieces(txt)
      currentPara = 0
      return paras.length > 0
    }

    // ── Subscribe: session.idle → beep en pregunta + leer respuesta ─
    const disposeAutoRead = api.event.on("session.idle", async (event) => {
      const sid = (event.properties?.sessionID as string) || ""
      if (sid) lastSessionID = sid

      // Detectar un turno NUEVO del assistant: el agente terminó y ahora
      // espera input del usuario (probablemente hizo una pregunta).
      // Sembramos en el primer idle para NO pitar en el arranque ni al
      // cambiar de sesión a un mensaje ya visto.
      const msgId = lastAssistantId(sid)
      if (!seededIdle) {
        seededIdle = true
        lastNotifiedMsgId = msgId
      } else if (msgId && msgId !== lastNotifiedMsgId) {
        lastNotifiedMsgId = msgId
        // Beep de alerta: el agente está esperando tu respuesta.
        void playBeep("alert")
      }

      const fullText = lastAssistantText(sid)
      if (!fullText) {
        // Turno terminó sin texto legible (error/abort/cancel) → tono de error
        if (connected()) {
          await playBeep("error")
          void notifyTts("⚠ Agente terminó sin salida legible", { title: "TTS · error", variant: "error" })
        }
        return
      }

      if (!autoRead()) return
      if (!connected()) return

      // Rebuild the paragraph model and start auto-advance from paragraph 0.
      paras = buildParagraphPieces(fullText)
      currentPara = 0
      speakingToken++ // invalida cualquier lectura previa en vuelo
      const myToken = speakingToken
      // Campana estilo plugin de subagents (subagent_done) al empezar a leer,
      // en vez del beep de dos notas. El toast existente se conserva.
      void notifyTts("🔊 Leyendo respuesta del agente", { sound: "subagent_done" })
      // Beep audible de inicio de lectura (via bridge/Windows SystemSounds,
      // que SI suena en WSL2 a diferencia del chime de OpenCode).
      void playBeep("result")
      // Speak paragraphs 0→last sequentially (auto-advance) with token guard.
      // Iterate PARAGRAPHS (not a flat piece list) so currentPara advances as
      // each paragraph plays — keeps manual Alt+, / Alt+. correctly indexed.
      for (let i = 0; i < paras.length; i++) {
        if (myToken !== speakingToken) return
        currentPara = i
        await speakParagraphSequentially(
          paras[i],
          (piece) => speakText(piece),
          150,
          () => myToken !== speakingToken
        )
      }
    })
    api.lifecycle.onDispose(disposeAutoRead)

    // ── Poll ───────────────────────────────────────────────────
    function refreshLabel() {
      if (!connected()) {
        setLabel("● tts down")
        return
      }
      const icon = statusText() === "playing" ? "▶" : "⏸"
      const q = queueCount() > 0 ? ` (${queueCount()})` : ""
      const ar = autoRead() ? " 🔊" : " 🔈"
      const snd = soundOn() ? " 🔔" : " 🔕"
      const spd = rate() !== 1 ? ` ⚡${rate()}×` : ""
      const vol = volume() !== 100 ? ` 🔉${volume()}%` : ""
      setLabel(`${icon} tts${q}${ar}${snd}${spd}${vol}`)
    }

    const poll = async () => {
      const r = await fetchStatus()
      if (r) {
        setConnected(true)
        setStatusText(r.status)
        setQueueCount(r.queue)
        setVoice(r.voice ?? "")
        setRate(typeof r.rate === "number" ? r.rate : 1)
        setVolume(typeof r.volume === "number" ? r.volume : 100)
      } else {
        setConnected(false)
      }
      refreshLabel()
    }

    // Re-render label cuando cambia autoRead (sin esperar el poll)
    createEffect(() => {
      void autoRead()
      void soundOn()
      void connected()
      void statusText()
      void queueCount()
      refreshLabel()
    })

    const timer = setInterval(poll, 4000)
    api.lifecycle.onDispose(() => clearInterval(timer))
    poll() // initial fetch
    void fetchVoices()
    void fetchRates()
    void fetchVolumes()

    // ── Slots: status in prompt-right area ─────────────────────
    const disposeSlots = api.slots.register({
      id,
      order: 80,
      slots: {
        home_prompt_right: (ctx) => {
          const fg = connected() ? ctx.theme.current.success : ctx.theme.current.error
          return (
            <box flexDirection="row" gap={1}>
              <text fg={fg} bold wrapMode="none">{label()}</text>
            </box>
          )
        },
        session_prompt_right: (ctx, _props: { session_id: string }) => {
          const fg = connected() ? ctx.theme.current.success : ctx.theme.current.error
          return (
            <box flexDirection="row" gap={1}>
              <text fg={fg} bold wrapMode="none">{label()}</text>
            </box>
          )
        },
      },
    })
    api.lifecycle.onDispose(disposeSlots)

    // ── Config dialog (Alt+U) ─────────────────────────────────
    function showTtsConfig() {
      // Estado actual mostrado en el título
      const statusLabel = connected()
        ? `${statusText()} · queue ${queueCount()}`
        : "service offline"
      const arLabel = autoRead() ? "auto-read: ON" : "auto-read: OFF"

      // Las opciones son acciones reales, no info. El estado va en el título.
      const options: { title: string; value: string }[] = [
        { title: `▶  Play / Resume`, value: "__resume__" },
        { title: `⏸  Pause`, value: "__pause__" },
        { title: `⏹  Stop`, value: "__stop__" },
        { title: `─────────────`, value: "__sep1__" },
        {
          title: autoRead() ? `🔊  Auto-read: ON  (click to disable)` : `🔈  Auto-read: OFF (click to enable)`,
          value: "__toggle__",
        },
        {
          title: soundOn() ? `🔔  Sound: ON  (click to disable)` : `🔕  Sound: OFF (click to enable)`,
          value: "__sound__",
        },
        { title: `─────────────`, value: "__sepV__" },
        { title: `🌐  Voz: ${voice() ? voice() : "sistema (default)"}`, value: "__voice__" },
        { title: `⚡  Velocidad: ${rate()}×`, value: "__rate__" },
        { title: `🔉  Volumen: ${volume()}%`, value: "__volume__" },
        { title: `💬  Speak custom text…`, value: "__speak__" },
        { title: `🔑  Ver atajos (comandos)`, value: "__help__" },
        { title: `─────────────`, value: "__sep2__" },
        { title: `🔄  Refresh status`, value: "__status__" },
      ]

      api.ui.dialog.replace(() => (
        <api.ui.DialogSelect
          title={`TTS — ${statusLabel} · ${arLabel}`}
          options={options}
          onSelect={(opt) => {
            // Toggle plugin-side auto-read (no service-side)
            if (opt.value === "__toggle__") {
              const next = !autoRead()
              setAutoRead(next)
              api.kv.set("tts.autoRead", next)
              api.ui.dialog.clear()
              // Re-abre para mostrar el nuevo estado
              showTtsConfig()
              return
            }

            if (opt.value === "__sound__") {
              const next = !soundOn()
              setSoundOn(next)
              api.kv.set("tts.sound", next)
              api.ui.dialog.clear()
              showTtsConfig()
              return
            }

            // Speak custom text → abre un prompt
            if (opt.value === "__speak__") {
              api.ui.dialog.replace(() => (
                <api.ui.DialogPrompt
                  label="Texto a leer"
                  defaultValue=""
                  onConfirm={(text) => {
                    if (text && text.trim().length > 0) {
                      void playBeep("info")
                      void speakText(text.trim())
                      void notifyTts("💬 Leyendo texto…")
                    }
                    api.ui.dialog.clear()
                  }}
                  onCancel={() => api.ui.dialog.clear()}
                />
              ))
              return
            }

            // Ayuda: abre el panel de comandos como sub-vista del config
            if (opt.value === "__help__") {
              showTtsHelp()
              return
            }

            // Selector de voz: abre un dialogo con las voces del OS
            if (opt.value === "__voice__") {
              // Refresca la lista antes de abrir, asi muestra las voces
              // instaladas aunque el fetch inicial no hubiera cargado.
              void fetchVoices().then(() => {
                const vs = [...voices()].sort((a, b) =>
                  a.culture.localeCompare(b.culture) || a.name.localeCompare(b.name)
                )
                const voiceOpts: { title: string; value: string }[] = [
                  { title: `🌐  Sistema (default)`, value: "__default__" },
                  ...vs.map((v) => ({
                    title: `🌐  ${v.culture} — ${v.name}${v.gender ? " (" + v.gender + ")" : ""}`,
                    value: v.name,
                  })),
                ]
                api.ui.dialog.replace(() => (
                  <api.ui.DialogSelect
                    title="Selecciona una voz"
                    options={voiceOpts}
                    onSelect={(vopt) => {
                      const vname = vopt.value === "__default__" ? "" : vopt.value
                      fetch(`${BRIDGE_URL}/voice`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ voice: vname }),
                      })
                        .then(() => fetchVoices())
                        .then(() => poll())
                        .finally(() => api.ui.dialog.clear())
                    }}
                    onCancel={() => api.ui.dialog.clear()}
                  />
                ))
              })
              return
            }

            // Selector de velocidad: lista de multiplicadores
            if (opt.value === "__rate__") {
              void fetchRates().then(() => {
                const rateOpts: { title: string; value: string }[] = rates().map((r) => ({
                  title: `⚡  ${r}×${r === 1 ? "  (normal)" : ""}`,
                  value: String(r),
                }))
                api.ui.dialog.replace(() => (
                  <api.ui.DialogSelect
                    title="Velocidad de lectura"
                    options={rateOpts}
                    onSelect={(ropt) => {
                      const rval = parseFloat(ropt.value)
                      fetch(`${BRIDGE_URL}/rate`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ rate: rval }),
                      })
                        .then(() => poll())
                        .finally(() => api.ui.dialog.clear())
                    }}
                    onCancel={() => api.ui.dialog.clear()}
                  />
                ))
              })
              return
            }

            // Selector de volumen: lista de pasos 0..100
            if (opt.value === "__volume__") {
              void fetchVolumes().then(() => {
                const volOpts: { title: string; value: string }[] = volumes().map((v) => ({
                  title: `🔉  ${v}%${v === 100 ? "  (máx)" : ""}`,
                  value: String(v),
                }))
                api.ui.dialog.replace(() => (
                  <api.ui.DialogSelect
                    title="Volumen de lectura"
                    options={volOpts}
                    onSelect={(vopt) => {
                      const vval = parseInt(vopt.value, 10)
                      fetch(`${BRIDGE_URL}/volume`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ volume: vval }),
                      })
                        .then(() => poll())
                        .finally(() => api.ui.dialog.clear())
                    }}
                    onCancel={() => api.ui.dialog.clear()}
                  />
                ))
              })
              return
            }

            // Comandos que van al servicio TTS vía bridge directo
            const bridgeMap: Record<string, "pause" | "resume" | "stop" | "status"> = {
              __pause__: "pause",
              __resume__: "resume",
              __stop__: "stop",
              __status__: "status",
            }
            const endpoint = bridgeMap[opt.value]
            if (endpoint) {
              void bridgeCommand(endpoint).then((r: any) => {
                const st = r?.status
                if (endpoint === "pause") void notifyTts("⏸ Pausado")
                else if (endpoint === "resume") void notifyTts("▶ Reanudado", { sound: "done", variant: "success" })
                else if (endpoint === "stop") void notifyTts("⏹ Detenido")
                else void notifyTts(`Estado: ${st ?? "?"}`)
              })
              api.ui.dialog.clear()
            }
          }}
          onCancel={() => api.ui.dialog.clear()}
        />
      ))
    }

    // ── Help (sub-vista del config, Alt+H) ────────────────────
    // Igual mecanismo que el menú de config (DialogSelect): el de foco se
    // marca en rojo y al dar [Enter] se EJECUTA el comando. Así el panel
    // es un lanzador útil y no hay sorpresa al pulsar Enter. Solo
    // "Volver al menú" regresa al config. [Esc] también cierra.
    function showTtsHelp() {
      const back = () => {
        api.ui.dialog.clear()
        showTtsConfig() // vuelve al menú de config
      }
      const helpOpts: { title: string; value: string }[] = [
        { title: "Alt+P    Pausa / Reanuda", value: ":tts-toggle" },
        { title: "Alt+U    Configuración", value: ":tts-config" },
        { title: "Alt+, / Alt+←   Párrafo anterior", value: ":tts-prev" },
        { title: "Alt+. / Alt+→   Párrafo siguiente", value: ":tts-next" },
        { title: "Alt+X    Detener", value: ":tts-stop" },
        { title: "─────────────", value: "__sep__" },
        { title: "↩  Volver al menú", value: "__back__" },
      ]
      api.ui.dialog.replace(() => (
        <api.ui.DialogSelect
          title="🔊 Comandos TTS"
          options={helpOpts}
          onSelect={(opt) => {
            if (opt.value === "__sep__") {
              showTtsHelp() // ignorar separador: dejar abierto
              return
            }
            if (opt.value === "__back__") {
              back()
              return
            }
            // Ejecuta el comando correspondiente y cierra el help.
            api.ui.dialog.clear()
            try {
              api.keymap.dispatchCommand(opt.value)
            } catch {
              /* noop */
            }
          }}
          onCancel={back}
        />
      ))
    }

    // ── Keymap: Alt+U → config dialog ─────────────────────────
    const disposeEx = registerExCommands(api.keymap)
    api.lifecycle.onDispose(disposeEx)

    const disposeLayer = api.keymap.registerLayer({
      priority: 100,
      commands: [
        {
          name: ":tts-config",
          title: "🔊 TTS Configuration",
          desc: "Open TTS configuration panel",
          category: "TTS",
          nargs: "0",
          run: () => {
            showTtsConfig()
            return true
          },
        },
        {
          name: ":tts-toggle",
          title: "⏯  TTS Pause/Resume",
          desc: "Toggle pause/resume of current speech",
          category: "TTS",
          nargs: "0",
          run: () => {
            void bridgeCommand("toggle").then((r: any) => {
              const st = r?.status
              if (st === "paused") void notifyTts("⏸ Pausado")
              else if (st === "playing") void notifyTts("▶ Reanudado", { sound: "done", variant: "success" })
              else void notifyTts(`⏯ Sin cambios (estado: ${st ?? "?"})
Pausá/reanudá mientras hay voz activa.`)
            })
            return true
          },
        },
        {
          name: ":tts-prev",
          title: "⏮ TTS Paragraph Back",
          desc: "Re-speak previous paragraph (repeats at first)",
          category: "TTS",
          nargs: "0",
          run: async () => {
            try {
              if (!ensureParas()) {
                void notifyTts("⚠ Nada para leer: leé una respuesta del agente primero")
                return true
              }
              speakingToken++ // invalida lectura en vuelo
              void bridgeCommand("stop")
              const r = navigate(currentPara, paras.length, "prev")
              currentPara = r.target
              void notifyTts(`⏮ Párrafo anterior (${currentPara + 1}/${paras.length || 1})`)
              const para = paras[currentPara]
              if (r.action === "speak" && para) {
                const myToken = speakingToken
                await speakParagraphSequentially(
                  para,
                  (p) => speakText(p),
                  150,
                  () => myToken !== speakingToken
                )
              }
            } catch {
              /* NEVER throw — la navegación no debe romper el flujo */
            }
            return true
          },
        },
        {
          name: ":tts-next",
          title: "⏭ TTS Paragraph Forward",
          desc: "Cancel current speech and jump to next paragraph (no-op at last)",
          category: "TTS",
          nargs: "0",
          run: async () => {
            try {
              if (!ensureParas()) {
                void notifyTts("⚠ Nada para leer: leé una respuesta del agente primero")
                return true
              }
              speakingToken++ // invalida lectura en vuelo
              void bridgeCommand("stop")
              const r = navigate(currentPara, paras.length, "next")
              currentPara = r.target
              void notifyTts(`⏭ Párrafo siguiente (${currentPara + 1}/${paras.length || 1})`)
              const para = paras[currentPara]
              if (r.action === "speak" && para) {
                const myToken = speakingToken
                await speakParagraphSequentially(
                  para,
                  (p) => speakText(p),
                  150,
                  () => myToken !== speakingToken
                )
              }
              // r.action === "noop": solo el toast, sin habla adicional.
            } catch {
              /* NEVER throw — la navegación no debe romper el flujo */
            }
            return true
          },
        },
        {
          name: ":tts-stop",
          title: "⏹ TTS Stop",
          desc: "Stop speech and abort any in-flight auto-read loop",
          category: "TTS",
          nargs: "0",
          run: () => {
            try {
              speakingToken++ // invalida cualquier lectura en vuelo
              void bridgeCommand("stop")
              void notifyTts("⏹ TTS detenido")
            } catch (e) {
              console.error("[tts-monitor] stop failed:", e)
            }
            return true
          },
        },
        {
          name: ":tts-help",
          title: "❓ TTS Comandos",
          desc: "Show all TTS commands and keybindings",
          category: "TTS",
          nargs: "0",
          run: () => {
            try {
              showTtsHelp()
            } catch (e) {
              console.error("[tts-monitor] help failed:", e)
            }
            return true
          },
        },
      ],
      bindings: [
        {
          key: "Alt+u",
          cmd: ":tts-config",
        },
        {
          key: "Alt+p",
          cmd: ":tts-toggle",
        },
        {
          // PRIMARY keybinding. Verified @opentui/keymap's parseStringKeyPart
          // (addons) accepts any single-char key name incl. punctuation — it
          // does NOT reject "," / ".", so the documented fallback (Alt+[ /
          // Alt+]) is NOT needed. If a future runtime proves Alt+, is not
          // emitted by the OpenTUI adapter, swap to the fallback pair below.
          key: "Alt+,",
          cmd: ":tts-prev",
        },
        {
          key: "Alt+.",
          cmd: ":tts-next",
        },
        {
          key: "Alt+x",
          cmd: ":tts-stop",
        },
        {
          key: "Alt+h",
          cmd: ":tts-help",
        },
        {
          // FALLBACK: Alt+puntuación (",", ".") no emite en muchas
          // terminales (ESC+"," se lee como Escape + ","). Alt+flecha
          // SÍ emite en OpenTUI (meta+left/right es nativo).
          key: "Alt+Left",
          cmd: ":tts-prev",
        },
        {
          key: "Alt+Right",
          cmd: ":tts-next",
        },
      ],
    })
    api.lifecycle.onDispose(disposeLayer)
  })
}

const plugin = { id, tui }
export default plugin
