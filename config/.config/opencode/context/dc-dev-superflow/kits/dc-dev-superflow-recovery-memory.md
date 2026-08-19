# Dc-Dev Superflow: Recovery and Memory

## Goal

Persist lineage and checkpoints so interruption, failure, restart, and memory conflicts recover safely without hiding history.

## Constraints

- Retry, resume, new lineage, abandon, blocked, and inconclusive are distinct states.
- Failed lineage is immutable history; destructive or irreversible work is never silently retried.
- Engram/context-mode are adapters, not completion authorities.

## Requirements

### R34: Receipt and lineage ledger
**Description:** Every run and delegated action has an attributable, append-only lineage record.
**Acceptance Criteria:**
- [ ] A receipt includes request/session/actor, parent lineage, phase/task/iteration, model, inputs, outputs, authority, provenance, timestamps, and verification status.
- [ ] Receipt IDs and parent links are unique and form an acyclic lineage.
- [ ] Receipt-write failure blocks the phase result and preserves the failure reason.
**Dependencies:** Intake R5; evidence R30.

### R35: Recovery state machine
**Description:** Recovery transitions are explicit and guarded.
**Acceptance Criteria:**
- [ ] The state set includes `running`, `retryable`, `resumable`, `new-lineage-required`, `abandoned`, `blocked`, and `inconclusive`.
- [ ] Invalid transitions are rejected without mutating the current state.
- [ ] Retry preserves lineage; resume requires a valid checkpoint; new lineage requires authorized confirmation.
**Dependencies:** Security R27; evidence R33.

### R36: Restart-safe checkpoints and backups
**Description:** Restart recovery resumes only from valid, current, attributable checkpoints with backup metadata.
**Acceptance Criteria:**
- [ ] A checkpoint stores plan revision, graph identity, task states, write scope, budget, evidence references, and checksum/timestamp.
- [ ] Stale, corrupt, ambiguous, or scope-mismatched checkpoints refuse resume and preserve the failed checkpoint.
- [ ] Any configuration/artifact mutation records backup identity, restore location, and restore status before mutation.
**Dependencies:** Planning R20; execution R23–R24.

### R37: Memory deduplication and conflict handling
**Description:** Durable memory stores compact, provenance-bound observations without silent conflict loss.
**Acceptance Criteria:**
- [ ] Identical observations deduplicate by stable identity while preserving source lineage.
- [ ] Conflicting observations remain distinguishable and create a review-needed state.
- [ ] Memory timeout/offline behavior records a typed risk and never fabricates retrieved context.
**Dependencies:** Context R12; research R13–R16.

## Security Gates

- [ ] Recovery cannot bypass approval, capability, security, or verification gates.
- [ ] Failed lineage and checkpoints are retained without secrets or protected content.
- [ ] Irreversible retry requires explicit HITL confirmation and a new attributable receipt.

## Verification Plan

- Lineage graph, transition matrix, stale/corrupt checkpoint, backup/restore, dedupe/conflict, and offline tests.
- Gate 3 restart integration and Gate 5 smoke validation.

## Out of Scope

- Automatic destructive retry, hidden state repair, replacing Engram, or deleting failed lineage.

## Cross-References

- Depends on architecture R20, execution R23–R24, security R27, and evidence R30–R33.
- Supplies recovery state to the overview Result Contract R4.

## Definition of Done (Result Contract)

`ok` requires durable receipts, valid transitions, restart-safe checkpoints, backup metadata, and explicit memory conflicts. Artifact: lineage ledger/checkpoint report. Next: `/sdd-cavekit map` or authorized resume.
