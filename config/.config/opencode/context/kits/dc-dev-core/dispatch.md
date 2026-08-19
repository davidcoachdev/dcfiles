# Dc-Dev Core — Dispatch (Real Subagent, SDK 1.18.18)

> Domain kit of the minimal core set. Companion to `overview.md` (R1–R8) and
> `receipt.md` (R14–R18). Requirements here: **R9–R13**.

## Goal

Prove that a request entering `dc-dev` (the single visible agent) is handed to the
**real, registered hidden worker `dc-dev-worker`** through `@opencode-ai/sdk@1.18.18`,
and that the spawned child is observable and its result capturable. `dc-dev` itself runs
the dispatch-admission phase in-process — it is the entry, not a member of a visible
agent family. No inline work, no stub, no memory-only loop. Dispatch admission and scope
are also gated by the experience mode resolved in R5.

## Constraints

- **Strict TDD**: each acceptance criterion is a failing test before any implementation.
- **Real dispatch only**: must use the live SDK call, not an in-process function.
- **Fail-closed**: missing child / unregistered agent / scope denial → `blocked`/`setup-required`.

## Requirements

### R9: Dispatch uses the live SDK, not a stub

- **What**: Dispatch invokes `client.session.prompt({ id, prompt, agent, subtask: true })`
  from `@opencode-ai/sdk@1.18.18`. The spawned child is observed via
  `client.session.children({ id })`; the result is the child's final assistant message.
- **Acceptance criteria**:
  - [ ] A test against the **real registered `dc-dev-worker`** calls `prompt` with
        `subtask: true` and asserts `session.children({ id })` returns ≥1 child whose
        `agent` equals `dc-dev-worker`.
  - [ ] The captured result text equals the child session's last assistant message
        (read via `session.messages`), not a hardcoded string.
  - [ ] A spy on `client.session.prompt` confirms the SDK call actually happened
        (dispatch does not short-circuit to an in-process return).
- **Test**: `tests/dc-dev-core/dispatch-live.test.mjs`.
- **Dependencies**: R10, R11, R19.

### R10: Minimal wiring in `opencode.json` — one hidden worker `dc-dev-worker`, no global hook

- **What**: Register exactly ONE worker: **`dc-dev-worker`** (`mode: subagent`,
  `hidden: true`).   Register ONE dispatch command that uses `agent: "dc-dev-worker"`
  + `subtask: true`. No `dc-dev-superflow-*` agents (archived, never reactivated); the
  legacy global `dc-dev-runtime.mjs` hook is NOT globally registered. `dc-dev` stays
  the single visible agent.
- **Acceptance criteria**:
  - [ ] `opencode.json` parses as valid JSON (`node -e "JSON.parse(...)"`).
  - [ ] `client.app.agents()` (or the config) includes `dc-dev-worker` with
        `mode: subagent` and `hidden: true`; it does **not** include any
        `dc-dev-superflow-*` agent.
  - [ ] The dispatch command entry declares `agent: "dc-dev-worker"` + `subtask: true`.
  - [ ] `dc-dev-runtime` is absent from any global `hooks` registration.
- **Test**: `tests/dc-dev-core/wiring.test.mjs`.
- **Dependencies**: R1.

### R11: Fail-closed when the child cannot be resolved

- **What**: If `app.agents()` lacks the worker, or `prompt` rejects, or no child is
  observed within the dispatch timeout, the receipt status is `blocked` or
  `setup-required` — never `dispatched`/`done`, never `ok`.
- **Acceptance criteria**:
  - [ ] Forcing the worker to be unregistered yields a receipt with
        `status` ∈ {`blocked`, `setup-required`} and `selectedChild` absent/`null`.
  - [ ] Forcing `prompt` to throw yields the same verdict.
  - [ ] A positive-control test (worker present, child observed) yields
        `dispatched`/`done` — proving the failure path is real, not a default.
- **Test**: `tests/dc-dev-core/fail-closed.test.mjs`.
- **Dependencies**: R4, R9, R14.

### R12: Write-scope confinement of the real child

- **What**: The dispatched subagent's writes are bounded by `scope-guard`; protected
  paths (secrets, other agents' dirs, global config) are rejected. Reuse the existing
  tested `hooks/dc-dev/scope/scope-guard.mjs`, applied to the **live** child.
- **Acceptance criteria**:
  - [ ] A dispatch that would write to a protected path is blocked and the receipt
        records the scope rejection (no file written outside scope).
  - [ ] A dispatch writing only within the allowed scope succeeds.
- **Test**: `tests/dc-dev-core/scope-confinement.test.mjs`.
- **Dependencies**: R9.

### R13: No inflation modules in the core

- **What**: The core dispatch does not import or instantiate capability-gate,
  recovery, provenance, or token-efficiency logic.
- **Acceptance criteria**:
  - [ ] A source scan of `context/kits/dc-dev-core/` and the (future) core dispatch
        module finds **0** references to those four module families.
- **Test**: `tests/dc-dev-core/no-inflation.test.mjs` (shared with R1).
- **Dependencies**: R1.

## Security Gates

- [ ] Evidence = real SDK child observation, not a model assertion.
- [ ] Scope denial → `blocked`/`setup-required` (R11/R12).
- [ ] No secret is read or written by the dispatch path.
- [ ] Dispatch admission / scope expansion respects the active experience mode (R5–R8):
      `interactive` always prompts; `minimal` prompts only on critical decisions;
      `automatic` only within approved scope.
- [ ] Triage gate (R19–R25) has produced a verdict before any dispatch admission; a
      `red` verdict may require explicit HITL at admission and never auto-proceeds.

## Verification Plan

- `node --test tests/dc-dev-core/dispatch-live.test.mjs`
- `node --test tests/dc-dev-core/wiring.test.mjs`
- `node --test tests/dc-dev-core/fail-closed.test.mjs`
- `node --test tests/dc-dev-core/scope-confinement.test.mjs`
- `node -e "JSON.parse(require('fs').readFileSync('opencode.json','utf8'))"`
- `node -e "const {OpenCode} = require('@opencode-ai/sdk'); ..."` listing `app.agents()`
- `node --test tests/dc-dev-core/experience-mode-resolve.test.mjs`
- `node --test tests/dc-dev-core/experience-interactive.test.mjs`
- `node --test tests/dc-dev-core/experience-minimal.test.mjs`
- `node --test tests/dc-dev-core/experience-automatic.test.mjs`

## Out of Scope

- `kiroExplore`-based delegation (dead-end, no permission).
- `transport.mjs` as dispatch (it only admits optional capability, contains no subtask).
- Anything beyond one worker + one command.
- Experience-mode changes to the legacy superflow (archived).

## Cross-References

- Overview: `overview.md` (R1–R8, triage R19–R25).
- Receipt: `receipt.md` (R14–R18).
- Reused primitive: `hooks/dc-dev/scope/scope-guard.mjs`.
- SDK surface: `@opencode-ai/sdk@1.18.18` `Session.prompt`, `Session.children`, `App.agents`.
- Experience-mode contract: `overview.md` (R5–R8).
