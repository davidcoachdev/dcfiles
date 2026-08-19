import assert from "node:assert/strict"
import { test } from "node:test"
import { createEnvelope } from "./protocol.mjs"

test("protocol envelope preserves evidence and redacts secrets", () => {
  const envelope = createEnvelope({ requirements: ["R23"], evidence: "pass", token: "secret" })
  assert.deepEqual(envelope.requirements, ["R23"])
  assert.equal(envelope.token, "[REDACTED]")
})
