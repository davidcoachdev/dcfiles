import assert from "node:assert/strict"
import { mkdtempSync, readFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { test } from "node:test"
import { approveBuild, createApprovalStore, triage } from "./triage.mjs"
import { routeRequest } from "../entry/entry.mjs"

test("build approval is durable and caller-supplied approval cannot authorize routing", () => {
  const store = createApprovalStore(join(mkdtempSync(join(tmpdir(), "dc-dev-approval-")), "approvals.json"))
  const approval = approveBuild({ actor: "human:alice", request: "build the feature", now: 1000, ttlMs: 5000, store })
  assert.equal(JSON.parse(readFileSync(store.path, "utf8")).approvals[approval.approvalId].actor, "human:alice")
  assert.equal(triage("build the feature", { approval, now: 2000 }).mode, "approval-required")
  assert.equal(triage("build the feature", { approvalId: approval.approvalId, approvalStore: store, now: 2000 }).mode, "build")
  assert.equal(routeRequest("build the feature", { approval }).route, "approval-required")
  assert.equal(routeRequest("build the feature", { approvalId: approval.approvalId, approvalStore: store, now: 2000 }).route, "preflight")
})

test("durable approval records support revocation", () => {
  const store = createApprovalStore(join(mkdtempSync(join(tmpdir(), "dc-dev-approval-")), "approvals.json"))
  const approval = approveBuild({ actor: "human:alice", request: "build it", now: 1000, store })
  store.revoke(approval.approvalId, 1500)
  assert.equal(triage("build it", { approvalId: approval.approvalId, approvalStore: store, now: 1600 }).mode, "approval-required")
})

test("default approval storage is anchored to the workspace, not process cwd", () => {
  const store = createApprovalStore()
  assert.equal(store.path, "/home/dcdebian/.config/opencode/context/impl/.dc-dev-approvals.json")
})
