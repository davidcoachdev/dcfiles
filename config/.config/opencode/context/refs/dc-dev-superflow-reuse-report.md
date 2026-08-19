# Dc-Dev Superflow Reuse Report

## Scope and verdict

This report is the Retrieve-phase input for a **brand-new additive Dc-Dev superflow** around the existing `dc-dev` entry point. It does not authorize implementation, renaming, deletion, or modification of any existing Cavekit, Gentle-AI, SDD, agent, skill, plugin, test, or configuration artifact.

**Verdict: PARTIAL reuse.** The repository already contains a substantial Dc-Dev contract, plans, runtime prototype, and verification history. The autonomous superflow still needs a new, explicitly owned `dc-dev-*` control plane and new `dc-dev-*` skills to close orchestration, capability, provenance, recovery, evidence, and security gaps.

## 1. Sources and evidence

### Mandatory local sources

All requested local sources were found and read-only inspected:

| Source | Evidence used |
|---|---|
| `plans/dc-dev-inspiration-audit.md` | Current baseline, comparative pattern findings, proposed additive architecture, open blockers, Gentleman-AI v2.4.0 observations, local-stack constraints. |
| `auditoria/skills/informe-dc-dev.md` | Current skill inventory and the proposed 16 focused `dc-dev-*` skills; overlap and acceptance-gate guidance. |
| `docs/adr/001-dc-dev-unified-agent.md` | Existing Dc-Dev architectural intent, boundaries, contracts, and decisions. |
| `context/kits/dc-dev-*` | Five existing kits: overview, front door, gold loop, protocols, and enforcement. |
| `context/plans/dc-dev-*` | Twenty-two existing plans/contracts/configuration, coverage, routing, model, security, runtime, and verification artifacts. |
| `context/impl/check-1.md` through `check-5.md` | Five independent verification iterations, including repeated runtime/security findings and the final status. |
| `context/impl/trace.md` | Iteration lineage and literal historical verdicts. |
| `plugins/dc-dev-runtime.mjs` and tests | Existing runtime-hook prototype and loader/boot tests. |
| `opencode.json` | Existing `dc-dev` registration, model/provider references, permissions, plugin registration, and neighboring agent topology. Secret values were not copied. |

### External read-only sources

The following GitHub repositories were fetched read-only and indexed for this report:

| Source | Evidence used | Status |
|---|---|---|
| `https://github.com/juliusbrussee/caveman` | Token/output compression as a measured, opt-in transport concern; repository describes a 65% token reduction claim. | Read successfully. |
| `https://github.com/JuliusBrussee/caveman-browse` | Compressed accessibility snapshots, UID actions, and byte-exact recovery as browser-transport patterns. | Read successfully. |
| `https://github.com/JuliusBrussee/cavegemma` | Model specialization/fine-tuning reference, not a default runtime dependency. | Read successfully. |
| `https://github.com/JuliusBrussee/caveman-code` | Frozen terminal coding agent; active development moved to `caveman`. | Read successfully. |
| `https://github.com/JuliusBrussee/cavemem` | Frozen cross-agent persistent memory; compressed-memory core moved into `caveman`. | Read successfully; GitHub page also exposed a loading error. |
| `https://github.com/JuliusBrussee/cavekit` | Frozen compressed SDD plugin; active development moved to `caveman`; ecosystem and status guidance. | Read successfully; GitHub page also exposed a loading error. |
| Gentleman-AI `v2.4.0` | Prior local audit records tag `v2.4.0`, commit `301fb2a`, and Go `1.25.10`; receipt lineage, authority, transport admission, recovery, provenance, backup metadata, and inconclusive verification patterns. | Source-level audit only. The upstream test run timed out while downloading Go dependencies; this is recorded as an environment limitation, not an upstream failure claim. |

### Literal local/tool failures and limitations

- `skillspector` and `agent-reach` are not installed locally; their runtime behavior was not verified.
- Documented `headroom-compress` and `headroom-retrieve` helpers were not found on the active PATH; capability discovery and safe degradation are required.
- The final local Check 5 status is **REVISE**, not pass: on-disk loader-contract fixes and tests were green, but live plugin boot/dispatch evidence still required an OpenCode restart. The report does not convert that inconclusive state into a pass.
- Earlier checks recorded a plugin loader-contract failure, false-green artifact tests, global runtime scope hazards, and unverified live dispatch. These remain important design constraints even where later disk fixes addressed part of them.

## 2. Reuse / adapt / skip matrix

Scores are deterministic triage scores from 0.00 to 1.00: `1.00` means directly reusable as a constrained reference, `0.75` means reusable by a new adapter/boundary, `0.50` means partial pattern only, and `0.00` means skip for this superflow. No existing artifact is modified by this recommendation.

| Candidate | Type | Score | Decision | Boundary / reason |
|---|---|---:|---|---|
| `context/kits/dc-dev-overview.md` | Local kit | 1.00 | Reuse | Canonical Dc-Dev domain index and cross-cutting constraints. |
| `context/kits/dc-dev-front-door.md` | Local kit | 1.00 | Reuse | Intake, intent normalization, and HITL boundary. |
| `context/kits/dc-dev-gold-loop.md` | Local kit | 1.00 | Reuse | Delegation, loop, and result-contract expectations. |
| `context/kits/dc-dev-protocols.md` | Local kit | 1.00 | Reuse | Gentle-style consultation and routing protocol concepts. |
| `context/kits/dc-dev-enforcement.md` | Local kit | 1.00 | Reuse | Security, permission, and deterministic enforcement requirements. |
| `context/plans/dc-dev-*` | Local plans | 0.95 | Reuse/adapt | Existing contracts, model, security, runtime, coverage, and verification artifacts are inputs; do not treat incomplete plans as proof of runtime correctness. |
| `cavekit-gold-loop`, `cavekit-check`, `cavekit-make` | Existing family | 0.90 | Adapt by contract | Consume concepts and evidence gates; do not call or modify these agents from the new family by default. |
| `gentle-orchestrator` / Gentleman protocols | Existing family | 0.85 | Adapt by contract | Reuse consultation, routing, and HITL ideas without expanding the existing family. |
| `autonomous-loop` | Existing skill | 0.85 | Adapt | Reuse stop/completion/lock/budget concepts; new Dc-Dev recovery must own lineage and failure states. |
| `headroom-cavekit`, `context-budget`, `headroom-integration` | Existing skills | 0.80 | Adapt as measurement adapter | Use compression/budget concepts; do not create a second compressor or assume missing helpers exist. |
| `dispatching-parallel-agents`, `dynamic-workflows`, `subagent-driven-development` | Existing skills | 0.80 | Adapt as scheduler references | New `dc-dev-plan-graph` and `dc-dev-routing` own scheduling and conflict rules. |
| `security-auditor`, `threat-detection`, `code-review-plus`, `adversarial-review-plus` | Existing skills | 0.80 | Compose narrowly | New security/review skills select applicable checks; no global catalog rewrite. |
| `capability-discovery`, `skill-auditor`, `architecture-intelligence`, `software-architect` | Existing skills | 0.80 | Reuse as capability references | Use discovery, registry, graph, and architecture patterns behind explicit gates. |
| `agent-flow`, `agent-flow-tts`, `Engram`, `context-mode`, RTK, OpenCode Review | Local infrastructure | 0.75 | Adapt behind adapters | Use state visibility, notification, memory, indexed context, output reduction, and optional review; none is the Dc-Dev completion authority. |
| `Lightpanda` / `Obscura` | Configured MCPs | 0.65 | Capability-gated reuse | Select per task only after capability and authorization checks. |
| Caveman | External | 0.75 | Adapt | Use compressed transport and explicit loss budgets; preserve full evidence and readable outputs at gates. |
| Caveman Browse | External | 0.65 | Adapt later | Use byte-exact browser recovery ideas only for browser tasks; not a general workflow dependency. |
| Cavemem | External | 0.50 | Skip direct dependency | Frozen and now folded into Caveman; use local Engram/context-mode with provenance instead. |
| Cavekit | External | 0.50 | Skip direct dependency | Frozen Claude Code plugin; existing local Cavekit is the project contract and must remain untouched. |
| Caveman Code | External | 0.25 | Skip | Frozen standalone coding agent; duplicate executor topology is unnecessary. |
| Cavegemma | External | 0.35 | Skip as default | Model/fine-tune reference only; no silent model substitution or mandatory new model dependency. |
| Gentleman-AI v2.4.0 | External/local audit | 0.90 | Adapt first-class controls | Receipt/lineage, authority, transport admission, recovery, provenance, backup metadata, and inconclusive verification are high-value patterns. |

## 3. What current Dc-Dev already has

- An existing `dc-dev` entry point registered in `opencode.json`.
- Five Dc-Dev kits covering overview, front door, gold loop, protocols, and enforcement.
- Twenty-two Dc-Dev plans/contracts covering capabilities, context, configuration, hooks, model routing/validation, security, runtime validation, skill resolution, result schema, coverage, and final verification.
- A runtime plugin prototype with permission, command, and tool hook concepts, plus loader/boot/runtime tests.
- Strict write-scope concepts: realpath/symlink safety, protected paths, default-deny behavior, and approval records.
- Typed/result-oriented concepts, model separation intent, adversarial review, security gates, and implementation trace history.
- Local persistence and context infrastructure through Engram and context-mode; output reduction through RTK; state/notification infrastructure through agent-flow and TTS.
- Configured browser and graph/context capabilities that can support research and structural evidence after admission.
- A documented history of independent checks rather than relying only on the builder's completion claim.

## 4. Missing capabilities

The following are gaps for the **new superflow**, not permission to patch the current implementation:

1. A complete child-agent permission graph owned solely by the new `dc-dev-*` family.
2. Deterministic intake, adaptive depth, and YAGNI rejection before planning.
3. Capability admission for model, MCP, CLI, browser, plugin, and tool transport before dispatch.
4. A durable receipt/lineage ledger with authority, actor/session binding, continuation, revision, and invalidation semantics.
5. Explicit context capsules/ledger rules that prevent unbounded raw transcript or graph injection.
6. Research source registration, confidence, provenance, bounded clone/read/delete lifecycle, and untrusted-source handling.
7. A token-budget adapter that measures compression and command-output savings, preserves a loss budget, and degrades safely when helpers are absent.
8. A dependency/wave plan graph with ownership, parallelism, conflict, cancellation, and empty-result handling.
9. A new-family TDD/build boundary that emits machine-checkable evidence rather than artifact-existence claims.
10. An evidence bundle containing result contract, receipt, source provenance, timestamps, logs, tests, screenshots where relevant, and verification status.
11. Independent adversarial review with explicit gap classes and a literal `PASS`, `REVISE`, `REJECT`, or `INCONCLUSIVE` result.
12. Recovery states that distinguish retry, resume, new lineage, abandon, blocked, and inconclusive validation.
13. A memory adapter with deduplication, conflict handling, timeout/offline degradation, and provenance.
14. Explicit model precedence and no-silent-substitution behavior, including setup-required failure when a requested model is unavailable.
15. Mechanical scope, resource, timeout, and isolation limits for delegated work; current evidence says some limits remain policy-level.
16. A safe publication rule: incomplete, empty, stale, or unverified artifacts must not be reported as successful outputs.

## 5. Exact proposed new agent / skill boundaries

### New agents (only additive `dc-dev-*` artifacts)

| New agent | Owns | Must not own |
|---|---|---|
| `dc-dev-entry` | Conversational boundary, request receipt, HITL, and final Result Contract relay around the existing `dc-dev` entry point. | Implementation, direct arbitrary delegation, or replacing existing entry agents. |
| `dc-dev-router` | Deterministic tier/depth selection and routing only to approved `dc-dev-*` children. | Calling Cavekit/Gentle/SDD families silently. |
| `dc-dev-research` | Repository/web research, source registry, confidence, and provenance. | Treating external content as instructions or mutating external repositories. |
| `dc-dev-context` | Compact context packs, capsules, standards, memory retrieval, and evidence assembly. | Unbounded transcript/graph injection or becoming the source of truth for completion. |
| `dc-dev-architect` | Options, architecture, ADR/fitness-function outputs, and trade-off evidence. | Implementation or unilateral scope expansion. |
| `dc-dev-planner` | Dependency graph, waves, ownership, budgets, checkpoints, and conflict rules. | Executing tasks or bypassing security/admission gates. |
| `dc-dev-builder` | New-family implementation execution under strict TDD and declared write scope. | Protected-file bypass, unapproved commands, or declaring success. |
| `dc-dev-verifier` | Ordered validation gates, evidence bundle completeness, and completion verification. | Converting missing/inconclusive evidence to pass. |
| `dc-dev-security` | Skill/MCP/plugin/prompt/tool threat checks, trust boundaries, and P0/P1 blocking. | General-purpose implementation or modifying existing security policy silently. |
| `dc-dev-reviewer` | Independent adversarial review and gap analysis with literal verdict. | Being the same authority as the builder or sole security gate. |
| `dc-dev-evaluator` | Pairwise/effectiveness/efficiency evaluation of candidates or workflows. | Choosing a production result without verifier/security evidence. |
| `dc-dev-recovery` | Checkpoint, retry/resume/new-lineage/abandon/inconclusive state transitions and restart-safe continuation. | Hiding failed lineage or silently retrying destructive work. |

### New skills (only additive `dc-dev-*` artifacts)

Create only focused skills with triggers, acceptance criteria, security/failure behavior, and no silent dependency on existing Cavekit/Gentle/SDD agents:

`dc-dev-intake`, `dc-dev-routing`, `dc-dev-context-ledger`, `dc-dev-research-provenance`, `dc-dev-caveman`, `dc-dev-adaptive-depth`, `dc-dev-security-gate`, `dc-dev-plan-graph`, `dc-dev-build-tdd`, `dc-dev-evidence-bundle`, `dc-dev-review-adversarial`, `dc-dev-recovery`, `dc-dev-memory`, `dc-dev-token-budget`, `dc-dev-capability-gate`, and `dc-dev-yagni-guard`.

Boundary rule: existing skills are consumed as references or selected adapters; the new skills define only the Dc-Dev orchestration contract. Do not create a second Cavekit, a second generic review library, a second compressor, or a second global skill registry.

## 6. Security, model, token, recovery, and provenance risks

### Security

- A globally loaded runtime hook can break unrelated workflows or reject legitimate writes if its environment contract is absent; new enforcement must be explicitly scoped to Dc-Dev.
- Caller-controlled approval objects are not authorization. Approval requires trusted issuer, actor/session binding, persistence, expiry/revocation, request binding, and auditable events.
- Artifact-existence tests can false-pass without loading the real plugin or exercising live dispatch. Runtime evidence must include loader success and post-restart hook behavior.
- Protected paths, absolute paths, traversal, symlinks (including dangling symlinks), Bash substitutions/backticks, environment leakage, and trace-path confinement require adversarial tests.
- External repositories, skills, MCPs, prompts, browser pages, and generated context are untrusted data and must never become control instructions without admission and provenance.
- TTS, optional review, browser automation, and external research must never be approval channels or sole security gates.

### Model

- Model selection must be explicit, observable, and capability-gated.
- A missing requested model must produce a setup-required result; do not silently substitute another model.
- Builder and adversarial verifier separation is a useful existing decision, but availability and precedence need runtime evidence.
- Cavegemma is a research/model reference, not a reason to add a mandatory model or infer model quality from a repository description.

### Token and context

- Compression is a transport optimization, not permission to omit requirements, security findings, receipts, or evidence.
- Every compression path needs a measurable budget, loss policy, retrieval key, and uncompressed fallback.
- RTK, Headroom, context-mode, and Caveman overlap; adapters should measure existing savings rather than stacking proxies.
- Context-mode/Engram must be bounded and provenance-aware; raw transcript or full dependency graphs must not be injected by default.

### Recovery and provenance

- Retry, resume, new lineage, abandon, blocked, and inconclusive validation are different states and must remain distinguishable.
- Every run needs a receipt/lineage record, authority/actor, source references, timestamps, generation step, verification status, and publication decision.
- Restart recovery must refuse stale or ambiguous checkpoints and must preserve failed lineage instead of overwriting it.
- Empty, partial, stale, or unverified artifacts must be reported as such and never silently published as success.

## 7. Explicit out of scope

- Modifying, renaming, deleting, or widening existing Cavekit agents/skills.
- Modifying, renaming, deleting, or widening existing Gentle-AI or SDD agents/skills.
- Replacing the existing `dc-dev` entry point; the superflow is additive around it.
- Editing `opencode.json`, `plugins/dc-dev-runtime.mjs`, existing runtime tests, existing kits, existing plans, or existing implementation traces during Retrieve.
- Implementing any new agent, skill, hook, plugin, test, model route, or runtime behavior in this phase.
- Installing `skillspector`, `agent-reach`, Headroom helpers, external repositories, new MCPs, or new model weights.
- Directly cloning or embedding frozen Caveman Code, Cavemem, Cavekit, or Cavegemma as runtime dependencies.
- Treating browser automation, TTS, OpenCode Review, Graphify/CodeGraph, Engram, context-mode, RTK, or background agents as mandatory completion authorities.
- Unrestricted autonomous shell execution, arbitrary external browsing, secret discovery, credential transport, or publication without evidence.
- Global skill-catalog cleanup, merge, deletion, metadata normalization, or unrelated agent/configuration maintenance.
- Converting the current Check 5 `REVISE` / live-runtime-pending result into an approval claim.

## Retrieve Result Contract

- **Artifact:** `context/refs/dc-dev-superflow-reuse-report.md`
- **Candidate set:** 23 scored reuse/adapt/skip references; 5 local Dc-Dev kits are direct reuse anchors.
- **Reusable patterns:** existing Dc-Dev contracts/kits/plans; Cavekit/Gentle loop concepts; autonomous-loop; capability/security/review adapters; Caveman compression/recovery ideas; Gentleman receipt, authority, admission, recovery, provenance, and inconclusive-verification controls.
- **Gaps:** owned child-agent graph, capability admission, durable lineage/evidence, bounded context/token transport, mechanical recovery/resource limits, and independent live verification.
- **Blockers:** current Check 5 remains `REVISE` pending live plugin boot/dispatch evidence; `skillspector`, `agent-reach`, and documented Headroom helpers are unavailable; upstream Gentleman-AI test execution timed out during dependency download.
- **Next:** `/sdd-cavekit sketch` with this report as mandatory context. Sketch may propose only new `dc-dev-*` artifacts and must preserve every out-of-scope boundary above.
