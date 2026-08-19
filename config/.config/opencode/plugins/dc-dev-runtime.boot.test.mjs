import assert from "node:assert/strict"
import { mkdtempSync, readFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { test } from "node:test"
import runtime from "./dc-dev-runtime.mjs"

test("runtime factory records a versioned plugin.loaded boot self-test", async () => {
  const root = mkdtempSync(join(tmpdir(), "dc-dev-boot-"))
  const tracePath = join(root, "boot.log")
  const previous = process.env.DC_DEV_TRACE_PATH
  process.env.DC_DEV_TRACE_PATH = tracePath
  try {
    await runtime({ directory: root })
    const trace = readFileSync(tracePath, "utf8")
    assert.match(trace, /event: plugin\.loaded/)
    assert.match(trace, /version: dc-dev-runtime-4/)
    assert.match(trace, /timestamp:/)
  } finally {
    if (previous === undefined) delete process.env.DC_DEV_TRACE_PATH
    else process.env.DC_DEV_TRACE_PATH = previous
  }
})
