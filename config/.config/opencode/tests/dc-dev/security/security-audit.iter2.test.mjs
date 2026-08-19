import assert from "node:assert/strict"
import { test } from "node:test"
import { runAudit } from "../../../context/fixtures/security/workspace-audit.mjs"

test("independent workspace audit reports no P0/P1 findings", async () => {
  const report = await runAudit()
  assert.equal(report.status, "ok")
  assert.equal(report.findings.filter((finding) => ["P0", "P1"].includes(finding.severity)).length, 0)
})
