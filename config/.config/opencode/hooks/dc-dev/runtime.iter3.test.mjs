import assert from "node:assert/strict"
import { mkdtempSync, mkdirSync, writeFileSync, symlinkSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { test } from "node:test"
import runtime from "../../plugins/dc-dev-runtime.mjs"

test("runtime allows an in-workspace write when no environment allowlist is set", async () => {
  const root = mkdtempSync(join(tmpdir(), "dc-dev-runtime-"))
  const hooks = await runtime({ directory: root })
  await assert.doesNotReject(() => hooks["tool.execute.before"]({ tool: "write" }, { args: { filePath: join(root, "notes.md") } }))
})

test("runtime rejects outside, protected, and symlinked writes", async () => {
  const root = mkdtempSync(join(tmpdir(), "dc-dev-runtime-"))
  mkdirSync(join(root, "safe"))
  writeFileSync(join(root, "safe", "target.md"), "")
  symlinkSync(join(root, "safe", "target.md"), join(root, "safe", "link.md"))
  const hooks = await runtime({ directory: root })
  await assert.rejects(() => hooks["tool.execute.before"]({ tool: "write" }, { args: { filePath: "/tmp/outside.md" } }), /DC_DEV_SCOPE_DENIED/)
  await assert.rejects(() => hooks["tool.execute.before"]({ tool: "write" }, { args: { filePath: join(root, ".env") } }), /DC_DEV_PROTECTED_PATH/)
  await assert.rejects(() => hooks["tool.execute.before"]({ tool: "write" }, { args: { filePath: join(root, "safe/link.md") } }), /DC_DEV_SCOPE_DENIED/)
})

test("runtime applies scope and protected-path checks to Bash redirections", async () => {
  const root = mkdtempSync(join(tmpdir(), "dc-dev-runtime-"))
  const hooks = await runtime({ directory: root })
  await assert.doesNotReject(() => hooks["tool.execute.before"]({ tool: "bash", args: { command: "printf ok > notes.md" } }, { args: { command: "printf ok > notes.md" } }))
  await assert.rejects(() => hooks["tool.execute.before"]({ tool: "bash", args: { command: "printf ok > /tmp/outside.md" } }, { args: { command: "printf ok > /tmp/outside.md" } }), /DC_DEV_SCOPE_DENIED/)
  await assert.rejects(() => hooks["tool.execute.before"]({ tool: "bash", args: { command: "cat .env" } }, { args: { command: "cat .env" } }), /DC_DEV_PROTECTED_PATH/)
})

test("runtime rejects lexical Bash indirection that can bypass path inspection", async () => {
  const root = mkdtempSync(join(tmpdir(), "dc-dev-runtime-"))
  const hooks = await runtime({ directory: root })
  for (const command of ["source ./unsafe.sh", "find . -exec cat .env \\;", "cat $SECRET_FILE"]) {
    await assert.rejects(() => hooks["tool.execute.before"]({ tool: "bash", args: { command } }, { args: { command } }), /DC_DEV_COMMAND_DENIED/)
  }
})
