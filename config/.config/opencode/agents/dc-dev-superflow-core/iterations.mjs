const VERDICTS = new Set(["PASS", "REVISE", "REJECT", "INCONCLUSIVE"])

export function createIterationController(max = 5) {
  let count = 0
  let current = "pending"
  let findings = []
  return {
    start() {
      if (count >= max) return { status: "blocked", reason: "iteration-cap" }
      count += 1
      current = "running"
      return { status: "running", iteration: count }
    },
    verdict(value, nextFindings = []) {
      if (!VERDICTS.has(value)) throw new Error("invalid verdict")
      current = value
      findings = [...nextFindings]
      return { status: value, iteration: count, findings: [...findings] }
    },
    canPublish() { return current === "PASS" && findings.length === 0 },
    state() { return { iteration: count, status: current, findings: [...findings] } },
  }
}
