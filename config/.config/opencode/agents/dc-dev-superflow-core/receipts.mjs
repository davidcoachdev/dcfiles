const ORDER = ["red", "green", "refactor"]

export function createReceiptLedger(runId) {
  const entries = []
  return {
    record(phase, details = {}) {
      if (phase !== ORDER[entries.length]) throw new Error(`invalid TDD phase: expected ${ORDER[entries.length] ?? "complete"}`)
      entries.push({ phase, runId, ...details })
      return entries.at(-1)
    },
    complete() {
      if (entries.length !== ORDER.length) throw new Error("red, green, and refactor receipts are required")
      return { status: "complete", runId, entries: [...entries] }
    },
    entries() { return [...entries] },
  }
}
