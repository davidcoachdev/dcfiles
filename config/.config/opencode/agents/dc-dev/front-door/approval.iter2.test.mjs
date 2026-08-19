import assert from "node:assert/strict"
import { mkdtempSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { test } from "node:test"
import { approveBuild, createApprovalStore, triage } from "./triage.mjs"

test("build approval requires an attributable, time-bounded approval record", () => {
  const store = createApprovalStore(join(mkdtempSync(join(tmpdir(), "dc-dev-approval-")), "approvals.json"))
  const approval = approveBuild({ actor: "human:alice", request: "build the feature", now: 1000, ttlMs: 5000, store })
  assert.deepEqual(Object.keys(approval).sort(), ["actor", "approvalId", "approvedAt", "expiresAt", "requestHash"].sort())
  assert.equal(triage("build the feature", { approvalId: approval.approvalId, approvalStore: store, now: 2000 }).mode, "build")
  assert.equal(triage("build the feature", { approvalId: approval.approvalId, approvalStore: store, now: 7000 }).mode, "approval-required")
  store.revoke(approval.approvalId, 1500)
  assert.equal(triage("build the feature", { approvalId: approval.approvalId, approvalStore: store, now: 2000 }).mode, "approval-required")
})
