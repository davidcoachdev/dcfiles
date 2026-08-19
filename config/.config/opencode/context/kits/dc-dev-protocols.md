# Cavekit: Dc-Dev Gentle Protocols and Routing

## Scope

This kit ports the mature gentle-orchestrator protocols into Dc-Dev: preflight, model routing, context ownership, skill resolution, topology selection, receipts, and the user-owned kill switch.

## Constraints

- Reuse the `gentle-orchestrator` candidate as the primary source; do not rewrite its mature protocol concepts.
- Phase model assignments are read from `opencode.json`; `agent.sdd-<phase>.model` is authoritative, with the configured default as fallback.
- `cavekit-check` must use a model distinct from `cavekit-make`.
- No secret values are copied into skill caches, prompts, or receipts.

## Requirements

### R15: Hard SDD Session Preflight

- **What**: Every build session pauses at a hard preflight gate before phase delegation.
- **Acceptance criteria**:
  - [ ] Preflight records execution mode with `interactive` as the default, artifact store with `engram` as the default, delivery/chain strategy, and review budget.
  - [ ] Missing or invalid preflight values block delegation and produce one actionable HITL question.
  - [ ] The resolved preflight is included in every phase handoff and receipt.
- **Test**: Preflight schema, default, invalid-input, and handoff propagation tests.
- **Dependencies**: R7, R10.

### R16: Authoritative phase model routing

- **What**: Dc-Dev resolves the model per phase from `opencode.json`, using the configured default only when a phase assignment is absent.
- **Acceptance criteria**:
  - [ ] A configured `agent.sdd-<phase>.model` overrides the default for that phase.
  - [ ] Missing phase configuration uses the default and records the fallback.
  - [ ] Make and Check resolve different model identifiers; if they resolve equal, the build is blocked before delegation.
  - [ ] No model secret or credential is written to the resolved routing artifact.
- **Test**: Configuration precedence and make/check separation tests.
- **Dependencies**: R15; ADR-001 pending decision.

### R17: Orchestrator-owned context protocol

- **What**: Dc-Dev controls all context selection and sub-agents persist discoveries to Engram before returning.
- **Acceptance criteria**:
  - [ ] A sub-agent receives only the phase/task context selected by Dc-Dev plus pre-digested skill rules.
  - [ ] A sub-agent result without required discovery persistence is marked incomplete or failed.
  - [ ] Secrets and irrelevant raw context are excluded from Engram handoffs.
  - [ ] The returned context envelope retains requirement IDs, evidence, risks, and artifact paths.
- **Test**: Context-envelope schema, persistence callback, redaction, and missing-save tests.
- **Dependencies**: Reuses `gentle-orchestrator`, `caveman-internal`; R4, R23.

### R18: Session-scoped skill resolution

- **What**: Skill rules are resolved once per session from the registry/cache and injected pre-digested into sub-agent prompts.
- **Acceptance criteria**:
  - [ ] The first resolution records source paths, versions/identifiers where available, and resolution status without secrets.
  - [ ] Repeated phase launches reuse the same session resolution unless the registry changes.
  - [ ] An unavailable skill is reported as a typed risk; the sub-agent is not given invented rules.
  - [ ] The current cache source is `context/refs/kit-index.json`, with refresh required after capability changes.
- **Test**: Cache-hit, cache-miss, registry-change, and unavailable-skill tests.
- **Dependencies**: Reuses `cavekit-registry` and capability-discovery; R4.

### R19: Routing, receipts, and user-owned stop

- **What**: Dc-Dev selects the smallest useful topology, emits a receipt for each delegated action, and honors a user kill switch.
- **Acceptance criteria**:
  - [ ] Every launch receipt identifies session, phase, task, model, topology, deduplication key, write scope, and next action.
  - [ ] A smaller valid topology is selected when it covers the same requirements and gates.
  - [ ] A kill-switch request prevents new delegated work and reports pending work and risks.
  - [ ] Receipt creation failure blocks a completion claim.
- **Test**: Topology-selection, receipt-schema, receipt-failure, and kill-switch tests.
- **Dependencies**: R4, R11, R14, R22.

## Out of Scope

- Choosing a model provider beyond reading configured assignments.
- Persisting complete conversation transcripts when a compact result envelope is sufficient.
- Automatic skill installation or capability invention.

## Cross-References

- Depends on `dc-dev-overview.md` R1-R4.
- Used by `dc-dev-front-door.md` R7 and `dc-dev-gold-loop.md` R10-R14.
- Enforcement evidence is defined in `dc-dev-enforcement.md` R20-R25.

## Security Gates

- [ ] Skill cache, prompts, Engram, and receipts are secret-free.
- [ ] Context is least-privilege and task-scoped.
- [ ] Model separation is enforced, not merely requested.
- [ ] Kill-switch and receipt failures fail closed.

## Verification Plan

- `python -m json.tool opencode.json`
- Preflight, routing, context, cache, and receipt contract tests
- Secret-redaction scan over generated artifacts
- `git diff --check`

## Definition of Done (Result Contract)

- `status`: `ok` only when R15-R19 pass and model separation is proven.
- `executive_summary`: Preflighted, context-controlled, skill-resolved, receipt-driven routing.
- `artifacts`: This kit, protocol schemas, routing tests, and receipts.
- `next_recommended`: `/sdd-cavekit map`.
- `risks`: OpenCode configuration shape may require compatibility mapping for `agent.sdd-<phase>.model`.
