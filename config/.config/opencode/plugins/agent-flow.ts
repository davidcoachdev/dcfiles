/**
 * agent-flow — Manager Board emitter (INDEPENDENT of background-agents)
 *
 * Observes OpenCode sessions/events and writes:
 *   ~/.local/share/opencode/flow/flow-board.json
 * consumed by the OpenTUI viewer (commands/flow.md).
 *
 * Does NOT import, call, or modify background-agents in any way.
 * It only watches the session tree via the OpenCode SDK + event stream,
 * so both plugins can coexist.
 *
 * Based on the event-hook patterns already used in background-agents.ts
 * (MIT-style adaptation; no shared code).
 */

import * as fs from "node:fs/promises"
import * as os from "node:os"
import * as path from "node:path"
import { type Plugin, tool } from "@opencode-ai/plugin"

export interface FlowNode {
  id: string
  parent?: string
  agent?: string
  title?: string
  phase: string
  status: "running" | "idle" | "complete" | "error" | "unknown"
  lastMessage?: string
  startedAt: string
  updatedAt: string
}

export function applySessionStatus(node: FlowNode, status: string): FlowNode {
  if (status === "complete") node.status = "complete"
  else if (status === "error") node.status = "error"
  else if (status === "busy" || status === "retry") node.status = "running"
  else if (status === "idle") node.status = node.parent ? "complete" : "idle"
  return node
}

// Map agent name -> phase column. Adjust to your real workflow.
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

export const AgentFlow: Plugin = async (ctx) => {
  const { client, directory } = ctx
  const outDir = path.join(os.homedir(), ".local", "share", "opencode", "flow")
  await fs.mkdir(outDir, { recursive: true })
  const stateFile = path.join(outDir, "flow-board.json")

  const nodes = new Map<string, FlowNode>()
  const now = () => new Date().toISOString()

  async function ensure(id: string): Promise<FlowNode> {
    let n = nodes.get(id)
    if (!n) {
      n = { id, phase: "En curso", status: "running", startedAt: now(), updatedAt: now() }
      nodes.set(id, n)
      // Best-effort fill parent/agent/title from the session.
      try {
        const s = await (client as any).session.get({ path: { id } })
        const d = s?.data
        if (d) {
          n.parent = d.parentID
          n.title = d.title
          const agent = (d as any).agent
          if (agent) n.agent = agent
          n.phase = phaseFor(n.agent, n.title)
        }
      } catch {
        /* ignore — we'll fill on next event */
      }
    }
    return n
  }

  function snapshot() {
    const arr = Array.from(nodes.values())
    return { lastRun: now(), count: arr.length, nodes: arr }
  }

  async function write(): Promise<void> {
    try {
      await fs.writeFile(stateFile, JSON.stringify(snapshot(), null, 2), "utf8")
    } catch {
      /* ignore write errors */
    }
  }

  // Periodic write so the viewer always has fresh data even between events.
  const timer = setInterval(() => {
    write().catch(() => {})
  }, 1500)
  // Don't keep the process alive just for this timer.
  if (typeof timer === "object" && "unref" in timer) (timer as any).unref?.()

  return {
    event: async ({ event }: { event: any }): Promise<void> => {
      const sid =
        event?.properties?.info?.sessionID || event?.properties?.sessionID
      if (!sid) return

      const n = await ensure(sid)

      const sessionStatus = event?.properties?.status?.type

      if (event.type === "session.status") {
        applySessionStatus(n, sessionStatus)
      } else if (event.type === "session.error") {
        applySessionStatus(n, "error")
      } else if (event.type === "session.completed") {
        applySessionStatus(n, "complete")
      } else if (event.type === "session.idle") {
        applySessionStatus(n, "idle")
      } else if (event.type === "message.updated" || event.type === "message.created") {
        // Messages provide activity text, but cannot revive an idle/error session.
        if (n.status !== "idle" && n.status !== "error") n.status = "running"
        const parts = event?.properties?.info?.parts
        if (Array.isArray(parts)) {
          const text = parts
            .filter((p: any) => p?.type === "text")
            .map((p: any) => p.text)
            .join(" ")
          if (text) n.lastMessage = text.slice(0, 160)
        }
      }

      n.updatedAt = now()
      await write()
    },

    // Optional tool: ask the agent for a snapshot on demand.
    tool: {
      flow_state: tool({
        description:
          "Dump current agent-flow board state (manager view): phases, agents, status, tree.",
        args: {},
        async execute() {
          return JSON.stringify(snapshot(), null, 2)
        },
      }),
    },
  }
}

export default AgentFlow
