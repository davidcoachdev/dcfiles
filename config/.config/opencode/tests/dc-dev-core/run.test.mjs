import { test } from "node:test"
import assert from "node:assert/strict"
import { runDcDevCore } from "../../agents/dc-dev-core/run.mjs"

function fakeClient({ unregistered = false, noChild = false, promptThrows = null } = {}) {
  return {
    app: {
      agents: async () =>
        unregistered ? [] : [{ id: "dc-dev-worker", name: "dc-dev-worker", hidden: true, mode: "subagent" }],
    },
    session: {
      prompt: async () => {
        if (promptThrows) throw new Error(promptThrows)
      },
      children: async () => (noChild ? [] : [{ id: "child-1", agent: "dc-dev-worker", name: "dc-dev-worker" }]),
      messages: async () => [{ id: "msg-1", content: "worker output" }],
    },
  }
}

function fakeHitl({ approve = true, answer = "fix the button color" } = {}) {
  const prompts = []
  const approvals = []
  return {
    prompts,
    approvals,
    askOne: () => ({ answered: true, text: answer }),
    requestApproval: (gate) => {
      const dec = { gate, approved: approve }
      approvals.push(dec)
      return dec
    },
  }
}

// R19 precondition + R5 resolve + R6 interactive gate + R9 dispatch + R14 receipt
test("vertical: interactive flow prompts at admission, dispatches, writes done receipt", async () => {
  const client = fakeClient()
  const hitl = fakeHitl()
  const lines = []
  const receiptWriter = { writeLine: (s) => lines.push(s) }
  const out = await runDcDevCore({
    request: { text: "fix the button label typo" },
    client,
    sessionId: "s1",
    modeInput: "interactive",
    receiptWriter,
    hitl,
    requestId: "r1",
  })
  assert.equal(out.status, "done")
  assert.equal(out.mode, "interactive")
  assert.equal(out.triage.tier, "green")
  assert.equal(hitl.approvals.length, 1) // admission gate prompted
  assert.equal(hitl.approvals[0].gate, "dispatch-admission")
  assert.equal(lines.length, 1)
  const receipt = JSON.parse(lines[0])
  assert.equal(receipt.status, "done")
  assert.equal(receipt.experienceMode, "interactive")
  assert.equal(receipt.selectedChild, "child-1")
  assert.equal(receipt.resultRef, "msg-1")
})

test("vertical: minimal flow does NOT prompt at admission for routine dispatch", async () => {
  const client = fakeClient()
  const hitl = fakeHitl()
  const lines = []
  const out = await runDcDevCore({
    request: { text: "fix the typo" },
    client,
    sessionId: "s1",
    modeInput: "minimal",
    receiptWriter: { writeLine: (s) => lines.push(s) },
    hitl,
    requestId: "r2",
  })
  assert.equal(out.status, "done")
  assert.equal(out.mode, "minimal")
  assert.equal(hitl.approvals.length, 0) // minimal: no prompt at admission
  assert.equal(lines.length, 1)
})

test("vertical: automatic without approved scope is downgraded to setup-required", async () => {
  const client = fakeClient()
  const hitl = fakeHitl()
  const lines = []
  const out = await runDcDevCore({
    request: { text: "fix the typo" },
    client,
    sessionId: "s1",
    modeInput: "automatic", // no approvedScope
    receiptWriter: { writeLine: (s) => lines.push(s) },
    hitl,
    requestId: "r3",
  })
  assert.equal(out.status, "setup-required")
  assert.equal(out.mode, "setup-required")
})

test("vertical: R11 fail-closed — unregistered worker yields setup-required receipt", async () => {
  const client = fakeClient({ unregistered: true })
  const hitl = fakeHitl()
  const lines = []
  const out = await runDcDevCore({
    request: { text: "fix the typo" },
    client,
    sessionId: "s1",
    modeInput: "interactive",
    receiptWriter: { writeLine: (s) => lines.push(s) },
    hitl,
    requestId: "r4",
  })
  assert.equal(out.status, "setup-required")
  assert.equal(JSON.parse(lines[0]).selectedChild, null)
})

test("vertical: R25 ambiguous triage asks one question, then proceeds after answer", async () => {
  const client = fakeClient()
  const hitl = fakeHitl({ answer: "fix the button color" })
  const lines = []
  const out = await runDcDevCore({
    request: { text: "" }, // ambiguous
    client,
    sessionId: "s1",
    modeInput: "interactive",
    receiptWriter: { writeLine: (s) => lines.push(s) },
    hitl,
    requestId: "r5",
  })
  assert.equal(out.triage.needsQuestion, true)
  assert.equal(hitl.prompts.length, 1)
  assert.equal(out.status, "done") // re-classified to green -> dispatched
})

// --- Gap 2: automatic without approved-scope must HALT before prompt AND SDK ---

test("vertical: automatic without approved scope -> setup-required, no admission prompt, no receipt, no SDK call", async () => {
  const client = fakeClient()
  let promptCalled = false
  client.session.prompt = async () => {
    promptCalled = true
  }
  const hitl = fakeHitl()
  const lines = []
  const out = await runDcDevCore({
    request: { text: "fix the typo" },
    client,
    sessionId: "s1",
    modeInput: "automatic", // no approvedScope
    receiptWriter: { writeLine: (s) => lines.push(s) },
    hitl,
    requestId: "r6",
  })
  assert.equal(out.status, "setup-required")
  assert.equal(out.mode, "setup-required")
  assert.equal(hitl.approvals.length, 0) // no continuation prompt
  assert.equal(lines.length, 0) // no receipt written
  assert.equal(promptCalled, false) // no SDK dispatch
})

// --- Gap 3: ambiguous without human answer -> halt, exactly one question, no dispatch ---

test("vertical: R25 ambiguous with NO human answer halts (setup-required), exactly one question, needsQuestion preserved, no dispatch", async () => {
  const client = fakeClient()
  let promptCalled = false
  client.session.prompt = async () => {
    promptCalled = true
  }
  const lines = []
  const prompts = []
  const hitl = {
    prompts,
    approvals: [],
    askOne: () => ({ answered: false, text: "" }), // human has not answered
    requestApproval: () => ({ gate: "dispatch-admission", approved: true }),
  }
  const out = await runDcDevCore({
    request: { text: "" }, // ambiguous
    client,
    sessionId: "s1",
    modeInput: "interactive",
    receiptWriter: { writeLine: (s) => lines.push(s) },
    hitl,
    requestId: "r7",
  })
  assert.equal(out.status, "setup-required")
  assert.equal(out.triage.needsQuestion, true) // preserved from original triage
  assert.equal(out.needsQuestion, true)
  assert.equal(prompts.length, 1) // exactly one question asked
  assert.equal(lines.length, 0) // no receipt
  assert.equal(promptCalled, false) // no SDK dispatch (halts until answer)
})
