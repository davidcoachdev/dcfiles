const CAPABILITIES = new Set(["cli", "mcp", "plugin", "browser", "tts", "model"])

export function admitCapability({ name, available, authorized = true, isolated = true }) {
  if (!CAPABILITIES.has(name)) return { status: "blocked", reason: "unknown-capability" }
  if (!available) return { status: "setup-required", capability: name, reason: "unavailable" }
  if (!authorized) return { status: "blocked", capability: name, reason: "not-authorized" }
  if (["browser", "tts"].includes(name) && !isolated) return { status: "blocked", capability: name, reason: "isolation-required" }
  return { status: "admitted", capability: name }
}
