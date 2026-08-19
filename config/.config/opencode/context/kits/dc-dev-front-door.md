# Cavekit: Dc-Dev Front Door and Intent

## Scope

This kit defines the single conversational entry, consultation behavior, intent triage, and explicit approval boundary before any build workflow begins.

## Constraints

- Reuse `cavekit-triage` and the conversational behavior from `gentle-orchestrator` as reported in `reuse-report.md`.
- Preserve the ADR rule that consultation-to-build transition is never automatic.
- Strict TDD, least privilege, and explicit non-goals are mandatory.

## Requirements

### R5: Single public entry

- **What**: Users interact with one public Dc-Dev agent for both questions and build requests.
- **Acceptance criteria**:
  - [ ] The public configuration exposes exactly one Dc-Dev entry for this feature.
  - [ ] A conversation can remain in consultation mode without invoking build-phase agents.
  - [ ] Legacy orchestrator names are not presented as alternate public doors for the same workflow.
- **Test**: Configuration discovery test and conversation routing fixture.
- **Dependencies**: R2; ADR-001 Decision.

### R6: Deterministic intent triage

- **What**: Each incoming request is classified as consultation or build intent before phase routing.
- **Acceptance criteria**:
  - [ ] Given a question with no requested mutation, then no build agent is launched.
  - [ ] Given an explicit request to create or modify artifacts, then the request is classified as build intent but remains blocked pending approval.
  - [ ] Given ambiguous intent, then Dc-Dev asks exactly one clarifying question and records the unresolved ambiguity.
  - [ ] The classification and rationale appear in the phase trace/result artifact.
- **Test**: Table-driven triage tests covering consultation, build, and ambiguous inputs.
- **Dependencies**: Reuses `cavekit-triage`; R20-R21.

### R7: Explicit HITL build approval

- **What**: Build mode starts only after an explicit, attributable approval from the user.
- **Acceptance criteria**:
  - [ ] A build-intent request without approval launches zero build-phase agents and performs zero feature writes.
  - [ ] A distinct approval response starts Retrieve/Sketch/Map only after the approval is recorded.
  - [ ] Approval for one request cannot authorize a later, materially different request.
  - [ ] Cancellation or refusal leaves the session in consultation state and reports no build as completed.
- **Test**: State-machine tests with missing, valid, stale, and revoked approvals.
- **Dependencies**: R6, R19, R21.

### R8: Consultation is useful without mutation

- **What**: Dc-Dev can answer or clarify questions without pretending that a build occurred.
- **Acceptance criteria**:
  - [ ] A consultation response contains no fabricated implementation artifact path or test evidence.
  - [ ] If the user asks to proceed, the response presents the proposed build scope and approval request before delegation.
  - [ ] Consultation errors are reported with a safe explanation and a next action.
- **Test**: Conversation contract tests.
- **Dependencies**: R4, R6.

### R9: Front-door security boundary

- **What**: The entry point must prevent unauthorized or unsafe transition and avoid leaking sensitive context.
- **Acceptance criteria**:
  - [ ] Approval tokens/records contain no secret values in user-visible output or trace files.
  - [ ] Untrusted user content cannot override system scope, security gates, or the approval requirement.
  - [ ] Requests attempting to access protected files or credentials are refused and logged without exposing their contents.
- **Test**: Prompt-injection, secret-redaction, and unauthorized-transition fixtures.
- **Dependencies**: R7, R20-R22.

## Out of Scope

- Product-specific chat features, memory UX, or a second conversational persona.
- Automatic approval based on confidence, intent score, or prior approval.
- Authentication redesign outside the approval and artifact-access boundary.

## Cross-References

- Depends on `dc-dev-overview.md` R1-R4.
- Depends on `dc-dev-protocols.md` R15 and R19.
- Depends on `dc-dev-enforcement.md` R20-R22.

## Security Gates

- [ ] No build launch without explicit approval evidence.
- [ ] No secret or protected-file content in conversation, trace, or Result Contract.
- [ ] Prompt injection cannot change phase permissions or non-goals.
- [ ] Refusal and cancellation paths are tested.

## Verification Plan

- `python -m json.tool opencode.json`
- Front-door state-machine tests
- Prompt-injection and secret-redaction tests
- `git diff --check`

## Definition of Done (Result Contract)

- `status`: `ok` only when R5-R9 tests pass.
- `executive_summary`: One safe entry point with explicit approval gating.
- `artifacts`: This kit plus routing/configuration and tests.
- `next_recommended`: `/sdd-cavekit map`.
- `risks`: Boundary behavior depends on the actual OpenCode permission and hook surface.
