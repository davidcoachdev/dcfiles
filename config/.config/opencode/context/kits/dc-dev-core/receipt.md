# Dc-Dev Core — Receipt & End-to-End Verification

> Domain kit of the minimal core set. Companion to `overview.md` (R1–R8) and
> `dispatch.md` (R9–R13). Requirements here: **R14–R18**.
> (This file was originally written to the wrong path; the canonical copy lives at
> `context/kits/dc-dev-core/receipt.md`.)

## Goal

Persist an auditable receipt for every dispatch, tied to the real subagent result,
with no secrets, and prove the whole path works against a **live** subagent
(eliminating the historical false-green risk where artifact-existence tests passed
without exercising real dispatch). The receipt also records which experience mode
was in effect (R5/R14).

## Constraints

- **Strict TDD**: each criterion is a failing test before implementation.
- **No secrets** in receipt, trace, or result.
- **Real evidence**: result must reference the child's actual message, not a self-report.

## Requirements

### R14: Receipt schema is complete, deterministic, and records the experience mode

- **What**: The receipt writer appends one JSONL line with exactly
  `{ status, selectedChild, requestId, timestamp, resultRef, evidenceRef, verdict, experienceMode }`.
  `experienceMode` is the mode resolved in R5 and MUST be one of
  `interactive | minimal | automatic`.
- **Acceptance criteria**:
  - [ ] Invoking the writer with a real dispatch result produces a parseable JSONL
        line containing all 8 fields.
  - [ ] `selectedChild` equals the observed child session id from `session.children`.
  - [ ] `experienceMode` equals the mode resolved at flow start (R5) and is one of the 3 allowed values.
  - [ ] A line missing any required field (including `experienceMode`) is rejected as incomplete.
- **Test**: `tests/dc-dev-core/receipt-schema.test.mjs`.
- **Dependencies**: R9, R11.

### R15: End-to-end live test (closes the false-green gap)

- **What**: A test starts a fresh session, dispatches to the real hidden worker
  `dc-dev-worker` via the SDK, and asserts the receipt carries `status` ∈
  {`dispatched`, `done`} with a `selectedChild` **observed through the SDK** (not a
  stub or model assertion).
- **Acceptance criteria**:
  - [ ] The live test passes against the real runtime with the registered worker.
  - [ ] A **negative control** (dispatch replaced by an in-memory stub) FAILS this
        test — proving artifact-existence alone cannot satisfy it.
  - [ ] `selectedChild` is verifiable via `session.children({ id })` in the test.
- **Test**: `tests/dc-dev-core/e2e-live.test.mjs`.
- **Dependencies**: R9, R10, R11, R14.

### R16: No secrets in receipt or trace

- **What**: Receipt and trace contain no credentials, tokens, or protected-path
  contents. `scope-guard` rejects protected paths before any write.
- **Acceptance criteria**:
  - [ ] A fuzz input containing secret-like values (API keys, tokens) is either
        rejected or redacted; the persisted receipt contains none of them.
  - [ ] A write to a protected path is blocked and not recorded in the receipt.
- **Test**: `tests/dc-dev-core/no-secrets.test.mjs`.
- **Dependencies**: R12, R14.

### R17: Result is the subagent's real output

- **What**: `resultRef` points to the child session's actual final message id; the
  verdict is derived from that real output (reusing `check/verdict` `parseVerdict`
  where applicable), never from a model-asserted string.
- **Acceptance criteria**:
  - [ ] `resultRef` resolves to a real message id returned by `session.messages`
        for the child session.
  - [ ] A receipt whose `resultRef` points to a non-existent message is rejected.
- **Test**: `tests/dc-dev-core/real-result.test.mjs`.
- **Dependencies**: R9, R14.

### R18: Verification must exercise live dispatch (anti false-green)

- **What**: The core's verification plan runs the live dispatch + receipt tests;
  artifact-existence checks alone are explicitly insufficient and must not be the
  sole gate.
- **Acceptance criteria**:
  - [ ] CI invokes `node --test tests/dc-dev-core/e2e-live.test.mjs` (live).
  - [ ] A build that passes only file-existence checks but skips the live test is
        reported as **not verified** (fail-closed).
- **Test**: CI configuration assertion in `tests/dc-dev-core/verification-gate.test.mjs`.
- **Dependencies**: R15.

## Security Gates

- [ ] No secrets in receipt/trace (R16).
- [ ] `resultRef` is a real, resolvable message id (R17).
- [ ] Live dispatch is the verification gate; stubs cannot satisfy it (R15/R18).
- [ ] `experienceMode` in the receipt is a real, allowed value (R5/R14).
- [ ] The receipt records that triage (R19–R25) ran first; no receipt is written before a triage verdict exists.

## Verification Plan

- `node --test tests/dc-dev-core/receipt-schema.test.mjs`
- `node --test tests/dc-dev-core/e2e-live.test.mjs`
- `node --test tests/dc-dev-core/no-secrets.test.mjs`
- `node --test tests/dc-dev-core/real-result.test.mjs`
- `node --test tests/dc-dev-core/verification-gate.test.mjs`
- Lint + typecheck of the (future) core module via project-native commands.

## Out of Scope

- Persisting archived superflow tracking artifacts (archive-only).
- Any receipt field beyond the 8 defined in R14.
- Re-deriving verdict logic from scratch (reuse `agents/dc-dev/check/verdict`).

## Cross-References

- Overview: `overview.md` (R1–R8, triage R19–R25).
- Dispatch: `dispatch.md` (R9–R13).
- Reused: `agents/dc-dev/check/verdict` (`parseVerdict`), `hooks/dc-dev/scope/scope-guard.mjs`.
- Result boundary: `context/plans/dc-dev-contract.md`.
- Experience-mode contract: `overview.md` (R5–R8).
