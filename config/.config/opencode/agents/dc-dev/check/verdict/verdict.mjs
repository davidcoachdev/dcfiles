export function parseVerdict(output, findings) {
  const match = /^Verdict: (APPROVE|REVISE|REJECT)$/.exec(output)
  if (!match) return { valid: false }
  const blocked = findings.some(({ severity }) => severity === "P0" || severity === "P1")
  return { valid: true, verdict: blocked ? "REJECT" : match[1] }
}
