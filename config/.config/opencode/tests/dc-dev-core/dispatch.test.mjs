import { test } from "node:test"
import assert from "node:assert/strict"
import { dispatchToWorker, checkWrite } from "../../agents/dc-dev-core/dispatch.mjs"
import { createScopeGuard } from "../../hooks/dc-dev/scope/scope-guard.mjs"

function fakeClient({
  registered = true,
  childId = "child-1",
  lastMessageId = "msg-9",
  lastContent = "done: patched",
  promptThrows = null,
  childrenThrows = null,
} = {}) {
  let promptCalledWith = null
  return {
    _promptCalledWith: () => promptCalledWith,
    app: {
      agents: async () =>
        registered ? [{ id: "dc-dev-worker", name: "dc-dev-worker", hidden: true, mode: "subagent" }] : [],
    },
    session: {
      prompt: async (opts) => {
        promptCalledWith = opts
        if (promptThrows) throw new Error(promptThrows)
      },
      children: async () => {
        if (childrenThrows) throw new Error(childrenThrows)
        return childId ? [{ id: childId, agent: "dc-dev-worker", name: "dc-dev-worker" }] : []
      },
      messages: async () => [{ id: lastMessageId, content: lastContent }],
    },
  }
}

test("R9: dispatch calls session.prompt with subtask:true + agent, captures real child", async () => {
  const client = fakeClient({})
  const res = await dispatchToWorker({ client, sessionId: "s1", prompt: "do x" })
  assert.equal(res.status, "dispatched")
  assert.equal(res.selectedChild, "child-1")
  assert.equal(res.resultRef, "msg-9")
  assert.equal(res.resultText, "done: patched")
  assert.ok(client._promptCalledWith())
  assert.equal(client._promptCalledWith().body.subtask, true)
  assert.equal(client._promptCalledWith().body.agent, "dc-dev-worker")
})

test("R9: captured result equals child's last message, not a hardcoded stub", async () => {
  const client = fakeClient({ lastContent: "REAL-OUTPUT-123" })
  const res = await dispatchToWorker({ client, sessionId: "s1", prompt: "x" })
  assert.equal(res.resultText, "REAL-OUTPUT-123")
})

test("R11: unregistered worker -> setup-required, selectedChild null", async () => {
  const client = fakeClient({ registered: false })
  const res = await dispatchToWorker({ client, sessionId: "s1", prompt: "x" })
  assert.equal(res.status, "setup-required")
  assert.equal(res.selectedChild, null)
})

test("R11: prompt rejects -> blocked", async () => {
  const client = fakeClient({ promptThrows: "boom" })
  const res = await dispatchToWorker({ client, sessionId: "s1", prompt: "x" })
  assert.equal(res.status, "blocked")
  assert.equal(res.selectedChild, null)
})

test("R11: no child observed -> blocked", async () => {
  const client = fakeClient({ childId: null })
  const res = await dispatchToWorker({ client, sessionId: "s1", prompt: "x" })
  assert.equal(res.status, "blocked")
  assert.equal(res.selectedChild, null)
})

test("R12: scope guard rejects protected paths and allows in-scope writes", () => {
  const root = "/home/dcdebian/.config/opencode"
  const guard = createScopeGuard(root, [root + "/workspace"])
  const denied = checkWrite(guard, root + "/etc/secrets")
  assert.equal(denied.allowed, false)
  const ok = checkWrite(guard, root + "/workspace/file.txt")
  assert.equal(ok.allowed, true)
})
