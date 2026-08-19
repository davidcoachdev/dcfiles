import assert from "node:assert/strict"
import { test } from "node:test"
import { createPreflight } from "./preflight.mjs"

test("preflight creates an attributable receipt and honors stop", () => {
  const preflight = createPreflight({ session: "s1", user: "u1" })
  assert.deepEqual(preflight.approve(), { approved: true, session: "s1", user: "u1" })
  assert.equal(preflight.stop().stopped, true)
})
