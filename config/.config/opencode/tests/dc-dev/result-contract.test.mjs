import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"

const schema = JSON.parse(readFileSync(new URL("../../context/plans/dc-dev-result-contract.schema.json", import.meta.url), "utf8"))

test("Result Contract schema requires evidence-facing fields", () => {
  assert.deepEqual(schema.required, ["status", "executive_summary", "artifacts", "next_recommended", "risks", "skill_resolution"])
  assert.equal(schema.additionalProperties, false)
})
