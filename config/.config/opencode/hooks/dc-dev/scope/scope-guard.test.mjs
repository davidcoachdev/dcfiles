import assert from "node:assert/strict"
import { test } from "node:test"
import { createScopeGuard } from "./scope-guard.mjs"

test("scope guard permits listed paths and blocks traversal", () => {
  const guard = createScopeGuard("/workspace", ["src/app.js"])
  assert.equal(guard.check("/workspace/src/app.js").allowed, true)
  assert.equal(guard.check("../secret").allowed, false)
  assert.equal(guard.check("/workspace/src/other.js").allowed, false)
})
