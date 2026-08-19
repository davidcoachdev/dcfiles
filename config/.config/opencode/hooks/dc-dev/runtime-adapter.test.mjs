import assert from "node:assert/strict"
import { test } from "node:test"
import { createRuntimeAdapter } from "./runtime-adapter.mjs"

test("runtime adapter rejects unsupported hook registrations", () => {
  const adapter = createRuntimeAdapter(["tool.execute.after"])
  assert.deepEqual(adapter.register("tool.execute.after"), { ok: true })
  assert.deepEqual(adapter.register("command.executed"), {
    ok: false,
    code: "UNSUPPORTED_EVENT",
    fallback: "check-phase",
  })
})
