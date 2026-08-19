import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"
test("final coverage proves 25 requirements and 88 criteria", () => {
  const report = JSON.parse(readFileSync(new URL("../../context/plans/dc-dev-final-coverage.json", import.meta.url), "utf8"))
  assert.deepEqual(report.coverage, { requirements: "25/25", acceptance_criteria: "88/88" })
})
