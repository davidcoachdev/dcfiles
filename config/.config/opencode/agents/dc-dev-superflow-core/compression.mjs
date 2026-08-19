const MODES = new Set(["lite", "full", "ultra", "literal", "safe", "aggressive"])
const AUTHORITATIVE = /\b(security|approv(?:al|e|ed)|authori[sz](?:e|ed|ation|ing)|authorit(?:y|ative)|receipt|evidence|verdict|provenance|irreversible|secret|credential|password|token|protected[- _]path|P[01])\b/i
const FILLER = /\b(?:carefully|safely|in general|generally|basically|really|very|actually|just|that|which|enough|should)\b/gi

export function compressWithBudget(source, { mode = "lite", maxLoss = 0, authoritative = false, adapter, helpers = {} } = {}) {
  if (!MODES.has(mode)) throw new Error("invalid compression mode")
  if (typeof source !== "string") throw new TypeError("source must be a string")
  const literal = mode === "literal" || authoritative || AUTHORITATIVE.test(source)
  if (literal) return capsule(source, mode, maxLoss, { fallback: true, adapter: "literal" })

  if (adapter) {
    const helper = helpers[adapter]
    if (typeof helper !== "function") return capsule(source, mode, maxLoss, { status: "setup-required", adapter })
    try {
      const reduced = helper(source, { mode })
      if (typeof reduced !== "string" || reduced.length >= source.length) return capsule(source, mode, maxLoss, { fallback: true, adapter })
      return finalize(source, reduced, mode, maxLoss, adapter)
    } catch {
      return capsule(source, mode, maxLoss, { fallback: true, adapter })
    }
  }

  const reduced = mode === "aggressive" || mode === "ultra"
    ? source.replace(FILLER, "").replace(/\s{2,}/g, " ").trim()
    : source.replace(/\s{2,}/g, " ").replace(/\b(?:in general|generally|basically|actually)\b[, ]*/gi, "").trim()
  const result = finalize(source, reduced, mode, maxLoss, "caveman")
  return result.lossBudget.measuredLoss > maxLoss ? capsule(source, mode, maxLoss, { fallback: true, adapter: "caveman", reason: "loss-budget-exceeded" }) : result
}

export function retrieveCompressed(value) {
  if (!value || typeof value.original !== "string") throw new Error("compressed value has no recovery payload")
  return value.original
}

function finalize(original, text, mode, maxLoss, adapter) {
  const measuredLoss = original.length === 0 ? 0 : (original.length - text.length) / original.length
  return { status: "ok", mode, text, original, adapter, lossBudget: { maxLoss, measuredLoss }, fallback: false }
}

function capsule(source, mode, maxLoss, { status = "ok", fallback = true, adapter = "none", reason } = {}) {
  return { status, mode, text: source, original: source, adapter, lossBudget: { maxLoss, measuredLoss: 0 }, fallback, ...(reason ? { reason } : {}) }
}
