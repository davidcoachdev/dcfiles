/** @jsxImportSource @opentui/solid */
import type { TuiPlugin } from "@opencode-ai/plugin/tui"
import { createSignal, createRoot, createEffect } from "solid-js"
import { registerExCommands } from "@opentui/keymap/addons"

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

    // ── Limpia markdown para que el TTS no lea "asteriscos" ni símbolos ──
    function stripMarkdown(text: string): string {
      let s = text
      s = s.replace(/```[\s\S]*?```/g, " ")        // bloques de código
      s = s.replace(/~~~[\s\S]*?~~~/g, " ")
      s = s.replace(/`([^`]+)`/g, "$1")             // código inline: conserva texto
      s = s.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1") // imágenes -> alt
      s = s.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")  // links -> texto
      s = s.replace(/\*\*([^*]+)\*\*/g, "$1")        // **bold**
      s = s.replace(/__([^_]+)__/g, "$1")            // __bold__
      s = s.replace(/~~([^~]+)~~/g, "$1")            // ~~strike~~
      s = s.replace(/(^|[^*])\*([^*]+)\*/g, "$1$2")  // *italic*
      s = s.replace(/(^|[^_])_([^_]+)_/g, "$1$2")     // _italic_
      s = s.replace(/^\s{0,3}#{1,6}\s+/gm, "")        // # headings
      s = s.replace(/^\s{0,3}>\s?/gm, "")             // > blockquote
      s = s.replace(/^\s{0,3}([-*_])(\s*\1){2,}\s*$/gm, " ") // --- reglas
      s = s.replace(/^\s{0,3}([-*+]|\d+[.)])\s+/gm, "") // viñetas/numeración
      s = s.replace(/<\/?[^>]+>/g, " ")               // html tags
      s = s.replace(/\\([*_`~])/g, "$1")              // escapes \*
      return s
    }

    // ── Divide texto largo en chunks para evitar límite del TTS ──
    function chunkText(text: string, maxLen = 180): string[] {
      // TTS-friendly: limpiar markdown y colapsar espacios
      const cleaned = stripMarkdown(text).replace(/\s+/g, " ").trim()
      if (cleaned.length <= maxLen) return [cleaned]
      const chunks: string[] = []
      // Split por oraciones: tras '.', '!', '?' o '…'
      const segments = cleaned.split(/(?<=[.!?…])\s+/)
      let current = ""
      for (const seg of segments) {
        const candidate = current ? current + " " + seg : seg
        if (candidate.length > maxLen) {
          if (current) chunks.push(current.trim())
          // Si un segmento solo ya excede el límite, hard-split por chars
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

    // ── Subscribe: session.idle → leer respuesta ───────────────
    const disposeAutoRead = api.event.on("session.idle", async (event) => {
      if (!autoRead()) return
      if (!connected()) return
      const fullText = lastAssistantText(event.properties.sessionID)
      if (!fullText) {
        // Turno terminó sin texto legible (error/abort/cancel) → tono de error
        await playBeep("error")
        return
      }
      const chunks = chunkText(fullText, 180)
      // Tonos distintos: resultado (dos notas ascendentes) antes de leer
      await playBeep("result")
      for (let i = 0; i < chunks.length; i++) {
        await speakText(chunks[i])
        // Pequeño delay entre chunks para que el TTS service procese
        // y no se sature con conexiones TCP simultáneas
        if (i < chunks.length - 1) {
          await new Promise((r) => setTimeout(r, 150))
        }
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
                    }
                    api.ui.dialog.clear()
                  }}
                  onCancel={() => api.ui.dialog.clear()}
                />
              ))
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
              void bridgeCommand(endpoint)
              api.ui.dialog.clear()
            }
          }}
          onCancel={() => api.ui.dialog.clear()}
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
      ],
      bindings: [
        {
          key: "Alt+u",
          cmd: ":tts-config",
        },
      ],
    })
    api.lifecycle.onDispose(disposeLayer)
  })
}

const plugin = { id, tui }
export default plugin
