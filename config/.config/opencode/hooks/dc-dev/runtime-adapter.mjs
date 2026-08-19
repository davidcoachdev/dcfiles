export function createRuntimeAdapter(supportedEvents) {
  const supported = new Set(supportedEvents)
  return {
    register(event) {
      if (!supported.has(event)) return { ok: false, code: "UNSUPPORTED_EVENT", fallback: "check-phase" }
      return { ok: true }
    },
  }
}
