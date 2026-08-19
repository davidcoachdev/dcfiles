import assert from "node:assert/strict"
import { createIteration } from "./iteration.mjs"
import { test } from "node:test"

test("iteration is bounded and killable", () => {
  const loop = createIteration(2)
  assert.equal(loop.next().iteration, 1)
  assert.equal(loop.next().iteration, 2)
  assert.equal(loop.next().ok, false)
  loop.stop()
  assert.equal(loop.next().reason, "stopped")
})
