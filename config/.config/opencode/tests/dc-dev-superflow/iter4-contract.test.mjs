import assert from "node:assert/strict"
import { test } from "node:test"
import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { compressWithBudget, retrieveCompressed } from "../../agents/dc-dev-superflow-core/compression.mjs"
import { auditSuperflowKits } from "../../agents/dc-dev-superflow-core/coverage.mjs"
import { validateResult } from "../../agents/dc-dev-superflow-core/result.mjs"

const root = new URL("../../", import.meta.url)

test("superflow corpus is isolated from the legacy context corpus", () => {
  const namespace = join(root.pathname, "context/dc-dev-superflow/kits")
  const kits = readdirSync(namespace).filter((name) => name.endsWith(".md"))
  assert.equal(kits.length, 10)
  assert.ok(kits.every((name) => name.startsWith("dc-dev-superflow-")))
  assert.equal(readdirSync(join(root.pathname, "context/kits")).filter((name) => name.startsWith("dc-dev-superflow-")).length, 0)
})

test("Caveman compression measurably reduces non-authoritative prose and remains reversible", () => {
  const source = "The system should, in general, carefully and safely process this ordinary explanatory prose with enough repeated words to reduce."
  const compressed = compressWithBudget(source, { mode: "safe", maxLoss: 0.5 })
  assert.equal(compressed.status, "ok")
  assert.ok(compressed.text.length < source.length)
  assert.ok(compressed.lossBudget.measuredLoss > 0)
  assert.equal(retrieveCompressed(compressed), source)
})

test("authoritative capsules use literal transport and are never compressed", () => {
  const source = "P1 security finding: approval receipt receipt-42 must remain byte-identifiable"
  const compressed = compressWithBudget(source, { mode: "aggressive", authoritative: true, maxLoss: 0.9 })
  assert.equal(compressed.status, "ok")
  assert.equal(compressed.text, source)
  assert.equal(compressed.lossBudget.measuredLoss, 0)
  assert.equal(compressed.fallback, true)
  for (const wording of ["authorize credential rotation", "password token is protected_path", "authorization approval is required"]) {
    const variant = compressWithBudget(wording, { mode: "aggressive", maxLoss: 0.9 })
    assert.equal(variant.text, wording)
    assert.equal(variant.lossBudget.measuredLoss, 0)
    assert.equal(variant.fallback, true)
  }
})

test("explicitly requested unavailable helpers return setup-required without fake savings", () => {
  const result = compressWithBudget("ordinary prose", { adapter: "headroom", helpers: {} })
  assert.equal(result.status, "setup-required")
  assert.equal(result.text, "ordinary prose")
  assert.equal(result.lossBudget.measuredLoss, 0)
})

test("new tracking parser counts only the isolated corpus", () => {
  const report = auditSuperflowKits(join(root.pathname, "context/dc-dev-superflow/kits"))
  assert.deepEqual(report.requirements, { expected: 41, actual: 41 })
  assert.deepEqual(report.acceptance_criteria, { expected: 125, actual: 125 })
  assert.deepEqual(report.legacy, { requirements: 25, acceptance_criteria: 88 })
  const tracking = readFileSync(join(root.pathname, "context/dc-dev-superflow/impl/dc-dev-superflow.md"), "utf8")
  const trace = readFileSync(join(root.pathname, "context/dc-dev-superflow/impl/trace.md"), "utf8")
  assert.match(tracking, /New superflow focused tests \| 25 \| 0/)
  assert.match(tracking, /Existing Dc-Dev tests \| 12 \| 0/)
  assert.doesNotMatch(`${tracking}\n${trace}`, /(?:new|focused).*24|(?:legacy|Existing Dc-Dev).*10\/10|legacy.*tests.*10/i)
})

test("Result Contract carries separate deterministic corpus and test counts", () => {
  const input = {
    status: "ok",
    executive_summary: "Complete",
    artifacts: [{ path: "context/dc-dev-superflow/impl/trace.md", verified: true }],
    next_recommended: "check",
    risks: [],
    skill_resolution: "resolved",
    receipt: { id: "r-4", phase: "refactor" },
    lineage: { runId: "run-4" },
    provenance: [{ source: "local-parser", confidence: 1 }],
    verification: { status: "pass" },
    recovery: { state: "complete" },
    coverage: {
      new_superflow: { requirements: 41, acceptance_criteria: 125, tests: 25 },
      legacy: { requirements: 25, acceptance_criteria: 88, tests: 12 },
    },
  }
  const result = validateResult(input)
  assert.equal(result.status, "ok")
  for (const coverage of [
    { new_superflow: { requirements: 41, acceptance_criteria: 125 }, legacy: { requirements: 25, acceptance_criteria: 88, tests: 12 } },
    { new_superflow: { requirements: 41, acceptance_criteria: 125, tests: 25 }, legacy: { requirements: 25, acceptance_criteria: 88, tests: 12.5 } },
    { new_superflow: { requirements: 41, acceptance_criteria: 125, tests: 25 }, legacy: undefined },
  ]) {
    assert.equal(validateResult({ ...input, coverage }).status, "blocked")
  }
})
