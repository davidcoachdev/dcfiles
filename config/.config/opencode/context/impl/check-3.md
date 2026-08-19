# Dc-Dev Unified Agent — Check 3

**Scope:** Independent verification of Make iteration 3 against `context/kits/` (R1-R25, 88 acceptance criteria), the build plan, ADR-001, Check 1/Check 2 findings, and the seven GAP claims. This check performed the first live post-restart runtime validation. No implementation files were modified; probe files created during validation were removed.

## Result Contract

- **status:** `failed`
- **executive_summary:** Iteration 3 genuinely improved the disk-level artifacts (workspace-default allowlist, realpath/symlink-aware guard, durable approval store with expiry/revocation, executable 8-check T-033 audit, corrected Iter 1/2 trace statuses; 37/37 tests pass). However, the live runtime validation — the entire purpose of this check — shows the dc-dev plugin produces ZERO dispatch evidence in the restarted OpenCode 1.18.18 instance: after ~40 tool calls, `trace.md` has zero runtime entries, an out-of-workspace write via the native `write` tool succeeded three times, and a Bash call touching a protected path (`.env`, which really exists, 322B) executed with `exit=0`. Additionally, the server instance serving this session bootstrapped at 02:45:56Z, BEFORE Make's final iteration-3 artifacts (02:53:43Z), so the running process never loaded the final plugin state — and no mechanism verifies which plugin version a running server loaded. Worse, even if dispatch worked, the scope guard categorically rejects absolute paths while OpenCode's real write/edit tools send absolute `filePath`, so enforcement would break every legitimate write; all green unit tests and the T-033 audit validate relative-path shapes the real runtime never produces. GAP-7 fails; GAP-1..6 are partial improvements only.
- **artifacts:** `context/impl/check-3.md`, `context/impl/trace.md` (Check 3 verdict line appended)
- **verdict:** `Verdict: REJECT`
- **critical_gaps:**
  - P1 — Live runtime dispatch is absent. The plugin's `tool.execute.after` hook records every tool call unconditionally, yet `context/impl/trace.md` shows `0 runtime entries` after ~40 tool calls in the restarted runtime (mtime frozen at the pre-restart Make write, 2026-08-17 21:53:43 -0500). Probes: in-workspace write OK (proves nothing enforces), `/tmp/opencode` out-of-workspace write OK **three times** (last at 03:09:41Z, logged only as native `evaluated permission=edit ... action=allow`), `ls .env` OK with `exit=0`. R9/R20/R21/R22 runtime criteria fail.
  - P1 — Scope model is incompatible with real tool arguments. `scope-guard.mjs` rejects every absolute path (`reason: "absolute-path"`), but OpenCode's `write`/`edit` tools require absolute `filePath`. If the plugin ever dispatches, ALL legitimate writes are denied — the Check-2 "global write breakage" P1 recurs through a different code path. `runtime.iter3.test.mjs` and the T-033 audit only feed relative paths (`safe/target.md`) — a shape the live runtime never sends, so the green "runtime-write-scope" checks validate a fantasy input contract.
  - P1 — Restart integrity is unverified and the trace overstates. The live server serving this check (run `02a06d01`, bootstrapped 02:45:56Z with the startup skill-load block) predates Make's final iteration-3 writes (02:53:43Z); two later bootstraps (03:06:45Z `a553fc79`, 03:07:02Z `36b31368`) are not the processes evaluating this session's tools. Nothing verifies which plugin version a running server actually loaded, yet Iter 3's trace Evidence line asserts live-sounding behavior ("outside/protected/symlink/Bash paths reject") without a live qualifier.
- **security:** `FAIL` — live protected-path bypass demonstrated (`.env` listed via Bash), live out-of-scope write demonstrated, enforcement layer not provably active, Bash lexical filter bypassable by design (see Peer Review).
- **next_recommended:** `make with gaps` — (1) add a plugin boot-time self-test (write a `plugin.loaded` trace record inside the factory; after restart its absence proves load failure vs dispatch failure); (2) fix the path model: accept absolute paths resolved against the workspace root, keeping realpath/symlink/traversal checks; (3) add one integration test that drives the REAL OpenCode `write`/`edit` tool arguments (absolute `filePath`) through the plugin; (4) align `denyProtected` with the config read-deny list (`*.key`, `*.pem`, `.aws`, `gh/hosts.yml`, `id_rsa`...); (5) give the approval store a fixed workspace-anchored path and document its trust model; (6) fix the Iter 3 `Status: PASS` vs `Verdict: REVISE` contradiction; (7) restart again and re-verify live in Check 4. Human approval remains required before any ship decision.
- **skill_resolution:** `partial` — `context/refs/kit-index.json` (3974B) remains the cache; no new resolved state was produced in iteration 3 and the recorded capability state is still `partial`.

## Live Runtime Validation (new in Check 3)

All probes executed through the live OpenCode 1.18.18 instance serving this check session (run `02a06d01`), not by importing modules directly.

| # | Probe | Expected if plugin live | Observed | Verdict |
|---|---|---|---|---|
| L1 | ~40 native tool calls (read/bash/write/glob) | `tool.execute.after` appends a trace line per call | `trace.md` unchanged: 26 lines, `0 runtime entries`, mtime 2026-08-17 21:53:43 -0500 (Make's pre-restart write) | **No dispatch** |
| L2 | `write` → in-workspace absolute path (probe W1, 03:04:54Z) | Denied (`absolute-path` rejection) or allowed-and-recorded | `Wrote file successfully.` No trace record | **No enforcement** |
| L3 | `write` → `/tmp/opencode/check3-probe-w2.md` (W2, 03:05:07Z) | `DC_DEV_SCOPE_DENIED` | `Wrote file successfully.` | **Escape unblocked** |
| L4 | `write` → `/tmp/opencode/check3-probe-w3.md` (W3, 03:09:41Z, after the 03:07Z bootstraps) | `DC_DEV_SCOPE_DENIED` | `Wrote file successfully.`; log: `evaluated permission=edit pattern=tmp/opencode/check3-probe-w3.md action.action=allow` (native permission system only) | **Escape unblocked post-bootstrap** |
| L5 | Bash `ls .env` (workdir = workspace root) | `DC_DEV_PROTECTED_PATH` | `.env  322B`, `exit=0`. A real `.env` exists in the workspace; its contents were NOT read by this check | **Protected path bypassed live** |
| L6 | Bash commands containing absolute outside paths (`~/.local/...`, `/dev/null`, `/tmp/...`) | `DC_DEV_SCOPE_DENIED` on path-bearing tokens | All executed; one ran 120s to timeout; none denied | **No Bash enforcement** |
| L7 | Plugin module sanity (subprocess, not runtime) | — | `factory-ok, hooks: permission.ask,command.execute.before,tool.execute.before,tool.execute.after` | Module loads; failure is in load/dispatch, not syntax |

**Cause analysis.** The serving process bootstrapped at 02:45:56Z — before Make finalized iteration 3 at 02:53:43Z — so the user's restart did not produce a runtime holding the final plugin bytes. From inside the session it cannot be fully distinguished whether the plugin (a) never loaded, (b) loaded an earlier/stale variant, or (c) loads but its event hooks are not dispatched for these sessions; all three imply the same acceptance result (runtime enforcement absent), and the recommended boot-time self-test (next_recommended #1) disambiguates permanently. Supporting fact: local path-based plugins do load in this runtime (`agent-flow.ts`/`agent-flow-tts.ts` register `flow_state`/`tts_ensure`, both present in this session's tool surface), so path-based registration itself is not the blocker.

## Per-GAP Verification (Make's iteration-3 claims)

- **GAP-1 (workspace-default allowlist)** — Code-true, live-unproven, latent P1. `plugins/dc-dev-runtime.mjs:16` defaults `allowedPaths` to `[directory]`; unit test passes. But live, legitimate writes pass only because nothing enforces; if the plugin dispatched, the absolute-path rejection would deny them (P1-2). **Partial.**
- **GAP-2/3 (Bash, traversal, protected paths, symlinks rejected)** — Primitive-true, live-false. `scope-guard.mjs` canonicalizes roots/candidates/parents, detects symlink path components, rejects traversal; audit and unit tests exercise these. Live probes L3-L6 show zero Bash/write enforcement. Lexical Bash filter has documented bypasses (`source x.sh`, `find ~ -name ... -exec`, `cat $VAR` env indirection, interpreter `-e`). **Partial.**
- **GAP-4 (T-033 executes 8 real checks)** — Verified real execution: `node context/fixtures/security/workspace-audit.mjs` → `status: ok`, 8 `checksExecuted`, `findings: []`. But all behavioral checks invoke the plugin's hooks in-process with relative-path shapes; the audit is green while the live runtime violates every guarantee it implies. **Partial (depth improved, dispatch layer uncovered).**
- **GAP-5 (durable approvals)** — Real durable store: atomic temp+rename write, mode 0600, sha256 request hash, expiry, revocation, UUID ids; store file exists at `context/impl/.dc-dev-approvals.json` (mode 600). Remaining: actor is caller-supplied text (no provenance/session binding/signature), store path is `process.cwd()`-dependent, validation duplicated in `entry.mjs` (drift risk), and the workspace store currently holds leftover test data (`approvedAt: 1000`) — cwd-dependence hazard demonstrated. **Partial.**
- **GAP-6 (trace corrected)** — Iter 1 and Iter 2 now read `Status: REJECT`, matching their verdicts. Iter 3 still contradicts itself: `Status: PASS` on line 22 vs `Verdict: REVISE` on line 26 (same defect class Check 2 flagged), and the Evidence line states live-sounding rejections that the running system does not exhibit. **Partial.**
- **GAP-7 (runtime dispatch verifiable)** — **FAIL.** This check was the verification: probes L1-L6. Zero dispatch evidence, zero enforcement, out-of-workspace writes and a protected-path Bash call succeeded.

## Gap Analysis R1-R25 / 88 AC

Independent count from the five kits: 25 requirements, 88 acceptance criteria (11+17+18+19+23), no duplicate/malformed IDs. Fresh full-suite run: **37 tests, 37 pass, 0 fail** (32.2s). No requirement reaches Complete: kit Constraints and DoD require runtime-confirmed enforcement, which fails live.

| Requirement | Status | Iteration 3 result / remaining gap |
|---|---|---|
| R1 | Partial | Parser/count + R-ID references exist; no bidirectional kit update from any iteration discovery. |
| R2 | Partial | Delegation primitives pass; no runtime delegation trace. |
| R3 | Partial | English artifacts verified in code; conversational path unproven. |
| R4 | Partial | `dc-dev-result.json` schema-valid with honest `status: failed`; per-phase emission unproven. |
| R5 | Partial | `dc-dev` exists, but `cavekit`, `cavekit-orchestrator`, `gentle-orchestrator` remain `mode: primary` public doors in `opencode.json`. |
| R6 | Partial | Triage is binary regex; no ambiguity branch ("exactly one clarifying question" unimplemented). |
| R7 | Partial | Durable attributable-shaped approvals with expiry/revocation/request-hash; provenance, session binding, and store anchoring missing. |
| R8 | Partial | Consultation route exists; no full no-mutation contract proof. |
| R9 | Partial | Protected regex exists; live bypass demonstrated (L5); Bash filter lexical. |
| R10 | Partial | Lifecycle ordering primitive passes; no runtime handoff gate. |
| R11 | Partial | Bounded primitive passes; live ownership/sentinel unproven. |
| R12 | Partial | Literal verdict parser passes; this check enforces P1→REJECT manually. |
| R13 | Partial | TDD order primitive passes; no 88-criterion red-run receipts. |
| R14 | Partial | Dedup primitive passes; runtime topology unproven. |
| R15 | Partial | Preflight primitive passes; defaults/handoff propagation unproven. |
| R16 | Partial | `dc-dev`=gpt-5.6-luna vs `cavekit-check`=glm-5.3 confirmed in config; dispatch precedence unproven. |
| R17 | Partial | Envelope/redaction primitive passes; orchestrator ownership unproven. |
| R18 | Partial | Cache exists; session lifecycle/refresh unproven. |
| R19 | Partial | Receipt primitives pass; user-owned stop unproven. |
| R20 | Partial | Type-surface probe real; **live dispatch unconfirmed → fails its own constraint** ("events the installed runtime actually dispatches"). |
| R21 | Partial | Writer/redaction exist; live trace is NOT deterministic (0 runtime entries; hand-written phase blocks). |
| R22 | Partial | Guard primitive solid (realpath/symlink/traversal); zero live enforcement + absolute-path model bug (P1-2). |
| R23 | Partial | Evidence parser exists; runtime `evidence.invalid` path never observed live. |
| R24 | Partial | Model separation config-verified; this report is the adversarial evidence; artifact-receipt coverage incomplete. |
| R25 | **Missing** | `spec-sync.mjs` remains a one-line truthiness stub (`Boolean(requirement && decision && test)`); three iterations produced no kit update from discoveries. |

**Aggregate:** Complete **0**, Partial **24**, Missing **1**, Over-built **0**. (Unchanged from Check 2 in shape; disk-level substance improved in R7/R21/R22, but the live-runtime criterion gates Complete.)

## Adversarial Peer Review

Fault-finding mode against Make's claims:

1. **The verification layer tests a fantasy input contract.** Every green "runtime" test — `runtime.iter3.test.mjs`, `workspace-audit.mjs` — feeds `{ args: { path: "relative.md" } }`. The official `@opencode-ai/plugin` types (read from `node_modules` this check) declare `output: { args: any }`, and the real tools send absolute `filePath`. The test suite is green against shapes production never produces. This is artifact-existence substitution's subtler cousin: shape-substitution.
2. **The allowlist default is safe only by accident.** `?? directory` is reasonable, but combined with `isAbsolute → reject`, the "allowlist" can never allow a real write. The security control and the usability control cancel out; neither Make's tests nor the audit noticed because neither uses runtime-real arguments.
3. **T-033 green is a false security gate at the layer that matters.** It now executes real predicates (good) but validates the plugin's functions, not the platform's dispatch. Its `findings: []` coexists with a live runtime that permits out-of-workspace writes and protected-path Bash — the exact scenario the audit exists to catch.
4. **Restart discipline is a single point of failure with no instrumentation.** No `plugin.loaded` heartbeat, no version stamp, no post-restart smoke assertion. The whole enforcement story silently depends on an operator action nobody can verify from inside the system.
5. **Bash confinement remains heuristic.** `commandPathCandidates` tokenizes and pattern-matches; `source`, `find -exec`, env-var indirection, and interpreter `-e` all evade it. `permission.bash."*": "ask"` is the only real backstop and resolved to `allow` in practice (observed in logs).
6. **Approval durability without provenance is integrity theater.** The store is durable, but any process that can write the workspace can mint a valid approval record; `actor: "human:alice"` is an assertion, not an attribution. Test data in the production store path proves the boundary is porous.

**Peer Review:** P0 **0**, P1 **3**, P2 **4**, P3 **2**.

## Security Axis

**Security Gates: FAIL.**

- **Configuration/secrets:** No literal provider secrets in `opencode.json` (env interpolation only) ✓. Config file permissions check ✓ (audit). `read` deny list is solid but does not constrain Bash; Bash `"*": "ask"` resolved to `allow` for every observed call.
- **Plugin (context escape):** `DC_DEV_TRACE_PATH` is honored without workspace confinement — an env-controlled arbitrary append target. Plugin trace records raw paths/commands with only key-value secret redaction.
- **Scope guard:** realpath/canonicalization/symlink logic is correct as a primitive, but rejects all absolute paths (P1-2) and is not dispatching live (P1-1).
- **Protected paths (live):** `.env` touched via Bash, `exit=0` — bypass demonstrated, contents not read by the checker. `denyProtected` regex misses `*.key`, `*.pem`, `.aws/credentials`, `gh/hosts.yml`, `id_rsa` — all present in the config read-deny list.
- **T-033:** Real output, 8 checks, but in-process only; green while live guarantees are violated.
- **Approvals:** Durable + expiring + revocable + request-bound; no provenance, no session binding, cwd-dependent store, duplicated validation logic.
- **Audit trail:** Live runtime produces no mechanical trace at all (0 entries) — R21's "failed trace write prevents success" is untestable in a system where trace writes never happen.

## Trace Consistency

`context/impl/trace.md` (26 lines): top-level historical verdict lines intact; Iter 1 `Status: REJECT` ✓; Iter 2 `Status: REJECT` ✓ (Check-2's contradiction fixed); Iter 3 `Status: PASS` contradicts its own `Verdict: REVISE` and its Evidence line asserts rejections the running system does not perform. After live validation, Iter 3's `Runtime: NOT VERIFIED — restart OpenCode 1.18.18 before Check 3` line was accurate and remains the honest state: this Check 3 attempted the verification and it failed. The Check 3 verdict line is appended below by this report (hand-written, like all current trace content — itself evidence that R21 deterministic tracing is not operational).

## Verdict

Verdict: REJECT

The iteration closed every gap it could reach from disk and honestly flagged runtime verification as pending; Check 3 performed that verification and it failed — not marginally, but totally: zero dispatch evidence, live out-of-workspace writes, live protected-path Bash access, plus a latent absolute-path model that would break all legitimate writes the moment dispatch starts working. P1 findings block advancement per R12 and the enforcement kit's own security gates. Do not ship. Next: `make with gaps` targeting the seven items in `next_recommended`, then a fresh restart and Check 4 live re-verification.
