import assert from "node:assert/strict"
import { parseVerdict } from "./verdict.mjs"
import { test } from "node:test"

test("P0/P1 findings force REJECT and only literal verdicts are accepted", () => {
  assert.equal(parseVerdict("Verdict: APPROVE", []).verdict, "APPROVE")
  assert.equal(parseVerdict("Verdict: APPROVE", [{ severity: "P1" }]).verdict, "REJECT")
  assert.equal(parseVerdict("approve", []).valid, false)
})
