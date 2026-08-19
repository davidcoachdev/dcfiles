export function admitOptionalTransport({ name, available, purpose }) {
  if (!available) return { status: "setup-required", capability: name }
  if (name === "tts" && purpose !== "notification") return { status: "blocked", reason: "tts-not-authority" }
  if (!["browser", "tts", "mcp", "plugin"].includes(name)) return { status: "blocked", reason: "unknown-transport" }
  return { status: "admitted", capability: name, isolated: true }
}
