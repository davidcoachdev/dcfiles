export function securityGate({ findings = [], reviewer, builder = "builder" }) {
  const blocking = findings.filter((finding) => ["P0", "P1"].includes(finding.severity))
  if (blocking.length) return { status: "blocked", findings: blocking }
  if (!reviewer || reviewer === builder) return { status: "blocked", reason: "independent-review-required" }
  return { status: "pass", findings: [] }
}
