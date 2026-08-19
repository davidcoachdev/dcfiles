# Dc-Dev Superflow: Intake and Routing

## Goal

Normalize each request, select the smallest valid path, and route only through the additive Dc-Dev child graph.

## Constraints

- Preserve the existing `dc-dev` front door and its explicit approval boundary.
- Reuse existing front-door and triage concepts by contract; do not invoke their agents.
- Ambiguity, scope expansion, destructive action, and build transition require HITL.
- Strict TDD and fail-closed security apply to every route.

## Requirements

### R5: Request receipt and normalization
**Description:** Each request becomes a bounded receipt with intent, actor/session, requested outcome, constraints, and risk flags.
**Acceptance Criteria:**
- [ ] The normalized receipt contains a stable request ID, session ID, intent class, requested artifacts, explicit non-goals, and timestamp.
- [ ] The same normalized input under the same schema produces the same intent and risk fields.
- [ ] Secret-like values are redacted before the receipt is persisted or returned.
**Dependencies:** Overview R1–R4.

### R6: Adaptive route and HITL boundary
**Description:** Routing selects fast, standard, or deep/security depth without bypassing required gates.
**Acceptance Criteria:**
- [ ] Consultation launches no builder and build intent remains blocked until attributable approval is recorded.
- [ ] Ambiguous intent produces exactly one clarifying question and a persisted unresolved ambiguity.
- [ ] Deep/security depth is selected when a request touches credentials, authorization, plugins, MCPs, irreversible actions, or P0/P1 risk.
- [ ] A route record names the selected depth, required gates, estimated budget, and reason.
**Dependencies:** R5, security kit R25–R29.

### R7: Model availability and precedence
**Description:** Requested models are resolved explicitly and never silently substituted.
**Acceptance Criteria:**
- [ ] A valid phase-specific model overrides the configured default and the selected identifier appears in the receipt.
- [ ] An unavailable requested model returns `setup-required` with the missing capability and launches no alternate model.
- [ ] Builder and verifier model identifiers are unequal; equality blocks the route before delegation.
**Dependencies:** Existing `context/plans/dc-dev-model-routing.md`; R25.

### R8: Route admission and graph allowlist
**Description:** Every child dispatch is admitted against role, capability, scope, and dependency rules.
**Acceptance Criteria:**
- [ ] A route to any non-`dc-dev-*` child is rejected with a recorded reason and no launch.
- [ ] A missing plugin/MCP/CLI capability returns `blocked` or `setup-required` according to whether HITL setup is possible, with no hidden fallback.
- [ ] Duplicate phase/task/iteration requests resolve to one active dispatch and one receipt.
**Dependencies:** R3, R6, R7, security kit R26–R28.

## Security Gates

- [ ] Approval is request-bound, attributable, expiring, and revocable.
- [ ] User text cannot alter the allowlist, required gates, model precedence, or protected scope.
- [ ] Route denial does not disclose protected paths, secrets, or unavailable credential values.

## Verification Plan

- Table-driven normalization and route-state tests.
- Model precedence, unavailable-model, equal-model, allowlist, and duplicate-dispatch tests.
- Gate 1 parser, Gate 2 unit, Gate 3 route integration, Gate 5 restart smoke, Gate 6 HITL review.

## Out of Scope

- Implementing child agents or editing the existing `dc-dev` configuration.
- Automatic approval, model substitution, arbitrary delegation, or product-specific intent taxonomies.

## Cross-References

- Depends on overview R1–R4 and `dc-dev-front-door.md` R5–R9.
- Feeds context R9–R12, planning R17–R20, and capability gates R25–R29.

## Definition of Done (Result Contract)

`ok` requires all R5–R8 tests and route receipts; blocked/setup-required outcomes remain explicit. Artifact: normalized receipt and route decision schema. Next: context admission or `/sdd-cavekit map`.
