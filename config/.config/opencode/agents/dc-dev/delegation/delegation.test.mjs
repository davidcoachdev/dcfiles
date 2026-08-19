import assert from "node:assert/strict"
import { createDelegator } from "./delegation.mjs"
import { test } from "node:test"

test("delegator deduplicates identity and rejects conflicting scopes", () => {
  const delegator = createDelegator()
  assert.equal(delegator.launch({ phase: "make", task: "T-018", scope: ["a"] }).ok, true)
  assert.equal(delegator.launch({ phase: "make", task: "T-018", scope: ["a"] }).duplicate, true)
  assert.equal(delegator.launch({ phase: "make", task: "T-018", scope: ["b"] }).ok, false)
})
