# Cavekit: Dc-Dev Deterministic Enforcement

## Scope

This kit defines enforcement that must not depend solely on model compliance: supported OpenCode hooks, trace writing, write-scope stopping, mandatory test evidence, adversarial verification, and bidirectional spec updates.

## Constraints

- Reuse `autonomous-loop`, `cavekit-check`, and `impl-tracking`; adapt them to deterministic OpenCode enforcement.
- Only events that the installed OpenCode runtime actually dispatches may be used. If an intended event is unavailable, the requirement must be satisfied by an available hook or a check-phase gate, never by an invented event.
- Enforcement must fail closed for scope, evidence, and P0/P1 security failures.

## Requirements

### R20: Runtime-confirmed hook surface

- **What**: Dc-Dev binds enforcement only to OpenCode hook events confirmed available in the target runtime.
- **Acceptance criteria**:
  - [ ] A capability probe or documented runtime check produces the set of supported hook events before configuration is written.
  - [ ] Configuration references no event outside that set.
  - [ ] Unsupported desired enforcement is reported as a risk and mapped to a deterministic check-phase fallback.
- **Test**: Hook capability fixture with supported, unsupported, and changed-event sets.
- **Dependencies**: ADR-001 Constraints.

### R21: Deterministic trace.md

- **What**: The implementation trace is written by enforcement, not by an optional prompt instruction.
- **Acceptance criteria**:
  - [ ] Each phase start, delegation, result, verdict, gate failure, and stop is represented in `context/impl/trace.md`.
  - [ ] Trace entries include session, phase, task, timestamp, status, artifact paths, and requirement IDs.
  - [ ] A failed trace write prevents a successful phase result from being reported.
  - [ ] Trace content contains no secrets or raw protected-file contents.
- **Test**: Trace event replay, schema, failure, and redaction tests.
- **Dependencies**: R20; reuses `impl-tracking`.

### R22: Mechanical write-scope enforcement

- **What**: A sub-agent may modify only files in its task write scope; an out-of-scope mutation stops the task and is reported.
- **Acceptance criteria**:
  - [ ] A permitted write succeeds and is recorded against the task scope.
  - [ ] A write to an unlisted path is blocked or immediately causes a stop before further edits.
  - [ ] The violation records attempted path, task scope, agent identity, and next HITL action without leaking file contents.
  - [ ] Scope is immutable for the active task unless explicitly re-approved and re-issued.
- **Test**: Allowed-path, denied-path, traversal/symlink, scope-change, and stop-state tests.
- **Dependencies**: R14, R19, R20-R21.

### R23: Mandatory real test evidence

- **What**: Completion requires machine-verifiable output from the actual required test commands.
- **Acceptance criteria**:
  - [ ] A result stating “all tests pass” without captured command, exit code, and output is rejected as incomplete.
  - [ ] Evidence is linked to the requirement IDs it verifies and the exact working tree/task revision.
  - [ ] Failed, truncated, or unavailable command output prevents `APPROVE`.
  - [ ] Evidence capture excludes secrets and redacts sensitive command output.
- **Test**: Evidence parser tests for valid, missing, failed, stale, and secret-containing output.
- **Dependencies**: R4, R12-R13, R21.

### R24: Adversarial verifier with model separation

- **What**: Check evaluates the implementation against the kits with the opposite goal to Make and uses a different model.
- **Acceptance criteria**:
  - [ ] Check receives implementation artifacts, kits, task scope, trace, and real evidence.
  - [ ] Check's model identifier differs from Make's identifier; equality causes `REJECT` before approval.
  - [ ] The verifier reports acceptance gaps, scope violations, evidence defects, and security findings by requirement ID.
  - [ ] The verifier cannot approve an implementation solely because Make claimed success.
- **Test**: Adversarial fixture where Make claims success but a hidden gap/security issue forces `REJECT`.
- **Dependencies**: R12, R16, R22-R23.

### R25: Bidirectional spec updating

- **What**: Implementation discoveries and approved decisions update the relevant kit before the next iteration or completion.
- **Acceptance criteria**:
  - [ ] A new behavior decision creates or updates a requirement, acceptance criterion, non-goal, or explicit risk with traceability to the source decision.
  - [ ] The next Make/Check handoff contains the updated kit revision.
  - [ ] A kit update without corresponding tests is rejected by Strict TDD validation.
  - [ ] A proposed scope expansion pauses for HITL approval rather than silently changing the contract.
- **Test**: Discovery-to-kit update, revision propagation, missing-test, and scope-expansion fixtures.
- **Dependencies**: R1, R7, R13, R21.

## Out of Scope

- Inventing OpenCode lifecycle events or relying on Claude Code-only hook semantics.
- Replacing test runners, source-control policy, or the OpenCode permission system wholesale.
- Treating prompts, sentinels, or self-reported receipts as sole enforcement mechanisms.

## Cross-References

- Depends on `dc-dev-overview.md` R1-R4.
- Enforces `dc-dev-gold-loop.md` R11-R14.
- Enforces `dc-dev-protocols.md` R16-R19.

## Security Gates

- [ ] Hook availability is verified against the real runtime.
- [ ] Write scope blocks traversal, symlink escape, and unlisted paths.
- [ ] Evidence and traces are secret-free and fail closed when invalid.
- [ ] Different-model adversarial verification is mandatory.
- [ ] P0/P1 findings cannot be overridden by sentinel or user-visible text.

## Verification Plan

- Runtime hook capability probe
- Trace replay and schema tests
- Write-scope security tests, including traversal and symlink cases
- Evidence and redaction tests
- Adversarial verifier tests with distinct model fixtures
- `git diff --check`

## Definition of Done (Result Contract)

- `status`: `ok` only when R20-R25 pass and all enforcement paths are runtime-confirmed.
- `executive_summary`: Deterministic trace, scope, evidence, and adversarial gates.
- `artifacts`: This kit, hook configuration, enforcement tests, trace schema, and evidence fixtures.
- `next_recommended`: `/sdd-cavekit map`.
- `risks`: OpenCode's available hook events may force fallback verification for some desired enforcement points.
