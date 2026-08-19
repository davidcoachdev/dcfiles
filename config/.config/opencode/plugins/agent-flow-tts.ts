/**
 * agent-flow-tts — TTS narrator for subagent phase/status transitions
 *
 * Listens to the same OpenCode event stream as agent-flow, but instead of
 * writing flow-board.json it speaks concise status changes out loud via
 * the TTS bridge (POST http://127.0.0.1:9877/speak).
 *
 * Design rules (kept minimal on purpose):
 *  - Only narrates SUBAGENT sessions (those with a parentID), not the root.
 *  - Only speaks on PHASE CHANGE or significant status transitions
 *    (running → complete, running → error). Does NOT narrate each message.
 *  - Debounces: won't repeat the same message within 2 seconds.
 *  - Respects TTS pause state — if /speak returns 503 (service offline)
 *    it silently skips so OpenCode startup is never blocked.
 *
 * Register in open-code.json → plugin array, AFTER agent-flow.ts.
 */

import * as os from "node:os"
import { type Plugin } from "@opencode-ai/plugin"

const TTS_BRIDGE = "http://127.0.0.1:9877/health"
const SPEAK_URL = "http://127.0.0.1:9877/speak"
const BEEP_URL = "http://127.0.0.1:9877/beep"
const DEBOUNCE_MS = 2000

// Map agent name -> fase column. Debe coincidir con agent-flow.ts
const AGENT_PHASE: Record<string, string> = {
  explore: "Explorar",
  researcher: "Planear",
  scribe: "Documentar",
  general: "Implementar",
  verifier: "Verificar",
}

function phaseFor(agent?: string, title?: string): string {
  if (agent && AGENT_PHASE[agent]) return AGENT_PHASE[agent]
  if (title) {
    const m = title.match(/\[(.*?)\]/)
    if (m) return m[1]
  }
  return "Implementar"
}

interface AgentState {
  phase: string
  status: string
  lastSpoken: number
}

async function isTtsUp(): Promise<boolean> {
  try {
    const res = await fetch(TTS_BRIDGE, { signal: AbortSignal.timeout(2000) })
    return res.ok
  } catch {
    return false
  }
}

async function speak(text: string): Promise<void> {
  try {
    await fetch(SPEAK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text.trim() }),
      signal: AbortSignal.timeout(3000),
    })
    // Fire-and-forget — we don't care about the response body, just that
    // it didn't throw. If TTS is paused/offline, this 503s silently.
  } catch {
    // TTS bridge down — skip silently. No crash, no block.
  }
}

// Windows SystemSounds via bridge /beep (una de: alert, error, info, result).
// Suena por el parlante real, distinto de la voz: avisa que viene un fragmento
// (notificación), no la respuesta completa.
async function beep(kind: string): Promise<void> {
  try {
    await fetch(BEEP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind }),
      signal: AbortSignal.timeout(3000),
    })
  } catch {
    // bridge down — silent skip
  }
}

export const AgentFlowTTS: Plugin = async (ctx) => {
  const { client } = ctx
  const agents = new Map<string, AgentState>()
  let lastToast = 0
  let lastPermission = 0

  function makeMsg(phase: string, newStatus: string): string {
    if (newStatus === "complete") return `Subagente completó la fase de ${phase}`
    if (newStatus === "error") return `Subagente en ${phase} — error`
    return `Subagente pasó a ${phase}`
  }

  return {
    event: async ({ event }: { event: any }): Promise<void> => {
      // Permission requests = OpenCode asking the user to confirm a tool
      // call (bash, edit, write, ...). Beep + short spoken nudge so the
      // user knows they must answer.
      if (event?.type === "permission.updated") {
        const now = Date.now()
        if (now - lastPermission >= DEBOUNCE_MS) {
          lastPermission = now
          const title = event?.properties?.title || "acción pendiente"
          if (await isTtsUp()) {
            await beep("alert")
            await speak(`Confirmación: ${title}`)
          }
        }
        return
      }

      // TUI toasts = notifications. Speak errors/warnings out loud.
      if (event?.type === "tui.toast.show") {
        const t = event?.properties
        if (t?.variant === "error" || t?.variant === "warning") {
          const now = Date.now()
          if (now - lastToast >= DEBOUNCE_MS) {
            lastToast = now
            const msg = [t.title, t.message].filter(Boolean).join(" — ")
            if (msg && (await isTtsUp())) {
              await beep(t.variant === "error" ? "error" : "alert")
              await speak(`Notificación ${t.variant}: ${msg}`)
            }
          }
        }
        return
      }

      const sid = event?.properties?.info?.sessionID || event?.properties?.sessionID
      if (!sid) return

      // Lazily fetch session info on first sight
      let state = agents.get(sid)
      let sessionData: any = null

      if (!state) {
        try {
          const s = await (client as any).session.get({ path: { id: sid } })
          sessionData = s?.data
        } catch {
          /* ignore — we'll use defaults */
        }

        // Only track subagent sessions (those with a parent)
        const parent = sessionData?.parentID
        if (!parent) return

        const agent = sessionData?.agent
        const title = sessionData?.title
        agents.set(sid, {
          phase: phaseFor(agent, title),
          status: "running",
          lastSpoken: 0,
        })
        return
      }

      const sessionStatus = event?.properties?.status?.type
      let newPhase = state.phase
      let newStatus = state.status

      if (event.type === "session.status") {
        if (sessionStatus === "complete") newStatus = "complete"
        else if (sessionStatus === "error") newStatus = "error"
        else if (sessionStatus === "busy" || sessionStatus === "retry") newStatus = "running"
        else if (sessionStatus === "idle")
          newStatus = state.status === "running" ? "idle" : state.status
      } else if (event.type === "session.error") {
        newStatus = "error"
      } else if (event.type === "session.completed") {
        newStatus = "complete"
      }

      // Check for changes
      const phaseChanged = newPhase !== state.phase
      const statusChanged = newStatus !== state.status

      // Only speak on phase transitions or completion/error
      if (!phaseChanged && !statusChanged) return

      // Build message
      let msg = ""
      if (phaseChanged && statusChanged) {
        msg = makeMsg(newPhase, newStatus)
      } else if (phaseChanged) {
        msg = `Subagente pasó a ${newPhase}`
      } else if (statusChanged) {
        msg = makeMsg(state.phase, newStatus)
      }

      agents.set(sid, { phase: newPhase, status: newStatus, lastSpoken: Date.now() })

      if (!msg) return

      // Debounce check
      const now = Date.now()
      if (now - state.lastSpoken < DEBOUNCE_MS) return

      // Only speak if TTS is up
      if (await isTtsUp()) {
        await speak(msg)
      }
    },
  }
}

export default AgentFlowTTS
