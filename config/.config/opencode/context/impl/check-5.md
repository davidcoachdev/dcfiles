# Check 5 — Dc-Dev Unified Agent (Iteration 5 — FINAL)

**Date:** 2026-08-17/18 (session `cavekit-check`, model `opencode-go/glm-5.3`, post-restart runtime)
**Scope:** Final verification of Make iteration 5 against `context/kits/` (R1-R25, 88 canonical AC), the build plan, ADR-001, and Check 1-4 findings. Priority 1: confirm the P1-A fix (loader contract) with live boot evidence after the user restarted OpenCode. Priority 2: live runtime validation of hooks, write scope, and bash interception. No implementation files were modified; all probes were denials (no artifacts created) or in-process fixture runs.

---

## 1. Boot Self-Test — P1-A CLOSED (plugin loads in the real runtime)

Evidence chain (all values re-verified independently in this session):

| # | Fact | Evidence |
|---|------|----------|
| 1 | Fixed plugin bytes on disk | `plugins/dc-dev-runtime.mjs` mtime `2026-08-17 23:08:01.024 -0500` = `2026-08-18T04:08:01.024Z` |
| 2 | Loader accepted the plugin | `context/impl/trace.md` line 58: `event: plugin.loaded \| version: dc-dev-runtime-4 \| timestamp: 2026-08-18T04:12:21.781Z` — **4m20s AFTER the plugin mtime** |
| 3 | Loader-contract test (new, P1-B) | `node --test plugins/dc-dev-runtime.loader-contract.test.mjs` → **3/3 pass** (fresh run in this session: every export is fn/`{server}`, default is the factory, no data exports) |
| 4 | Module namespace | `dc-dev-runtime.mjs` exports ONLY `default` (async function); `RUNTIME_VERSION`/`SUPPORTED_EVENTS` are module consts exposed as properties of the returned hooks object |
| 5 | Boot self-test | `node --test plugins/dc-dev-runtime.boot.test.mjs` → **1/1 pass** (factory writes `plugin.loaded` + version + timestamp) |
| 6 | T-033 audit gates it | `plugin-loaded-evidence` check compares trace `plugin.loaded` timestamp against plugin mtime; audit output below shows it PASSING, not absent |

The discriminating failure mode from Check 4 (`error="Plugin export is not a function"`, run `479ced15`) is eliminated: the same runtime class now loads the fixed bytes and the boot record proves it.

## 2. Live Runtime Validation — LIVE DISPATCH AND ENFORCEMENT CONFIRMED

Serving runtime: restarted by the user after iter-5 bytes (plugin.loaded 04:12:21Z > plugin mtime 04:08:01Z). `DC_DEV_ALLOWED_PATHS`/`DC_DEV_TRACE_PATH` are **unset** (verified via `printenv`), so live allowed-scope = `~/.config/opencode` only — the correct worst-case default.

| # | Probe (this session, real tool calls) | Expected | Observed | Verdict |
|---|---------------------------------------|----------|----------|---------|
| L1 | Boot record post-dated to plugin mtime | present | `plugin.loaded \| version: dc-dev-runtime-4 \| timestamp: 04:12:21.781Z` | **PASS** |
| L2 | Native `write` tool → `/home/dcdebian/.cache/dc-dev-check5-probe.md` (ABSOLUTE filePath, outside workspace) — Check 4's L2 repeat | `DC_DEV_SCOPE_DENIED` | **`DC_DEV_SCOPE_DENIED`** (tool blocked; no file created) | **PASS** |
| L3 | `bash printf probe > /tmp/opencode/dc-dev-out-probe.txt` (out-of-scope redirect) | denied | **`DC_DEV_SCOPE_DENIED`** | **PASS** |
| L4 | `bash cat .env` (protected path) — Check 4's L3 repeat | denied | **`DC_DEV_PROTECTED_PATH`** | **PASS** |
| L5 | Trace records for session tool calls | one per call | Trace grew 62 → 83+ lines during this check; `tool.execute.after` entries for `read`, `bash`, `engram_mem_search`, `task`, `ctx_execute` with live timestamps (04:16-04:19Z) | **PASS** |
| L6 | Violation logging (R22-AC3) | attempted path + reason recorded | `event: scope.reject \| tool: write \| path: /home/dcdebian/.cache/dc-dev-check5-probe.md \| reason: symlink-escape` and same for the bash probe — recorded BEFORE the throw, by the live runtime | **PASS** |
| L7 | In-workspace absolute write | allowed | This report (`context/impl/check-5.md`) is written through the native `write` tool with an absolute in-workspace filePath in the same live runtime | **PASS** |

Residual (honest): `permission.ask` and `command.execute.before` are registered but were not dispatched/probed in this session — no live evidence either way in 1.18.18 (R20 residual). `denyProtected` rejections (L4) throw **without** a trace record — only scope denials are logged (P3, see Findings).

## 3. Real Test and Audit Output (pasted, unedited)

`node --test plugins/dc-dev-runtime.loader-contract.test.mjs`:

```
✔ loader contract: every export is a function or { server } (1.186373ms)
✔ loader contract: default export is the plugin factory (2.267627ms)
✔ plugin exposes version/events as properties, not data exports (0.228734ms)
ℹ tests 3
ℹ pass 3
ℹ fail 0
```

`node context/fixtures/security/workspace-audit.mjs` (T-033):

```json
{
  "status": "ok",
  "checksExecuted": [
    "config-permissions", "hardcoded-secrets", "config-protected-paths", "protected-paths",
    "hook-config", "runtime-write-scope", "bash-scope", "approval-durability", "trace-consistency",
    "plugin-loader-contract", "plugin-loaded-evidence"
  ],
  "findings": []
}
```

`node --test plugins/dc-dev-runtime.boot.test.mjs`: `ℹ tests 1 / pass 1 / fail 0`.

**The false-green structural defect (Check 4 P1-B) is closed**: the audit now contains `plugin-loader-contract` (validates the export shape the binary's loader enforces) and `plugin-loaded-evidence` (fails when no boot record postdates the plugin mtime). Both gates are green against the *live* trace, not against an idealized in-process run. The in-process limitation of the audit's scope probes (Check 3/4 note) is now compensated by the live probes in §2 against the actual serving runtime.

## 4. Per-Claim Verification of Iter-5 Claims

| Claim (trace Iter 5) | Verdict | Evidence |
|----------------------|---------|----------|
| Data named exports removed; version/events as hooks-object properties | ✅ CONFIRMED | Source read: only `export default async function dcDevRuntime`; loader-contract test 3/3 |
| Loader-contract test 3/3 | ✅ CONFIRMED | Fresh run this session (§3) |
| Audit `plugin-loaded-evidence` failing until restart | ✅ CONFIRMED → now PASSING | Audit ran clean post-restart (§3); pre-restart failing state was documented in trace |
| Boot record `dc-dev-runtime-4` after restart | ✅ CONFIRMED | trace.md 04:12:21.781Z > mtime 04:08:01.024Z (§1) |
| P2 dangling symlink fix NOT applied | ✅ CONFIRMED OPEN | `scope-guard.mjs:40`: `existsSync(current) && lstatSync(current).isSymbolicLink()` — `existsSync` follows links, so a dangling symlink skips the lstat check → allowed (P2-1) |
| Cavekit-make sub-agent returned empty 3× (inline orchestrator fix) | Accepted as recorded | Iter-5 trace documents the infrastructure failure honestly; the fix itself is independently verified above |

## 5. Gap Analysis — R1-R25 (88 canonical AC; mechanically counted 88 requirement checkboxes + 22 Security-Gate checkboxes = 110)

AC counts per kit (grep-verified this session): overview 11, front-door 17, gold-loop 18, protocols 19, enforcement 23 = **88**.

| Req | Status | Basis (delta vs Check 4: Complete 3 / Partial 20 / Missing 2) |
|-----|--------|------|
| R1 kits-contract | **Complete** | Unchanged; kits remain the referenced contract across all artifacts |
| R2 OpenCode-native delegated execution | **Complete** ↑ | `dc-dev` agent registered; plugin loads and dispatches LIVE; no external orchestration framework; delegation evidenced across 5 iterations in trace |
| R3 English artifacts | **Complete** | All artifacts neutral English, including this report |
| R4 Structured completion contract | **Complete** | Result Contract produced in every iteration (checks 1-5) |
| R5 single public entry | Partial | Config has one `dc-dev` entry, but no command surface invokes `entry.mjs`/front door and legacy primary agents remain alternate doors (AC3 fails) |
| R6 deterministic triage | Partial | Disk tests pass; English-only regex misroutes Spanish build intent; not wired live |
| R7 HITL approval | Partial | Durable/expiring/revocable/request-hash-bound store verified; not wired into any live flow; store residue (P3-2) |
| R8 consultation without mutation | Partial | Semantics correct on disk; unused live |
| R9 front-door security boundary | Partial (was Missing-live) | **LIVE**: out-of-scope write and bash blocked, protected path blocked, no secrets in approval records; residual: protected-path denials unlogged (P3-6) |
| R10 ordered gold lifecycle | Partial | `lifecycle.mjs` + tests; process-level ordering only |
| R11 bounded autonomous iteration | Partial | Bound modules exist; 5-iteration cap honored in practice (this is the final budgeted iteration); no mechanical live enforcement |
| R12 literal verdict + security axis | **Complete** ↑ | Five literal verdicts in trace; P0/P1→REJECT honored (checks 1-4); security axis ran in every check including this one |
| R13 strict TDD | Partial | Tests-first practice + coverage modules; no mechanical red-run enforcement |
| R14 factory-preserving delegation | Partial | Modules + tests; dedup not live-tested |
| R15 hard preflight | Partial | `preflight.mjs` + tests; no live gate |
| R16 model routing | Partial (improved) | **Make `gpt-5.6-luna` vs Check `glm-5.3` — different models configured AND exercised live by this session**; per-build routing artifact still not produced |
| R17 orchestrator-owned context | Partial | Manual practice; envelope module exists |
| R18 session-scoped skill resolution | Partial | `context/refs/kit-index.json` cache exists; per-session resolution not evidenced |
| R19 receipts / user-owned stop | Partial | Modules exist; not live |
| R20 runtime-confirmed hook surface | Partial (improved) | `tool.execute.before` + `tool.execute.after` **LIVE-confirmed** (denials + records); `permission.ask`, `command.execute.before` registered but never dispatched/probed; no pre-config capability-probe artifact |
| R21 deterministic trace | Partial (improved) | **Runtime recording is LIVE** (`plugin.loaded`, `tool.execute.after`, `scope.reject`); entries lack session/req-IDs; "failed trace write prevents success" unimplemented; redaction holds |
| R22 mechanical write scope | Partial (improved, core proven) | **LIVE**: in-workspace absolute write passes (this report), out-of-workspace blocked for write AND bash, violation logged with path+reason; symlink rejected in audit; traversal blocked on disk; residual: dangling-symlink P2, no agent-identity/HITL-next-action fields |
| R23 mandatory real evidence | Partial (improved) | Parser verified; evidence path now live-capable (`tool.execute.after` on bash); no `evidence.invalid` observed this session |
| R24 adversarial verifier, model separation | **Complete** ↑ | Model separation configured and real (this check ≠ make's model); four adversarial REJECTs prove the verifier cannot be talked into approval by Make claims |
| R25 bidirectional spec updating | Partial | **Kits were never updated with the loader-contract discovery** — the most important finding of this feature lives only in check-4/trace, violating R25-AC1 in practice |

**Totals: Complete 6 · Partial 19 · Missing 0 · Over-built 0.**

Delta vs Check 4: +3 Complete (R2, R12, R24), −2 Missing (R9, R20 upgraded to Partial with live evidence). Every runtime-facing criterion that drove four REJECTs is now live-proven. The remaining Partials cluster in two groups: (a) front-door product wiring (R5-R8, R15, R17-R19) that exists as tested libraries but has no live command surface, and (b) known P2/P3 defects listed below.

## 6. Adversarial Peer Review (Diff Critique + Coverage Audit + Design Challenge)

Reviewer model ≠ builder model (R24 satisfied structurally and in practice). Mandate: find what the builder missed, not agree.

1. **The loader fix is minimal and correct, but the victory is one runtime version deep.** The loader-contract test encodes 1.18.18's observed validation (`fn` or `{server: fn}` per export). That is a reverse-engineered contract, not a documented one — a minor OpenCode upgrade could change it silently. The `plugin-loaded-evidence` audit check is the durable guard (runtime-agnostic), and it is in place; keep both.
2. **Bash interception remains a deny-regex, and deny-regexes lose.** Live-verified blocks: `$VAR`, `${VAR}`, `source`, `find -exec`, `sh -c`, out-of-scope path arguments, `.env`-class tokens. Still open: `$(cmd)` substitution, backticks, `printenv`, `env | grep`. Confirmed by code read this session (`dc-dev-runtime.mjs:62`). Worse, the scanner now produces **false positives** on legitimate tooling: an `awk` program containing slash-bearing patterns (`/^## .../`) was denied as a path candidate (`scope.reject | path: /^## Requirements...`). Fail-closed, so not a security hole, but it erodes usability and invites users to route around the guard. The kit's own constraint (allowlist or drop interception claims) remains the right call.
3. **Dangling-symlink hole is real and code-verified** (`existsSync` follows links → `lstat` check skipped → guard allows; a write-through with create semantics can land outside once the target appears). Not fixed in iter 5, correctly disclosed. Fix is one line: existence via `lstatSync` in a try/catch.
4. **Observability asymmetry (new finding).** Scope denials are logged with path+reason before the throw; **protected-path denials throw without any trace record** (`dc-dev-runtime.mjs:50-51`). The most security-relevant rejections (.env, keys) are the invisible ones. Also `record()` hardcodes `iteration: 3`, so live iter-5 events are mislabeled — trace forensics would mis-date the iteration.
5. **Approval store trust model still undocumented, residue still present** (`human:alice`, epoch 1000/6000 in production `context/impl/.dc-dev-approvals.json`, mode 0600). The audit no longer writes there (uses a temp fixture — fixed), but the old synthetic record persists and there is no provenance field.
6. **R25 process breach.** Five iterations of hard-won discoveries (absolute-path args, loader contract, false-green audit design) never flowed back into the kits. The enforcement kit still reads as if hook discovery were future work. Next loop must start with a kit sync or the next builder repeats these lessons.
7. **What the builder got right and should keep:** boot self-test as discriminator; mtime-vs-trace evidence gate in the audit; fail-closed default scope; no secrets in trace/approvals; honest Iter-5 trace entry disclosing the inline fix and the unfixed P2.

## 7. Security Axis (mandatory — always runs)

| Check | Result |
|-------|--------|
| `opencode.json` permissions | `read` deny set covers `.env*`, `*.key`, `*.pem`, `.aws`, `.ssh`, `gh/hosts.yml`, `credentials.json`, `secrets/**`, Keychains; `bash "*": "ask"`; no bash wildcard allow. **PASS** |
| Hardcoded secrets | None; providers use `{env:...}` indirection; `share: disabled`. **PASS** |
| Plugin loader contract | Default-only export; 3/3 contract test; live `plugin.loaded` post-mtime. **PASS** |
| Context escape via plugin | `tool.execute.before` intercepts edit/write/patch/bash with **live-proven denials** (L2-L4); `.env` blocked at BOTH layers (config read-deny + plugin bash-deny). Defense in depth holds. **PASS** (residual: bash lexical bypasses, P2-2) |
| Scope guard realpath/symlinks | Existing symlinks rejected (audit, live-capable); traversal rejected; absolute in/out correct live; **dangling-symlink bypass open (P2-1)**; misleading `symlink-escape` reason label for plain out-of-root paths (P3-5) |
| T-033 audit (11 checks) | Executes with real checks including the two new gates; `status: ok, findings: []` **is now a trustworthy signal** because it fails when the plugin is stale/unloaded. **PASS** |
| Approvals | Workspace-anchored, 0600, atomic rename, expiry+revocation+requestHash verified; residue + no provenance (P3-2) |
| LLM-specific (OWASP LLM Top 10 lens) | Boundary is code-enforced, not prompt-enforced (excessive agency: scoped); model output cannot widen scope (deterministic guard); no secrets in context artifacts; loop bounded at 5 iterations (unbounded consumption: bounded by process, not yet mechanically). **PASS** |

**Security Gates: PASS** — zero P0, zero P1. (Checks 1-4 failed this gate; this is the first iteration where it passes with live evidence.)

## 8. Findings

**Critical (blocking): none.** Check 4's P1-A and P1-B are closed with live evidence (§1-§3).

**Non-blocking:**

- **P2-1** — Dangling-symlink bypass in `scope-guard.mjs` (`existsSync` follows links; lstat check skipped for missing targets). Disclosure-honest, unfixed.
- **P2-2** — Bash lexical bypasses: `$(cmd)`, backticks, `printenv`, `env` pass the deny-regex; plus false positives on slash-bearing tool arguments (awk/sed programs) that deny legitimate commands.
- **P2-3** — Trace accuracy: `record()` hardcodes `iteration: 3` (live iter-5 events mislabeled); protected-path denials (`DC_DEV_PROTECTED_PATH`) throw without a trace record while scope denials are logged.
- **P3-1** — English-only triage regex (Spanish build intent misroutes to consultation).
- **P3-2** — Production approval store retains synthetic residue; no provenance field.
- **P3-3** — R25 process gap: kits not updated with the loader-contract and absolute-path discoveries.
- **P3-4** — `permission.ask` / `command.execute.before` registered but never probed in the live runtime (R20 residual).
- **P3-5** — `symlink-escape` reason label applied to plain out-of-root absolute paths (misleading forensics).

## 9. Trace Consistency (final)

- Iter 1-5 entries and Checks 1-4 present, ordered, with honest `Runtime: NOT VERIFIED` markers on every pre-restart iteration — each such marker is now redeemed by the live records below them (plugin.loaded 04:12:21Z; tool.execute.after/scope.reject 04:13-04:19Z, including entries generated by this check's own probes).
- Iteration labels in live records say `iteration: 3` (P2-3) — content and timestamps are correct, the label is not.
- Check 5 appends its verdict line below (per protocol). No contradictions remain between trace claims and disk/live state.

## 10. Result Contract

```
status: ok_with_warnings
executive_summary: The P1-A root cause is closed in the real runtime: the fixed plugin (mtime
  04:08:01Z) loaded after the user's restart and wrote plugin.loaded dc-dev-runtime-4 at
  04:12:21.781Z, and live probes in THIS session prove dispatch and enforcement — native write
  with an out-of-workspace absolute filePath returned DC_DEV_SCOPE_DENIED, bash redirects
  outside scope and `cat .env` were blocked, every tool call is being recorded in trace.md,
  and violations log path+reason via scope.reject. Loader-contract test 3/3, boot test 1/1,
  T-033 audit 11 checks findings=[] — and the audit can no longer false-green because it now
  gates on plugin-loaded evidence postdating the plugin mtime. Gap analysis: Complete 6,
  Partial 19, Missing 0, Over-built 0 — the four-REJECT runtime gap is closed; what remains
  is front-door product wiring (tested libraries without a live command surface) and known
  P2/P3 defects (dangling symlink, bash deny-regex limits, trace labeling), none blocking.
Gap Analysis: Complete 6, Partial 19, Missing 0, Over-built 0
Peer Review: P0 0, P1 0, P2 3, P3 5
Security Gates: PASS
Verdict: REVISE
```

`Verdict: REVISE` rationale: security gates pass and zero P0/P1 findings, but 19 Partial requirements (notably R5-R8 front-door wiring and the R25 kit-sync breach) mean "all acceptance criteria pass" does not hold, so `APPROVE` would overclaim under R12-AC2. `REJECT` would be wrong — nothing blocking remains, and the iteration budget (5/5) is exhausted. Per loop semantics, REVISE ends the loop and hands the ship/iterate decision to the human.

**next_recommended:** Human decision (HITL): accept and ship with the logged P2/P3 residual risk, or fund a follow-up loop whose FIRST task is the R25 kit sync, followed by (1) lstat-based dangling-symlink fix, (2) protected-path denial logging + iteration label fix, (3) bash allowlist or scoped-down interception claims, (4) approval-store purge + provenance field, (5) one live probe each for `permission.ask` and `command.execute.before`.

**skill_resolution:** check skill instructions were available inline as the active skill for this session (not resolved from a stale cache). Security axis executed against the `security-auditor` skill (read from `skills/security-auditor/SKILL.md` this session, v2.0). Web-performance / core-web-vitals axes skipped: no web frontend exists in this feature (OpenCode plugin + config). Peer-review modes applied inline (Diff Critique, Coverage Audit, Design Challenge).
