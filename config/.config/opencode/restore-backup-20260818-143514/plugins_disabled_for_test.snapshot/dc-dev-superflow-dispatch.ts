import { appendFileSync, mkdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { tool } from "@opencode-ai/plugin"

const OWNED_CHILD = /^dc-dev-superflow-[a-z0-9-]+$/
const FORBIDDEN_CHILD = /^(?:kiroExplore|cavekit-|gentle-|sdd-|external-agent)/
const DEFAULT_RECEIPT = "context/dc-dev-superflow/impl/dispatch-receipts.jsonl"
const SAFE_CHILD_MODELS = Object.freeze({
  "dc-dev-superflow-coordinator": { providerID: "opencode-go", modelID: "gpt-5.6-luna" },
  "dc-dev-superflow-research": { providerID: "opencode-go", modelID: "gpt-5.6-luna" },
  "dc-dev-superflow-planner": { providerID: "opencode-go", modelID: "gpt-5.6-luna" },
  "dc-dev-superflow-security": { providerID: "opencode-go", modelID: "glm-5.3" },
  "dc-dev-superflow-reviewer": { providerID: "opencode-go", modelID: "glm-5.3" },
  "dc-dev-superflow-evaluator": { providerID: "opencode-go", modelID: "glm-5.3" },
  "dc-dev-superflow-recovery": { providerID: "opencode-go", modelID: "gpt-5.6-luna" },
})

export function validateDispatchRequest(request, context = {}) {
  if (!request?.target || FORBIDDEN_CHILD.test(request.target) || !OWNED_CHILD.test(request.target)) {
    return { status: "blocked", reason: "child-not-owned", target: request?.target }
  }
  if (context.parentAgent && context.parentAgent !== "dc-dev" && !context.parentAgent.startsWith("dc-dev-superflow-")) {
    return { status: "blocked", reason: "parent-not-owned", parentAgent: context.parentAgent }
  }
  if (!context.allowModelResolution && (!request.model?.providerID || !request.model?.modelID)) {
    return { status: "setup-required", reason: "model-not-selected" }
  }
  if (!request.capability) return { status: "setup-required", reason: "capability-not-admitted" }
  if (!request.writeScope) return { status: "setup-required", reason: "write-scope-not-declared" }
  return { status: "admitted", target: request.target }
}

function result(status, reason, extra = {}) {
  return { status, reason: reason ?? null, ...extra }
}

function unwrap(response) {
  return response?.data ?? response
}

async function listRegisteredChildren(client, directory) {
  const response = await client.app.agents({ query: { directory } })
  const agents = unwrap(response)
  return Array.isArray(agents) ? agents : []
}

function parseModel(model) {
  if (model?.providerID && model?.modelID) return { providerID: model.providerID, modelID: model.modelID }
  if (typeof model !== "string") return undefined
  const separator = model.indexOf("/")
  if (separator <= 0 || separator === model.length - 1) return undefined
  return { providerID: model.slice(0, separator), modelID: model.slice(separator + 1) }
}

export function resolveChildModel(target, registration, requestedModel) {
  return parseModel(requestedModel) ?? parseModel(registration?.model) ?? SAFE_CHILD_MODELS[target]
}

async function selectedChildIdentity(client, parentSessionID, childSessions) {
  for (const child of childSessions) {
    const response = await client.session.messages({ path: { id: child.id } })
    const messages = unwrap(response)
    const identity = messages?.find((entry) => entry?.info?.role === "user")?.info?.agent
    if (identity) return { childSessionID: child.id, selectedChild: identity }
  }
  return { childSessionID: undefined, selectedChild: undefined }
}

function receiptPath(directory, explicit) {
  return explicit ?? join(directory, DEFAULT_RECEIPT)
}

function writeReceipt(path, receipt) {
  mkdirSync(dirname(path), { recursive: true })
  appendFileSync(path, `${JSON.stringify(receipt)}\n`, "utf8")
}

export async function dispatchToRegisteredChild({ client, directory, receiptPath: explicitReceiptPath }, request) {
  const startedAt = new Date().toISOString()
  const path = receiptPath(directory, explicitReceiptPath)
  const base = {
    requestedChild: request?.target,
    selectedChild: null,
    parentAgent: request?.parentAgent,
    parentSessionID: request?.parentSessionID,
    model: request?.model?.providerID && request?.model?.modelID
      ? `${request.model.providerID}/${request.model.modelID}`
      : null,
    capability: request?.capability,
    readOnly: request?.noSideEffect === true || request?.capability === "read-only",
    writeScope: request?.writeScope,
    api: "session.prompt/subtask",
    startedAt,
    receiptPath: path,
  }

  const admission = validateDispatchRequest(request, { parentAgent: request?.parentAgent, allowModelResolution: true })
  if (admission.status !== "admitted") {
    const failed = { ...base, ...admission, completedAt: new Date().toISOString() }
    writeReceipt(path, failed)
    return { ...failed, receiptPath: path }
  }
  if (!request.parentSessionID) {
    const failed = { ...base, ...result("setup-required", "parent-session-not-available"), completedAt: new Date().toISOString() }
    writeReceipt(path, failed)
    return { ...failed, receiptPath: path }
  }
  if (!client?.app?.agents || !client?.session?.prompt || !client?.session?.children || !client?.session?.messages) {
    const failed = { ...base, ...result("setup-required", "opencode-subtask-api-unavailable"), completedAt: new Date().toISOString() }
    writeReceipt(path, failed)
    return { ...failed, receiptPath: path }
  }

  try {
    const registered = await listRegisteredChildren(client, directory)
    const registration = registered.find((agent) => agent?.name === request.target || agent?.id === request.target)
    if (!registration || registration.mode !== "subagent") {
      const failed = { ...base, ...result("setup-required", "requested-child-not-registered"), completedAt: new Date().toISOString() }
      writeReceipt(path, failed)
      return { ...failed, receiptPath: path }
    }

    const resolvedModel = resolveChildModel(request.target, registration, request.model)
    if (!resolvedModel) {
      const failed = { ...base, ...result("setup-required", "model-not-selected"), completedAt: new Date().toISOString() }
      writeReceipt(path, failed)
      return { ...failed, receiptPath: path }
    }

    const promptBody = {
      agent: request.parentAgent,
      model: resolvedModel,
      parts: [{
        type: "subtask",
        agent: request.target,
        description: "Dc-Dev superflow dispatch probe",
        prompt: request.prompt,
      }],
      ...(request.noSideEffect ? { tools: {} } : {}),
    }
    await client.session.prompt({ path: { id: request.parentSessionID }, query: { directory }, body: promptBody })
    const children = unwrap(await client.session.children({ path: { id: request.parentSessionID }, query: { directory } }))
    const selected = await selectedChildIdentity(client, request.parentSessionID, Array.isArray(children) ? children : [])
    const status = selected.selectedChild === request.target ? "dispatched" : "setup-required"
    const reason = status === "dispatched" ? undefined : "selected-child-identity-unproven"
    const complete = {
      ...base,
      model: `${resolvedModel.providerID}/${resolvedModel.modelID}`,
      ...selected,
      ...result(status, reason),
      completedAt: new Date().toISOString(),
    }
    writeReceipt(path, complete)
    return { ...complete, receiptPath: path }
  } catch (error) {
    const failed = {
      ...base,
      ...result("setup-required", "subtask-dispatch-failed", { error: error instanceof Error ? error.message : String(error) }),
      completedAt: new Date().toISOString(),
    }
    writeReceipt(path, failed)
    return { ...failed, receiptPath: path }
  }
}

export function createNoSideEffectProbe(target = "dc-dev-superflow-security") {
  return {
    target,
    prompt: "Read-only dispatch probe. Return the requested identity and result contract fields. Do not call tools or write files.",
    capability: "read-only",
    writeScope: "context/dc-dev-superflow/impl",
    noSideEffect: true,
  }
}

export function createDispatchTool({ client, directory }) {
  return tool({
    description: "Dispatch a Dc-Dev superflow subtask through OpenCode's session.prompt subtask API. Requires an explicit registered dc-dev-superflow-* child, model, capability, and write scope. Never falls back to shell, CLI, Kiro, Cavekit, Gentle, SDD, or external agents.",
    args: {
      target: tool.schema.string(),
      prompt: tool.schema.string(),
      providerID: tool.schema.string().optional(),
      modelID: tool.schema.string().optional(),
      capability: tool.schema.string(),
      writeScope: tool.schema.string(),
      probe: tool.schema.boolean().optional(),
    },
    async execute(args, context) {
      const request = args.probe
        ? { ...createNoSideEffectProbe(args.target), parentSessionID: context.sessionID, parentAgent: context.agent, model: { providerID: args.providerID, modelID: args.modelID } }
        : { ...args, parentSessionID: context.sessionID, parentAgent: context.agent, model: { providerID: args.providerID, modelID: args.modelID } }
      const dispatch = await dispatchToRegisteredChild({ client, directory }, request)
      return {
        title: `Dc-Dev dispatch ${dispatch.status}`,
        output: JSON.stringify(dispatch),
        metadata: dispatch,
      }
    },
  })
}

export default async function dcDevSuperflowDispatch({ client, directory }) {
  return { tool: { dc_dev_superflow_dispatch: createDispatchTool({ client, directory }) } }
}
