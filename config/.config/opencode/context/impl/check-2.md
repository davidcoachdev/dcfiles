# Dc-Dev Unified Agent — Check 2

**Scope:** Independent verification of Make iteration 2 against `context/kits/` (R1-R25, 88 acceptance criteria), the build plan, ADR-001, and Check 1's six P1 findings. This check did not modify implementation files. The required verdict trace line was appended to `context/impl/trace.md`.

## Result Contract

- **status:** `failed`
- **executive_summary:** The six claimed fixes are present only in part. The plugin is registered and its exported hook names match the locally probed OpenCode 1.18.18 type surface, but no live post-restart OpenCode dispatch was exercised. The scope and approval unit tests pass, yet the globally registered plugin has no configured `DC_DEV_ALLOWED_PATHS` and therefore rejects every edit/write/patch operation; Bash remains an approval-mediated bypass for protected files. Approval records are attributable and time-bounded in memory, but are caller-supplied and not durably persisted or trace-linked. T-033 has real output but audits only four shallow predicates. The 25/25 and 88/88 artifacts remain parser/existence claims, not criterion-level implementation coverage. Independent recheck: 0 requirements complete, 24 partial, 1 missing; 0/88 acceptance criteria can be marked complete end-to-end from the available evidence.
- **artifacts:** `context/impl/check-2.md`, `context/impl/trace.md`
- **verdict:** `Verdict: REJECT`
- **critical_gaps:**
  - P1 — The globally loaded runtime plugin creates `guard = null` when `DC_DEV_ALLOWED_PATHS` is unset, then rejects all `edit`, `write`, and `patch` tools. No legitimate-write configuration is present in `opencode.json`; this breaks normal operation and is not scoped to Dc-Dev.
  - P1 — Changing Bash `*` from `allow` to `ask` is not a protected-file boundary. A user-approved Bash command can still read `.env`, credentials, SSH material, or secrets; the read deny rules do not constrain shell execution.
  - P1 — Scope enforcement covers only `output.args.path`/`filePath` for three tool names. It does not cover Bash file writes/reads, arbitrary command arguments, other path-bearing arguments, or trace paths. The symlink test proves one outside-target case, not complete mechanical confinement.
  - P1 — HITL approval is still a caller-controlled object. `routeRequest`/`triage` validate fields and a request hash but do not verify provenance, persist the record, emit an audit event, or bind it to an authorized session; a fabricated object with a known hash can satisfy the check.
  - P1 — T-033 output is real (`status: ok`), but `workspace-audit.mjs` checks only plugin existence, one Bash wildcard value, a narrow `sk-` regex, and one valid scope path. It does not independently exercise runtime dispatch, protected-file access, symlink/traversal rejection, approval lifecycle, evidence integrity, trace redaction, or stop behavior. The green result is therefore a false security gate.
  - P1 — Runtime compatibility is not fully verified. The probe reads the installed declarations and starts a server smoke process; it does not load the modified config/plugin and exercise each hook after the required OpenCode restart. The plugin hook shape is plausible and registered, but dispatch remains unproven.
  - P1 — `trace.md` now records this verdict, but the Iteration 2 section still says `Status: PASS` and has no literal `Verdict: APPROVE|REVISE|REJECT` line of its own. The appended line is outside the section, so the trace is internally inconsistent and not a clean phase record.
- **security:** `FAIL` — unresolved P1 enforcement, protected-file, approval, audit-evidence, and runtime-verification findings.
- **next_recommended:** `make with gaps` — first scope the plugin to Dc-Dev or configure a safe explicit allowlist without globally breaking writes; enforce protected paths at the Bash boundary; replace caller-supplied approval with durable request-bound authorization; expand T-033 into adversarial executable checks; then restart OpenCode and run live hook dispatch tests before Check 3.
- **skill_resolution:** `partial` — `context/refs/kit-index.json` exists and resolves the principal Cavekit/Gentle AI skills, but its own entry and the build plan retain the previously recorded `partial` capability-discovery state; no new resolved cache was produced by iteration 2.

## Verification Evidence

### Test execution

Command executed from `/home/dcdebian/.config/opencode`:

```text
node --test <all discovered *dc-dev*.test.mjs files>
```

Result: **30 tests, 30 pass, 0 fail, 0 skipped**. This includes the four iteration-2 tests. The result is valid unit/fixture evidence, but several existing tests only assert artifact existence or parser counts.

Independent T-033 command:

```text
node context/fixtures/security/workspace-audit.mjs
```

Real output:

```json
{
  "status": "ok",
  "findings": []
}
```

The output is genuine, but the audit's assertions are too narrow for the security gate described by T-033.

### GAP-1 — runtime plugin registration

**Partial, not closed.** `opencode.json:460-461` registers `/home/dcdebian/.config/opencode/plugins/dc-dev-runtime.mjs`. The plugin exports a default async factory and returns `permission.ask`, `command.execute.before`, `tool.execute.before`, and `tool.execute.after`; the names match the installed declaration probe recorded as OpenCode `1.18.18`. The test at `hooks/dc-dev/runtime-registered.iter2.test.mjs` only imports the factory and checks returned keys. The probe does not dispatch hooks through a running process, and OpenCode loads configuration/plugins at startup. A restart was not available in this check, so live runtime validation is explicitly **not claimed**.

### GAP-2 — realpath and symlink scope guard

**Partial, not closed.** `scope-guard.mjs` canonicalizes the root, existing candidates, and nearest existing parents; the iter2 test proves an outside symlink is rejected. It does not reject an internal symlink, inspect all mutation forms, or protect shell commands/trace paths. The plugin invokes the guard only for three tool names and only for two argument keys.

### GAP-3 — Bash wildcard and credential

**Not closed.** `opencode.json:434-442` now has Bash `"*": "ask"`, and provider keys use `{env:...}` references rather than a literal `sk-` credential. That removes the Check 1 wildcard allow and the narrow hardcoded-secret finding, but `ask` is not `deny`; an approved shell command can still bypass the separate `read` deny patterns. The security boundary therefore remains unsafe.

### GAP-4 — T-033 audit

**Evidence exists; requirement remains partial.** `workspace-audit.mjs` was executed and its output is copied into `dc-dev-security-review.md`. The implementation is not an independent adversarial audit: its four checks cannot detect the plugin's default-deny functional break, Bash bypass, forged approval, incomplete path coverage, missing trace verdict, or absent live dispatch.

### GAP-5 — HITL approval

**Partial, not auditable enough.** `approveBuild` creates UUID, actor, timestamps, and request hash; `triage` rejects expiry, revocation, and request mismatch. The test proves those in-memory branches. There is no durable store, signature/session lookup, append-only audit event, or runtime authorization check. `entry/entry.mjs` duplicates the validation and accepts a structurally fabricated `state.approval`, so attribution is data supplied by the caller rather than verified provenance.

### GAP-6 — trace

**Partial.** The file contains the Check 1 REJECT and an Iteration 2 evidence section, and this check appended a literal Check 2 REJECT line. However, Iteration 2 still says `Status: PASS`, its `Evidence` line says all listed controls passed, and the new verdict is not inside the Iteration 2 record. Trace history is therefore present but contradictory and not deterministic enough for audit.

## Gap Analysis R1-R25 / 88 AC

The kit parser independently found **25 requirements and 88 unchecked acceptance-criteria entries**, with no duplicate IDs or malformed criteria. The separate `dc-dev-final-coverage.json` still asserts `25/25` and `88/88`, but only as static strings. Because no complete criterion-to-implementation/test/trace mapping is evidenced, no AC is promoted to Complete.

| Requirement | Status | Iteration 2 result / remaining gap |
|---|---|---|
| R1 | Partial | Count exists; no bidirectional criterion evidence or enforced kit update. |
| R2 | Partial | Delegation primitives exist; no proven runtime routing/factory execution. |
| R3 | Partial | Artifact-language primitive exists; no complete artifact scan and conversation-path proof. |
| R4 | Partial | Contract schema exists; not every phase is proven to emit it with real evidence. |
| R5 | Partial | `dc-dev` exists, but `cavekit`, `cavekit-orchestrator`, and `gentle-orchestrator` remain public primary doors. |
| R6 | Partial | Triage exists; no complete ambiguity/rationale trace integration. |
| R7 | Partial | Attribution/expiry/revocation/request binding tested in memory; provenance and durable audit missing. |
| R8 | Partial | Consultation route exists; no full no-mutation/error contract proof. |
| R9 | Partial | Protected-path checks exist, but Bash and plugin scope bypasses remain. |
| R10 | Partial | Lifecycle primitive passes; no complete phase-handoff/failure gate. |
| R11 | Partial | Bounded primitive exists; live ownership/lock/sentinel integration unproven. |
| R12 | Partial | Literal verdict parser and P1 branch pass; security evidence gate can false-pass. |
| R13 | Partial | TDD order primitive passes; no 88-criterion red/green/refactor receipts. |
| R14 | Partial | Dedup primitive passes; runtime topology/conflict serialization incomplete. |
| R15 | Partial | Preflight primitive exists; required defaults and propagated handoff are not proven. |
| R16 | Partial | Distinct configured models are present; full precedence/fallback dispatch remains unproven. |
| R17 | Partial | Envelope/redaction primitive exists; orchestrator ownership and save-before-return incomplete. |
| R18 | Partial | Registry exists; session lifecycle, refresh, and unavailable-skill behavior incomplete. |
| R19 | Partial | Receipt primitives exist; complete launch and user-owned stop/resume behavior unproven. |
| R20 | Partial | Registration and declaration probe pass; live OpenCode 1.18.18 dispatch was not exercised. |
| R21 | Partial | Trace writer/redaction exists; current record is contradictory and plugin trace path is unconstrained. |
| R22 | Partial | Realpath/symlink unit case passes; enforcement does not cover all path-bearing mutations or Bash. |
| R23 | Partial | Parser exists; actual command binding, stale revision, and complete receipt pipeline incomplete. |
| R24 | Partial | Model separation and adversarial primitives exist; Check input/evidence coverage is not complete. |
| R25 | **Missing** | No deterministic kit/spec update is produced from the Iteration 2 fixes. |

**Aggregate:** Complete **0**, Partial **24**, Missing **1**, Over-built **0**. Previous Missing R7/R9/R22 moved to Partial based on new unit evidence; no requirement reached Complete. No new requirement ID appeared, but new blocking defects were found in the global plugin scope, approval provenance, audit depth, and trace consistency.

## Adversarial Peer Review

The review was run in fault-finding mode rather than accepting Make's Result Contract.

- **Runtime validity:** The default export and `tool.execute.*` hook shape agree with the plugin documentation and local type probe. The claim that the runtime is wired is still unproven because the test imports the module directly and the probe only type-scans plus server-smokes. `permission.ask`/`command.execute.before` must be validated by a live 1.18.18 dispatch after restart.
- **Functionality:** The plugin is global, while its allowlist is supplied only by an optional environment variable. With the current config, every edit/write/patch is rejected. This is a severe legitimate-write regression, not safe default-deny scoped to Dc-Dev.
- **HITL auditability:** The object has useful fields but no trusted issuer, persistence, revocation registry, event record, or session binding. Hashing a request proves integrity of the supplied string, not authorization of the actor.
- **Anti-patterns:** duplicated approval logic in `triage.mjs` and `entry.mjs` risks drift; artifact-existence tests substitute for behavioral tests; a global hook with an environment-dependent null guard is speculative/generalized enforcement without a safe runtime contract.

**Peer Review:** P0 **0**, P1 **6**, P2 **4**, P3 **0**.

## Security Axis

**Security Gates: FAIL.**

- **Configuration/secrets:** no literal provider secret was found; environment interpolation is appropriate. Bash `ask` remains an authorization prompt, not a deny rule for protected files.
- **Runtime/plugin:** registration is present and hook names are declaration-compatible, but live dispatch is unverified. `DC_DEV_TRACE_PATH` is accepted without workspace confinement, and plugin behavior is global rather than Dc-Dev-scoped.
- **Prompt injection/excessive agency:** the plugin does not implement prompt isolation, token/rate/recursion/tool budgets, or command-content policy. Those remain prompt-level or absent.
- **Write scope:** one realpath/symlink escape is blocked, but arbitrary shell paths and unrecognized path arguments are outside the guard.
- **Approval:** in-memory, caller-controlled records are not sufficient for attributable audit or revocation across process/session boundaries.
- **Evidence/audit:** T-033 is real but under-scoped and can return `ok` while the above weaknesses exist.

## Runtime Limitation

The Make note that OpenCode must be restarted to load modified configuration is correct. A restart/live-plugin dispatch was not available during this Check, so this report does not claim that the installed OpenCode 1.18.18 process actually loaded or fired the modified plugin. This limitation alone prevents Complete status for runtime-dependent criteria; the independent P1 defects already force rejection.

## Verdict

Verdict: REJECT

P1 gaps remain in enforcement, protected-file confinement, approval provenance, audit coverage, runtime proof, and trace consistency. Do not ship or advance to archive. Human approval remains required after Make addresses these findings and a fresh Check verifies live runtime behavior.
