import assert from "node:assert/strict"
import { test } from "node:test"
import createPlugin from "../../plugins/dc-dev-runtime.mjs"

test("Dc-Dev plugin exposes only runtime-probed enforcement events", async () => {
  const hooks = await createPlugin({ directory: process.cwd() })
  for (const event of ["permission.ask", "command.execute.before", "tool.execute.before", "tool.execute.after"]) {
    assert.equal(typeof hooks[event], "function", event)
  }
  assert.equal(hooks["command.executed"], undefined)
})
