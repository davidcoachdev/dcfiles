# Dc-Dev Superflow: Token Efficiency

## Goal

Reduce transport and command-output cost measurably without compromising authority, security, clarity, or evidence.

## Constraints

- Measure existing RTK/Headroom/context-mode behavior before adding an adapter; do not stack duplicate compressors.
- Missing helpers degrade to uncompressed transport with an explicit budget risk.
- Security, approval, provenance, receipts, and final evidence are exempt from compression.

## Requirements

### R38: Budget declaration and accounting
**Description:** Each route and child has explicit token, byte, time, and output budgets.
**Acceptance Criteria:**
- [ ] A budget record names limits, measurement unit, owner, current usage, remaining allowance, and enforcement action.
- [ ] Usage is recorded for context, commands, model transport, retries, and evidence separately.
- [ ] Exceeding a budget produces a typed stop/blocked state rather than silently truncating authoritative data.
**Dependencies:** Intake R6; execution R23.

### R39: Measured RTK/Headroom adapter
**Description:** Existing reduction capabilities are selected only when available and beneficial.
**Acceptance Criteria:**
- [ ] A measurement compares original and reduced output size plus elapsed time for each selected adapter.
- [ ] An unavailable RTK/Headroom helper is recorded as unavailable and triggers safe fallback, not installation or substitution.
- [ ] A reduction that removes requirement IDs, errors, security findings, receipts, or evidence is rejected.
**Dependencies:** Context R10–R11; security R26.

### R40: Adaptive clarity and escalation
**Description:** Efficiency adapts to task depth and raises clarity when comprehension or validation is at risk.
**Acceptance Criteria:**
- [ ] Fast, standard, and deep routes use declared budgets and compression modes from the route receipt.
- [ ] A child/reviewer clarity request disables compression for the requested authoritative capsule and records the escalation.
- [ ] Repeated compression failure increases depth or blocks with a measurable reason; it never hides data.
**Dependencies:** Intake R6; context R10–R12.

### R41: Efficiency evidence and YAGNI
**Description:** Token optimization is justified by measured value and does not create unnecessary topology.
**Acceptance Criteria:**
- [ ] The evidence bundle reports before/after bytes/tokens, latency, loss-budget status, and adapter identity.
- [ ] A proposed additional compressor, agent, or transport without measurable benefit is rejected or marked out of scope.
- [ ] A route remains the smallest topology that satisfies all requirements and gates.
**Dependencies:** Architecture R18–R19; evidence R30–R33.

## Security Gates

- [ ] No security/approval/irreversible content is compressed.
- [ ] Budget enforcement cannot truncate or rewrite authority, provenance, verdict, or evidence.
- [ ] Output reduction does not expose secrets or alter protected-path errors.

## Verification Plan

- Budget accounting, adapter availability, reduction integrity, clarity escalation, and YAGNI tests.
- Gate 4 benchmark/measurement evidence plus Gate 6 review of loss and value.

## Out of Scope

- Installing Headroom/RTK, building a new compressor, optimizing model weights, or sacrificing evidence for cost.

## Cross-References

- Depends on context R9–R12, architecture R18–R19, and evidence R30–R33.
- Applies across intake, research, planning, execution, and recovery.

## Definition of Done (Result Contract)

`ok` requires declared budgets, measured savings, loss-budget compliance, safe fallback, and no unnecessary topology. Artifact: budget/measurement report. Next: `/sdd-cavekit map`.
