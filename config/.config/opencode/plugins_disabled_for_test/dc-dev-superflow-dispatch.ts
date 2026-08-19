import { appendFileSync, mkdirSync } from "node:fs"
import { dirname, resolve, sep } from "node:path"
import { tmpdir } from "node:os"
import { tool } from "@opencode-ai/plugin"

// OpenCode plugin contract (v1.18.x):
//   Plugin = async ({ project, client, $, directory, worktree }) => Hooks
// Hard rules enforced in this file:
//   1. Initialization is PURE. The factory and createDispatchTool() must never
//      touch the SDK client, the shell, or the filesystem.
//   2. Every SDK call (client.app.agents, client.session.prompt/children/messages)
//      happens ONLY inside tool.execute(), never at register/validate time.
//   3. execute() never throws: it always resolves to a structured result.

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

// ---------------------------------------------------------------------------
// Pure admission logic (no SDK, no fs, safe to call during validation)
// ---------------------------------------------------------------------------

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

export function createNoSideEffectProbe(target = "dc-dev-superflow-security") {
  return {
    target,
    prompt: "Read-only dispatch probe. Return the requested identity and result contract fields. Do not call tools or write files.",
    capability: "read-only",
    writeScope: "context/dc-dev-superflow/impl",
    noSideEffect: true,
  }
}

// ---------------------------------------------------------------------------
// Receipt IO — must never throw and never escape the project directory
// ---------------------------------------------------------------------------

function resolveReceiptPath(directory, explicit) {
  const root = typeof directory === "string" && directory.length
    ? resolve(directory)
    : resolve(tmpdir(), "dc-dev-superflow")
  const fallback = resolve(root, DEFAULT_RECEIPT)
  if (typeof explicit !== "string" || !explicit.length) return fallback
  const candidate = resolve(explicit)
  // Containment guard: an explicit receipt path may never write outside root.
  return candidate === root || candidate.startsWith(root + sep) ? candidate : fallback
}

function writeReceipt(path, receipt) {
  try {
    mkdirSync(dirname(path), { recursive: true })
    appendFileSync(path, `${JSON.stringify(receipt)}\n`, "utf8")
    return true
  } catch {
    return false // receipt IO failure must never break dispatch
  }
}

// ---------------------------------------------------------------------------
// Dispatch — all SDK access lives here, reached only from execute()
// ---------------------------------------------------------------------------

export async function dispatchToRegisteredChild({ client, directory, receiptPath: explicitReceiptPath }, request) {
  const startedAt = new Date().toISOString()
  const path = resolveReceiptPath(directory, explicitReceiptPath)
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

  // Single exit point: record the outcome, never throw on receipt failure.
  const finish = (patch) => {
    const record = { ...base, ...patch, completedAt: new Date().toISOString() }
    const persisted = writeReceipt(path, record)
    return { ...record, receiptPath: path, receiptPersisted: persisted }
  }

  try {
    const admission = validateDispatchRequest(request, {
      parentAgent: request?.parentAgent,
      allowModelResolution: true,
    })
    if (admission.status !== "admitted") return finish(admission)

    if (!request?.parentSessionID) {
      return finish(result("setup-required", "parent-session-not-available"))
    }

    // Client capability guard — checked BEFORE any SDK property is invoked.
    if (!client?.app?.agents || !client?.session?.prompt || !client?.session?.children || !client?.session?.messages) {
      return finish(result("setup-required", "opencode-subtask-api-unavailable"))
    }

    const registered = unwrap(await client.app.agents({ query: { directory } }))
    const agents = Array.isArray(registered) ? registered : []
    const registration = agents.find((agent) => agent?.name === request.target || agent?.id === request.target)
    if (!registration || registration.mode !== "subagent") {
      return finish(result("setup-required", "requested-child-not-registered"))
    }

    const resolvedModel = resolveChildModel(request.target, registration, request.model)
    if (!resolvedModel) return finish(result("setup-required", "model-not-selected"))

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
    const selected = await selectedChildIdentity(client, Array.isArray(children) ? children : [])
    const dispatched = selected.selectedChild === request.target

    return finish({
      model: `${resolvedModel.providerID}/${resolvedModel.modelID}`,
      ...selected,
      ...result(dispatched ? "dispatched" : "setup-required", dispatched ? undefined : "selected-child-identity-unproven"),
    })
  } catch (error) {
    return finish(result("setup-required", "subtask-dispatch-failed", {
      error: error instanceof Error ? error.message : String(error),
    }))
  }
}

async function selectedChildIdentity(client, childSessions) {
  for (const child of childSessions) {
    if (!child?.id) continue
    try {
      const messages = unwrap(await client.session.messages({ path: { id: child.id } }))
      const identity = Array.isArray(messages)
        ? messages.find((entry) => entry?.info?.role === "user")?.info?.agent
        : undefined
      if (identity) return { childSessionID: child.id, selectedChild: identity }
    } catch {
      continue // one unreadable child session must not abort identity probing
    }
  }
  return { childSessionID: undefined, selectedChild: undefined }
}

// ---------------------------------------------------------------------------
// Tool registration — pure: builds a descriptor, touches nothing
// ---------------------------------------------------------------------------

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
      try {
        const model = args?.providerID && args?.modelID
          ? { providerID: args.providerID, modelID: args.modelID }
          : args?.model
        const identity = {
          parentSessionID: context?.sessionID,
          parentAgent: context?.agent,
          model,
        }
        const request = args?.probe
          ? { ...createNoSideEffectProbe(args.target), ...identity }
          : { ...args, ...identity }

        const dispatch = await dispatchToRegisteredChild({ client, directory }, request)
        return {
          title: `Dc-Dev dispatch ${dispatch.status}`,
          output: JSON.stringify(dispatch),
          metadata: dispatch,
        }
      } catch (error) {
        // Last-resort guard: execute() must always resolve to a usable result.
        const failed = result("setup-required", "dispatch-tool-failed", {
          error: error instanceof Error ? error.message : String(error),
        })
        return {
          title: "Dc-Dev dispatch setup-required",
          output: JSON.stringify(failed),
          metadata: failed,
        }
      }
    },
  })
}

export default async function dcDevSuperflowDispatch({ client, directory }) {
  // Pure: no SDK, no shell, no fs. Only descriptor construction.
  return { tool: { dc_dev_superflow_dispatch: createDispatchTool({ client, directory }) } }
}
