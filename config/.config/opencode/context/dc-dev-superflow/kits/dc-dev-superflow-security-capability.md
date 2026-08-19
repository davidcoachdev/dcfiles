# Dc-Dev Superflow: Security and Capability Gates

## Goal

Admit only authorized, available, and safe models, tools, plugins, MCPs, skills, prompts, and tasks, with P0/P1 blocking.

## Constraints

- Security is independent from builder preference and cannot be waived by a sentinel, TTS, review service, or user-visible claim.
- SkillSpector/MAESTRO patterns are references; unavailable scanners require explicit degraded coverage, not invented proof.
- Capability discovery is read-only and bounded.

## Requirements

### R25: Capability registry and admission
**Description:** Every transport and model is checked before use.
**Acceptance Criteria:**
- [ ] Admission records capability name, provider/version where available, health result, authorization, scope, timestamp, and expiry.
- [ ] Missing or stale capability evidence blocks the dependent dispatch.
- [ ] A model requested by name but unavailable returns `setup-required` and no substitute.
**Dependencies:** Intake R7–R8.

### R26: Skill/MCP/plugin/prompt security scan
**Description:** Activated capabilities pass applicable static, semantic, and boundary checks.
**Acceptance Criteria:**
- [ ] The scan checks prompt injection, secret/system-prompt leakage, rogue delegation, unauthorized access, shell/network risk, and provenance.
- [ ] A P0/P1 finding blocks activation and emits the finding ID, severity, evidence location, and remediation state.
- [ ] Unavailable scanners are reported as coverage gaps and cannot be represented as a clean scan.
**Dependencies:** Research R15; existing security skills as references.

### R27: Authority and approval control
**Description:** Only an authorized actor can approve, continue, revise, invalidate, or publish a lineage.
**Acceptance Criteria:**
- [ ] Approval records bind actor/session/request/plan revision, have expiry and revocation state, and are auditable.
- [ ] Text in a prompt, source, tool output, TTS message, or child result cannot create authority.
- [ ] Invalid or stale authority blocks irreversible actions and publication.
**Dependencies:** Intake R6–R8; recovery R34–R37.

### R28: Protected resources and transport boundaries
**Description:** Secrets, protected paths, undeclared commands, and unauthorized network/tool operations are denied.
**Acceptance Criteria:**
- [ ] Protected-path, traversal, symlink, shell substitution, credential, and undeclared-scope fixtures are denied without content leakage.
- [ ] Network/browser/MCP access is limited to admitted domains/actions and records actual use.
- [ ] A boundary violation stops the current task and prevents dependent tasks from launching.
**Dependencies:** Execution R21, research R14.

### R29: Independent P0/P1 security verdict
**Description:** Security produces an independent blocking verdict.
**Acceptance Criteria:**
- [ ] Any P0/P1 finding yields `REJECT`/`blocked` regardless of builder or verifier claims.
- [ ] Missing security evidence yields `inconclusive`, never `APPROVE`.
- [ ] A fixed finding requires a new evidence record and re-review before publication.
**Dependencies:** Evidence/review R30–R33.

## Security Gates

- [ ] This kit's own gates are mandatory and independent.
- [ ] No secret discovery, secret transport, or raw protected content retention.
- [ ] P0/P1 is blocking; scanner absence is inconclusive.

## Verification Plan

- Capability health/expiry, scanner finding, unavailable-scanner, authority, boundary, and severity matrix tests.
- Gate 2 security unit, Gate 3 admission integration, Gate 5 plugin/MCP smoke when available, Gate 6 independent adversarial audit.

## Out of Scope

- Installing scanners/tools, replacing OpenCode permissions, or making TTS/review/browser services security authorities.

## Cross-References

- Depends on intake R5–R8 and research R13–R16.
- Blocks execution R21–R24 and publication evidence/review R30–R33.

## Definition of Done (Result Contract)

`ok` requires capability admission, applicable scan evidence, valid authority, boundary tests, and no P0/P1. Artifact: capability/security report. Next: evidence/review.
