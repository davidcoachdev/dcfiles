import { readFileSync } from "node:fs"

export function validateSuperflowSchema() {
  return JSON.parse(readFileSync(new URL("../../context/dc-dev-superflow/plans/dc-dev-superflow-result.schema.json", import.meta.url), "utf8"))
}
