# Check 4 — Dc-Dev Unified Agent (Iteration 4)

**Date:** 2026-08-17/18 (run `479ced15`, session `ses_fed02caf9ffe`, agent `cavekit-check`)
**Scope:** Independent verification of Make iteration 4 against `context/kits/` (R1-R25), the build plan, ADR-001, and Check 1-3 findings. Priority 1: the new boot self-test (`plugin.loaded` + version + timestamp) to discriminate "did not load" vs "loaded but does not dispatch". No implementation files were modified; all probe artifacts were created outside the repo or removed.

---

## 1. Boot Self-Test — THE DISCRIMINATOR (Priority 1)

**Result: LOAD FAILURE. The plugin does not load in the real OpenCode 1.18.18.**

Evidence chain:

| # | Fact | Evidence |
|---|------|----------|
| 1 | Iter-4 plugin bytes on disk | `plugins/dc-dev-runtime.mjs` mtime `2026-08-17 22:16:47 -0500`, `RUNTIME_VERSION = "dc-dev-runtime-4"` |
| 2 | Make's last trace write | `context/impl/trace.md` mtime `2026-08-17 22:17:37 -0500` (frozen) |
| 3 | Current serving process started AFTER iter 4 | run `479ced15` bootstrapped `2026-08-18T03:45:35Z` (= 22:45:35 -0500), 28 min after make's final write. PID 906601 `lstart Mon Aug 17 22:45:30 2026` |
| 4 | Loader rejected the plugin | `opencode.log`: `timestamp=2026-08-18T03:45:35.870Z level=ERROR run=479ced15 message="failed to load plugin" path=file:///home/dcdebian/.config/opencode/plugins/dc-dev-runtime.mjs error="Plugin export is not a function"` |
| 5 | Zero boot records | `trace.md` has **0** `plugin.loaded` records; mtime unchanged after ~25 tool calls in this session (still `22:17:37`). The single `grep` hit for "plugin.loaded" is Make's own prose in the Iter-4 Evidence line, not a runtime record |
| 6 | Plugin IS registered | `opencode.json` → `plugin[0] = "/home/dcdebian/.config/opencode/plugins/dc-dev-runtime.mjs"` |

The self-test did exactly what Check 3 asked for: its absence after a genuine post-iter-4 restart **proves load failure** (vs dispatch failure). This time the cause is not stale bytes — the process booted with the new bytes and the loader refused them.

### Root cause (reproduced independently)

OpenCode 1.18.18's plugin loader (extracted from the binary, `uk()` function):

```js
for (let Y of Object.values(mod)) { let J = hk(Y); if (!J) throw TypeError("Plugin export is not a function") }
```

**Every export of a plugin module namespace must be a function (or an object with a callable `server` property).** `dc-dev-runtime.mjs:79` exports:

- `RUNTIME_VERSION` → string `"dc-dev-runtime-4"` ❌
- `SUPPORTED_EVENTS` → array ❌
- `default` → async function ✓ (alone it would load)

Loader simulation against the real module (Node, same validation logic):

```
LOADER-SIM: LOAD FAILURE — non-function exports: RUNTIME_VERSION (string: "dc-dev-runtime-4"),
SUPPORTED_EVENTS (object: ["permission.ask","command.execute.before","tool.execute.bef...)
exports: RUNTIME_VERSION, SUPPORTED_EVENTS, default
```

Cross-check: every local plugin that loads cleanly in this server (`agent-flow.ts`, `agent-flow-tts.ts`, `service-manager.ts`) exports exactly one default and no data exports. `agent-flow.ts:60` (`const { client, directory } = ctx`) also confirms the plugin init payload DOES include `directory` — make's destructuring was correct; only the export shape is wrong.

**Fix is one line** (drop `export { RUNTIME_VERSION, SUPPORTED_EVENTS }`), but it invalidates the entire iter-4 "live-ready" posture: the factory self-test, dispatch, scope enforcement, and Bash blocks have never executed in the real runtime.

**Secondary contract defect:** `plugins/dc-dev-runtime.boot.test.mjs` imports the module under **Node test semantics**, which never applies the loader's export validation. The boot test is green while the plugin is unloadable — the test validates the fantasy contract again (same failure class as Check 3's relative-path tests, now at load time instead of arg shape).

---

## 2. Live Runtime Validation (the missing evidence from Check 3)

Serving process: run `479ced15` (bootstrapped 03:45:35Z, post-iter-4 bytes). All probes executed in this session against that process:

| # | Probe | Expected if plugin live | Observed | Verdict |
|---|-------|------------------------|----------|---------|
| L1 | Boot self-test record | `plugin.loaded` v4 + timestamp > 22:17:37 in trace.md | Absent; loader ERROR in log | **FAIL (load)** |
| L2 | Native `write` → `/tmp/opencode/check4-live-probe.md` (ABSOLUTE filePath, outside workspace) | `DC_DEV_SCOPE_DENIED` | **Write succeeded** (tool output: "Wrote file successfully") | **FAIL** |
| L3 | `bash ls /home/dcdebian/.config/opencode/.env` | denied/intercepted | `exit=0`, file listed (322B, real) | **FAIL** |
| L4 | `bash` env-indirect (`echo probe-$HOME`) | `DC_DEV_COMMAND_DENIED` | ran OK | **FAIL** |
| L5 | `tool.execute.after` trace records for ~25 session tool calls | one record per call | 0 records; trace mtime frozen at make's write | **FAIL** |
| L6 | `permission.ask` / `command.execute.before` hooks | records in trace | 0 records (and these event names remain unconfirmed in 1.18.18 — R20 requires a capability probe; none exists) | **FAIL** |

Conclusion: **zero runtime enforcement and zero runtime observability**. Every security-relevant behavior currently depends on the native OpenCode permission layer (`permission.read` denies, `bash: "*" : "ask"`), not on anything Make built.

---

## 3. Per-Claim Verification of Make's Iter-4 Claims

| Claim | Disk | Live | Notes |
|-------|------|------|-------|
| Boot self-test writes `plugin.loaded` + version + timestamp | ✅ code exists (`dc-dev-runtime.mjs:23`), boot test passes under Node | ❌ **never executes** (unloadable plugin) | Test validates Node import, not the loader contract |
| Scope guard compatible with ABSOLUTE filePath | ✅ verified with real absolute args: in-workspace `/home/dcdebian/.config/opencode/context/impl/probe-check4.md` → `allowed:true`; nested → `allowed:true`; outside `/tmp/...` → rejected; `../etc/passwd` → `path-traversal` | ❌ dead | Check-3 P1 #2 fixed at disk level. Two residual defects: (a) **dangling symlink bypass** — `existsSync()` follows the link, returns false for missing target, so the `lstatSync` symlink check is skipped → `allowed:true` for a symlink pointing outside; a write-through with create semantics lands outside the workspace; (b) reason labels mislead (`symlink-escape` reported for plain out-of-root absolute paths) |
| Obvious Bash blocks (source, find -exec, env-indirect) | ✅ `source ~/.bashrc` BLOCK, `find . -name x -exec rm {} \;` BLOCK, `echo $HOME/...` BLOCK, `echo ${PATH}` BLOCK, `bash -c ...` BLOCK | ❌ dead (L4) | Lexical bypasses remain: `$(cmd)` substitution, backticks, `printenv API_KEY`, `env \| grep token` all pass the regexes |
| Approvals anchored to workspace, cwd-independent | ✅ `triage.mjs:5-7`: `WORKSPACE_ROOT = realpathSync(import.meta.url ../../..)` → `context/impl/.dc-dev-approvals.json`; mode 0600, atomic `rename` write, expiry + revocation + requestHash verified in tests | n/a (disk artifact) | **Hygiene finding:** the production store contains synthetic residue (`human:alice`, `approvedAt: 1000`, `expiresAt: 6000`) written by the audit/test path using the default store — audit-run pollution, no provenance field |
| Real opencode.json audit (9 checks, findings=[]) | ✅ executed: `status: ok`, 9 checks (`config-permissions`, `hardcoded-secrets`, `config-protected-paths`, `protected-paths`, `hook-config`, `runtime-write-scope`, `bash-scope`, `approval-durability`, `trace-consistency`), `findings: []` | ❌ **false green** | The audit cannot observe that the plugin failed to load — it validates guard code + config and reports `ok` while live enforcement is entirely absent. A `plugin-loaded` check (reads the boot record / loader log) is missing |
| Trace corrected with honest states | ✅ Iter-4 entry says `Status: PASS (disk remediation only...)`, `Runtime: NOT VERIFIED — user must restart` — the Check-3 PASS-vs-REVISE contradiction is fixed | — | Residual: `record()` hardcodes `iteration: 3` (line 20) in the v4 plugin, so any future live records would mislabel their iteration |

---

## 4. Gap Analysis — R1-R25 (88 canonical AC; 110 AC checkboxes incl. nested sub-criteria)

| Req | Status | Basis |
|-----|--------|-------|
| R1 kits-contract | **Complete** | Kits are the referenced source of truth across trace/checks |
| R2 OpenCode-native delegated execution | **Partial** | `dc-dev` agent registered in `opencode.json`; runtime wiring (plugin) dead |
| R3 English artifacts | **Complete** | All artifacts English |
| R4 Structured completion contract | **Complete** | Result Contract produced each iteration |
| R5 Single public entry | **Partial** | `entry.mjs` + `routeRequest` work (disk); no command surface invokes the front door; unused live |
| R6 Deterministic intent triage | **Partial** | Disk tests pass; regex is English-only — `"construí la feature"` routes to `consultation` (build request misrouted) |
| R7 Explicit HITL approval | **Partial** | Durable, expiring, revocable, request-bound store (verified); store pollution finding; not wired into any live flow |
| R8 Consultation without mutation | **Partial** | Semantics correct on disk; unused live |
| R9 Front-door security boundary | **Missing (live)** | Boundary is the dead plugin; L2/L3 prove nothing intercepts |
| R10 Ordered gold lifecycle | **Partial** | `lifecycle.mjs` + tests exist; process-level only |
| R11 Bounded autonomous iteration | **Partial** | Module exists; no live enforcement of bounds |
| R12 Literal verdict + security axis | **Partial** | `verdict.mjs` + this check practice it; not integrated |
| R13 Strict TDD per requirement | **Partial** | `tdd.mjs` + tests-first evidence in trace; not enforced |
| R14 Factory-preserving delegation | **Partial** | Modules exist |
| R15 Hard SDD preflight | **Partial** | `preflight.mjs` + tests; no live gate |
| R16 Phase model routing | **Partial** | `protocol.mjs` + tests |
| R17 Orchestrator-owned context | **Partial** | Process followed manually |
| R18 Session-scoped skill resolution | **Partial** | Not evidenced this iteration |
| R19 Routing/receipts/user-owned stop | **Partial** | Modules exist |
| R20 Runtime-confirmed hook surface | **Missing** | No capability probe ever ran against the real loader/runtime; `SUPPORTED_EVENTS` (`permission.ask`, `command.execute.before`) still unconfirmed as dispatched events; kit constraint "only events the installed runtime actually dispatches" is violated by construction — the plugin is not in the runtime at all |
| R21 Deterministic trace.md | **Partial** | Writer + redaction verified; runtime recording dead (0 records); "failed trace write prevents success" unimplemented |
| R22 Mechanical write scope | **Partial** | Disk guard solid on absolutes + traversal + existing symlinks; dangling-symlink hole; **zero live enforcement** (L2) |
| R23 Mandatory real evidence | **Partial** | Parser verified; `evidence.invalid` can never fire live |
| R24 Adversarial verifier, model separation | **Partial** | `adversarial.mjs` exists; this check provides model-separated review; not integrated |
| R25 Bidirectional spec updating | **Partial** | `spec-sync.mjs` exists; kits unchanged by 4 iterations of feedback |

**Totals: Complete 3 · Partial 20 · Missing 2 · Over-built 0.**

The pattern across four checks: ~23/25 requirements are library-grade code with green Node tests, and ~0 of the runtime-facing criteria are satisfied in the actual OpenCode process. The gap is not code volume; it is the last mile to the real runtime, and the test suite is structurally blind to it (Node semantics ≠ loader semantics ≠ dispatch semantics).

---

## 5. Adversarial Peer Review (Diff Critique + Coverage Audit)

1. **Allowlist safety**: default `allowedPaths = [directory]` with `realpath` canonicalization and prefix-match (`path + sep`) is sound against traversal/existing-symlink escapes at disk level. The **dangling-symlink hole** (§3) breaks the symlink-reject guarantee for targets created later; use `lstatSync`-based existence instead of `existsSync`.
2. **Path model coverage**: absolute in/out, nested, traversal, and existing symlinks all behave; the guard alone does NOT deny protected files (`.env` passes the guard) — that defense lives only in the plugin layer (`denyProtected`), so the guard must never be cited as the sole control.
3. **Bash lexical layer**: blocks the three required classes, but `$(...)`, backticks, `printenv`, and `env` remain open; a deny-regex is a losing game long-term — the kit's fail-closed intent argues for an allowlist approach or dropping Bash interception claims.
4. **Approval auditability**: records have actor/expiry/revocation/requestHash (good) but **no provenance** (which session/run wrote them), and the production store already holds synthetic data — the trust model ("who may write this store?") is undocumented.
5. **False-green audit (T-033)**: `status: ok, findings: []` while the runtime is dead is the most dangerous artifact in this iteration — it converts "everything is broken live" into a green security signal a future iteration could cite. The audit must include a `plugin-loaded` check reading the boot record or loader log.
6. **Trace honesty**: Iter-4 entry is honest about disk-vs-live (improvement over Iter 3), but the live Evidence line still asserts behaviors in indicative mood ("writes pass... reject") that have never run.

---

## 6. Security Axis (mandatory)

| Check | Result |
|-------|--------|
| opencode.json permissions | `read` deny-list for `.env*`, `*.key`, `*.pem`, `.aws`, `.ssh`, `gh/hosts.yml`, credentials — solid; `bash "*": "ask"` at config level (session grants override) |
| Hardcoded secrets | None; providers use `{env:...}` indirection; `sk-fingerprint`/`sk-specific` matches are config labels, not secrets |
| Context escape via plugin | Plugin never loads → no context escape surface, but also no promised defense; `.env` remains readable via Bash `cat` (native deny covers the `read` tool only) |
| Scope guard realpath | Correct for existing paths; **dangling-symlink bypass (P2)**; misleading reason labels (P3) |
| T-033 audit | Executes, 9 real checks, but **false green** — cannot observe plugin load state (P1 as a security signal) |
| Approvals revocation/expiry/trust | Expiry+revocation verified; trust model undocumented; production store polluted by test path (P3 hygiene) |

**Security Gates: FAIL** — P1 findings present (below).

---

## 7. Findings

**Critical (blocking):**

- **P1-A — Plugin fails to load in the real runtime.** `error="Plugin export is not a function"` (run `479ced15`, 03:45:35.870Z). Root cause: data named exports violate the 1.18.18 loader contract (every export must be a function / `{server}` object). Reproduced via loader simulation. All of R9/R20/R21/R22/R23's runtime criteria fail; out-of-workspace absolute writes succeed unimpeded (L2).
- **P1-B — The test suite and T-033 audit cannot detect P1-A by construction.** The boot test validates Node import semantics; the audit returns `ok/findings: []` while live enforcement is zero. Fourth iteration in which green disk evidence coexists with a dead runtime. Without a loader-contract test (or an audit check that reads the boot record / loader log), iteration 5 will repeat this failure class.

**High-value non-blocking:**

- P2 — Dangling-symlink bypass in `scope-guard.mjs` (`existsSync` follows links; `lstat` check skipped for missing targets).
- P2 — Bash lexical bypasses: `$(cmd)`, backticks, `printenv`, `env` (deny-regex model).
- P2 — T-033 false green (folded into P1-B) and `record()` hardcoding `iteration: 3` in the v4 plugin.
- P3 — English-only triage regex (`"construí la feature"` → consultation).
- P3 — Production approval store contains synthetic audit residue (`human:alice`, epoch timestamps); no provenance field.

---

## 8. Result Contract

```
status: failed
executive_summary: Boot self-test worked as designed and answered the open question definitively —
  the plugin DOES NOT LOAD (not a dispatch problem): OpenCode 1.18.18 run 479ced15 (bootstrapped
  03:45:35Z, 28 min after iter-4 bytes) rejected it with "Plugin export is not a function" because
  RUNTIME_VERSION (string) and SUPPORTED_EVENTS (array) named exports violate the loader contract
  (every export must be a function). Zero plugin.loaded records; trace mtime frozen at make's write
  despite ~25 tool calls. Live probes: out-of-workspace absolute write SUCCEEDED, ls .env exit=0,
  env-indirect bash ran — zero enforcement. Disk remediation is real (absolute-path scope guard OK,
  workspace-anchored 0600 atomic approval store, bash regexes present, honest trace entry, 5/5 test
  files pass under Node) but was never validated against the real loader, and T-033 reports a false
  green (status ok, findings []) while the runtime is dead.
Gap Analysis: Complete 3, Partial 20, Missing 2, Over-built 0
Peer Review: P0 0, P1 2, P2 3, P3 3
Security Gates: FAIL
Verdict: REJECT
```

**next_recommended:** `make with gaps` — (1) delete the data named exports (keep default-only; expose version/events as properties on the returned hooks object or a separate non-plugin module for tests); (2) add a loader-contract test replicating the binary's validation (every `Object.values(namespace)` export is `fn` or `{server: fn}`) and make the boot test assert through that gate; (3) add a T-033 check `plugin-loaded` that fails when no `plugin.loaded` record postdates the plugin file mtime; (4) fix the dangling-symlink bypass with lstat-based existence; (5) purge + provenance-field the approval store; (6) restart and re-verify live in Check 5 — human approval still required before any ship decision.

**skill_resolution:** check skill instructions were available inline in this session (provided as the active skill content, not read from a skill registry at runtime); no stale cache was involved.
