/**
 * agent-flow-tts — regression tests (simulated, no real TTS needed).
 *
 * Quirk discovered: in `bun test`, a globalThis.fetch mock installed at
 * module top-level does NOT reach `test()` bodies (separate context).
 * So each test installs its own fetch mock inside the test body.
 *
 * Run: bun test ~/.config/opencode/plugins/agent-flow-tts.test.ts
 */
import { test, expect } from "bun:test"

const PLUGIN_PATH = "/home/dcdebian/.config/opencode/plugins/agent-flow-tts.ts"

function installFetchMock(spoken: Array<{ text: string }>, beeps: Array<{ kind: string }>) {
  const originalFetch = globalThis.fetch
  // @ts-expect-error - reassigning global in test process
  globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) => {
    const u = String(url)
    if (u.includes("/speak")) {
      const body = JSON.parse(String(init?.body))
      spoken.push({ text: body.text })
      return new Response(JSON.stringify({ queue: 0, status: "playing" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }
    if (u.includes("/beep")) {
      const body = JSON.parse(String(init?.body))
      beeps.push({ kind: body.kind })
      return new Response(JSON.stringify({ ok: true, kind: body.kind }), { status: 200 })
    }
    // /health → TTS up
    return new Response("ok", { status: 200 })
  }
  return () => {
    // @ts-expect-error
    globalThis.fetch = originalFetch
  }
}

function toast(variant: string, title: string | undefined, message: string) {
  return {
    type: "tui.toast.show",
    properties: { variant, title, message },
  } as any
}

async function makePlugin(agent = "explore") {
  const { AgentFlowTTS } = await import(PLUGIN_PATH)
  const client = {
    session: {
      get: async () => ({ data: { parentID: "parent-1", agent, title: "[Explorar] x" } }),
    },
  } as any
  return AgentFlowTTS({ client })
}

// ─── Toasts ────────────────────────────────────────────────────────

test("toast error → beep error + speaks notification with title and message", async () => {
  const spoken: Array<{ text: string }> = []
  const beeps: Array<{ kind: string }> = []
  const restore = installFetchMock(spoken, beeps)
  const plugin = await makePlugin()
  await plugin.event!({ event: toast("error", "Build failed", "cannot find module x") })
  expect(spoken.length).toBe(1)
  expect(spoken[0].text).toContain("Notificación error")
  expect(spoken[0].text).toContain("Build failed")
  expect(spoken[0].text).toContain("cannot find module x")
  // beep happens BEFORE the speak, with the error tone
  expect(beeps.length).toBe(1)
  expect(beeps[0].kind).toBe("error")
  restore()
})

test("toast warning → beep alert + speaks; toast info → silent (no beep)", async () => {
  const spoken: Array<{ text: string }> = []
  const beeps: Array<{ kind: string }> = []
  const restore = installFetchMock(spoken, beeps)
  const plugin = await makePlugin()
  await plugin.event!({ event: toast("warning", undefined, "low disk space") })
  expect(spoken.length).toBe(1)
  expect(spoken[0].text).toContain("Notificación warning")
  expect(spoken[0].text).toContain("low disk space")
  expect(beeps.length).toBe(1)
  expect(beeps[0].kind).toBe("alert")

  spoken.length = 0
  beeps.length = 0
  await plugin.event!({ event: toast("info", "FYI", "all good") })
  expect(spoken.length).toBe(0)
  expect(beeps.length).toBe(0)
  restore()
})

test("toast debounce: two errors within 2s → one speak + one beep", async () => {
  const spoken: Array<{ text: string }> = []
  const beeps: Array<{ kind: string }> = []
  const restore = installFetchMock(spoken, beeps)
  const plugin = await makePlugin()
  await plugin.event!({ event: toast("error", "E1", "boom 1") })
  await plugin.event!({ event: toast("error", "E2", "boom 2") })
  expect(spoken.length).toBe(1)
  expect(beeps.length).toBe(1)
  restore()
})

// ─── Permissions (confirmations) ───────────────────────────────────

test("permission.updated → beep alert + speaks 'Confirmación:' with title", async () => {
  const spoken: Array<{ text: string }> = []
  const beeps: Array<{ kind: string }> = []
  const restore = installFetchMock(spoken, beeps)
  const plugin = await makePlugin()
  await plugin.event!({
    event: {
      type: "permission.updated",
      properties: { id: "p1", title: "Run this command: git push", sessionID: "s1", messageID: "m1" },
    },
  })
  expect(beeps.length).toBe(1)
  expect(beeps[0].kind).toBe("alert")
  expect(spoken.length).toBe(1)
  expect(spoken[0].text).toContain("Confirmación")
  expect(spoken[0].text).toContain("Run this command: git push")
  restore()
})

test("permission.updated without title → falls back to 'acción pendiente'", async () => {
  const spoken: Array<{ text: string }> = []
  const beeps: Array<{ kind: string }> = []
  const restore = installFetchMock(spoken, beeps)
  const plugin = await makePlugin()
  await plugin.event!({ event: { type: "permission.updated", properties: { id: "p2" } } })
  expect(spoken.length).toBe(1)
  expect(spoken[0].text).toContain("acción pendiente")
  restore()
})

test("permission debounce: two updates within 2s → one beep + one speak", async () => {
  const spoken: Array<{ text: string }> = []
  const beeps: Array<{ kind: string }> = []
  const restore = installFetchMock(spoken, beeps)
  const plugin = await makePlugin()
  await plugin.event!({ event: { type: "permission.updated", properties: { id: "p1", title: "A" } } })
  await plugin.event!({ event: { type: "permission.updated", properties: { id: "p2", title: "B" } } })
  expect(spoken.length).toBe(1)
  expect(beeps.length).toBe(1)
  restore()
})

// ─── Sessions ──────────────────────────────────────────────────────

test("subagent session.status complete → speaks phase completion (no beep)", async () => {
  const spoken: Array<{ text: string }> = []
  const beeps: Array<{ kind: string }> = []
  const restore = installFetchMock(spoken, beeps)
  const plugin = await makePlugin()

  // First sight: registers session (parent check), silent
  await plugin.event!({
    event: {
      type: "session.status",
      properties: { info: { sessionID: "s1" }, status: { type: "running" } },
    },
  })
  expect(spoken.length).toBe(0)

  await plugin.event!({
    event: {
      type: "session.status",
      properties: { info: { sessionID: "s1" }, status: { type: "complete" } },
    },
  })
  expect(spoken.length).toBe(1)
  expect(spoken[0].text).toContain("completó")
  expect(spoken[0].text).toContain("Explorar")
  expect(beeps.length).toBe(0)
  restore()
})

test("root session (no parentID) is never narrated", async () => {
  const spoken: Array<{ text: string }> = []
  const beeps: Array<{ kind: string }> = []
  const restore = installFetchMock(spoken, beeps)
  const { AgentFlowTTS } = await import(PLUGIN_PATH)
  const client = {
    session: {
      get: async () => ({ data: { parentID: null, agent: "primary", title: "Main" } }),
    },
  } as any
  const plugin = await AgentFlowTTS({ client })

  await plugin.event!({
    event: {
      type: "session.status",
      properties: { info: { sessionID: "root1" }, status: { type: "complete" } },
    },
  })
  expect(spoken.length).toBe(0)
  expect(beeps.length).toBe(0)
  restore()
})
