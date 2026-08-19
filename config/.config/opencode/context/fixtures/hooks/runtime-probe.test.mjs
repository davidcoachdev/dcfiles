import assert from "node:assert/strict"
import { test } from "node:test"
import { runProbe } from "./runtime-probe.mjs"

test("runtime probe records only supported hook registrations", async () => {
  const result = await runProbe()

  assert.match(result.runtime.version, /^1\.18\.18$/)
  assert.ok(result.runtime.server_smoke, "the installed runtime must start")
  assert.deepEqual(result.hooks.unsupported_desired, [
    "command.executed",
    "permission.*",
  ])
  assert.ok(result.hooks.supported.includes("command.execute.before"))
  assert.ok(result.hooks.supported.includes("permission.ask"))
  assert.ok(result.hooks.supported.includes("tool.execute.before"))
  assert.ok(result.hooks.supported.includes("tool.execute.after"))
  assert.equal(result.enforcement_fallback, "check-phase")
})
