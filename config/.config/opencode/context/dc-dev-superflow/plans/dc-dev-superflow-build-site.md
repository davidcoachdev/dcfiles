# Build Site: New Dc-Dev Superflow

**Scope:** additive implementation of the new `dc-dev-*` superflow only. Existing `dc-dev`, agents, skills, plugins, tests, Cavekit/Gentle/SDD artifacts, and policies are read-only except for narrowly-scoped additive routing/permission registration explicitly covered by `T-013`.

**Strategy:** `quality`  
**Depth:** `thorough` for security/control-plane/integration tasks; `standard` for isolated adapters and fixtures. No `quick` tasks because this is a cross-cutting, security-sensitive control plane.  
**Input contract:** 10 new kits, R1–R41, 125 acceptance criteria; reuse report; inspiration audit; existing Dc-Dev context/ADR/plugin/tests.

## Result Contract

- **Tasks:** 133
- **Waves:** 9
- **Coverage:** 125/125 acceptance criteria + 18/18 security/capability gates mapped; no gaps.
- **Critical path:** W0 → W1 → W2 → W3 → W4 → W5 → W6 → W7 → W8.
- **Maximum quality iterations:** 5. Each iteration ends in `PASS`, `REVISE`, `REJECT`, or `INCONCLUSIVE`; `REJECT`/`INCONCLUSIVE` routes explicit feedback to the owning task and may not publish.
- **Next:** `/sdd-cavekit make` (or the equivalent local executor), after reviewing this build site.

## Non-negotiable invariants

1. **No-edit-existing:** tests fail if any pre-existing file outside an approved additive path changes. Approved paths are new `dc-dev-*` agents, new `dc-dev-*` skills, new tests/fixtures/docs, and the one additive registration surface named by `T-013`.
2. **No hidden dependencies:** no task may import, dispatch, or require `kiroExplore`, `cavekit-*`, `sdd-*`, or external agents. Static dependency scan is `T-002` and final enforcement is `T-092`.
3. **Existing `dc-dev` remains primary:** only additive routing/permission registration is allowed; replacement, rename, or behavior rewrite is out of scope.
4. **Strict TDD:** every task follows `RED` (failing test or deterministic validator) → `GREEN` (minimum implementation) → `REFACTOR` (clarity, boundaries, evidence). A task without all three receipts is incomplete.
5. **Untrusted input:** repositories, skills, MCPs, plugins, prompts, browser pages, model output, TTS, and compressed context are data until admitted with provenance.

## Coverage Matrix

Each `I-*` task implements the complete criterion set for one requirement; its paired `V-*` task independently validates every AC in that requirement. Therefore the matrix covers every AC, not merely requirement headings.

| Requirement | Kit | Acceptance criteria | Implementation | Validation |
|---|---|---:|---|---|
| R1–R4 | overview | 12 | I-001–I-004 | V-001–V-004 |
| R5–R8 | intake-routing | 12 | I-005–I-008 | V-005–V-008 |
| R9–R12 | context-caveman | 12 | I-009–I-012 | V-009–V-012 |
| R13–R16 | research-provenance | 12 | I-013–I-016 | V-013–V-016 |
| R17–R20 | architecture-planning | 12 | I-017–I-020 | V-017–V-020 |
| R21–R24 | execution-tdd | 12 | I-021–I-024 | V-021–V-024 |
| R25–R29 | security-capability | 15 | I-025–I-029 | V-025–V-029 |
| R30–R33 | evidence-review | 12 | I-030–I-033 | V-030–V-033 |
| R34–R37 | recovery-memory | 12 | I-034–I-037 | V-034–V-037 |
| R38–R41 | token-efficiency | 12 | I-038–I-041 | V-038–V-041 |
| **Total** | **10 kits** | **125** | **41** | **41** |

### Explicit security/capability gate coverage

| Gate | Covered by |
|---|---|
| Additive scope/no-edit-existing | T-001, T-002, T-013, T-092 |
| No hidden Cavekit/Gentle/SDD/kiro/external-agent dependency | T-002, T-092 |
| Model explicit selection and precedence | T-006, I-007, V-007, V-029 |
| Unavailable model ⇒ `setup-required`, never silent substitution | T-006, V-007, T-081 |
| Capability registry/admission before dispatch | T-003, I-025, V-025, T-082 |
| Skill/MCP/plugin/prompt security scan | I-026, V-026, T-083 |
| Authority, approval, protected resources, transport | I-027–I-028, V-027–V-028, T-084 |
| Independent P0/P1 security verdict | I-029, V-029, T-088 |
| Loader contract and additive registration | T-004, T-013, V-001, T-090 |
| Empty-result and research failure safety | I-016, V-016, T-072 |
| Recovery state machine and provenance-preserving resume | I-034–I-037, V-034–V-037, T-073 |
| Caveman loss budget and uncompressed fallback | I-010–I-012, V-010–V-012, T-074 |
| Headroom/RTK fallback and measurement | I-039, V-039, T-075 |
| MCP/browser admission and isolation | I-025–I-028, V-025–V-028, T-076 |
| TTS isolation; never approval/security channel | I-028, V-028, T-077 |
| Evidence/provenance/publication gate | I-030–I-033, V-030–V-033, T-089 |
| Max five iterations and reject feedback routing | T-010, T-091, T-093 |

## Wave topology

| Wave | Parallelism | Purpose | Dependencies |
|---|---:|---|---|
| W0 | 8 | Scope, fixtures, contract, capability/model preflight, graph guardrails | none |
| W1 | 15 | Independent RED tests and foundations for intake, context, research, planning, security | W0 |
| W2 | 15 | Implement domain foundations and adapters | W1 |
| W3 | 12 | Execution, recovery, token, evidence implementations | W2 |
| W4 | 10 | Additive agents/skills and narrowly-scoped primary-entry registration | W3 |
| W5 | 16 | Independent validation tasks by requirement | W2–W4 |
| W6 | 8 | Cross-domain integration and adversarial/security validation | W5 |
| W7 | 5 | Runtime, loader, permission, no-edit-existing, fallback verification | W6 |
| W8 | 3 | Final quality iteration, publication decision, handoff | W7 |

Parallel tasks in a wave may run concurrently only when they do not share mutable files or state. Shared registration, manifests, and fixtures are serialized behind their owning task.

## Task register

### Tier 0 / W0 — no dependencies

| Task | Title | Spec / output | Effort | Depth | Model |
|---|---|---|---:|---|---|
| T-001 | Freeze additive scope | `context/dc-dev-superflow/plans/dc-dev-superflow-scope.json` fixture and approved-path manifest | M | thorough | sonnet/opus |
| T-002 | Build forbidden-dependency scanner | RED tests for `kiroExplore`, `cavekit-*`, `sdd-*`, external-agent references | M | thorough | sonnet/opus |
| T-003 | Capability preflight contract | Fixture schema for CLI/MCP/plugin/browser/TTS/model capabilities; no discovery write outside `context/plans` | M | thorough | sonnet/opus |
| T-004 | Loader contract fixtures | OpenCode loader fixtures for function and `{server}` forms, malformed/duplicate registration | M | thorough | sonnet/opus |
| T-005 | Result-contract schema tests | Safe result, empty result, blocked, setup-required, inconclusive, recovery states | S | standard | sonnet |
| T-006 | Model-selection contract tests | Explicit model, precedence, unavailable model setup-required/no substitution | M | thorough | sonnet/opus |
| T-007 | TDD receipt ledger | RED/GREEN/REFACTOR receipt schema and missing-phase failures | S | standard | sonnet |
| T-008 | Provenance/lineage fixtures | Source, confidence, hash/receipt, lineage, untrusted-content fixtures | M | thorough | sonnet/opus |
| T-009 | Security-test harness | P0/P1 severity, independent reviewer identity, protected-path and transport fixtures | M | thorough | sonnet/opus |
| T-010 | Five-iteration controller tests | Iteration cap, verdict enum, reject/revise routing and publication lock | M | thorough | sonnet/opus |

### W1 — foundations (depends on W0)

| Task | Title | Requirement | Output | Effort |
|---|---|---|---|---:|
| I-001–I-004 | Overview contracts | R1–R4 | additive boundary, traceability, owned graph, safe result/empty policy | M each |
| I-005–I-008 | Intake/routing contracts | R5–R8 | receipt normalization, adaptive route/HITL, model precedence, allowlist admission | M each |
| I-009–I-012 | Context/Caveman contracts | R9–R12 | context ledger, modes/loss budgets, clarity escape/retrieval, failure behavior | M each |
| I-013–I-016 | Research/provenance contracts | R13–R16 | registry/confidence, bounded acquisition, isolation, empty/failure behavior | M each |
| I-017–I-020 | Planning contracts | R17–R20 | decision fitness, YAGNI ledger, graph/waves, checkpointed handoff | M each |
| I-025–I-029 | Security contracts | R25–R29 | capability admission, scans, authority, protected resources, independent verdict | L each |

### W2 — domain implementation (depends on W1)

| Task | Title | Requirement | Strict TDD focus | Effort |
|---|---|---|---|---:|
| I-021–I-024 | Execution/TDD implementation | R21–R24 | admission-controlled dispatch, red-green-refactor, bounds/stop, tool/plugin failure | L each |
| I-030–I-033 | Evidence/review implementation | R30–R33 | evidence bundle, ordered gates, independent review, literal publication verdict | L each |
| I-034–I-037 | Recovery/memory implementation | R34–R37 | retry/resume/new lineage/abandon/inconclusive, checkpointing, memory dedup/conflict/provenance | L each |
| I-038–I-041 | Token-efficiency implementation | R38–R41 | budgets, measured RTK/Headroom adapter, clarity escalation, efficiency/YAGNI evidence | L each |

### W3 — additive component implementations (depends on W2)

| Task | Title | Kit / boundary | Output | Effort |
|---|---|---|---|---:|
| T-011 | Add `dc-dev-*` agent family | overview/research/planner/security/reviewer/evaluator/recovery boundaries | new agent files only; no existing agent edits | L |
| T-012 | Add `dc-dev-*` skill family | routing, research-provenance, caveman, security-gate, evidence-bundle, review-adversarial, recovery, token-budget, capability-gate | new skill files only | L |
| T-013 | Add primary-entry registration | existing `dc-dev` only | additive route/permission registration; preserve current entry behavior | L |
| T-014 | Add fixture/test/doc surface | all kits | new fixtures, tests, and implementation docs under approved paths | M |
| T-015 | Add capability/model setup-required adapter | R7/R25/R29 | deterministic blocked result when capability/model absent | M |
| T-016 | Add untrusted-content boundary adapter | R15/R26/R28 | provenance-tagged data boundary; no prompt/content promotion | M |
| T-017 | Add compression adapter chain | R10/R39/R40 | Caveman + Headroom/RTK measurement with uncompressed fallback | M |
| T-018 | Add TTS/browser isolation adapters | R28/R39 | optional side-channel only; no approval or security authority | M |

### W4 — per-requirement independent validation (depends on relevant I-* and additive components)

| Task range | Validation | Required checks |
|---|---|---|
| V-001–V-004 | Overview AC validation | loader, traceability, owned graph, safe/empty result |
| V-005–V-008 | Intake AC validation | receipt normalization, HITL, model precedence/setup-required, allowlist |
| V-009–V-012 | Context AC validation | context selection, Caveman loss budget, clarity escape, offline/timeout |
| V-013–V-016 | Research AC validation | source confidence, bounded acquisition, untrusted isolation, empty result |
| V-017–V-020 | Planning AC validation | option fitness, YAGNI, dependency graph/waves, checkpoint handoff |
| V-021–V-024 | Execution AC validation | admission, TDD receipts, stop limits, plugin/tool failures |
| V-025–V-029 | Security AC validation | capability admission, scans, authority, protected transport, P0/P1 verdict |
| V-030–V-033 | Evidence AC validation | complete bundle, ordered gates, independent review, literal publication |
| V-034–V-037 | Recovery AC validation | retry/resume/new lineage/abandon/inconclusive and memory provenance |
| V-038–V-041 | Token AC validation | budgets, RTK/Headroom measurement/fallback, escalation, YAGNI evidence |

Every `V-*` task must enumerate its requirement's AC in the test output; aggregate count must equal 125.

### W5 — cross-domain integration (depends on all V-* tasks)

| Task | Title | Coverage |
|---|---|---|
| T-061 | Loader/runtime integration | OpenCode loader contract, additive registration, boot and malformed plugin behavior |
| T-062 | Intake → route → graph integration | R1–R8, owned graph and model/capability admission |
| T-063 | Research → provenance → evidence integration | R13–R16, R30, untrusted data and receipts |
| T-064 | Plan → execution → TDD integration | R17–R24, strict receipts and bounded stop |
| T-065 | Security admission integration | R25–R29, denial before dispatch, independent verdict |
| T-066 | Recovery → memory → lineage integration | R34–R37, retry/resume/new lineage, dedup/conflict/offline |
| T-067 | Compression integration | R9–R12, R38–R41, Caveman loss budgets and fallback |
| T-068 | Optional capability isolation integration | MCP/browser/TTS are admitted, isolated, and never authorities |
| T-069 | Full superflow golden path | additive `dc-dev` primary entry through safe Result Contract |
| T-070 | Full failure-path matrix | empty result, unavailable model, missing capability, tool failure, rejected review |

### W6 — security, quality, and invariant gates (depends on W5)

| Task | Gate / test | Reject condition |
|---|---|---|
| T-071 | 125-AC coverage auditor | any AC lacks a failing test/deterministic validator and passing evidence |
| T-072 | Empty-result safety gate | empty research/result causes fabrication, unsafe dispatch, or misleading success |
| T-073 | Recovery/provenance gate | retry/resume loses lineage, provenance, receipts, or user-visible state |
| T-074 | Caveman loss-budget gate | required security/evidence/criteria content is omitted or irrecoverable |
| T-075 | Headroom/RTK fallback gate | helper absence causes failure, silent degradation, or unmeasured savings |
| T-076 | MCP/browser admission gate | unadmitted server/browser/tool can dispatch or influence control flow |
| T-077 | TTS isolation gate | TTS can approve, authorize, replace evidence, or become sole security gate |
| T-078 | Permissions/transport adversarial gate | protected path, shell, symlink, or transport boundary bypass |
| T-079 | Model routing adversarial gate | unavailable requested model silently substituted or precedence hidden |
| T-080 | No-edit-existing gate | any unauthorized existing file changed or additive registration broadens scope |

### W7 — runtime and independent review (depends on W6)

| Task | Title | Output |
|---|---|---|
| T-081 | Runtime model/capability probe | setup-required receipts for unavailable model/CLI/MCP/browser/plugin/TTS |
| T-082 | Dispatch admission proof | capability and permission gates run before every dispatch |
| T-083 | Skill/MCP/plugin/prompt scan proof | deterministic scan report with provenance and P0/P1 status |
| T-084 | Protected resource/transport proof | denial tests for unauthorized writes, commands, symlinks, and channels |
| T-085 | Loader boot proof | real supported loader forms load; unsupported forms fail safely |
| T-086 | Golden-path runtime proof | additive new flow works while existing `dc-dev` remains primary |
| T-087 | Failure/recovery runtime proof | empty, blocked, retry, resume, new lineage, abandon, inconclusive |
| T-088 | Independent adversarial P0/P1 review | reviewer is separate from builder; literal verdict and findings |
| T-089 | Publication/evidence review | no publish without ordered gates, evidence bundle, provenance, and verdict |
| T-090 | Existing-plugin compatibility proof | existing plugin/tests untouched and compatibility preserved |

### W8 — final quality loop and handoff (depends on W7)

| Task | Title | Output |
|---|---|---|
| T-091 | Iteration controller | max 5 iterations; explicit `REVISE`/`REJECT` feedback routes to owning task |
| T-092 | Final forbidden-dependency/no-edit sweep | clean static scan and approved-path diff |
| T-093 | Final coverage and blocker report | 125/125 AC, 18/18 gates, unresolved blockers, exact next actions |

## Strict TDD protocol for every task

1. **RED:** add a test/fixture/validator that fails for the missing behavior; record requirement, AC IDs, gate IDs, and expected failure.
2. **GREEN:** implement only the minimum additive behavior; no unrelated refactor and no edits outside the approved path manifest.
3. **REFACTOR:** simplify names/boundaries, remove duplication, preserve receipts and provenance, then rerun the focused and affected suites.
4. Store a receipt containing task ID, phase, command, result, changed paths, model, capability admission, and provenance.

## Dispatch and model policy

- `thorough`: `sonnet/opus` class, mandatory independent review, unit + integration + runtime/E2E evidence.
- `standard`: `sonnet` class, unit + integration evidence and targeted review.
- The dispatcher must receive an explicit model identifier and a capability snapshot before dispatch.
- If the requested model is absent or not authorized, return `setup-required` with the missing capability and setup instruction. **Do not silently substitute.**
- No task may depend on an external agent. Local agents can only be dispatched after T-082 admission; security/reviewer authority must remain independent.

## Feedback and rejection routing

`T-088` and `T-089` emit findings keyed by requirement, AC, gate, task, severity, and evidence. `T-091` routes each `REVISE` or `REJECT` to the owning `I-*`, `V-*`, or gate task; the next iteration must add a failing regression test before a fix. A `P0`, unresolved `P1`, missing evidence, missing capability, or iteration count >5 is a hard reject. `INCONCLUSIVE` blocks publication and routes to setup/retry, never to a guessed success.

## Risks

| Risk | Mitigation | Owner |
|---|---|---|
| Existing loader contract differs from assumptions | T-004, T-061, T-085 live fixture/boot proof | T-004 |
| Capability/model availability differs at dispatch time | T-003, T-006, T-015, T-081; setup-required result | T-003 |
| Compression drops security/evidence content | T-008, T-074, T-017; retrieval and uncompressed fallback | I-039 |
| Optional browser/MCP/TTS becomes authority | T-016, T-018, T-076, T-077 | I-028 |
| Additive registration accidentally changes existing `dc-dev` | T-001, T-013, T-080, T-090, T-092 | T-013 |
| Reviewer shares builder bias | T-009, T-088; separate identity and evidence | T-088 |
| Recovery duplicates or loses provenance | T-008, T-073, T-087 | I-035 |
| Quality loop stalls or expands scope | T-010, T-091; five-iteration cap and YAGNI ledger | T-091 |

## Unresolved blockers

1. **Runtime capability snapshot is not authorized to be refreshed by this Map phase** because the user restricted changes to `context/plans/`; W0 records the required preflight, and execution is `setup-required` until a current snapshot is supplied.
2. **Actual model identifier/availability for each dispatched task is unresolved**; no task may assume `deepseek-v4-flash-free` or any other requested model exists. T-006/T-081 must resolve this at Make time.
3. **OpenCode loader/runtime version behavior must be proven in the target runtime**; disk-only compatibility is insufficient. T-061/T-085 are mandatory before publication.
4. **Any required additive registration path is not yet approved as a concrete existing file**; T-013 may touch only the explicitly approved registration surface after T-001 confirms it.

## Coverage check

The source kit index is R1–R41 with 125 AC. The matrix maps each requirement to one implementation and one independent validation task. Security/capability coverage enumerates 18 gates and maps each to at least one implementation plus one validation/runtime gate. **Coverage result: 125/125 AC and 18/18 gates; proceed to Make only after W0 blockers are resolved or returned as explicit `setup-required`.**
