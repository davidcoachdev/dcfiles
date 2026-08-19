# Dc-Dev Superflow: Execution and Strict TDD

## Goal

Execute admitted tasks through owned builders using strict red → green → refactor and real evidence.

## Constraints

- Builder work is delegated, bounded, and write-scope constrained; the coordinator does not implement inline.
- Every acceptance criterion gets a failing test or deterministic validation before implementation.
- A builder cannot declare success; verifier and security remain independent authorities.

## Requirements

### R21: Admission-controlled execution
**Description:** A task starts only when its plan, capability, model, scope, and receipt are valid.
**Acceptance Criteria:**
- [ ] A task missing any required admission field is not launched and returns a typed blocked result.
- [ ] A builder receives only its task capsule, allowed tools, write scope, and requirement IDs.
- [ ] Protected, traversal, symlink, undeclared, or irreversible writes are denied before mutation.
**Dependencies:** Planning R19–R20; security R25–R29.

### R22: Red → green → refactor
**Description:** Each task demonstrates Strict TDD for all mapped criteria.
**Acceptance Criteria:**
- [ ] The task ledger records a failing validation before implementation for every mapped criterion.
- [ ] The same validations pass after implementation and before refactor is marked complete.
- [ ] Refactor changes preserve passing behavior and produce a new real validation record.
- [ ] Missing, fabricated, or post-hoc-only red evidence prevents task completion.
**Dependencies:** Overview R2; existing gold-loop R13.

### R23: Bounded execution and stop control
**Description:** Work respects time, token, iteration, command, and user stop limits.
**Acceptance Criteria:**
- [ ] Exceeding any declared limit stops the task and records used/remaining budget.
- [ ] A kill-switch prevents new launches and exposes pending tasks, risks, and lineage.
- [ ] Duplicate active execution for the same task identity is rejected or joined, never forked silently.
**Dependencies:** Intake R8; token R38–R41; recovery R34–R37.

### R24: Plugin/tool failure behavior
**Description:** Runtime, plugin, CLI, and MCP failures are surfaced without pretending execution succeeded.
**Acceptance Criteria:**
- [ ] A plugin load/dispatch failure returns `blocked` or `inconclusive` with event, capability, and phase evidence.
- [ ] An unavailable tool does not trigger a hidden agent, command, or model substitute.
- [ ] Partial writes are reported with affected scope and recovery action; no success result is emitted.
**Dependencies:** Security R25–R29; evidence R30–R33; recovery R34–R37.

## Security Gates

- [ ] Command and path enforcement fail closed and do not log protected contents.
- [ ] Real test output is captured and redacted before publication.
- [ ] Builder cannot alter requirements, gates, authority, or evidence status.

## Verification Plan

- TDD ledger, scope, limit, kill-switch, duplicate, plugin failure, and partial-write tests.
- Gate 2 unit and Gate 3 integration tests; Gate 5 startup/dispatch smoke; Gate 6 code review.

## Out of Scope

- Inline implementation by the coordinator, unbounded autonomous coding, or bypassing existing runtime enforcement.

## Cross-References

- Depends on architecture R17–R20 and security R25–R29.
- Produces inputs for evidence/review R30–R33 and recovery R34–R37.

## Definition of Done (Result Contract)

`ok` requires admitted execution, red/green/refactor evidence, bounded limits, and no runtime failure. Artifact: task ledger and command evidence. Next: verifier/security gates.
