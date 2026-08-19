import assert from "node:assert/strict"
import { mkdtempSync, readFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { test } from "node:test"
import { routeRequest } from "./entry.mjs"
import { approveBuild, createApprovalStore } from "../front-door/triage.mjs"

test("Dc-Dev entry routes consultation and approved builds", () => {
  const config = JSON.parse(readFileSync(new URL("../../../opencode.json", import.meta.url), "utf8"))
  assert.equal(config.agent["dc-dev"].mode, "primary")
  assert.equal(routeRequest("explain the design").route, "consultation")
  assert.equal(routeRequest("build it").route, "approval-required")
  const store = createApprovalStore(join(mkdtempSync(join(tmpdir(), "dc-dev-approval-")), "approvals.json"))
  const approval = approveBuild({ actor: "test", request: "build it", now: 1000, store })
  assert.equal(routeRequest("build it", { approvalId: approval.approvalId, approvalStore: store, now: 1001 }).route, "preflight")
})
