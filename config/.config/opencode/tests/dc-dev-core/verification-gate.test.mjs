import { test } from "node:test"
import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

const MARKER = new URL("./.e2e-skipped", import.meta.url).pathname

test("R18/T-020: verification fails closed when live e2e was skipped (not-verified)", () => {
  // Fail-closed: if the live test was skipped, the build is NOT verified.
  assert.ok(existsSync(MARKER), "e2e-live test must run (even if gated) to satisfy verification")
  const m = JSON.parse(readFileSync(MARKER, "utf8"))
  assert.equal(m.status, "setup-required")
  // A build that only passes file-existence (no live exercise) must be reported as not verified.
  assert.notEqual(m.status, "done")
})
