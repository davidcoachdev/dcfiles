import assert from "node:assert/strict"
import { mkdtempSync, readFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { test } from "node:test"
import { appendTrace } from "./trace-writer.mjs"

test("trace writer appends redacted structured events", () => {
  const directory = mkdtempSync(join(tmpdir(), "dc-dev-trace-"))
  try {
    const path = join(directory, "trace.md")
    appendTrace(path, { phase: "make", task: "T-011", status: "PASS", secret: "token" })
    const output = readFileSync(path, "utf8")
    assert.match(output, /phase: make/)
    assert.doesNotMatch(output, /token/)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
