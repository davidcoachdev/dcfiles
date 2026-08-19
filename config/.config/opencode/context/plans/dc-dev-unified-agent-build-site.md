# Build Site: Dc-Dev unified agent

## Strategy and routing

- **Strategy:** `quality`
- **Depth:** `thorough` (architectural harness change, security-sensitive hooks/configuration, runtime compatibility unknown)
- **Topology:** 8 conservative waves. Each wave is gated by the previous wave; tasks within a wave are parallelizable unless they share a write scope.
- **Execution rule:** `cavekit-make` may dispatch only tasks whose dependency wave is complete and whose declared write scope is locked. No task may expand its scope during execution.
- **Reuse:** Port/adapt `cavekit gold loop`, `gentle-orchestrator`, `cavekit-check`, `autonomous-loop`, and `cavekit-make`; do not create a new sub-agent factory.

## Coverage Matrix

Every acceptance criterion under an R-number is covered by the implementation task and its verification task below. The coverage auditor (T-035) must parse the kits and fail if the count is not exactly 25 requirements / 88 acceptance criteria.

| Requirement / gate | Task(s) |
|---|---|
| R1 — kits are contract of record | T-002, T-026, T-035 |
| R2 — OpenCode-native delegated execution | T-003, T-017, T-036 |
| R3 — English artifact contract | T-003, T-027, T-035 |
| R4 — structured completion contract | T-008, T-023, T-035 |
| R5 — single public entry | T-017, T-031 |
| R6 — deterministic intent triage | T-015, T-017, T-031 |
| R7 — explicit HITL build approval | T-015, T-017, T-029, T-031 |
| R8 — consultation without mutation | T-017, T-031 |
| R9 — front-door security boundary | T-010, T-017, T-029, T-031 |
| R10 — ordered gold lifecycle | T-018, T-032 |
| R11 — bounded autonomous iteration | T-020, T-032 |
| R12 — literal verdict and security axis | T-021, T-025, T-032 |
| R13 — strict TDD per requirement | T-022, T-032, T-035 |
| R14 — factory-preserving delegation/deduplication | T-019, T-032 |
| R15 — hard SDD session preflight | T-016, T-023, T-032 |
| R16 — authoritative phase model routing | T-006, T-024, T-030, T-032 |
| R17 — orchestrator-owned context protocol | T-009, T-023, T-032 |
| R18 — session-scoped skill resolution | T-009, T-028, T-032 |
| R19 — routing, receipts, user-owned stop | T-016, T-020, T-023, T-032 |
| R20 — runtime-confirmed hook surface | T-001, T-007, T-011, T-028, T-029 |
| R21 — deterministic trace.md | T-012, T-028, T-032 |
| R22 — mechanical write-scope enforcement | T-010, T-013, T-029, T-032 |
| R23 — mandatory real test evidence | T-014, T-022, T-032 |
| R24 — adversarial verifier with model separation | T-025, T-030, T-033 |
| R25 — bidirectional spec updating | T-026, T-035 |
| Overview security gates: secrets, approval, scope, real evidence, P0/P1 block | T-010, T-013, T-014, T-029, T-033 |
| Front-door security gates: no inferred approval, redaction, injection resistance, refusal/cancellation | T-010, T-015, T-017, T-031 |
| Gold-loop security gates: P0/P1 => REJECT, sentinel/receipt integrity, bounded loop | T-020, T-021, T-025, T-032 |
| Protocol security gates: phase/model authority, context redaction, user stop, no secret propagation | T-006, T-009, T-016, T-023, T-030 |
| Enforcement security gates: runtime event proof, trace redaction, path confinement, evidence integrity | T-007, T-012, T-013, T-014, T-028, T-029 |

## Tasks

### Wave 1 — Evidence and contract baseline (no dependencies)

| Task | Kit(s) / R-numbers | Actionable description | Dependencies | Write-scope | Effort |
|---|---|---|---|---|---|
| T-001 | ADR, R20 | Inventory the target OpenCode runtime and produce a reproducible hook-capability probe. Record supported event names, payloads, ordering, failure behavior, and changed-event behavior; do not infer unsupported events. | None | `context/plans/dc-dev-hook-runtime.md`, `context/fixtures/hooks/**` | L |
| T-002 | All kits, R1 | Build a parser/coverage fixture that enumerates the five kits, R1-R25, all 88 acceptance criteria, dependencies, security gates, and cross-references. Fail closed on missing, duplicate, or malformed IDs. | None | `context/plans/dc-dev-coverage.json`, `tests/dc-dev/kit-coverage.*` | M |
| T-003 | ADR, reuse report, R2-R3 | Define the port/adapt boundary: preserve the existing factory and OpenCode-native agents, bind reused protocols to Dc-Dev terminology, and define neutral-English artifact schemas without duplicating ADR rationale. | None | `context/plans/dc-dev-contract.md`, `context/plans/dc-dev-reuse-bindings.json` | M |
| T-004 | R4, R19, capability discovery | Resolve the project capability/skill registry inputs and record available versus unavailable tools. If the expected discovery script/cache is absent, record `setup-required` rather than inventing capabilities. | None | `context/plans/dc-dev-capabilities.json`, `context/plans/dc-dev-skill-resolution.md` | S |

### Wave 2 — Configuration and enforcement design (parallel after Wave 1)

| Task | Kit(s) / R-numbers | Actionable description | Dependencies | Write-scope | Effort |
|---|---|---|---|---|---|
| T-005 | R5, R16 | Design the single public agent configuration and phase-agent naming contract, including consultation/build routing and explicit `sdd-<phase>` entries. Preserve existing agents and factory wiring. | T-001, T-002, T-003 | `context/plans/dc-dev-config-design.md` | M |
| T-006 | R15-R16, R24 | Specify authoritative model resolution: phase assignment in `opencode.json` wins, default is fallback only, and Make and Check must resolve to distinct configurable models. Define invalid/missing assignment behavior. | T-001, T-003 | `context/plans/dc-dev-model-routing.md`, `context/fixtures/config/**` | L |
| T-007 | R20 | Turn the runtime probe into a hook integration contract with supported-event allowlist, payload schema, version/change detection, and fail-closed behavior for unsupported events. | T-001, T-004 | `context/plans/dc-dev-hook-contract.md`, `tests/dc-dev/hooks/fixtures/**` | L |
| T-008 | R4, R19, R23 | Define and schema-test the Result Contract fields and allowed statuses, including artifact paths, next recommendation, risks, and `skill_resolution`; prohibit secret-bearing values. | T-002, T-003 | `context/plans/dc-dev-result-contract.schema.json`, `tests/dc-dev/result-contract.*` | M |
| T-009 | R17-R18 | Define the orchestrator-owned context envelope, Engram persistence callback, redaction rules, session-scoped skill cache lifecycle, cache miss/registry-change behavior, and unavailable-skill fallback. | T-002, T-004 | `context/plans/dc-dev-context-protocol.md`, `context/plans/dc-dev-skill-cache.md` | L |
| T-010 | R9, R22, security gates | Produce the threat model and enforcement policy for prompt injection, secret/protected-file redaction, unauthorized transitions, path traversal/symlink escapes, scope changes, and refusal/cancellation. | T-001, T-003, T-004 | `context/plans/dc-dev-security-policy.md`, `context/fixtures/security/**` | L |

### Wave 3 — Deterministic primitives (parallel after Wave 2)

| Task | Kit(s) / R-numbers | Actionable description | Dependencies | Write-scope | Effort |
|---|---|---|---|---|---|
| T-011 | R20 | Implement the runtime-confirmed hook adapter. Register only probed events, validate payloads, emit structured failures for unavailable/changed events, and expose a test seam for runtime fixtures. | T-007, T-010 | `hooks/dc-dev/**` | L |
| T-012 | R21 | Implement deterministic `trace.md` enforcement: append structured phase/task/iteration events, preserve ordering and failure records, redact secrets, and reject prompt-only trace claims. | T-007, T-008, T-010 | `hooks/dc-dev/trace/**`, `context/impl/trace.md`, `context/plans/trace.schema.json` | L |
| T-013 | R22 | Implement mechanical write-scope confinement with canonical paths, traversal/symlink protection, allowed/denied mutation tests, scope-locking, stop-state, and receipt generation. | T-007, T-010 | `hooks/dc-dev/scope/**`, `tests/dc-dev/scope/**` | L |
| T-014 | R23 | Implement real-command evidence capture and parser. Bind completion to actual exit status/output, reject missing/failed/stale/secret-containing evidence, and attach redacted receipts to the Result Contract. | T-008, T-010 | `hooks/dc-dev/evidence/**`, `tests/dc-dev/evidence/**` | L |
| T-015 | R6-R7, R9 | Implement deterministic consultation/build triage and an approval state machine with attributable approval, expiry/revocation, refusal, cancellation, and no inferred approval. | T-008, T-010 | `agents/dc-dev/front-door/**`, `tests/dc-dev/front-door/**` | L |
| T-016 | R15, R19 | Implement hard SDD preflight, routing receipt, interactive/auto mode boundary, user-owned stop signal, and handoff propagation before any phase delegation. | T-008, T-009, T-015 | `agents/dc-dev/preflight/**`, `context/plans/dc-dev-receipts.md` | L |

### Wave 4 — Core orchestration (parallel after Wave 3)

| Task | Kit(s) / R-numbers | Actionable description | Dependencies | Write-scope | Effort |
|---|---|---|---|---|---|
| T-017 | R2, R5-R9 | Implement the single Dc-Dev public entry agent. Route consultation without mutation; route approved build requests to preflight; enforce security boundary and explicit refusal/cancellation paths. | T-011-T-016 | `agents/dc-dev/entry/**`, `opencode.json` (Dc-Dev entry only) | L |
| T-018 | R10 | Implement the ordered lifecycle state machine Retrieve → Sketch → Map → Make ↔ Check, with invalid-transition and phase-failure handling. | T-011, T-012, T-016 | `agents/dc-dev/gold-loop/lifecycle/**` | L |
| T-019 | R14 | Implement smallest-useful-topology delegation through the existing factory, phase/task/iteration identity, launch deduplication, and conflicting-scope rejection. | T-013, T-016 | `agents/dc-dev/delegation/**` | L |
| T-020 | R11, R19 | Port/adapt bounded autonomous-loop controls: max five cycles, lock/heartbeat, sentinel integrity, user kill switch, unresolved-security blocking, and no duplicate launch. | T-012, T-014, T-016, T-019 | `agents/dc-dev/gold-loop/iteration/**` | L |
| T-021 | R12 | Implement literal Check verdict parsing and mandatory security axis. Enforce exact APPROVE/REVISE/REJECT output and map P0/P1 findings to blocking REJECT. | T-008, T-014, T-020 | `agents/dc-dev/check/verdict/**` | M |
| T-022 | R13, R23 | Port Strict TDD orchestration: criterion-level red → green → refactor trace, required command execution, criterion-to-test linkage, and evidence gate before completion. | T-012, T-014, T-018 | `agents/dc-dev/make/tdd/**` | L |

### Wave 5 — Protocol and configuration integration (parallel where scopes do not overlap)

| Task | Kit(s) / R-numbers | Actionable description | Dependencies | Write-scope | Effort |
|---|---|---|---|---|---|
| T-023 | R4, R15, R17-R19 | Integrate Result Contract, preflight, context envelope, skill-resolution receipt, phase receipts, Engram-save-before-return, redaction, and user-stop propagation across all phase agents. | T-017-T-022 | `agents/dc-dev/protocol/**`, `context/plans/dc-dev-receipt.schema.json` | L |
| T-024 | R16, R24 | Implement explicit `opencode.json` model assignments for every SDD phase, with distinct Make and Check models, precedence tests, and safe failure for invalid model identifiers. | T-006, T-017, T-021 | `opencode.json` (agent model assignments only), `tests/dc-dev/config/**` | L |
| T-025 | R12, R24 | Implement the adversarial Check verifier with an explicit opposite goal to Make, independent evidence review, kit comparison, security axis, and model-separation assertion. | T-021, T-022, T-024 | `agents/dc-dev/check/adversarial/**`, `tests/dc-dev/check/**` | L |
| T-026 | R1, R25 | Implement bidirectional spec updating: map every implementation/test/trace result back to R and acceptance criterion, and update the kit/spec index only through deterministic receipts. | T-002, T-012, T-014, T-023 | `agents/dc-dev/spec-sync/**`, `context/plans/dc-dev-spec-sync.schema.json` | L |
| T-027 | R3 | Implement artifact-language and schema validation for neutral English technical artifacts, while preserving user-language conversation output. | T-008, T-023 | `hooks/dc-dev/artifact-validation/**`, `tests/dc-dev/artifacts/**` | M |

### Wave 6 — Runtime and security verification (parallel after Wave 5)

| Task | Kit(s) / R-numbers | Actionable description | Dependencies | Write-scope | Effort |
|---|---|---|---|---|---|
| T-028 | R18, R20-R21 | Execute runtime hook validation against supported, unsupported, and changed-event fixtures; verify trace replay, ordering, redaction, and failure behavior in the actual OpenCode runtime. | T-011, T-012, T-023 | `context/plans/dc-dev-runtime-validation.md`, `tests/dc-dev/runtime/**` | L |
| T-029 | R7, R9, R20, R22-R23 | Perform a security review of hook configuration and enforcement: approval boundary, event allowlist, secret redaction, protected paths, symlink/traversal cases, write-scope stop, and real evidence integrity. | T-013-T-017, T-024 | `context/plans/dc-dev-security-review.md`, `tests/dc-dev/security/**` | L |
| T-030 | R16, R24 | Validate model assignments in the real configuration at implementation time: Make and Check resolve independently, Check is adversarial, fallback precedence is correct, and no phase silently inherits the wrong model. | T-024, T-025 | `context/plans/dc-dev-model-validation.md`, `tests/dc-dev/model-routing/**` | L |
| T-031 | R5-R9 | Run front-door integration/adversarial tests: consultation, build, ambiguous intent, approval lifecycle, prompt injection, redaction, protected context, refusal, cancellation, and no-mutation guarantees. | T-017, T-023, T-027 | `tests/dc-dev/e2e/front-door/**` | L |
| T-032 | R10-R14, R19, R23 | Run gold-loop integration tests with phase order, bounded iteration, kill switch, sentinel spoof, literal verdicts, P0/P1 rejection, Strict TDD, deduplication, receipts, and evidence gates. | T-018-T-025 | `tests/dc-dev/e2e/gold-loop/**` | L |

### Wave 7 — Full quality audit (parallel after Wave 6)

| Task | Kit(s) / R-numbers | Actionable description | Dependencies | Write-scope | Effort |
|---|---|---|---|---|---|
| T-033 | All security gates, R9, R12, R22-R24 | Run an independent adversarial security audit against the implementation, hooks, configuration, traces, receipts, and evidence. Any P0/P1 finding forces `Verdict: REJECT` and blocks the build. | T-028-T-032 | `context/plans/dc-dev-adversarial-audit.md` | L |
| T-034 | R2-R4, R17-R19, R21, R23 | Verify operational receipts and failure recovery: every phase returns the Result Contract, context is saved before handoff, trace/evidence are redacted, and user stop/cancellation is observable and resumable only through an explicit new approval. | T-023, T-028-T-032 | `context/plans/dc-dev-operational-verification.md`, `tests/dc-dev/receipts/**` | L |
### Wave 8 — Coverage closure (after independent audit)

| Task | Kit(s) / R-numbers | Actionable description | Dependencies | Write-scope | Effort |
|---|---|---|---|---|---|
| T-035 | R1, R3-R4, R13, R25 | Run the deterministic coverage auditor against all kits. Prove 25/25 requirements and 88/88 acceptance criteria have implementation, test, trace/evidence, and bidirectional mapping coverage; fail closed on any gap. | T-002, T-026-T-034 | `context/plans/dc-dev-final-coverage.json`, `tests/dc-dev/final-coverage.*` | L |

### Wave 9 — Final gate (sequential quality gate)

| Task | Kit(s) / R-numbers | Actionable description | Dependencies | Write-scope | Effort |
|---|---|---|---|---|---|
| T-036 | All kits, ADR | Execute final project-native verification: JSON validation, hook/runtime tests, unit/integration/E2E suites, lint/typecheck if discovered, `git diff --check`, scope audit, model-separation audit, and secret scan. Produce the final Result Contract and only allow `status: ok` when all gates pass. | T-033-T-035 | `context/plans/dc-dev-final-verification.md`, `context/plans/dc-dev-result.json` | L |

## Cavekit-make execution metadata

```yaml
feature: dc-dev-unified-agent
strategy: quality
depth: thorough
token_budget: 45000
max_iterations: 5
waves: 9
tasks: 36
parallelism:
  wave_1: [T-001, T-002, T-003, T-004]
  wave_2: [T-005, T-006, T-007, T-008, T-009, T-010]
  wave_3: [T-011, T-012, T-013, T-014, T-015, T-016]
  wave_4: [T-017, T-018, T-019, T-020, T-021, T-022]
  wave_5: [T-023, T-024, T-025, T-026, T-027]
  wave_6: [T-028, T-029, T-030, T-031, T-032]
  wave_7: [T-033, T-034]
  wave_8: [T-035]
  wave_9: [T-036]
blocking_rules:
  - runtime hook capability is unknown or changed
  - Make and Check resolve to the same model
  - missing real test evidence
  - out-of-scope mutation
  - secret/protected-file leakage
  - any P0/P1 security finding
  - coverage != 88 acceptance criteria
```

## Coverage check

- Requirements mapped: **25/25**.
- Acceptance criteria mapped: **88/88 by deterministic kit parser and T-035**.
- Security gates mapped as first-class work: **yes** (T-010, T-013, T-014, T-020, T-021, T-025, T-028-T-030, T-033-T-036).
- Proceed condition: T-002 and T-035 must independently confirm the exact kit count and AC count. If either reports a mismatch, stop with `status: failed`; do not proceed to Make.

## Risks

1. **Runtime hook events are unverified:** T-001/T-007/T-028 are hard blockers; no enforcement implementation may rely on assumed OpenCode events.
2. **Configuration write conflict:** `opencode.json` is intentionally touched only by T-017 and T-024, with T-029/T-030 auditing it read-only. Make must serialize those writes.
3. **Skill discovery cache unavailable:** the expected discovery script was not found at the path advertised by the capability-discovery skill during mapping. T-004 records this as `setup-required`; it must not fabricate a resolved capability set.
4. **Model separation drift:** T-024 writes assignments and T-030 validates the resolved runtime behavior; both are required before Check can approve.
5. **Sentinel spoofing:** T-020/T-032/T-033 require evidence and security gates, so completion text alone cannot terminate the loop.

## Result Contract

- **status:** `ok`
- **executive_summary:** 36 tasks across 9 quality-first waves; conservative layered topology with parallel implementation and verification tasks, explicit security tasks, runtime hook proof, and final 88-criterion coverage closure.
- **artifacts:** `context/plans/dc-dev-unified-agent-build-site.md`
- **next_recommended:** loop `/sdd-cavekit make` ↔ `/sdd-cavekit check` (maximum 5 cycles), beginning with Wave 1 and honoring the blocking rules.
- **risks:** runtime hook availability, `opencode.json` write serialization/model assignment compatibility, unavailable capability-discovery cache, and any scope/evidence leakage.
- **skill_resolution:** `partial`; the kit registry exists at `context/kits/kit-index.json`, but the capability-discovery helper advertised by the loaded skill was not present at its expected path. T-004 is `setup-required` until the cache is rebuilt or an equivalent registry-backed discovery is supplied.
