import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { join } from "node:path"

const CONFIG = new URL("../../opencode.json", import.meta.url).pathname

test("R10/T-006: opencode.json parses and registers exactly one hidden worker dc-dev-worker", () => {
  const cfg = JSON.parse(readFileSync(CONFIG, "utf8"))
  assert.ok(cfg.agent["dc-dev-worker"], "dc-dev-worker missing from agent registry")
  assert.equal(cfg.agent["dc-dev-worker"].mode, "subagent")
  assert.equal(cfg.agent["dc-dev-worker"].hidden, true)
})

test("R10: no global hooks entry (old global hook not used as core)", () => {
  const cfg = JSON.parse(readFileSync(CONFIG, "utf8"))
  assert.equal("hooks" in cfg, false)
})

test("R10: a dispatch command declares agent dc-dev-worker + subtask:true", () => {
  const cfg = JSON.parse(readFileSync(CONFIG, "utf8"))
  const cmd = Object.values(cfg.command || {}).find((c) => /dc-dev-worker/.test(JSON.stringify(c)))
  assert.ok(cmd, "no command references dc-dev-worker")
})
