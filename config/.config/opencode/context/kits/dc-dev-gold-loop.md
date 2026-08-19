# Cavekit: Dc-Dev Gold Loop and Delegation

## Scope

This kit defines the Retrieve → Sketch → Map → bounded Make/Check lifecycle, Strict TDD, literal verdicts, security blocking, and preservation of the existing sub-agent factory.

## Constraints

- Reuse `cavekit-gold-loop`, `cavekit-make`, `cavekit-check`, and `autonomous-loop`; adapt only the gaps listed in `reuse-report.md`.
- Dc-Dev coordinates and delegates; it never implements feature work inline.
- The loop is bounded at five iterations and cannot bypass security or evidence gates.

## Requirements

### R10: Ordered gold lifecycle

- **What**: Approved builds execute Retrieve, Sketch, Map, then Make ↔ Check in that order.
- **Acceptance criteria**:
  - [ ] A fresh approved build records completed Retrieve before Sketch starts, Sketch before Map, and Map before Make.
  - [ ] Check receives the current kits, task plan, implementation result, and prior evidence.
  - [ ] A failed phase prevents dependent phases from starting.
- **Test**: Lifecycle state-machine test with phase-order and failure fixtures.
- **Dependencies**: R7, R15, R20-R21.

### R11: Bounded autonomous iteration

- **What**: Make and Check may iterate only within a maximum of five cycles and a user-controlled stop boundary.
- **Acceptance criteria**:
  - [ ] The sixth Make/Check cycle is never launched.
  - [ ] A user kill-switch request stops future launches, records the stop, and leaves unresolved work visible.
  - [ ] A completion sentinel cannot terminate the loop while required evidence or security findings are unresolved.
  - [ ] Lock/heartbeat or equivalent loop ownership prevents duplicate concurrent loops.
- **Test**: Counter, kill-switch, sentinel-spoofing, and duplicate-launch tests.
- **Dependencies**: Reuses `autonomous-loop`; R19, R23, R24.

### R12: Literal verdict and security axis

- **What**: Check emits exactly `Verdict: APPROVE`, `Verdict: REVISE`, or `Verdict: REJECT`; the security axis always runs.
- **Acceptance criteria**:
  - [ ] Any P0 or P1 security finding produces `Verdict: REJECT`.
  - [ ] `APPROVE` is impossible unless all acceptance criteria, evidence requirements, and security gates pass.
  - [ ] `REVISE` identifies unresolved requirement IDs and does not claim completion.
  - [ ] Malformed, missing, or ambiguous verdicts are treated as failed verification, not approval.
- **Test**: Verdict parser and security severity matrix tests.
- **Dependencies**: Reuses `cavekit-check`; R23-R24.

### R13: Strict TDD per requirement

- **What**: Every R acceptance criterion is tested red → green → refactor before the requirement is considered complete.
- **Acceptance criteria**:
  - [ ] The task graph maps every acceptance criterion to a test case or deterministic validation command.
  - [ ] A requirement cannot be marked complete when its test was added after implementation without a recorded red run.
  - [ ] Full test output is attached to the implementation receipt.
- **Test**: TDD trace tests and criterion-to-test coverage validation.
- **Dependencies**: R1, R23; reuses `cavekit-make`.

### R14: Factory-preserving delegation and deduplication

- **What**: Each work item uses the smallest useful specialist topology and is launched at most once for the same phase/task/iteration identity.
- **Acceptance criteria**:
  - [ ] Dc-Dev emits delegation requests rather than feature implementation content.
  - [ ] Repeated identical launch requests resolve to one active sub-agent and one result.
  - [ ] Parallel work items have disjoint write scopes or are serialized before conflicting writes.
  - [ ] The selected topology and deduplication key appear in the receipt.
- **Test**: Delegation spy, duplicate-launch, and conflicting-scope fixtures.
- **Dependencies**: Reuses `gentle-orchestrator`; R19, R22.

## Out of Scope

- A new orchestration runtime or replacement factory.
- Unbounded retries, self-authorized continuation, or silent fallback from `REJECT`.
- Candidate comparison without multiple real candidates.

## Cross-References

- Depends on `dc-dev-overview.md` R1-R4.
- Depends on `dc-dev-protocols.md` R15-R19.
- Depends on `dc-dev-enforcement.md` R20-R25.

## Security Gates

- [ ] P0/P1 findings force `REJECT`.
- [ ] Sentinel, receipt, and model output cannot bypass security checks.
- [ ] Delegated agents cannot write outside task scope.
- [ ] Loop locks and kill switch are tested against duplicate and unauthorized continuation.

## Verification Plan

- Gold-loop state-machine tests
- Verdict/security matrix tests
- TDD trace and criterion coverage tests
- Delegation/deduplication tests
- `git diff --check`

## Definition of Done (Result Contract)

- `status`: `ok` only when R10-R14 pass and no blocking verdict exists.
- `executive_summary`: Ordered, bounded, delegated gold loop with adversarial security gate.
- `artifacts`: This kit, task graph, loop receipts, and test evidence.
- `next_recommended`: `/sdd-cavekit check` or `/sdd-cavekit map` when planning is absent.
- `risks`: Actual OpenCode delegation concurrency and stop behavior require runtime verification.
