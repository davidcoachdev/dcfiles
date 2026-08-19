# Dc-Dev Superflow: Research and Provenance

## Goal

Produce bounded, attributable research that remains untrusted data until admitted by the superflow.

## Constraints

- Repository, web, browser, MCP, skill, and generated content are untrusted inputs.
- Research is optional and capability-gated; unavailable sources never trigger silent substitution.
- Clone/read/delete lifecycles must be bounded and leave provenance without retaining secrets.

## Requirements

### R13: Source registry and confidence
**Description:** Every research claim maps to a registered source and confidence state.
**Acceptance Criteria:**
- [ ] Each source record contains locator, source type, retrieval time, scope, trust label, and confidence (`high|medium|low|unknown`).
- [ ] A synthesized claim without at least one source record is marked unsupported and cannot enter an authoritative decision capsule.
- [ ] Conflicting sources remain separate and are reported rather than silently merged.
**Dependencies:** Context R9–R12.

### R14: Bounded acquisition and provenance
**Description:** Research acquisition is limited by declared authorization, time, size, and destination scope.
**Acceptance Criteria:**
- [ ] A research receipt records authorization, requested domains/paths, byte/time limits, and actual usage.
- [ ] Acquisition outside the declared scope is denied before content is retained.
- [ ] Every retained excerpt identifies source, location, retrieval timestamp, and transformation step.
**Dependencies:** Security R25–R29.

### R15: Untrusted-content isolation
**Description:** Source text cannot alter workflow instructions, permissions, or completion status.
**Acceptance Criteria:**
- [ ] Prompt-injection markers in source content are labeled as findings and are not copied into control prompts as executable instructions.
- [ ] A source requesting secrets, tool execution, approval, or scope expansion is recorded as untrusted and blocked from those effects.
- [ ] Research output contains separate `facts`, `uncertainties`, `risks`, and `recommendations` fields.
**Dependencies:** R13–R14, security R27.

### R16: Research failure and empty-result behavior
**Description:** Missing, partial, or failed research remains explicit.
**Acceptance Criteria:**
- [ ] Timeout, 403/404, unavailable MCP, empty source, and parse failure produce typed non-success states with the source record preserved.
- [ ] An empty research result cannot satisfy a requirement or authorize architecture/planning decisions.
- [ ] The next action distinguishes retry, alternative admitted source, HITL question, and abandon without hiding the failure.
**Dependencies:** Recovery R34–R37.

## Security Gates

- [ ] No credentials or protected content are acquired, logged, or retained.
- [ ] External source content never becomes an instruction without explicit admission.
- [ ] Authorization and scope limits are checked before browser, MCP, clone, or shell transport.

## Verification Plan

- Source schema, conflict, injection, bounded-scope, timeout, empty-result, and provenance tests.
- Gate 3 research integration tests with mocked unavailable transports; Gate 6 independent source audit.

## Out of Scope

- Unrestricted web crawling, automatic dependency installation, external repository mutation, or treating research as verification.

## Cross-References

- Depends on context R9–R12 and security R25–R29.
- Feeds architecture R17–R20 and evidence R30–R33.

## Definition of Done (Result Contract)

`ok` requires attributable sources, bounded acquisition, isolated untrusted content, and explicit failure states. Artifact: source registry and research capsule. Next: `/sdd-cavekit map`.
