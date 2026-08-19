# Dc-Dev Superflow Kit Index

## Goal

Define an additive, OpenCode-native Dc-Dev superflow around the existing `dc-dev` primary entry point, with owned child routing, bounded context transport, explicit security, Strict TDD, durable recovery, and evidence-based publication.

## Constraints

- Reuse/adapt existing `context/kits/dc-dev-*`, `context/plans/dc-dev-*`, ADR-001, and the Retrieve report; do not edit them.
- Create no second Cavekit, Gentle-AI, or SDD runtime and do not silently invoke those families, `kiroExplore`, or external agents.
- Preserve the existing `dc-dev` entry as the primary public door; all new children are additive.
- Quality and security precede speed and cost. Strict TDD is red → green → refactor.
- P0/P1 security findings block publication. HITL is mandatory for ambiguity, scope expansion, approval, destructive action, and irreversible confirmation.
- Artifacts use neutral English; user-facing language may match the user.

## Reuse Bindings

- Existing overview/front-door/gold-loop/protocols/enforcement kits are contract references, not files to modify.
- Existing plans and runtime/tests are evidence and compatibility inputs, not proof of live success; Check 5 remains inconclusive pending live boot/dispatch evidence.
- Caveman, Gentleman-AI v2.4 patterns, Inspiration Audit, RTK/Headroom, SkillSpector/MAESTRO, and local MCPs are adapted behind explicit capability gates.

## Owned Child Graph

`dc-dev-entry` → `dc-dev-router` → (`dc-dev-research`, `dc-dev-context`, `dc-dev-architect`, `dc-dev-planner`) → `dc-dev-builder` → (`dc-dev-verifier`, `dc-dev-security`, `dc-dev-reviewer`) → `dc-dev-recovery`.

`dc-dev-evaluator` is optional and may run only when multiple real candidates exist. No child may delegate outside the `dc-dev-*` family. Each launch requires admission, receipt, task scope, model, and a non-empty Result Contract.

## Domains

| Domain | Kit | Requirements |
|---|---|---|
| Intake and routing | `dc-dev-superflow-intake-routing.md` | R5–R8 |
| Context and Caveman transport | `dc-dev-superflow-context-caveman.md` | R9–R12 |
| Research and provenance | `dc-dev-superflow-research-provenance.md` | R13–R16 |
| Architecture and planning | `dc-dev-superflow-architecture-planning.md` | R17–R20 |
| Execution and Strict TDD | `dc-dev-superflow-execution-tdd.md` | R21–R24 |
| Security and capability gates | `dc-dev-superflow-security-capability.md` | R25–R29 |
| Evidence and adversarial review | `dc-dev-superflow-evidence-review.md` | R30–R33 |
| Recovery and memory | `dc-dev-superflow-recovery-memory.md` | R34–R37 |
| Token efficiency | `dc-dev-superflow-token-efficiency.md` | R38–R41 |

## Requirements

### R1: Additive primary-entry boundary
**Description:** The superflow extends the existing `dc-dev` entry without replacing or widening existing families.
**Acceptance Criteria:**
- [ ] A scope scan finds all new superflow artifacts under `context/dc-dev-superflow/kits/` and no changes to existing agents, skills, plugins, tests, configuration, Cavekit, Gentle-AI, SDD, or feature files.
- [ ] The index identifies `dc-dev` as the primary entry and lists only additive `dc-dev-*` children.
- [ ] A routing fixture sent to the superflow never emits a child outside the owned graph.
**Dependencies:** None.

### R2: Contract coverage and traceability
**Description:** Every requirement is machine-checkable and traceable to a validation gate.
**Acceptance Criteria:**
- [ ] A parser finds exactly R1–R41, and every requirement has at least one non-empty Acceptance Criteria item, Dependencies, and Cross-References section.
- [ ] Every acceptance criterion contains an observable outcome, deterministic condition, and automatable check description.
- [ ] A coverage report maps every R and criterion to at least one Gate 1–6 validation class.
**Dependencies:** All domain kits.

### R3: Owned graph and no hidden fallback
**Description:** Delegation is limited to explicitly owned `dc-dev-*` children with explicit failure behavior.
**Acceptance Criteria:**
- [ ] An attempted route to `kiroExplore`, `cavekit-*`, `gentle-*`, `sdd-*`, or an external agent returns `blocked` and records the rejected target.
- [ ] A child launch includes parent receipt, child role, model, capability admission, write scope, and task requirement IDs.
- [ ] Missing child, unavailable transport, or failed plugin/MCP admission returns a typed `blocked` or `setup-required` result and launches no substitute child.
**Dependencies:** R5, R25–R29, R30.

### R4: Safe result contract and empty-result policy
**Description:** The superflow publishes only complete, verified, non-empty results.
**Acceptance Criteria:**
- [ ] A result must contain `status`, `executive_summary`, `artifacts`, `next_recommended`, `risks`, `skill_resolution`, receipt/lineage, provenance, verification status, and recovery state.
- [ ] Empty, partial, stale, missing, or inconclusive artifacts produce `blocked`, `failed`, or `inconclusive`; none produces `ok`.
- [ ] A result with missing required fields, fabricated paths, or unverified claims is rejected by the contract validator.
**Dependencies:** R30–R37.

## Security Gates

- [ ] No secrets, credentials, protected-file contents, or raw untrusted prompt payloads appear in artifacts, receipts, logs, memory, or results.
- [ ] P0/P1 findings block routing, execution, and publication; only an authorized HITL action can create a new lineage.
- [ ] Approval is attributable, request-bound, expiring/revocable, and never inferred from text or prior approval.
- [ ] Security and irreversible confirmations are never compressed.

## Verification Plan

- `node --test tests/dc-dev/**/*.test.mjs` (existing compatibility suite; no edits in Sketch).
- A new Map-phase contract parser must validate these kits, R/AC coverage, graph allowlist, and scope invariant.
- Gate order: parse/lint → unit contract tests → integration graph tests → budget measurements → restart smoke tests → independent human review.

## Out of Scope

- Editing or implementing agents, skills, plugins, MCP configuration, tests, models, hooks, or feature code.
- Replacing `dc-dev`, existing Cavekit/Gentle/SDD artifacts, or the OpenCode harness.
- Installing unavailable tools (`skillspector`, `agent-reach`, Headroom helpers), new MCPs, external models, or frozen repositories.
- Unrestricted shell/browser execution, automatic publication, automatic approval, or silent model substitution.

## Cross-References

- Existing contracts: `dc-dev-overview.md`, `dc-dev-front-door.md`, `dc-dev-protocols.md`, `dc-dev-gold-loop.md`, `dc-dev-enforcement.md`.
- Mandatory input: `../refs/dc-dev-superflow-reuse-report.md`.
- Architecture source: `../../docs/adr/001-dc-dev-unified-agent.md`.
- Domain kits in this index define the implementation input for `/sdd-cavekit map`.

## Definition of Done (Result Contract)

- `status`: `ok` only when this index and all nine domain kits parse, cross-reference, and satisfy R1–R41.
- `artifacts`: the ten new `context/dc-dev-superflow/kits/dc-dev-superflow-*.md` files.
- `next_recommended`: `/sdd-cavekit map` using this index plus all linked domain kits.
- `risks`: live OpenCode plugin dispatch, model availability, MCP transport, and unavailable optional tools remain Map/Make verification points.
