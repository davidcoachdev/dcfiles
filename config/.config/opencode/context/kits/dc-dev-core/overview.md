# Dc-Dev Core — Overview (Minimal Rebaseline, Basic Phase Closed)

> Sketch phase — Cavekit gold-standard kit. The **minimal** core set:
> `dc-dev → triage → experience-mode → dispatch → result → receipt`.
> **Single visible entry point:** `dc-dev` is the ONLY visible agent. Triage,
> experience-mode selection, dispatch admission, result capture, and receipt are
> INTERNAL PHASES of `dc-dev` — they run inside the same agent, NOT as a visible
> family of agents. The only subagent is the hidden worker **`dc-dev-worker`**
> (see `dispatch.md` R10), invoked solely to perform the delegated task.
> This kit set is intentionally SEPARATE from the legacy `context/kits/dc-dev-*`
> (R1–R25 unified-agent) and from the archived `dc-dev-superflow-*` overlay. It does
> not modify, reactivate, or depend on those; the superflow overlay is treated as
> archive-only (see Out of Scope).
> The core establishes the **experience-mode contract** (R5–R8) and a deterministic
> **triage gate** (R19–R25) that MUST classify each request (green/yellow/red) and
> recommend — never set — the experience mode BEFORE any build or mode resolution.
> Triage never executes changes or auto-approves.
> **Basic phase ends here:** once the vertical flow runs from `dc-dev`, no further
> layers are added.

- **id**: `feature/dc-dev-core-minimal`
- **title**: Rebuild the minimal verifiable core of Dc-Dev
- **status**: draft
- **owner**: dcdebian
- **date**: 2026-08-18
- **priority**: security

## Goal

Reconstruct from zero the smallest slice that proves a request entering `dc-dev`
is handed to a **real, registered subagent** through the OpenCode 1.18.18 SDK, the
subagent's actual result is captured, and an auditable **receipt** is written.
The runner also resolves an explicit **experience mode** (`interactive` default)
that governs how aggressively it prompts the human at each gate.
Nothing else.

## Canonical Inputs (mandatory reuse)

- `context/refs/reuse-report.md` — verdict PARTIAL; the single real GAP is live
  dispatch + end-to-end receipt. Everything else is reuse or archive.
- `context/plans/dc-dev-contract.md` — port/adapt/artifact/non-goals boundary.
  Reused as-is; the core adapts its concepts WITHOUT importing cavekit/gentle/sdd.
- `plugins/agent-flow-tts.ts` — **PRESERVED INTACT** (see R2).

## Core Actors

- **`dc-dev`** (visible entry point, `mode: agent`): the single visible agent. It runs
  every phase in-process — triage (R19–R25), experience-mode resolution (R5), dispatch
  admission (R9–R13), result capture, and receipt (R14–R18). There is NO visible
  `triage`/`dispatch`/`receipt` agent family; those are phases of `dc-dev`.
- **`dc-dev-worker`** (hidden subagent, `hidden: true, mode: subagent`): the ONLY
  subagent. It performs the delegated task under bounded write-scope. It is NOT named or
  described with the `superflow` prefix (see `dispatch.md` R10). No other worker exists
  in the basic phase.

## Global Requirements

### R1: Minimal scope is enforced (no inflation)

- **What**: The core contains only `dc-dev` entry → dispatch → real subagent →
  result → receipt + the experience-mode contract. It must NOT pull in
  capability-gate, recovery, provenance, token-efficiency, or the 7-agent
  superflow overlay.
- **Acceptance criteria**:
  - [ ] A coverage test enumerates `context/kits/dc-dev-core/*.md` and finds **0**
        ACTIVE references to superflow as a wired/registered artifact (no
        `dc-dev-superflow-*` agent registration, no `superflow` import path); archived
        mentions inside the Out-of-Scope section are exempt.
  - [ ] The core kit index lists exactly the 3 core kits (overview, dispatch, receipt)
        plus the index file; no extra layer or visible agent family is introduced.
- **Test**: `tests/dc-dev-core/scope-boundary.test.mjs`.
- **Dependencies**: none.

### R2: `agent-flow-tts.ts` is preserved; TTS is never a gate

- **What**: `plugins/agent-flow-tts.ts` (and its registration) stays byte-for-byte
  intact. TTS is a notification channel only; it is never used as approval,
  security gate, dispatch transport, or an **experience-mode gate**.
- **Acceptance criteria**:
  - [ ] `agent-flow-tts.ts` hash is unchanged vs the preserved baseline; no edit
        is made to it by the core.
  - [ ] A grep over core dispatch/receipt/experience decision paths finds **0** imports
        of the TTS plugin in any approval, gate, or mode-resolution branch.
- **Test**: `tests/dc-dev-core/tts-preserved.test.mjs` (hash equality + import scan).
- **Dependencies**: R1.

### R3: Contract boundary reused without legacy runtime deps

- **What**: The core honors the port/adapt/artifact/non-goal boundary of
  `context/plans/dc-dev-contract.md` without importing cavekit/gentle/sdd code.
- **Acceptance criteria**:
  - [ ] Kits reference `dc-dev-contract.md` by path as the boundary source.
  - [ ] A dependency scan of core sources finds **0** requires/imports of
        `cavekit-*`, `gentle-orchestrator`, or `sdd-*`.
- **Test**: `tests/dc-dev-core/no-legacy-deps.test.mjs`.
- **Dependencies**: none.

### R4: Result Contract is defined and fail-closed by default

- **What**: Every completion artifact (receipt, result block) uses a status enum
  of `dispatched | done | blocked | setup-required`. Success is never assumed.
- **Acceptance criteria**:
  - [ ] A result with an empty/`ok`/`failed` status is rejected as invalid for the
        core (only the 4 allowed values are accepted).
  - [ ] A receipt produced when no child subagent was observed uses `blocked` or
        `setup-required`, never `dispatched`/`done`.
- **Test**: `tests/dc-dev-core/result-contract.test.mjs`.
- **Dependencies**: R1, R11, R14.

### R5: Experience mode is resolved up-front and fails closed to `interactive`

- **What**: At the start of every `dc-dev` core flow the runner resolves a single
  `experienceMode ∈ {interactive, minimal, automatic}`. `interactive` is the
  default. If the mode is missing, unrecognized, or the selection mechanism itself
  errors, the flow MUST proceed as `interactive` — never as `automatic`. This is
  the safest, most human-in-the-loop mode. **Precondition**: the triage gate
  (R19–R25) MUST have produced a verdict before this step runs — the triage
  `recommendedExperienceMode` is advisory input only; R5 remains the authoritative
  fail-closed resolver.
- **Acceptance criteria**:
  - [ ] A run with no mode supplied resolves `experienceMode = interactive` (default preserved).
  - [ ] A run with an unknown/invalid mode string resolves `experienceMode = interactive` (fail-closed, never `automatic`).
  - [ ] A run that explicitly requests `automatic` only activates it when an
        approved-scope document is attached; without one it downgrades to
        `interactive` (or `setup-required`).
  - [ ] The resolved `experienceMode` is written into the receipt (new
        `experienceMode` field, see R14) so every audit shows which mode was in effect.
- **Test**: `tests/dc-dev-core/experience-mode-resolve.test.mjs`.
- **Dependencies**: R1, R2, R4, R19.

### R6: `interactive` mode prompts at every relevant gate

- **What**: In `interactive`, the runner pauses for explicit human confirmation at
  each **relevant gate**: (a) dispatch admission, (b) any write-scope expansion,
  (c) any security-sensitive action (secret read, protected-path write), (d)
  approval of the final result/verdict. The prompt is surfaced through the
  interactive text channel; TTS is never the gate channel.
- **Acceptance criteria**:
  - [ ] A test simulating an interactive session asserts the dispatch-admission
        gate emits a pending human question and does NOT proceed until `approve` is received.
  - [ ] A test asserts a scope-expansion attempt requires a NEW explicit human
        grant; prior approval is not inferred.
  - [ ] A test asserts a security-sensitive action (protected write) emits a human
        question and halts until approval (ties to R16 no-secrets / R12 scope confinement).
  - [ ] A test asserts the gate question is surfaced via the interactive channel
        with **0** TTS imports in the gate branch (R2).
- **Test**: `tests/dc-dev-core/experience-interactive.test.mjs`.
- **Dependencies**: R5, R11, R12, R16.

### R7: `minimal` mode prompts only at critical decisions

- **What**: In `minimal`, the runner proceeds autonomously through routine,
  non-critical gates (e.g., routine dispatch within already-approved scope,
  choosing among pre-approved workers) but pauses for explicit human confirmation
  at **critical decisions** only: (a) write-scope expansion beyond approved,
  (b) any security-sensitive action, (c) anything that would change status to
  `blocked`/`setup-required`/risk, (d) mutation of global config or other agents.
- **Acceptance criteria**:
  - [ ] A test where a routine dispatch occurs within approved scope asserts NO
        human question is emitted (autonomous).
  - [ ] A test where a critical decision (scope expansion / security action) occurs
        asserts a human question IS emitted and the flow halts until approval.
  - [ ] A test where a non-critical boundary (choosing among pre-approved workers)
        occurs asserts no prompt is emitted.
- **Test**: `tests/dc-dev-core/experience-minimal.test.mjs`.
- **Dependencies**: R5, R11, R12, R17.

### R8: `automatic` mode runs only within approved scope and halts on risk/block

- **What**: In `automatic`, the runner executes without human prompts ONLY for
  actions strictly enumerated in an approved-scope document. If it encounters
  risk (a security gate would trigger), a block (R11/R12 path), or any action
  outside the approved scope, it MUST stop and emit a human-facing alert with
  status `blocked`/`setup-required` — never silently proceed or silently skip.
- **Acceptance criteria**:
  - [ ] A test with `automatic` + an approved scope covering the action completes
        with NO human prompt and emits `done`/`dispatched`.
  - [ ] A test where `automatic` hits an out-of-scope action asserts the flow stops
        with `blocked`/`setup-required` and does NOT perform the action (fail-closed).
  - [ ] A test where `automatic` triggers a security gate (secret read / protected
        write) asserts it halts and emits a human alert, never proceeds.
  - [ ] A test with `automatic` but NO approved scope attached asserts downgrade to
        `interactive` / `setup-required` (cannot run unattended without scope).
- **Test**: `tests/dc-dev-core/experience-automatic.test.mjs`.
- **Dependencies**: R5, R11, R12, R16.

## Triage Gate (R19–R25) — precondition to R5 (experience mode) and R9 (dispatch)

> The triage gate is a **read-only classifier** that runs at the very start of every
> `dc-dev` core flow. It MUST produce a verdict **before** experience-mode resolution
> (R5) and before dispatch admission (R9). It classifies the request into one of three
> deterministic tiers, recommends an experience mode and a test/workflow depth, and —
> when the tier or scope is ambiguous — asks the human exactly **one** question. It
> NEVER executes changes, writes files, expands scope, or auto-approves. Themes below
> preserve TTS (R2) and the legacy Cavekit/Gentle/SDD reference boundary (R3); triage
> adds no extra modules and never reactivates archived overlays.

### R19: Triage verdict is a precondition to build and mode resolution

- **What**: Every flow MUST obtain a triage verdict
  `{ tier ∈ {green,yellow,red}, reason, recommendedExperienceMode, recommendedDepth }`
  before R5 (mode resolution) and R9 (dispatch). Triage is read-only: it performs
  zero mutations, zero scope changes, zero approvals.
- **Acceptance criteria**:
  - [ ] A flow that reaches dispatch admission without a triage verdict is forced to
        `blocked`/`setup-required` and emits **no** dispatch call.
  - [ ] A flow that attempts to resolve the experience mode before triage is rejected
        by an ordering guard (test asserts the guard fires).
  - [ ] A spy over the triage step confirms **0** write/scope/dispatch/approval calls
        (classification only).
- **Test**: `tests/dc-dev-core/triage-precondition.test.mjs`.
- **Dependencies**: R1, R2, R4.

### R20: Green tier — deterministic, narrow (pointwise fix / cosmetic / simple config)

- **What**: `green` when the request is a pointwise fix, cosmetic change, or simple
  config (color, button, typo, single config value): a single surface, bounded
  validation, and **no** data / security / permission / architectural concern.
- **Acceptance criteria**:
  - [ ] Fixtures {color change, button label, typo fix, single config value} all classify `green`.
  - [ ] A fixture that touches secrets / permissions / DB / architectural ambiguity
        classifies as **not** `green` (negative separation — security-adjacent fixes are never green).
  - [ ] Determinism: the same input classifies to the same tier across 50 repeated runs.
- **Test**: `tests/dc-dev-core/triage-green.test.mjs`.
- **Dependencies**: R19.

### R21: Yellow tier — deterministic, multi-file feature with moderate risk (standard flow)

- **What**: `yellow` when the request is a feature or multi-file change with moderate
  risk and a standard flow — ≥2 files or non-trivial logic — but **no** security /
  data / permission / architectural ambiguity.
- **Acceptance criteria**:
  - [ ] A fixture multi-file feature request classifies `yellow`.
  - [ ] A single trivial fix does **not** classify `yellow` (specificity: `green`
        wins when only one file + trivial).
  - [ ] Determinism across 50 repeated runs.
- **Test**: `tests/dc-dev-core/triage-yellow.test.mjs`.
- **Dependencies**: R19.

### R22: Red tier — deterministic, architecture / security / data / permissions / ambiguous scope (deep flow + max gates + HITL)

- **What**: `red` when the request touches architecture, security, data, permissions,
  or has ambiguous scope. Triage mandates the deepest flow with maximum gates and
  HITL; it MUST recommend `interactive` and MUST NOT auto-approve.
- **Acceptance criteria**:
  - [ ] Fixtures {secret rotation, RBAC change, DB schema migration, auth flow change,
        ambiguous-scope request} all classify `red`.
  - [ ] A `red` verdict sets `recommendedExperienceMode = interactive` unconditionally
        (never `automatic`/`minimal` override).
  - [ ] A `red` + ambiguous fixture triggers exactly ONE human clarification and halts
        until answered (ties to R25).
- **Test**: `tests/dc-dev-core/triage-red.test.mjs`.
- **Dependencies**: R19, R25.

### R23: Triage recommends an experience mode (advisory only, never binding/authoritative)

- **What**: Triage emits `recommendedExperienceMode` (green→`minimal` or `interactive`;
  yellow→`interactive`; red→`interactive`). This is advisory input to R5; triage never
  sets the active mode and never auto-approves.
- **Acceptance criteria**:
  - [ ] A test asserts the recommendation is recorded in the triage artifact, but the
        active mode is resolved solely by R5 fail-closed (triage cannot flip the mode).
  - [ ] A test asserts triage never recommends `automatic` for `red`; for green/yellow
        it recommends `automatic` only when an approved-scope document is attached,
        else `interactive`/`minimal`.
  - [ ] A spy confirms triage makes **0** `approve`/`grant` calls.
- **Test**: `tests/dc-dev-core/triage-recommend-mode.test.mjs`.
- **Dependencies**: R5, R19.

### R24: Triage chooses workflow/test depth per tier (advisory)

- **What**: Triage emits `recommendedDepth` mapping `green`→shallow/minimal test set +
  minimal workflow; `yellow`→standard; `red`→deep + max gates. Advisory only; triage
  performs no execution.
- **Acceptance criteria**:
  - [ ] A test asserts depth mapping green→shallow, yellow→standard, red→deep.
  - [ ] A spy confirms triage invokes **0** test/build/subprocess executions.
- **Test**: `tests/dc-dev-core/triage-depth.test.mjs`.
- **Dependencies**: R19.

### R25: Ambiguous classification asks exactly one human question (single fork), then halts

- **What**: When confidence is below the deterministic threshold OR the tier is
  genuinely ambiguous, triage emits EXACTLY ONE clarification question to the human and
  halts the flow at the triage gate. It must not ask multiple questions, not
  auto-classify, not proceed.
- **Acceptance criteria**:
  - [ ] A test with an ambiguous fixture emits exactly **1** question (never 2+).
  - [ ] A test asserts the flow halts at triage (no dispatch, no experience resolution)
        until the answer arrives.
  - [ ] A test asserts that after the human answer, triage re-classifies deterministically
        within the single clarified scope.
- **Test**: `tests/dc-dev-core/triage-ambiguity.test.mjs`.
- **Dependencies**: R19.

## Security Gates (cross-cutting)

- [ ] No secrets appear in kits, traces, receipts, results, or commits.
- [ ] Human approval (where required) is explicit and never inferred from conversation.
- [ ] The subagent cannot exceed its assigned write scope (`scope-guard` rejects protected paths).
- [ ] Evidence comes from a **real SDK/command result**, never a model assertion or in-memory stub.
- [ ] Dispatch without a resolved child / without admission / without scope → `blocked` or `setup-required`.
- [ ] TTS is never an approval, security, or experience-mode gate channel.
- [ ] The experience mode is resolved up-front; unrecognized/missing mode fails closed to `interactive` (R5).
- [ ] `automatic` may only act within an approved scope; risk/block/out-of-scope halts with a human alert (R8).
- [ ] `interactive` always prompts at relevant gates; `minimal` prompts only at critical decisions (R6/R7).
- [ ] Triage (R19–R25) runs read-only and produces a verdict before any build or mode resolution; it never executes changes, writes, or auto-approves.
- [ ] `red` always recommends `interactive`; an ambiguous tier asks exactly ONE human question and halts — never auto-classifies (R22/R25).
- [ ] Triage is read-only classification and never uses TTS as a gate/approval channel (R2).

## Out of Scope (archive-only — never renamed, edited, or reactivated)

- **Archive-only policy:** `agents/dc-dev-superflow-*`, `skills/dc-dev-superflow-*`,
  `context/dc-dev-superflow/*`, and legacy `cavekit-*`, `gentle-orchestrator`,
  `sdd-*` are referenced ONLY to mark them archive-only. The core MUST NOT rename,
  edit, reactivate, or wire them. `dc-dev` remains the sole visible agent and
  `dc-dev-worker` the sole hidden subagent.
- `dc-dev-superflow-*` agents (coordinator, research, planner, security, reviewer,
  evaluator, recovery) and their 16 `skills/dc-dev-superflow-*` — inflation, archived.
- capability-gate, recovery, provenance, token-efficiency modules.
- Legacy `cavekit-*`, `gentle-orchestrator`, `sdd-*` runtime — referenced only.
- Global `dc-dev-runtime.mjs` hook registration (reuse its tested modules, not its global wiring).
- Converting the historical Check 5 `REVISE` into an approval.
- The stale `context/refs/kit-index.json` (feature "unified agent") — refreshed separately.
- Treating TTS as an experience-mode gate (explicitly forbidden, R2/R6).

## Cross-References

- Contract: `context/plans/dc-dev-contract.md`.
- Preserved plugin: `plugins/agent-flow-tts.ts`.
- Dispatch detail: `dispatch.md`.
- Receipt detail: `receipt.md`.
- Experience-mode contract: R5–R8 (this file).
- Triage gate: R19–R25 (this file) — precondition to R5/R9.
- Legacy reference only (NOT reused as code): `context/kits/dc-dev-{overview,front-door,gold-loop,protocols,enforcement}.md`.

## Definition of Done (Result Contract)

- `status`: `done` ONLY when all 3 core kits are present, parseable, cross-referenced,
  every R (R1–R25) has testable acceptance criteria, and each criterion has a
  red→green test in `tests/dc-dev-core/`.
- `executive_summary`: `dc-dev` is the sole visible entry; all phases (triage,
  experience mode, dispatch, result, receipt) run inside it, with `dc-dev-worker` as the
  only hidden subagent. Core proves real dispatch + receipt; the archived superflow
  overlay is marked archive-only (never reactivated). Experience-mode contract
  (interactive default, minimal/automatic fail-closed) defined; deterministic triage
  gate (R19–R25) classifies green/yellow/red before any build and recommends (never
  sets) the experience mode + depth, never executing or auto-approving. Basic phase
  closes when the vertical flow works from `dc-dev`.
- `artifacts`:
  - `context/kits/dc-dev-core/overview.md`
  - `context/kits/dc-dev-core/dispatch.md`
  - `context/kits/dc-dev-core/receipt.md`
  - `context/kits/dc-dev-core/kit-index.json`
- `tests` (added for experience mode):
  - `tests/dc-dev-core/experience-mode-resolve.test.mjs`
  - `tests/dc-dev-core/experience-interactive.test.mjs`
  - `tests/dc-dev-core/experience-minimal.test.mjs`
  - `tests/dc-dev-core/experience-automatic.test.mjs`
- `tests` (added for triage gate):
  - `tests/dc-dev-core/triage-precondition.test.mjs`
  - `tests/dc-dev-core/triage-green.test.mjs`
  - `tests/dc-dev-core/triage-yellow.test.mjs`
  - `tests/dc-dev-core/triage-red.test.mjs`
  - `tests/dc-dev-core/triage-recommend-mode.test.mjs`
  - `tests/dc-dev-core/triage-depth.test.mjs`
  - `tests/dc-dev-core/triage-ambiguity.test.mjs`
- `next_recommended`: `/sdd-cavekit map`.
- `risks`: SDK runtime delegation permission must resolve the registered worker in
  the live test environment; otherwise receipts must be `setup-required` (R11). The
  experience selector must fail closed to `interactive`; an `automatic` run without an
  approved scope must never execute unattended (R5/R8). The triage classifier must not
  mis-classify a security/permission/data request as `green`; a single-classifier
  false-negative on red must fail closed to `interactive` + HITL (R20/R22). Triage is
  purely advisory over the mode — it must never become the authoritative resolver (R23).
