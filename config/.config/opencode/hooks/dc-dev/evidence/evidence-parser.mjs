export function parseEvidence(evidence) {
  const required = evidence && evidence.command && evidence.revision && typeof evidence.output === "string" && Number.isInteger(evidence.exitCode)
  const safe = !/(token|secret|password|api[_-]?key)\s*[:=]/i.test(evidence?.output ?? "")
  return { valid: Boolean(required && evidence.exitCode === 0 && safe) }
}
