import assert from "node:assert/strict"
import { mkdtempSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { tmpdir } from "node:os"
import { test } from "node:test"
import {
  createDispatchTool,
  dispatchToRegisteredChild,
  validateDispatchRequest,
} from "./dc-dev-superflow-dispatch.mjs"

const request = {
  target: "dc-dev-superflow-security",
  prompt: "Read-only dispatch probe. Return the requested identity and result contract fields.",
  model: { providerID: "opencode-go", modelID: "glm-5.3" },
  capability: "read-only",
  writeScope: "context/dc-dev-superflow/impl",
}

test("dispatch request requires an owned child, explicit model, capability, and write scope", () => {
  assert.equal(validateDispatchRequest(request, { parentAgent: "dc-dev-superflow-coordinator" }).status, "admitted")
  assert.equal(validateDispatchRequest(request, { parentAgent: "dc-dev" }).status, "admitted")
  assert.equal(validateDispatchRequest({ ...request, target: "cavekit-check" }, {}).status, "blocked")
  assert.equal(validateDispatchRequest({ ...request, model: undefined }, {}).status, "setup-required")
})

test("dispatch uses the OpenCode subtask part and returns requested/selected identities", async () => {
  const calls = []
  const client = {
    app: { agents: async () => ({ data: [{ name: request.target, mode: "subagent" }] }) },
    session: {
      prompt: async (options) => {
        calls.push(options)
        return { data: { info: { id: "assistant-1" }, parts: [] } }
      },
      children: async () => ({ data: [{ id: "child-1", parentID: "parent-1" }] }),
      messages: async () => ({ data: [{ info: { role: "user", agent: request.target }, parts: [] }] }),
    },
  }
  const result = await dispatchToRegisteredChild({ client, directory: "/tmp/project" }, {
    ...request,
    parentSessionID: "parent-1",
    parentAgent: "dc-dev-superflow-coordinator",
  })

  assert.equal(result.status, "dispatched")
  assert.equal(result.requestedChild, request.target)
  assert.equal(result.selectedChild, request.target)
  assert.equal(result.model, "opencode-go/glm-5.3")
  assert.deepEqual(calls[0].body.parts[0], {
    type: "subtask",
    agent: request.target,
    description: "Dc-Dev superflow dispatch probe",
    prompt: request.prompt,
  })
})

test("dispatch resolves the registered child model from OpenCode agent configuration", async () => {
  const calls = []
  const client = {
    app: { agents: async () => ({ data: [{ name: request.target, mode: "subagent", model: { providerID: "opencode-go", modelID: "glm-5.3" } }] }) },
    session: {
      prompt: async (options) => {
        calls.push(options)
        return { data: { info: { id: "assistant-1" }, parts: [] } }
      },
      children: async () => ({ data: [{ id: "child-1", parentID: "parent-1" }] }),
      messages: async () => ({ data: [{ info: { role: "user", agent: request.target }, parts: [] }] }),
    },
  }

  const result = await dispatchToRegisteredChild({ client, directory: "/tmp/project" }, {
    ...request,
    model: undefined,
    parentSessionID: "parent-1",
    parentAgent: "dc-dev-superflow-coordinator",
  })

  assert.equal(result.status, "dispatched")
  assert.equal(result.model, "opencode-go/glm-5.3")
  assert.deepEqual(calls[0].body.model, { providerID: "opencode-go", modelID: "glm-5.3" })
})

test("dispatch remains setup-required when the registered child has no model", async () => {
  let promptCalled = false
  const target = "dc-dev-superflow-unconfigured"
  const client = {
    app: { agents: async () => ({ data: [{ name: target, mode: "subagent" }] }) },
    session: {
      prompt: async () => {
        promptCalled = true
        return { data: { info: { id: "assistant-1" }, parts: [] } }
      },
      children: async () => ({ data: [] }),
      messages: async () => ({ data: [] }),
    },
  }

  const result = await dispatchToRegisteredChild({ client, directory: "/tmp/project" }, {
    ...request,
    target,
    model: undefined,
    parentSessionID: "parent-1",
    parentAgent: "dc-dev-superflow-coordinator",
  })

  assert.equal(result.status, "setup-required")
  assert.equal(result.reason, "model-not-selected")
  assert.equal(result.requestedChild, target)
  assert.equal(result.selectedChild, null)
  assert.equal(result.model, null)
  assert.equal(result.readOnly, true)
  assert.equal(promptCalled, false)
})

test("dispatch writes a verifiable receipt with identity, model, and write scope", async () => {
  const root = mkdtempSync(join(tmpdir(), "dc-dev-dispatch-"))
  const client = {
    app: { agents: async () => ({ data: [{ name: request.target, mode: "subagent" }] }) },
    session: {
      prompt: async () => ({ data: { info: { id: "assistant-1" }, parts: [] } }),
      children: async () => ({ data: [{ id: "child-1", parentID: "parent-1" }] }),
      messages: async () => ({ data: [{ info: { role: "user", agent: request.target }, parts: [] }] }),
    },
  }
  const result = await dispatchToRegisteredChild({ client, directory: root, receiptPath: join(root, "receipt.jsonl") }, {
    ...request,
    parentSessionID: "parent-1",
    parentAgent: "dc-dev-superflow-coordinator",
  })
  const receipt = JSON.parse(readFileSync(result.receiptPath, "utf8"))
  assert.equal(receipt.requestedChild, request.target)
  assert.equal(receipt.selectedChild, request.target)
  assert.equal(receipt.model, "opencode-go/glm-5.3")
  assert.equal(receipt.reason, null)
  assert.equal(receipt.readOnly, true)
  assert.equal(receipt.writeScope, request.writeScope)
})

test("plugin tool exposes setup-required instead of falling back when the subtask API is absent", async () => {
  const tool = createDispatchTool({ client: {}, directory: "/tmp/project" })
  const result = await tool.execute(request, {
    sessionID: "parent-1",
    agent: "dc-dev-superflow-coordinator",
  })
  assert.equal(result.metadata.status, "setup-required")
  assert.match(result.output, /session\.prompt|subtask/i)
})

test("registration enables the adapter while keeping parent routing default-deny", () => {
  const config = JSON.parse(readFileSync(new URL("../opencode.json", import.meta.url), "utf8"))
  assert.ok(config.plugin.includes("/home/dcdebian/.config/opencode/plugins/dc-dev-superflow-dispatch.mjs"))
  assert.equal(config.agent["dc-dev"].permission.task["*"], "deny")
  assert.equal(config.agent["dc-dev"].permission.task["dc-dev-superflow-*"], "allow")
  assert.equal(config.agent["dc-dev"].tools.dc_dev_superflow_dispatch, true)
  assert.equal(config.agent["dc-dev-superflow-coordinator"].tools.dc_dev_superflow_dispatch, true)
})
