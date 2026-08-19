# Dc-Dev Superflow: Architecture and Planning

## Goal

Turn admitted requirements and evidence into minimal architecture decisions and a dependency-aware execution plan.

## Constraints

- Architecture is WHAT/decision evidence; implementation details belong in the plan and code.
- YAGNI is mandatory: unrequested capabilities are rejected or explicitly marked out of scope.
- Planning cannot execute tasks, bypass security, or widen write scope.

## Requirements

### R17: Options and decision fitness
**Description:** Material architecture choices are explicit, bounded, and testable.
**Acceptance Criteria:**
- [ ] Each material choice lists at least one alternative, decision criteria, trade-offs, and affected requirement IDs.
- [ ] Each accepted decision has a deterministic fitness check or a documented reason why no automated check applies.
- [ ] An unresolved architecture choice blocks dependent execution rather than being silently guessed.
**Dependencies:** Research R13–R16; existing ADR-001.

### R18: YAGNI and scope ledger
**Description:** The plan contains only requested or required work.
**Acceptance Criteria:**
- [ ] Every planned task maps to a user request, requirement ID, security gate, or necessary dependency.
- [ ] An unrequested feature proposed by a child is rejected, moved to Out of Scope, or paused for HITL approval.
- [ ] The plan reports a count of in-scope tasks and rejected/deferred scope items.
**Dependencies:** Intake R5–R8.

### R19: Dependency graph and waves
**Description:** Execution work is represented as owned tasks with deterministic dependencies and conflict rules.
**Acceptance Criteria:**
- [ ] Every task has ID, owner, requirement IDs, write scope, model/depth, dependencies, validation gates, and completion condition.
- [ ] The graph rejects cycles, missing owners, missing dependencies, overlapping parallel write scopes, and tasks with no validation.
- [ ] Independent tasks are grouped into waves; conflicting tasks are serialized.
**Dependencies:** Security R25–R29; execution R21–R24.

### R20: Checkpointed plan handoff
**Description:** The plan is persisted before execution and can be resumed without reinterpretation.
**Acceptance Criteria:**
- [ ] The handoff contains plan revision, receipt lineage, source references, task graph hash, budgets, and unresolved risks.
- [ ] A changed requirement invalidates the affected plan revision and prevents stale execution.
- [ ] A plan with no tasks returns an explicit empty-plan result and does not claim successful implementation.
**Dependencies:** Recovery R34–R37, evidence R30–R33.

## Security Gates

- [ ] No task can write outside its declared scope or execute before capability admission.
- [ ] Scope expansion creates a new approval-bound plan revision.
- [ ] Secret-handling and irreversible tasks require deep/security depth and HITL confirmation.

## Verification Plan

- Option/fitness, YAGNI, graph cycle/conflict, revision invalidation, and empty-plan tests.
- Gate 1 schema/lint, Gate 2 graph unit, Gate 3 handoff integration, Gate 5 restart smoke.

## Out of Scope

- Implementing code, editing existing kits/agents/configuration, or creating a general issue tracker.

## Cross-References

- Depends on intake R5–R8 and research R13–R16.
- Feeds execution R21–R24, security R25–R29, and recovery R34–R37.

## Definition of Done (Result Contract)

`ok` requires a minimal, acyclic, owned, validated, checkpointed plan. Artifact: plan graph and handoff receipt. Next: `/sdd-cavekit map`.
