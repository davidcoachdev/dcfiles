import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

const EXPECTED_REQUIREMENTS = 41
const EXPECTED_ACCEPTANCE_CRITERIA = 125

export function auditSuperflowKits(directory, { legacyDirectory = join(directory, "../../kits") } = {}) {
  const files = readdirSync(directory).filter((name) => name.startsWith("dc-dev-superflow-") && name.endsWith(".md")).sort()
  let requirements = 0
  let acceptanceCriteria = 0
  const requirementIds = []
  for (const file of files) {
    const lines = readFileSync(join(directory, file), "utf8").split(/\r?\n/)
    let inCriteria = false
    for (const line of lines) {
      const requirement = line.match(/^### (R\d+):/)
      if (requirement) {
        requirements += 1
        requirementIds.push(requirement[1])
        inCriteria = false
      } else if (/^-?\s*\*\*Acceptance Criteria(?:\*\*|:\*\*)/i.test(line)) {
        inCriteria = true
      } else if (/^## /.test(line)) {
        inCriteria = false
      } else if (inCriteria && /^\s*- \[ \] /.test(line)) {
        acceptanceCriteria += 1
      }
    }
  }
  return {
    files: files.length,
    requirements: { expected: EXPECTED_REQUIREMENTS, actual: requirements },
    acceptance_criteria: { expected: EXPECTED_ACCEPTANCE_CRITERIA, actual: acceptanceCriteria },
    duplicate_requirement_ids: requirementIds.filter((id, index) => requirementIds.indexOf(id) !== index),
    legacy: auditKitDirectory(legacyDirectory, (name) => name.startsWith("dc-dev-") && !name.startsWith("dc-dev-superflow-")),
  }
}

function auditKitDirectory(directory, include) {
  let requirements = 0
  let acceptanceCriteria = 0
  for (const file of readdirSync(directory).filter(include).filter((name) => name.endsWith(".md"))) {
    const lines = readFileSync(join(directory, file), "utf8").split(/\r?\n/)
    let inCriteria = false
    for (const line of lines) {
      if (/^### R\d+:/.test(line)) {
        requirements += 1
        inCriteria = false
      } else if (/^-?\s*\*\*Acceptance Criteria(?:\*\*|:\*\*)/i.test(line)) {
        inCriteria = true
      } else if (/^## /.test(line)) {
        inCriteria = false
      } else if (inCriteria && /^\s*- \[ \] /.test(line)) {
        acceptanceCriteria += 1
      }
    }
  }
  return { requirements, acceptance_criteria: acceptanceCriteria }
}
