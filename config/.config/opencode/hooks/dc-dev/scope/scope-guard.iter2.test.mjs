import assert from "node:assert/strict"
import { mkdirSync, symlinkSync, mkdtempSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { test } from "node:test"
import { createScopeGuard } from "./scope-guard.mjs"

test("scope guard rejects a symlink that resolves outside the workspace", () => {
  const root = mkdtempSync(join(tmpdir(), "dc-dev-scope-"))
  const outside = mkdtempSync(join(tmpdir(), "dc-dev-outside-"))
  mkdirSync(join(root, "allowed"))
  writeFileSync(join(outside, "secret.txt"), "secret")
  symlinkSync(join(outside, "secret.txt"), join(root, "allowed", "linked.txt"))

  const guard = createScopeGuard(root, ["allowed/linked.txt"])
  assert.equal(guard.check(join(root, "allowed", "linked.txt")).allowed, false)
  assert.equal(guard.check("allowed/linked.txt").reason, "symlink-escape")
})

test("scope guard accepts the absolute filePath shape used by OpenCode write tools", () => {
  const root = mkdtempSync(join(tmpdir(), "dc-dev-scope-"))
  mkdirSync(join(root, "allowed"))
  const target = join(root, "allowed", "target.md")
  const guard = createScopeGuard(root, ["allowed"])
  assert.equal(guard.check(target).allowed, true)
})
