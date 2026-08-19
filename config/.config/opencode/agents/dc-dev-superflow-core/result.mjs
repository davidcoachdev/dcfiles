const REQUIRED = ["status", "executive_summary", "artifacts", "next_recommended", "risks", "skill_resolution", "receipt", "lineage", "provenance", "verification", "recovery", "coverage"]
const STATUSES = new Set(["ok", "failed", "blocked", "setup-required", "inconclusive"])

export function validateResult(input) {
  const result = structuredClone(input ?? {})
  const invalid = REQUIRED.some((key) => result[key] === undefined) || !STATUSES.has(result.status) || !Array.isArray(result.artifacts) || !validCoverage(result.coverage)
  const unsafe = result.status === "ok" && (result.artifacts.length === 0 || result.artifacts.some((a) => !a?.path || a.verified !== true) || result.verification?.status !== "pass")
  if (invalid || unsafe) return { ...result, status: "blocked", reason: invalid ? "contract-invalid" : "unverified-or-empty" }
  return result
}

function validCoverage(coverage) {
  return coverage && ["new_superflow", "legacy"].every((corpus) => {
    const value = coverage[corpus]
    return value && ["requirements", "acceptance_criteria", "tests"].every((key) => Number.isInteger(value[key]) && value[key] >= 0)
  })
}
