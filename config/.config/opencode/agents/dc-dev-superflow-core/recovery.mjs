const STATES = new Set(["retry", "resume", "new-lineage", "abandon", "blocked", "inconclusive", "complete"])

export function recoverRun({ state, runId = null, parentRunId = null, evidence = [] }) {
  if (!STATES.has(state)) return { status: "blocked", reason: "unknown-recovery-state" }
  if (state === "inconclusive") return { status: "inconclusive", recovery: { state }, evidence: [...evidence] }
  return { status: state === "complete" ? "complete" : "recovered", recovery: { state }, lineage: { runId, parentRunId }, evidence: [...evidence] }
}
