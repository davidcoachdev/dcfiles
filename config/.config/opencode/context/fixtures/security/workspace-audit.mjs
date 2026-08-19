import { lstatSync, readFileSync, statSync, mkdtempSync, mkdirSync, writeFileSync, symlinkSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { tmpdir } from "node:os"
import runtime from "../../../plugins/dc-dev-runtime.mjs"
import * as pluginNamespace from "../../../plugins/dc-dev-runtime.mjs"
import { createApprovalStore, approveBuild } from "../../../agents/dc-dev/front-door/triage.mjs"

const root = dirname(dirname(dirname(dirname(fileURLToPath(import.meta.url)))))

export async function runAudit() {
  const findings = []
  const checksExecuted = [
    "config-permissions", "hardcoded-secrets", "config-protected-paths", "protected-paths", "hook-config",
    "runtime-write-scope", "bash-scope", "approval-durability", "trace-consistency", "plugin-loader-contract",
    "plugin-loaded-evidence",
  ]
  const configPath = join(root, "opencode.json")
  const config = JSON.parse(readFileSync(configPath, "utf8"))
  if ((statSync(configPath).mode & 0o077) !== 0) findings.push({ severity: "P1", code: "config-permissions" })
  if (/(?:apiKey|token|secret|password)\s*[:=][^\n]{0,40}sk-[A-Za-z0-9]{20,}/i.test(JSON.stringify(config))) findings.push({ severity: "P1", code: "hardcoded-provider-secret" })
  const protectedPatterns = ["**/*.key", "**/*.pem", "**/.aws/credentials", "**/.config/gh/hosts.yml", "**/.env", "**/.ssh/**", "**/credentials.json", "**/secrets/**"]
  if (!protectedPatterns.every((pattern) => config.permission?.read?.[pattern] === "deny")) findings.push({ severity: "P1", code: "config-protected-paths" })
  if (!exists(config.plugin, "/home/dcdebian/.config/opencode/plugins/dc-dev-runtime.mjs")) findings.push({ severity: "P1", code: "hook-config" })
  if (config.permission?.bash?.["*"] === "allow") findings.push({ severity: "P1", code: "bash-wildcard-allow" })

  // P1-B (a): loader contract — OpenCode 1.18.18 requires every module export
  // to be a function (or an object with a .server function). Data exports make
  // the plugin fail to load with "Plugin export is not a function". A green
  // Node suite must never mask an unloadable plugin again.
  for (const [name, value] of Object.entries(pluginNamespace)) {
    const valid = typeof value === "function" || (value !== null && typeof value === "object" && typeof value.server === "function")
    if (!valid) findings.push({ severity: "P1", code: "plugin-loader-contract", detail: `export "${name}" is not loadable (typeof ${typeof value})` })
  }

  // P1-B (b): plugin-loaded evidence — a boot self-test record must exist in
  // the real trace AFTER the plugin file was last modified. Absence means the
  // runtime never loaded the current bytes (stale process or load failure).
  const pluginPath = join(root, "plugins/dc-dev-runtime.mjs")
  const pluginMtime = statSync(pluginPath).mtimeMs
  const traceText = readFileSync(join(root, "context/impl/trace.md"), "utf8")
  const loadedMatch = traceText.match(/event: plugin\.loaded[\s\S]*?timestamp: ([0-9T:.Z-]+)/)
  const loadedTime = loadedMatch ? Date.parse(loadedMatch[1]) : NaN
  if (!Number.isFinite(loadedTime) || loadedTime <= pluginMtime) {
    findings.push({ severity: "P1", code: "plugin-loaded-evidence", detail: `no plugin.loaded record after plugin mtime (${new Date(pluginMtime).toISOString()})` })
  }

  const fixture = mkdtempSync(join(tmpdir(), "dc-dev-audit-"))
  mkdirSync(join(fixture, "safe"))
  writeFileSync(join(fixture, "safe", "target.md"), "")
  symlinkSync(join(fixture, "safe", "target.md"), join(fixture, "safe", "link.md"))
  const hooks = await runtime({ directory: fixture })
  await expectSuccess(() => hooks["tool.execute.before"]({ tool: "write" }, { args: { filePath: join(fixture, "safe/target.md") } }), findings, "runtime-write-scope")
  await expectFailure(() => hooks["tool.execute.before"]({ tool: "write" }, { args: { filePath: join(fixture, "safe/link.md") } }), findings, "runtime-write-scope")
  await expectFailure(() => hooks["tool.execute.before"]({ tool: "bash", args: { command: "cat .env" } }, { args: { command: "cat .env" } }), findings, "protected-paths")
  await expectFailure(() => hooks["tool.execute.before"]({ tool: "bash", args: { command: "printf x > /tmp/dc-dev-audit-out" } }, { args: { command: "printf x > /tmp/dc-dev-audit-out" } }), findings, "bash-scope")

  const approvalStore = createApprovalStore(join(fixture, "approvals.json"))
  const approval = approveBuild({ actor: "audit", request: "build audit", now: 1000, store: approvalStore })
  if (approvalStore.get(approval.approvalId)?.actor !== "audit" || (lstatSync(approvalStore.path).mode & 0o077) !== 0) findings.push({ severity: "P1", code: "approval-durability" })
  const trace = readFileSync(join(root, "context/impl/trace.md"), "utf8")
  if (!/## Iter 1[\s\S]*Status: REJECT[\s\S]*## Iter 2[\s\S]*Status: REJECT/.test(trace)) findings.push({ severity: "P1", code: "trace-consistency" })
  return { status: findings.some((finding) => ["P0", "P1"].includes(finding.severity)) ? "failed" : "ok", checksExecuted, findings }
}

function exists(values, expected) { return Array.isArray(values) && values.includes(expected) }
async function expectSuccess(action, findings, code) { try { await action() } catch { findings.push({ severity: "P1", code: `${code}-valid-rejected` }) } }
async function expectFailure(action, findings, code) { try { await action(); findings.push({ severity: "P1", code: `${code}-escape-allowed` }) } catch {} }

if (import.meta.url === `file://${process.argv[1]}`) console.log(JSON.stringify(await runAudit(), null, 2))
