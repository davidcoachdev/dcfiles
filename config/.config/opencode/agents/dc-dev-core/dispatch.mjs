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
  let agents
  try {
    agents = await client.app.agents({})
    // debug log
    try {
      const fs = await import("node:fs");
      fs.appendFileSync("/tmp/dc-dev-agents.log", JSON.stringify({ time: new Date().toISOString(), agents: agents?.slice?.(0,5)?.map(a=>({id:a?.id, name:a?.name})) || agents, total: Array.isArray(agents)?agents.length:0 }) + "\n");
    } catch {}
  } catch (e) {
    return { status: "setup-required", selectedChild: null, resultRef: null, evidenceRef: null, reason: `agents-unavailable:${e.message}` }
  }
  const registered =
    Array.isArray(agents) && agents.some((a) => a && (a.id === agent || a.name === agent))
  if (!registered) {
    try {
      const fs = await import("node:fs");
      fs.appendFileSync("/tmp/dc-dev-agents.log", `NOT FOUND ${agent} in ${JSON.stringify(agents?.map(a=>a?.id||a?.name))}\n`);
    } catch {}
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
    await client.session.prompt({ id: sessionId, body: payload })

    const children = await client.session.children({ id: sessionId })
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
