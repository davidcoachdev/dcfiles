import { readdirSync, readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("../../", import.meta.url))
const kitsDirectory = `${root}/context/kits`

export function auditKits() {
  const files = readdirSync(kitsDirectory)
    .filter((file) => file.startsWith("dc-dev-") && file.endsWith(".md"))
    .sort()
  const requirements = []
  const duplicateRequirementIds = []
  const malformedAcceptanceCriteria = []
  let acceptanceCriteria = 0

  for (const file of files) {
    const lines = readFileSync(`${kitsDirectory}/${file}`, "utf8").split("\n")
    for (let index = 0; index < lines.length; index += 1) {
      const requirement = lines[index].match(/^### (R\d+):/)
      if (requirement) {
        if (requirements.includes(requirement[1])) duplicateRequirementIds.push(requirement[1])
        requirements.push(requirement[1])
      }
      if (lines[index].includes("- **Acceptance criteria**:")) {
        let found = 0
        for (let cursor = index + 1; cursor < lines.length && !lines[cursor].startsWith("### "); cursor += 1) {
          if (lines[cursor].startsWith("  - [ ] ")) {
            acceptanceCriteria += 1
            found += 1
          } else if (lines[cursor].trim() && lines[cursor].startsWith("  - [")) {
            malformedAcceptanceCriteria.push(`${file}:${cursor + 1}`)
          }
        }
        if (found === 0) malformedAcceptanceCriteria.push(`${file}:${index + 1}`)
      }
    }
  }

  return {
    files,
    requirements: { expected: 25, actual: requirements.length },
    acceptance_criteria: { expected: 88, actual: acceptanceCriteria },
    requirement_ids: requirements.sort((a, b) => Number(a.slice(1)) - Number(b.slice(1))),
    duplicate_requirement_ids: duplicateRequirementIds,
    malformed_acceptance_criteria: malformedAcceptanceCriteria,
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify(auditKits(), null, 2))
}
