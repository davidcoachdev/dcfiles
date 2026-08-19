import assert from "node:assert/strict"
import { test } from "node:test"
import { mkdtempSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { createApprovalStore, triage, approveBuild } from "./triage.mjs"

test("front door requires explicit approval before build routing", () => {
  assert.equal(triage("explain the architecture").mode, "consultation")
  assert.equal(triage("build the feature").mode, "approval-required")
  const store = createApprovalStore(join(mkdtempSync(join(tmpdir(), "dc-dev-approval-")), "approvals.json"))
  const approval = approveBuild({ actor: "test", request: "build the feature", now: 1000, store })
  assert.equal(triage("build the feature", { approvalId: approval.approvalId, approvalStore: store, now: 1001 }).mode, "build")
})
