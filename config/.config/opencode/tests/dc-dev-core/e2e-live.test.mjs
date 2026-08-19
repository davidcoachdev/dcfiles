import { test } from "node:test"
import assert from "node:assert/strict"
import { writeFileSync, existsSync, rmSync } from "node:fs"
import { join } from "node:path"
import { dispatchToWorker } from "../../agents/dc-dev-core/dispatch.mjs"

const MARKER = new URL("./.e2e-skipped", import.meta.url).pathname

test("R15: end-to-end live dispatch against real dc-dev-worker (GATED / fail-closed)", async (t) => {
  if (process.env.DC_DEV_LIVE !== "1") {
    // Fail-closed: live runtime not available in this environment -> setup-required.
    // We do NOT invent success. The marker documents the gate for the verification test.
    writeFileSync(
      MARKER,
      JSON.stringify({ status: "setup-required", reason: "live-runtime-not-available-in-ci" }),
    )
    t.skip("live dispatch gated; requires DC_DEV_LIVE=1 + running OpenCode runtime + registered dc-dev-worker")
    return
  }
  // LIVE path (only executes when explicitly enabled by a human in a real runtime):
  const { createOpencodeClient } = await import("@opencode-ai/sdk")
  const client = createOpencodeClient({ directory: process.env.DC_DEV_DIR || undefined })
  const sessionId = process.env.DC_DEV_SESSION_ID
  const res = await dispatchToWorker({ client, sessionId, prompt: "echo hello from dc-dev-core" })
  assert.ok(["dispatched", "done"].includes(res.status))
  assert.ok(res.selectedChild, "selectedChild must be observed via session.children, not a stub")
  if (existsSync(MARKER)) rmSync(MARKER)
})
