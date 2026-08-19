import assert from "node:assert/strict"
import { test } from "node:test"
import { runAudit } from "../../../context/fixtures/security/workspace-audit.mjs"

test("workspace audit reports every executed security check", async () => {
  const report = await runAudit()
  assert.equal(report.status, "ok")
  assert.ok(report.checksExecuted.length >= 8)
  for (const check of ["config-permissions", "hardcoded-secrets", "config-protected-paths", "protected-paths", "hook-config", "runtime-write-scope", "bash-scope", "approval-durability", "trace-consistency"]) {
    assert.ok(report.checksExecuted.includes(check), check)
  }
})
