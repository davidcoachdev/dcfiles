# ADR-001: Dc-Dev Unified Agent (Cavekit Gold Loop + Gentle AI Protocols)

## Status

Proposed

## Context

**Problem**: The agentic workflow in this OpenCode environment is fragmented across two parallel orchestrator implementations with different maturity levels, and key quality mechanisms exist only as prompt conventions that the model can silently skip.

- `cavekit-orchestrator` (5.8K chars) implements the Cavekit "gold loop": R-numbered kits with testable acceptance criteria, `retrieve → sketch → map → loop(make ↔ check, max 5)`, literal `Verdict: APPROVE | REVISE | REJECT` gates, security axis as a blocking gate (P0/P1 → REJECT), and Strict TDD. It has two public doors (`cavekit` entry + `cavekit-orchestrator`) which creates layer-8 user error: the user must decide which agent to start a conversation with.
- `gentle-orchestrator` (28K chars) implements the same coordinator pattern but with far more mature protocols: SDD Session Preflight (hard gate with interactive/auto execution mode, artifact store, PR strategy, review budget), per-phase model assignments read from `opencode.json`, sub-agent context protocol (orchestrator controls ALL context, sub-agents save to Engram before returning), skill-resolver protocol (pre-digested rules injected into sub-agent prompts), sub-agent launch deduplication, structured Result Contract (`status / executive_summary / artifacts / next_recommended / risks / skill_resolution`), implementation routing with smallest-useful-topology, and receipt-driven development with user-owned kill switch. Its `.claude/agents/sdd-*` already differentiate models per phase (opus for propose/design, sonnet for implementation, haiku for archive).
- The `trace.md` (implementation trace) is not being written because appending to it is a prompt instruction, not a mechanism. Research confirms: only hooks fire deterministically; skills, sub-agents, and plugins all depend on the model deciding to use them.
- Research of the five leading agentic flow families (Claude Code primitives, LangGraph graph model, CrewAI role model, OpenAI Agents SDK handoff model, and spec-driven Coordinator/Implementor/Verifier) shows the Verifier must have the OPPOSITE goal to the Implementor (adversarial), verification should use a cheaper/different model than implementation, write-scope enforcement converts silent decisions into loud questions, and evidence (test run output) must be mandatory.

**Constraints**:
- No external framework (LangGraph, CrewAI, OpenAI Agents SDK): we live inside the OpenCode harness that already provides sub-agents and hooks; adding a framework is framework fetishism and duplicates what the harness gives us.
- Keep the sub-agent factory (`cavekit-make`, `cavekit-check`, etc.) — Dc-Dev coordinates and delegates, never builds inline.
- Transition consulta → build must NEVER be automatic (HITL pillar).
- Artifacts (docs, code, ADRs) in English; chat in the user's language.
- OpenCode hook events differ from Claude Code's; only the events OpenCode actually fires can be used for deterministic enforcement.
- User's pending decision: `cavekit-check` must use a DIFFERENT model than `cavekit-make` (evaluator should not share the generator's blind spots).

**Options considered**:
1. **Option A: Keep two agents as-is** (`cavekit-orchestrator` + `gentle-orchestrator`)
   - Pros: No migration effort; each stack already works.
   - Cons: Two public doors (layer-8 error persists); protocol knowledge duplicated and drifting; trace/enforcement gaps remain; user still must choose which agent to talk to.
2. **Option B: Dc-Dev — one unified agent merging Cavekit gold loop + Gentle AI protocols + research-derived enforcement**
   - Pros: One front door; best of both stacks; deterministic enforcement via hooks; per-phase model routing; structured result contract; write-scope and evidence rules.
   - Cons: One large orchestrator prompt to maintain; needs a consolidation decision for the existing `cavekit-*` and `sdd-*` sub-agents; OpenCode hook surface is smaller than Claude Code's.
3. **Option C: Adopt an external orchestration framework (LangGraph / CrewAI / OpenAI Agents SDK)**
   - Pros: Mature primitives (checkpointing, handoffs, durable state).
   - Cons: Framework fetishism — we already run inside the harness; token overhead (CrewAI sequential benchmark: 1.35M tokens vs LangGraph 13.5K); vendor lock-in; contradicts the "AI is a tool, we direct" philosophy.

## Decision

We chose **Option B: Dc-Dev, one unified agent** that merges:

1. **Cavekit Gold Loop** (from `cavekit-orchestrator`): 5 pillars (quality+security first, strict TDD, HITL, patterns/anti-patterns, ROI), R-numbered kits with testable acceptance criteria, `retrieve → sketch → map → loop(make ↔ check, max 5)`, literal `Verdict:` gates, security axis always runs and P0/P1 → REJECT.
2. **Gentle AI protocols** (from `gentle-orchestrator`): SDD Session Preflight hard gate (interactive default, artifact store default engram, delivery/chain strategy, review budget), per-phase model assignments read from `opencode.json` (`agent.sdd-<phase>.model` authoritative, fallback to default), sub-agent context protocol (orchestrator controls all context access; sub-agents save discoveries to Engram before returning), skill-resolver protocol (resolve compact rules once per session, inject pre-digested into sub-agent prompts), sub-agent launch deduplication, structured Result Contract, implementation routing with smallest-useful-topology, receipt-driven development with user-owned kill switch.
3. **Research-derived enforcement** (new):
   - Deterministic `trace.md` writing via an OpenCode hook (only hooks fire unconditionally — the mechanism that was missing).
   - **Write-scope enforcement**: sub-agents may only modify files listed in the task's write scope; touching anything else → stop and report instead of editing.
   - **Mandatory evidence**: implementers must paste actual test run output; "all tests pass" without output = not finished.
   - **Adversarial Verifier with different model**: `cavekit-check` uses a distinct model from `cavekit-make` (validates the pending decision).
   - **Explicit non-goals** in kits/specs (out-of-scope list weights as much as in-scope).
   - **Bidirectional spec updating**: implementation decisions not in the kit get written back to the kit immediately.

Dc-Dev is a SINGLE public agent: a conversational front door that, once the idea is good, transitions to build mode via explicit HITL approval (never automatic), then coordinates the sub-agent factory exactly as the current orchestrators do.

## Consequences

**Positive**:
- One public door: user talks to Dc-Dev until the idea is good, then it implements — no layer-8 agent-selection error.
- Best-of-both orchestration: gold-loop rigor + gentle-ai protocols (preflight, model routing, context control, result contract, dedup).
- Deterministic enforcement where prompts previously failed (trace.md, write scope, evidence) — quality gates stop being optional.
- Per-phase model routing reduces cost and improves verification quality (checker uses a different model than builder).
- Reuses what is already installed and validated — no framework dependency, no vendor lock-in.

**Negative**:
- A single orchestrator prompt that is larger and must be maintained carefully (merge of two sources + new rules).
- The existing `cavekit-*` and `sdd-*` sub-agents need a consolidation pass (which stay as factory specialists, which get renamed/superseded) — documented in a follow-up ADR.
- OpenCode hook surface is smaller than Claude Code's; some enforcement ideas (e.g. SubagentStop hooks) may not be available in OpenCode yet and must degrade to check-phase verification.
- Migration/rename work touches `opencode.json` and possibly command definitions.

**Neutral**:
- The sub-agent factory pattern is preserved: Dc-Dev delegates, never builds inline.
- Kits remain the contract of record; ADRs (S2 tier) become the canonical decision layer that kits/specs link to.
- The user-facing conversation style keeps the warm Rioplatense persona; artifacts stay in English.

## Superseded by

(empty)

## Supersedes

(empty)

---

**Keywords**: dc-dev, unified-agent, cavekit, gentle-ai, orchestrator, gold-loop, sdd, hooks, enforcement, trace, model-routing, verifier, coordinator, sub-agents

**Date**: 2026-08-17

**Authors**: dcdebian (with Cavekit Orchestrator)