# Dc-Dev Superflow: Evidence and Adversarial Review

## Goal

Convert execution and security output into a complete evidence bundle and an independent literal verdict.

## Constraints

- Evidence must come from actual commands/runtime observations, not model assertions or artifact existence.
- Reviewer and builder must have separate authority and, where configured, different model identifiers.
- Inconclusive validation is a first-class result and never becomes pass.

## Requirements

### R30: Evidence bundle completeness
**Description:** Each meaningful run produces a compact, human-reviewable proof bundle.
**Acceptance Criteria:**
- [ ] The bundle contains request/plan/lineage receipt, artifact paths, provenance, timestamps, command/exit/output records, test mapping, security report, and recovery status.
- [ ] Every claimed requirement maps to one or more evidence records with revision/worktree identity.
- [ ] Missing, stale, truncated, secret-containing, or empty evidence is flagged and blocks `ok`.
**Dependencies:** Execution R21–R24; security R25–R29.

### R31: Ordered validation gates
**Description:** Validation runs in ordered gates and stops on earlier failures.
**Acceptance Criteria:**
- [ ] Gate order is compilation/schema, unit, integration, performance when applicable, startup/restart smoke, and independent review.
- [ ] A failed gate prevents later success claims and records the failed gate and next action.
- [ ] Every requirement and criterion maps to at least one gate.
**Dependencies:** Overview R2; planning R19.

### R32: Independent adversarial review
**Description:** A reviewer challenges implementation, scope, evidence, provenance, and security rather than repeating builder claims.
**Acceptance Criteria:**
- [ ] The review report lists reviewed requirement IDs, evidence IDs, gaps, out-of-scope additions, security findings, and model/authority identity.
- [ ] A hidden-gap fixture causes `REVISE` or `REJECT` despite a builder success claim.
- [ ] Reviewer model identity differs from builder when both are available; unavailable distinct reviewer returns `inconclusive`.
**Dependencies:** Security R29; execution R24.

### R33: Literal verdict and publication
**Description:** Publication follows an exact verdict and safe Result Contract.
**Acceptance Criteria:**
- [ ] Only `Verdict: APPROVE`, `Verdict: REVISE`, `Verdict: REJECT`, or `Verdict: INCONCLUSIVE` is accepted; malformed verdicts fail closed.
- [ ] `APPROVE` requires all applicable gates, complete evidence, no P0/P1, valid authority, and non-empty current artifacts.
- [ ] `REVISE`, `REJECT`, and `INCONCLUSIVE` include unresolved IDs and a next action; they never claim completion.
**Dependencies:** R4, R29–R32.

## Security Gates

- [ ] Evidence is redacted and integrity-bound to the reviewed revision.
- [ ] Builder cannot author or overwrite independent review evidence.
- [ ] P0/P1 and missing security evidence block publication.

## Verification Plan

- Bundle schema, evidence parser, gate cascade, hidden-gap, model-separation, verdict, empty/stale artifact, and redaction tests.
- Gate 2–3 automated validation and Gate 6 human review of the bundle.

## Out of Scope

- Treating screenshots, TTS, OpenCode Review, or artifact existence as sole proof; changing existing test suites in Sketch.

## Cross-References

- Depends on execution R21–R24 and security R25–R29.
- Feeds recovery R34–R37 and overview R4.

## Definition of Done (Result Contract)

`ok` requires a complete bundle and literal independent `APPROVE`; all other verdicts remain visible. Artifact: evidence bundle and review report. Next: recovery or publication.
