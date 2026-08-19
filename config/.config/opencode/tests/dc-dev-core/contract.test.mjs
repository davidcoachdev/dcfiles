import { test } from "node:test"
import assert from "node:assert/strict"
import {
  STATUS,
  EXPERIENCE_MODES,
  RECEIPT_FIELDS,
  isValidStatus,
  isValidExperienceMode,
  validateReceipt,
  failClosedStatusWhenNoChild,
} from "../../agents/dc-dev-core/contract.mjs"

test("R4: status enum has exactly the 4 allowed values", () => {
  assert.deepEqual([...STATUS], ["dispatched", "done", "blocked", "setup-required"])
})

test("R4: invalid status rejected (ok/failed/empty never accepted)", () => {
  assert.equal(isValidStatus("ok"), false)
  assert.equal(isValidStatus("failed"), false)
  assert.equal(isValidStatus(""), false)
  assert.equal(isValidStatus("done"), true)
})

test("R4: fail-closed when no child -> blocked/setup-required, never dispatched/done", () => {
  const s = failClosedStatusWhenNoChild()
  assert.ok(["blocked", "setup-required"].includes(s))
  assert.ok(!["dispatched", "done"].includes(s))
})

test("R14: receipt with all 8 fields + valid enums is valid", () => {
  const r = {
    status: "done",
    selectedChild: "c1",
    requestId: "r1",
    timestamp: new Date().toISOString(),
    resultRef: "m1",
    evidenceRef: "c1",
    verdict: "APPROVE",
    experienceMode: "interactive",
  }
  assert.equal(validateReceipt(r).valid, true)
})

test("R14: missing field rejected", () => {
  const r = {
    status: "done",
    selectedChild: "c1",
    requestId: "r1",
    timestamp: "t",
    resultRef: "m1",
    evidenceRef: "c1",
    verdict: "APPROVE",
  } // missing experienceMode
  const v = validateReceipt(r)
  assert.equal(v.valid, false)
  assert.match(v.reason, /missing-field:experienceMode/)
})

test("R14: invalid experienceMode rejected", () => {
  const r = {
    status: "done",
    selectedChild: "c1",
    requestId: "r1",
    timestamp: "t",
    resultRef: "m1",
    evidenceRef: "c1",
    verdict: "APPROVE",
    experienceMode: "autopilot",
  }
  assert.equal(validateReceipt(r).valid, false)
})

test("R14: receipt carries exactly the 8 defined fields and 3 allowed modes", () => {
  assert.equal(RECEIPT_FIELDS.length, 8)
  assert.deepEqual([...RECEIPT_FIELDS], [
    "status",
    "selectedChild",
    "requestId",
    "timestamp",
    "resultRef",
    "evidenceRef",
    "verdict",
    "experienceMode",
  ])
  assert.deepEqual([...EXPERIENCE_MODES], ["interactive", "minimal", "automatic"])
})
