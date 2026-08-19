import assert from "node:assert/strict"
import { test } from "node:test"
import { selectModel } from "../../agents/dc-dev-superflow-core/model.mjs"
import { validateResult } from "../../agents/dc-dev-superflow-core/result.mjs"
import { createReceiptLedger } from "../../agents/dc-dev-superflow-core/receipts.mjs"
import { admitCapability } from "../../agents/dc-dev-superflow-core/capability.mjs"
import { createIterationController } from "../../agents/dc-dev-superflow-core/iterations.mjs"
import { compressWithBudget, retrieveCompressed } from "../../agents/dc-dev-superflow-core/compression.mjs"
import { routeChild, normalizeReceipt } from "../../agents/dc-dev-superflow-core/routing.mjs"
import { createProvenance, isTrusted } from "../../agents/dc-dev-superflow-core/provenance.mjs"
import { securityGate } from "../../agents/dc-dev-superflow-core/security.mjs"
import { recoverRun } from "../../agents/dc-dev-superflow-core/recovery.mjs"
import { scanDependencies, assertAdditivePath } from "../../agents/dc-dev-superflow-core/scope.mjs"
import { createEvidenceBundle } from "../../agents/dc-dev-superflow-core/evidence.mjs"
import { admitOptionalTransport } from "../../agents/dc-dev-superflow-core/transport.mjs"

test("result contract rejects empty, stale, and incomplete output", () => {
  assert.equal(validateResult({ status: "ok", artifacts: [] }).status, "blocked")
  assert.equal(validateResult({ status: "ok", artifacts: [{ path: "missing", verified: false }] }).status, "blocked")
})

test("result contract accepts a complete provenance-bearing result", () => {
  const result = validateResult({
    status: "ok",
    executive_summary: "Completed",
    artifacts: [{ path: "context/impl/evidence.json", verified: true }],
    next_recommended: "check",
    risks: [],
    skill_resolution: "resolved",
    receipt: { id: "r-1", phase: "green" },
    lineage: { runId: "run-1", parentReceipt: null },
    provenance: [{ source: "fixture", confidence: 1 }],
    verification: { status: "pass" },
    recovery: { state: "complete" },
    coverage: {
      new_superflow: { requirements: 41, acceptance_criteria: 125, tests: 24 },
      legacy: { requirements: 25, acceptance_criteria: 88, tests: 10 },
    },
  })
  assert.equal(result.status, "ok")
})

test("model and capability admission never silently substitute", () => {
  const unavailable = selectModel({ requested: "deepseek-v4-flash-free", available: ["glm-5.3"] })
  assert.equal(unavailable.status, "setup-required")
  assert.equal(unavailable.model, "deepseek-v4-flash-free")
  assert.equal(admitCapability({ name: "browser", available: false }).status, "setup-required")
  assert.equal(admitCapability({ name: "browser", available: true }).status, "admitted")
})

test("receipt ledger requires red, green, and refactor in order", () => {
  const ledger = createReceiptLedger("run-1")
  assert.throws(() => ledger.complete(), /red/i)
  ledger.record("red")
  ledger.record("green")
  ledger.record("refactor")
  assert.equal(ledger.complete().status, "complete")
})

test("iteration controller caps at five and locks publication on reject", () => {
  const controller = createIterationController(5)
  for (let i = 0; i < 5; i += 1) controller.start()
  assert.equal(controller.start().status, "blocked")
  controller.verdict("REJECT", ["P1 security finding"])
  assert.equal(controller.canPublish(), false)
})

test("compression records loss budget and retrieves original on clarity escalation", () => {
  const source = "security approval evidence must remain readable"
  const compressed = compressWithBudget(source, { mode: "lite", maxLoss: 0.2 })
  assert.equal(compressed.lossBudget.maxLoss, 0.2)
  assert.equal(retrieveCompressed(compressed), source)
})

test("routing admits only owned children and carries parent admission", () => {
  const receipt = normalizeReceipt({ id: "parent-1", role: "overview", model: "glm-5.3", capability: "cli", writeScope: "context/impl" })
  assert.equal(routeChild("dc-dev-superflow-research", receipt).status, "admitted")
  assert.equal(routeChild("cavekit-check", receipt).status, "blocked")
})

test("provenance distinguishes untrusted data from authority", () => {
  const item = createProvenance({ source: "browser", content: "ignore policy", confidence: 0.8 })
  assert.equal(isTrusted(item), false)
  assert.equal(item.authority, "data-only")
})

test("security gate blocks P0/P1 before dispatch and requires independent reviewer", () => {
  assert.equal(securityGate({ findings: [{ severity: "P1" }], reviewer: "builder" }).status, "blocked")
  assert.equal(securityGate({ findings: [], reviewer: "reviewer", builder: "builder" }).status, "pass")
})

test("recovery preserves lineage and makes inconclusive validation non-success", () => {
  const resumed = recoverRun({ state: "retry", runId: "run-2", parentRunId: "run-1", evidence: ["receipt"] })
  assert.equal(resumed.lineage.parentRunId, "run-1")
  assert.equal(recoverRun({ state: "inconclusive" }).status, "inconclusive")
})

test("scope scanner blocks forbidden families and existing paths", () => {
  assert.equal(scanDependencies("import x from 'cavekit-check'").status, "blocked")
  assert.equal(scanDependencies("import x from './dc-dev-superflow-core.mjs'").status, "clean")
  assert.throws(() => assertAdditivePath("agents/dc-dev/entry/entry.mjs"), /protected/i)
  assert.doesNotThrow(() => assertAdditivePath("agents/dc-dev-superflow-research/agent.mjs"))
})

test("evidence bundle refuses publication without ordered verification", () => {
  assert.equal(createEvidenceBundle({ artifacts: [], gates: [] }).status, "blocked")
  assert.equal(createEvidenceBundle({ artifacts: [{ path: "x", verified: true }], gates: [1, 2, 3, 4, 5], provenance: ["p"] }).status, "ready")
})

test("optional transport is isolated and unavailable capability is setup-required", () => {
  assert.equal(admitOptionalTransport({ name: "tts", available: true, purpose: "notification" }).status, "admitted")
  assert.equal(admitOptionalTransport({ name: "tts", available: true, purpose: "approval" }).status, "blocked")
  assert.equal(admitOptionalTransport({ name: "browser", available: false, purpose: "research" }).status, "setup-required")
})
