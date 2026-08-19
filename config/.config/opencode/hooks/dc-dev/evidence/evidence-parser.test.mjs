import assert from "node:assert/strict"
import { test } from "node:test"
import { parseEvidence } from "./evidence-parser.mjs"

test("evidence parser requires command, exit code, output, and revision", () => {
  assert.equal(parseEvidence({ command: "node --test", exitCode: 0, output: "pass", revision: "abc" }).valid, true)
  assert.equal(parseEvidence({ output: "all tests pass" }).valid, false)
  assert.equal(parseEvidence({ command: "node --test", exitCode: 0, output: "TOKEN=secret", revision: "abc" }).valid, false)
})
