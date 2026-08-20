import { createScopeGuard } from "../../hooks/dc-dev/scope/scope-guard.mjs"

// R12: scope confinement seam. The real child's writes are bounded by scope-guard;
// protected paths (secrets, other agents' dirs, global config) are rejected.
export function makeScopeGuard(root, allowedPaths) {
  return createScopeGuard(root, allowedPaths)
}

export function checkWrite(scopeGuard, candidatePath) {
  return scopeGuard.check(candidatePath)
}

// R9 + R11: real SDK dispatch with fail-closed semantics.
// `client` MUST provide: app.agents(), session.prompt(), session.children(), session.messages().
// Any missing child / unregistered agent / prompt rejection -> blocked / setup-required.
export async function dispatchToWorker({
  client,
  sessionId,
  prompt,
  agent = "dc-dev-worker",
  subtask = true,
  body,
} = {}) {
  // debug client keys
  try {
    const fs = await import("node:fs");
    const sess = client?.session;
    const app = client?.app;
    fs.appendFileSync("/tmp/dc-dev-agents.log", JSON.stringify({ time: new Date().toISOString(), clientKeys: Object.keys(client||{}), sessionKeys: Object.keys(sess||{}), appKeys: Object.keys(app||{}), sessClientKeys: Object.keys(sess?._client||{}), appClientKeys: Object.keys(app?._client||{}), hasPrompt: typeof sess?.prompt, hasChildren: typeof sess?.children, hasAppAgents: typeof app?.agents }) + "\n");
  } catch {}
  let agents
  try {
    agents = await client.app.agents({})
  } catch (e) {
    return { status: "setup-required", selectedChild: null, resultRef: null, evidenceRef: null, reason: `agents-unavailable:${e.message}` }
  }
  const agentList = Array.isArray(agents) ? agents : agents?.data || []
  const registered =
    Array.isArray(agentList) && agentList.some((a) => a && (a.id === agent || a.name === agent))
  if (!registered) {
    return { status: "setup-required", selectedChild: null, resultRef: null, evidenceRef: null, reason: "worker-unregistered" }
  }

  try {
    const payload =
      body ||
      {
        prompt,
        agent,
        subtask,
        part: { type: "subtask", prompt, agent, description: "dc-dev-core dispatch" },
      }
    try {
      const fs = await import("node:fs");
      fs.appendFileSync("/tmp/dc-dev-agents.log", JSON.stringify({ time: new Date().toISOString(), step: "before-prompt", sessionId, agent, payload: JSON.stringify(payload).slice(0,500) }) + "\n");
    } catch {}
    await client.session.prompt({ id: sessionId, body: payload })
    try {
      const fs = await import("node:fs");
      fs.appendFileSync("/tmp/dc-dev-agents.log", JSON.stringify({ time: new Date().toISOString(), step: "after-prompt" }) + "\n");
    } catch {}

    try {
      const fs = await import("node:fs");
      fs.appendFileSync("/tmp/dc-dev-agents.log", JSON.stringify({ time: new Date().toISOString(), step: "before-children", sessionId }) + "\n");
    } catch {}
    const children = await client.session.children({ id: sessionId })
    try {
      const fs = await import("node:fs");
      fs.appendFileSync("/tmp/dc-dev-agents.log", JSON.stringify({ time: new Date().toISOString(), step: "after-children", children: JSON.stringify(children).slice(0,2000) }) + "\n");
    } catch {}
    const list = Array.isArray(children) ? children : children && children.children ? children.children : []
    const child = list.find((c) => c && (c.agent === agent || c.name === agent))
    if (!child || !child.id) {
      return { status: "blocked", selectedChild: null, resultRef: null, evidenceRef: null, reason: "no-child-observed" }
    }

    const messages = await client.session.messages({ id: child.id })
    const msgList = Array.isArray(messages) ? messages : messages && messages.messages ? messages.messages : []
    const last = msgList[msgList.length - 1]
    return {
      status: "dispatched",
      selectedChild: child.id,
      resultRef: last ? last.id : null,
      resultText: last ? last.content || last.text || "" : "",
      evidenceRef: child.id,
    }
  } catch (e) {
    return { status: "blocked", selectedChild: null, resultRef: null, evidenceRef: null, reason: `prompt-failed:${e.message}` }
  }
}
