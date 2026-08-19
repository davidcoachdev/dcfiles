# Cavekit Overview: Dc-Dev Unified Agent

## Metadata

- **id**: `feature/dc-dev-unified-agent`
- **title**: Unify Dc-Dev as the single conversational agent
- **status**: draft
- **owner**: dcdebian
- **date**: 2026-08-17
- **priority**: security

## Goal

Build one OpenCode-native conversational agent that safely turns an idea into a delegated, bounded, evidence-driven Cavekit build only after explicit human approval.

## Canonical Inputs and Reuse Constraint

- Architecture source: [`docs/adr/001-dc-dev-unified-agent.md`](../../docs/adr/001-dc-dev-unified-agent.md).
- Mandatory reuse source: [`context/refs/reuse-report.md`](../refs/reuse-report.md), verdict `PARTIAL`.
- Reuse the top candidates rather than rewriting them: `cavekit-gold-loop`, `gentle-orchestrator`, `cavekit-check`, `autonomous-loop`, and `cavekit-make`.
- Capability cache was resolved from [`context/refs/kit-index.json`](../refs/kit-index.json); refresh it when source capabilities change.
- New work is limited to the reuse gaps: single front door, deterministic hooks, write scope, evidence enforcement, model separation, context/result schemas, and consultation-to-build approval.

## Domain Kits

| Domain | File | Requirements |
|---|---|---|
| Front door and intent | `dc-dev-front-door.md` | R5-R9 |
| Gold loop and delegation | `dc-dev-gold-loop.md` | R10-R14 |
| Gentle protocols and routing | `dc-dev-protocols.md` | R15-R19 |
| Deterministic enforcement | `dc-dev-enforcement.md` | R20-R25 |

## Global Requirements

### R1: Kits are the contract of record

- **What**: Dc-Dev must treat the R-numbered kits as the behavioral contract and link them to ADR-001 without duplicating architectural rationale.
- **Acceptance criteria**:
  - [ ] A validation test can enumerate every requirement in the four domain kits and find at least one acceptance criterion and one verification mapping.
  - [ ] Every implementation task and review finding references one or more requirement IDs.
  - [ ] A decision or behavior discovered during implementation that is not covered by a kit causes a kit update before the next loop iteration.
- **Test**: Kit parser/coverage test plus a fixture containing an unmapped requirement and a failing bidirectional-update assertion.
- **Dependencies**: All domain kits.

### R2: OpenCode-native, delegated execution

- **What**: Dc-Dev must run inside the existing OpenCode harness, preserve the sub-agent factory, and never implement feature work inline.
- **Acceptance criteria**:
  - [ ] A delegation trace shows each build-phase work item assigned to a permitted specialist agent.
  - [ ] An attempted inline feature edit by Dc-Dev is rejected by the orchestration contract or reported as a violation.
  - [ ] No kit or implementation task adds LangGraph, CrewAI, OpenAI Agents SDK, or another external orchestration framework.
- **Test**: Orchestration contract test and dependency/configuration scan.
- **Dependencies**: R10, R19, R20.

### R3: English artifact contract

- **What**: Technical artifacts produced by Dc-Dev must use neutral English; user-facing conversation may follow the user's language.
- **Acceptance criteria**:
  - [ ] Generated kit, plan, trace, result, and code-artifact fixtures contain English field names and no persona-specific Spanish text.
  - [ ] A user message in Spanish produces a Spanish conversational response while preserving English artifact content.
- **Test**: Artifact schema/language fixture test.
- **Dependencies**: R3 applies to every kit.

### R4: Structured completion contract

- **What**: Every phase and the overall feature must report `status`, `executive_summary`, `artifacts`, `next_recommended`, `risks`, and `skill_resolution`.
- **Acceptance criteria**:
  - [ ] A result missing any required field is rejected as incomplete.
  - [ ] `status` is one of `ok` or `failed` for phase results and cannot claim success while a blocking gate is unresolved.
  - [ ] `artifacts` contains paths that exist or an explicit failure reason.
- **Test**: Result Contract schema tests, including missing-field and invalid-status cases.
- **Dependencies**: R19, R23, R24.

## Global Constraints

- Strict TDD is mandatory: each R acceptance criterion becomes a failing test before implementation, then green, then refactor.
- Security and quality take precedence over speed and cost.
- No silent catch, guessed scope, premature abstraction, or hidden non-goal.
- Only OpenCode hook events confirmed by the installed runtime/documentation may be used; unsupported events are not requirements for deterministic enforcement.

## Security Gates

- [ ] No secrets appear in kits, traces, prompts, logs, results, or commits.
- [ ] User approval is explicit and cannot be inferred from normal conversation.
- [ ] Sub-agents cannot exceed their assigned write scope.
- [ ] Test evidence is captured from an actual command result, not a model assertion.
- [ ] P0/P1 security findings block completion and produce `REJECT`.

## Verification Plan

- `python -m json.tool opencode.json`
- `git diff --check`
- Kit parser/coverage tests for all `context/kits/dc-dev-*.md`
- Protocol and hook contract tests supplied by the implementation plan
- Full project-native test, lint, and typecheck commands discovered during Map; their real output is mandatory evidence.

## Out of Scope

- Replacing OpenCode with an external orchestration framework.
- Building a new sub-agent factory.
- Automatic consultation-to-build transition.
- Pairwise candidate evaluation when no genuine competing implementation exists.
- New product capabilities unrelated to orchestration, safety, verification, or the ADR decision.

## Cross-References

- Front door: `dc-dev-front-door.md`.
- Loop: `dc-dev-gold-loop.md`.
- Protocols: `dc-dev-protocols.md`.
- Enforcement: `dc-dev-enforcement.md`.
- ADR: [`docs/adr/001-dc-dev-unified-agent.md`](../../docs/adr/001-dc-dev-unified-agent.md).

## Definition of Done (Result Contract)

- `status`: `ok` only when all kits are present, parseable, cross-referenced, and every R has testable criteria.
- `executive_summary`: Four domain kits covering R1-R25.
- `artifacts`: The five paths under `context/kits/`.
- `next_recommended`: `/sdd-cavekit map`.
- `risks`: OpenCode hook availability and model-assignment compatibility remain implementation verification points.
