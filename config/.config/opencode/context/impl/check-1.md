# Dc-Dev Unified Agent — Check 1

**Scope:** implementation produced by Make, checked against the five kits, the 36-task/9-wave plan, ADR-001, and the artifacts listed in the request.

## Result Contract

- **status:** `failed`
- **executive_summary:** The 25 requirements and 88 acceptance criteria are counted by a parser and the 27 primitive tests pass, but the evidence is not behavior-complete. The implementation is mostly a set of tested primitives and artifact-existence checks; the runtime wiring, mechanical confinement, independent security evidence, HITL approval state, and bidirectional spec update behavior are not proven. Security has blocking P1 findings.
- **artifacts:** `context/impl/check-1.md`, `context/plans/dc-dev-result.json`, `context/plans/dc-dev-final-coverage.json`, `context/plans/dc-dev-hook-runtime.md`, `context/plans/dc-dev-security-review.md`, `tests/dc-dev/`
- **verdict:** `Verdict: REJECT`
- **critical_gaps:**
  - P1 — Dc-Dev hooks are not wired into `opencode.json` or an OpenCode plugin entry; `scope-guard`, `trace-writer`, and `evidence-parser` are callable primitives, not runtime enforcement.
  - P1 — Write-scope enforcement is not a security boundary: it does not canonicalize/`realpath` candidates, inspect symlinks, lock an active scope, or stop an executing task. The only scope test covers a lexical traversal case.
  - P1 — The global permission `bash: {"*":"allow"}` plus `dc-dev.tools.bash: true` permits shell-based access to paths denied by the read policy, including `.env`, credentials, and SSH material. This bypasses the protected-file boundary.
  - P1 — T-033 independent security evidence was not executed. `dc-dev-security-review.md` is a policy stub and its test only checks file existence.
  - P1 — The approval boundary is a caller-controlled boolean (`state.approved`); there is no attributable, expiring, revocable approval record or stale-approval rejection.
  - P1 — `context/impl/trace.md` has no current Check verdict/event. This is a real R21 auditability gap; the plan's omission of `context/impl/trace.md` from every task write-scope is also a plan defect, not a valid reason to waive R21.
- **security:** `FAIL` — P1 findings above. Secret-like assignments were not found in `opencode.json`, but the shell permission bypass and unenforced hooks make the boundary unsafe.
- **next_recommended:** `make with gaps` — fix the P1 gaps, add runtime integration tests, execute independent T-033 evidence, then rerun Check. Human approval remains required before any ship decision.
- **skill_resolution:** `partial` — the implementation plan itself records a partial capability/skill resolution; `context/refs/kit-index.json` exists, but the advertised discovery helper was unavailable.

## Fresh Verification

Command executed: Node 24 test runner over all discovered Dc-Dev test files under `agents/dc-dev`, `hooks/dc-dev`, `tests/dc-dev`, and `context/fixtures`.

Result: **27 tests, 27 pass, 0 fail, 0 skipped**. This is useful primitive evidence, not proof that the installed OpenCode runtime enforces the behavior.

Runtime probe executed independently: OpenCode **1.18.18**, server smoke `true`; supported events were enumerated. The probe itself does not prove that Dc-Dev registers the hooks.

## Gap Analysis

**Aggregate:** Complete **0**, Partial **21**, Missing **4**, Over-built **0**. The aggregate is intentionally fail-closed: a passing primitive test is not counted as Complete when runtime integration or required evidence is absent.

Legend: `C` complete evidence for the criterion, `P` partial evidence, `M` missing/unproven. The 88-count excludes the kits' separate security-gate checkboxes; those gates are reviewed below and fail.

| Requirement | Status | Acceptance criteria status | Evidence / gap |
|---|---|---|---|
| R1 | Partial | AC1 P, AC2 M, AC3 M | `kit-coverage.mjs` counts kits/Rs/ACs, but there is no complete criterion-to-test/verification mapping or enforced next-iteration kit update. |
| R2 | Partial | AC1 P, AC2 M, AC3 C | Delegation primitive exists; no runtime proof of permitted specialist assignment or inline-edit rejection. No external orchestration dependency found. |
| R3 | Partial | AC1 P, AC2 M | English artifact primitive exists; no verified Spanish conversational path and no complete artifact-language scan. |
| R4 | Partial | AC1 C, AC2 C, AC3 P | Schema and result artifact exist; artifact existence/failure-reason validation is incomplete and does not prove every phase emits the contract. |
| R5 | Partial | AC1 P, AC2 M, AC3 M | `agent.dc-dev` exists, but `cavekit-orchestrator` remains a primary public agent and legacy-door exclusivity is not proven. |
| R6 | Partial | AC1 C, AC2 P, AC3 P, AC4 M | Table-driven primitive triage passes; rationale/ambiguity trace integration is absent. |
| R7 | Missing | AC1 M, AC2 M, AC3 M, AC4 M | Approval is only `state.approved`; no attributable token/record, expiry, revocation, or stale-approval state machine. |
| R8 | Partial | AC1 P, AC2 M, AC3 P | Consultation routing exists; no full no-mutation contract or safe error/next-action evidence. |
| R9 | Missing | AC1 M, AC2 M, AC3 M | No proven prompt-injection boundary, protected-file refusal path, or safe permission boundary. Bash bypass is a P1. |
| R10 | Partial | AC1 P, AC2 P, AC3 M | Lifecycle primitive tests order transitions; no actual phase handoff enforcement or failed-phase dependency gate. |
| R11 | Partial | AC1 P, AC2 P, AC3 P, AC4 M | Bounded/killable primitive exists; no real loop ownership lock, sentinel binding, or duplicate-loop runtime proof. |
| R12 | Partial | AC1 C, AC2 M, AC3 P, AC4 C | Literal parser and P0/P1 branch pass; approval does not independently verify all AC/evidence/security gates. |
| R13 | Partial | AC1 M, AC2 M, AC3 P | TDD primitive checks red/green/refactor order; no 88-criterion red-run mapping or full receipt attachment. |
| R14 | Partial | AC1 P, AC2 P, AC3 M, AC4 P | Deduplication primitive exists; no factory-preserving runtime topology, conflict serialization, or complete receipt proof. |
| R15 | Partial | AC1 M, AC2 M, AC3 M | Preflight returns identity and stop state, but does not resolve/validate required defaults, one HITL question, or propagated handoffs. |
| R16 | Partial | AC1 C, AC2 M, AC3 C, AC4 C | Make=`opencode-go/gpt-5.6-luna`, Check=`opencode-go/glm-5.3`; both are runtime-listed and distinct. Fallback precedence/recording is unproven. |
| R17 | Partial | AC1 P, AC2 P, AC3 C, AC4 P | Envelope/redaction primitive passes; orchestrator ownership, Engram persistence callback, and complete handoff evidence are not proven. |
| R18 | Partial | AC1 P, AC2 P, AC3 P, AC4 P | Cache artifacts exist; no session lifecycle, registry-change refresh, or typed unavailable-skill runtime path. |
| R19 | Partial | AC1 P, AC2 P, AC3 P, AC4 M | Receipt/preflight primitives exist; no complete launch receipt schema or user-owned kill/resume approval behavior. |
| R20 | Partial | AC1 C, AC2 M, AC3 C | Runtime probe is real and records fallback; `opencode.json` references no hook registrations, so the supported-event allowlist is not applied. |
| R21 | Partial | AC1 M, AC2 M, AC3 M, AC4 P | Writer redacts a narrow pattern, but is not wired, does not validate required schema fields, does not fail closed on write failure, and current trace lacks this verdict. |
| R22 | Missing | AC1 C, AC2 P, AC3 M, AC4 M | Lexical allowlist primitive passes its small test; no symlink escape protection, canonical path enforcement, scope immutability, stop state, or runtime mutation interception. |
| R23 | Partial | AC1 P, AC2 M, AC3 P, AC4 C | Parser checks command/exit/output/revision and a narrow secret regex; no requirement linkage, stale revision comparison, or actual command capture/redaction pipeline. |
| R24 | Partial | AC1 M, AC2 C, AC3 M, AC4 C | Model distinction and rejection of Make claims are tested; Check does not demonstrably receive all required artifacts or report all findings by R-ID. |
| R25 | Missing | AC1 M, AC2 M, AC3 M, AC4 M | `syncDecision` only checks truthiness; it does not update kits, propagate revisions, enforce linked tests, or pause scope expansion for HITL. |

## Adversarial Peer Review

The builder's claim of “25/25 and 88/88” is a parser-count claim, not implementation coverage. The strongest blind spot is **artifact-existence substitution**: runtime, security, operational, and final-coverage tests mostly assert that a report file exists. The peer challenge also found:

1. Model separation is valid as a static assignment and both identifiers are listed by the installed runtime, but this does not prove the actual Make/Check dispatch path uses those assignments.
2. Dc-Dev has a front-door-shaped function, but approval is a boolean and hooks are not connected to the front door or tool execution.
3. Hooks are deterministic only when called directly. They are not deterministic enforcement in OpenCode because no plugin/config registration consumes them.
4. The scope guard's `relative()` check is lexical; a symlink under an allowed directory can resolve outside the root. Bash permission provides a separate bypass.
5. The trace writer's regex is not a complete secret scanner and `appendFileSync` errors are not converted into a failed phase result.
6. `parseEvidence` accepts arbitrary command/output strings and does not bind evidence to requirement IDs or compare the revision to the active tree.

**Peer Review:** P0 **0**, P1 **6**, P2 **3**, P3 **0**.

## Security Axis

**Security Gates: FAIL.**

- **Configuration:** no secret-like assignments found in `opencode.json`; however, `permission.bash.*` is globally `allow`, while the protected-file deny list applies to `read`, and Dc-Dev explicitly has Bash. A shell command can therefore read protected files despite the read deny rules.
- **Hooks:** runtime capability was probed, but no registration is present in `opencode.json` and no plugin adapter was found that binds the primitives to `tool.execute.before` / `command.execute.before` / `permission.ask`.
- **Context injection:** the front-door implementation does not sanitize or structurally isolate untrusted request text; enforcement is prompt/boolean-level rather than code-enforced.
- **Write scope:** traversal is partially rejected, but symlinks and canonical paths are not checked; no actual write interception exists.
- **Audit evidence:** T-033 was not independently executed. `tests/dc-dev/security/security-review.test.mjs` only calls `existsSync` on the policy file.
- **Resource limits:** no mechanical token/rate/recursion/tool-budget limits are evidenced for the agent.

## Trace and Plan Defect

`context/impl/trace.md` contains two older verdict lines but no current Check-1 event. This is a real gap against **R21 AC1** (phase result/verdict must be represented) and weakens the R25 traceability loop. The plan is defective because T-012's write-scope is only `hooks/dc-dev/trace/**` and no task authorizes `context/impl/trace.md`; the plan cannot waive a kit requirement. No trace mutation was made in this Check phase because the user explicitly prohibited modifying files.

## Make Result Contract Validation

`context/plans/dc-dev-result.json` is structurally valid for its declared schema: `status=failed`, non-empty summary, existing artifact directories, `next_recommended=/sdd-cavekit check`, risks, and `skill_resolution=partial`. Its failed status and risks correctly acknowledge missing trace/security evidence. It does **not** contain a `verdict` field, so it is not by itself a complete Check Result Contract for this phase; this report supplies the required literal verdict and security result.

## Verdict

Verdict: REJECT

P0/P1 security and enforcement gaps block advancement. Do not ship. The next Make iteration should wire hooks into the real runtime, close shell permission bypasses, implement canonical/symlink-safe scope confinement and fail-closed trace/evidence enforcement, replace boolean approval with attributable HITL state, execute independent T-033 security evidence, and add integration tests that exercise the real OpenCode dispatch path.
