import { appendTrace } from "../hooks/dc-dev/trace/trace-writer.mjs"
import { parseEvidence } from "../hooks/dc-dev/evidence/evidence-parser.mjs"
import { createScopeGuard } from "../hooks/dc-dev/scope/scope-guard.mjs"
import { mkdirSync } from "node:fs"
import { dirname } from "node:path"

const RUNTIME_VERSION = "dc-dev-runtime-4"

const SUPPORTED_EVENTS = [
  "permission.ask",
  "command.execute.before",
  "tool.execute.before",
  "tool.execute.after",
]

export default async function dcDevRuntime({ directory }) {
  const tracePath = process.env.DC_DEV_TRACE_PATH ?? `${directory}/context/impl/trace.md`
  const allowedPaths = (process.env.DC_DEV_ALLOWED_PATHS ?? directory).split(",").map((path) => path.trim()).filter(Boolean)
  const guard = createScopeGuard(directory, allowedPaths)
  const record = (event) => { mkdirSync(dirname(tracePath), { recursive: true }); appendTrace(tracePath, { phase: "runtime", task: "hooks", iteration: 3, ...event }) }
  const denyProtected = (value) => /(?:^|[\\/])(?:\.env(?:\..*)?|\.ssh|credentials\.json|secrets|[^\\/]+\.(?:key|pem)|\.aws(?:[\\/]credentials)?|(?:\.config[\\/]gh[\\/]hosts\.yml)|id_rsa)(?:[\\/]|$)/i.test(String(value))

  record({ event: "plugin.loaded", version: RUNTIME_VERSION, timestamp: new Date().toISOString() })

  return {
    RUNTIME_VERSION,
    SUPPORTED_EVENTS,
    "permission.ask": async (input, output) => {
      const target = input?.permission?.pattern ?? input?.permission?.path ?? ""
      if (denyProtected(target)) output.status = "deny"
    },
    "command.execute.before": async (input) => {
      record({ event: "command.execute.before", command: input.command })
    },
    "tool.execute.before": async (input, output) => {
      const candidate = output.args?.path ?? output.args?.filePath
      if (["edit", "write", "patch"].includes(input.tool)) enforcePath(candidate, input.tool)
      if (input.tool === "bash") enforceCommand(input.args?.command ?? output.args?.command ?? "")
    },
    "tool.execute.after": async (input, output) => {
      if (input.tool === "bash") enforceCommand(input.args?.command ?? output.args?.command ?? "")
      if (input.tool === "bash" && !parseEvidence({ command: input.args?.command, revision: "runtime", output: output.output ?? "", exitCode: 0 }).valid) {
        record({ event: "evidence.invalid", tool: input.tool })
      }
      record({ event: "tool.execute.after", tool: input.tool })
    },
  }

  function enforcePath(candidate, tool) {
    if (!candidate || denyProtected(candidate)) {
      if (candidate && denyProtected(candidate)) throw new Error("DC_DEV_PROTECTED_PATH")
      throw new Error("DC_DEV_SCOPE_DENIED")
    }
    const result = guard.check(candidate)
    if (!result.allowed) {
      record({ event: "scope.reject", tool, path: candidate, reason: result.reason })
      throw new Error("DC_DEV_SCOPE_DENIED")
    }
  }

  function enforceCommand(command) {
    if (/(?:^|[;&|])\s*(?:source|\.)\s+|\bfind\b[\s\S]*\s-exec(?:\s|$)|\$(?:\{[A-Za-z_][A-Za-z0-9_]*\}|[A-Za-z_][A-Za-z0-9_]*)|\b(?:bash|sh|zsh)\s+-c\b/i.test(String(command))) {
      throw new Error("DC_DEV_COMMAND_DENIED")
    }
    for (const candidate of commandPathCandidates(command)) {
      if (denyProtected(candidate)) throw new Error("DC_DEV_PROTECTED_PATH")
      enforcePath(candidate, "bash")
    }
  }
}

function commandPathCandidates(command) {
  const tokens = String(command).match(/(?:[^\s"']+|"[^"]*"|'[^']*')/g) ?? []
  return tokens.map((token) => token.replace(/^['"]|['"]$/g, "")).filter((token, index) => {
    if (!token || token.startsWith("-")) return false
    if (/^(?:>|>>|<|2>|2>>)$/.test(token)) return false
    return index > 0 && (token.includes("/") || token.startsWith(".") || token.startsWith("~") || /(?:\.env(?:\..*)?|credentials\.json|secrets|\.ssh)/i.test(token))
  })
}
