import { test } from "node:test"
import assert from "node:assert/strict"
import {
  buildReceipt,
  safeReceipt,
  containsSecret,
  redactSecrets,
  appendReceiptLine,
} from "../../agents/dc-dev-core/receipt.mjs"

test("R14: buildReceipt produces all 8 fields with real selectedChild + allowed mode", () => {
  const r = buildReceipt({
    status: "done",
    selectedChild: "c1",
    requestId: "r1",
    resultRef: "m1",
    evidenceRef: "c1",
    verdict: "APPROVE",
    experienceMode: "interactive",
  })
  assert.equal(r.selectedChild, "c1")
  assert.equal(r.experienceMode, "interactive")
  assert.equal(Object.keys(r).length, 8)
})

test("R14: missing field throws invalid-receipt", () => {
  assert.throws(
    () =>
      buildReceipt({
        status: "done",
        selectedChild: "c1",
        requestId: "r1",
        timestamp: "t",
        resultRef: "m1",
        evidenceRef: "c1",
        verdict: "APPROVE",
      }),
    /invalid-receipt:missing-field/,
  )
})

test("R16: secret-like input is rejected by safeReceipt (never persisted)", () => {
  assert.throws(
    () =>
      safeReceipt({
        status: "done",
        selectedChild: "c1",
        requestId: "r1",
        resultRef: "m1",
        evidenceRef: "c1",
        verdict: "api_key=sk-ABCDEFGHIJKLMNOPQRST",
        experienceMode: "interactive",
      }),
    /secret-in-receipt/,
  )
})

test("R16: redactSecrets removes secret patterns", () => {
  const out = redactSecrets("token=sk-ABCDEFGHIJKLMNOP and api_key=secret123")
  assert.ok(!out.includes("sk-ABCDEFGHIJKLMNOP"))
  assert.ok(!out.includes("secret123"))
})

test("R17: resultRef is stored as the real message id", () => {
  const r = buildReceipt({
    status: "done",
    selectedChild: "c1",
    requestId: "r1",
    resultRef: "real-msg-id",
    evidenceRef: "c1",
    verdict: "APPROVE",
    experienceMode: "interactive",
  })
  assert.equal(r.resultRef, "real-msg-id")
})

test("R14/R16: appendReceiptLine writes JSONL without secrets", () => {
  const lines = []
  const writer = { writeLine: (s) => lines.push(s) }
  appendReceiptLine(
    writer,
    buildReceipt({
      status: "done",
      selectedChild: "c1",
      requestId: "r1",
      resultRef: "m1",
      evidenceRef: "c1",
      verdict: "APPROVE",
      experienceMode: "minimal",
    }),
  )
  assert.equal(lines.length, 1)
  const parsed = JSON.parse(lines[0])
  assert.equal(parsed.experienceMode, "minimal")
  assert.equal(containsSecret(JSON.stringify(parsed)), false)
})

// --- Gap 1: reject `undefined` for every field; distinguish absent from undefined ---

test("Gap1: present-but-undefined field is rejected (never silently serialized/dropped)", () => {
  assert.throws(
    () =>
      buildReceipt({
        status: "done",
        selectedChild: "c1",
        requestId: undefined, // present but undefined
        timestamp: "t",
        resultRef: "m1",
        evidenceRef: "c1",
        verdict: "APPROVE",
        experienceMode: "interactive",
      }),
    /invalid-receipt:undefined-field:requestId/,
  )
})

test("Gap1: absent vs undefined are distinguished by distinct error reasons", () => {
  // absent key -> missing-field
  assert.throws(
    () =>
      buildReceipt({
        status: "done",
        selectedChild: "c1",
        requestId: "r1",
        timestamp: "t",
        resultRef: "m1",
        evidenceRef: "c1",
        verdict: "APPROVE",
        // experienceMode key not provided
      }),
    /invalid-receipt:missing-field:experienceMode/,
  )
  // present but undefined -> undefined-field (different reason)
  assert.throws(
    () =>
      buildReceipt({
        status: "done",
        selectedChild: "c1",
        requestId: "r1",
        timestamp: "t",
        resultRef: "m1",
        evidenceRef: "c1",
        verdict: "APPROVE",
        experienceMode: undefined,
      }),
    /invalid-receipt:undefined-field:experienceMode/,
  )
})

test("Gap1: serializing keeps all 8 keys; null nullable fields are preserved, never dropped", () => {
  const r = buildReceipt({
    status: "setup-required",
    selectedChild: null,
    requestId: "r1",
    resultRef: null,
    evidenceRef: null,
    verdict: null,
    experienceMode: "interactive",
  })
  const round = JSON.parse(JSON.stringify(r))
  assert.equal(Object.keys(round).length, 8)
  assert.equal(round.selectedChild, null)
  assert.equal(round.resultRef, null)
  assert.equal(round.evidenceRef, null)
  assert.equal(round.verdict, null)
})

test("Gap1: non-nullable field provided as null is rejected", () => {
  assert.throws(
    () =>
      buildReceipt({
        status: null,
        selectedChild: null,
        requestId: "r1",
        resultRef: null,
        evidenceRef: null,
        verdict: null,
        experienceMode: "interactive",
      }),
    /invalid-receipt:null-field:status/,
  )
})

test("Gap1: safeReceipt rejects undefined field before serializing (no silent loss)", () => {
  assert.throws(
    () =>
      safeReceipt({
        status: "done",
        selectedChild: "c1",
        requestId: undefined,
        resultRef: "m1",
        evidenceRef: "c1",
        verdict: "APPROVE",
        experienceMode: "interactive",
      }),
    /invalid-receipt:undefined-field/,
  )
})
