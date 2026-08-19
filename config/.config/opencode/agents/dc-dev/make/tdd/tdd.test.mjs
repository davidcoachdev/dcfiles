import assert from "node:assert/strict"
import { createTddTrace } from "./tdd.mjs"
import { test } from "node:test"

test("TDD trace requires red, green, and refactor in order", () => {
  const trace = createTddTrace()
  assert.equal(trace.add("red").ok, true)
  assert.equal(trace.add("green").ok, true)
  assert.equal(trace.add("refactor").ok, true)
  assert.equal(trace.complete(), true)
})
