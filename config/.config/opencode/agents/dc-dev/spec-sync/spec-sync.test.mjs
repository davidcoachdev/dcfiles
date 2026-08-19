import assert from "node:assert/strict"
import { test } from "node:test"
import { syncDecision } from "./spec-sync.mjs"

test("spec sync requires a linked test for a new decision", () => {
  assert.equal(syncDecision({ requirement: "R25", decision: "new behavior", test: "t-1" }).ok, true)
  assert.equal(syncDecision({ requirement: "R25", decision: "new behavior" }).ok, false)
})
