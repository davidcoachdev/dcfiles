import assert from "node:assert/strict"
import { test } from "node:test"
import { auditKits } from "./kit-coverage.mjs"

test("all Dc-Dev kits contain exactly 25 requirements and 88 acceptance criteria", () => {
  const report = auditKits()
  assert.deepEqual(report.requirements, { expected: 25, actual: 25 })
  assert.deepEqual(report.acceptance_criteria, { expected: 88, actual: 88 })
  assert.equal(report.duplicate_requirement_ids.length, 0)
  assert.equal(report.malformed_acceptance_criteria.length, 0)
})
