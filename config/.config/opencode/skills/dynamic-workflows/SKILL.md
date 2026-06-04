---
name: dynamic-workflows
description: "Trigger: dynamic workflows, flujos de trabajo, multi-agent orchestration, subagent coordination, tournament pattern, adversarial verification. Orchestrates multi-agent workflows using existing OpenCode subagents to combat agent laziness, self-preference bias, and goal drift in long-running tasks."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Activation Contract

Use this skill when:
- Task is long-running, massively parallel, or highly structured
- Claude/agent shows laziness (stops before finishing), self-preference bias, or goal drift
- Task benefits from isolated contexts per sub-problem
- Task needs adversarial verification or comparative judgment
- User mentions "workflow", "flujo de trabajo", "multi-agent", or asks for tournament/generate-filter patterns

Do NOT use for: trivial single-file edits, quick questions, simple code generation. Dynamic workflows consume more tokens — only apply when complexity justifies it.

## Core Anti-Failure Patterns

Three failure modes in single-context agents that multi-agent workflows fix:

| Failure | Symptom | Fix |
|---------|---------|-----|
| Agent laziness | Stops after partial progress, declares done | Isolated subagents with bounded scope |
| Self-preference bias | Prefers own output, fails at self-verification | Adversarial verifier agent (different model) |
| Goal drift | Loses fidelity to original goal after compaction | Fresh context per subagent with explicit goal |

## Patterns

### Classify & Act

Use classifier agent to determine task type, then route to specialized agents.

```
classifier agent → [backend bug] → backend specialist
                 → [frontend bug] → frontend specialist
                 → [security]     → security auditor
```

### Expand & Synthesize

Split task into N independent pieces, run agents in parallel, merge results.

```
                 ┌→ subagent 1 ─┐
coordinator ─────┼→ subagent 2 ─┼→ synthesis agent → final output
                 └→ subagent N ─┘
```

Synthesis agent waits for ALL subagents, then combines structured results.

### Adversarial Verification

For each generative agent, run a separate verifier agent with a rubric.

```
generator → output → verifier (adversarial, different model) → pass/fail
```

Use `judgment-day` skill or `adversarial-review-plus` skill for the verifier role.
Route verifier to weaker/cheaper model for cost efficiency, stronger model for critical checks.

### Generate & Filter

Generate N ideas in parallel, filter by rubric, deduplicate, return top-k.

```
generator 1 ─┐
generator 2 ─┼→ filter agent (rubric) → dedup → top-K
generator N ─┘
```

### Tournament

Agents COMPETE on same task with different approaches. Judge compares pairwise.

```
approach A ─┐
approach B ─┼→ pairwise judge ─→ winner (or ranking)
approach C ─┘
```

Pairwise comparison more reliable than absolute scoring for qualitative judgment.

### Repeat Until Done

For tasks with unknown work volume. Loop agents until stop condition met (no new findings, no more errors).

Use `/loop` or `autonomous-loop` skill. Combine with `/goal` for completion requirement.

### Root Cause Analysis

Generate hypotheses from DISJOINT evidence sources (logs, code, data). Each evaluated by verifier panel.

```
logs agent  ─→ hypothesis A ─┐
code agent  ─→ hypothesis B ─┼→ verifier panel → root cause
data agent  ─→ hypothesis C ─┘
```

Prevents self-preference bias by using separate agents for separate evidence pools.

### Large-Scale Triaging

Classify every item, deduplicate against existing, route to fix or escalate.

Critical: QUARANTINE pattern — agents reading untrusted input have low privileges; processing agents have high privileges.

## Model Routing

Classifier agent determines model per task:
- Complex reasoning, many files → Opus (if available)
- Many tool calls, straightforward → Sonnet
- Simple classification/verification → Haiku

## Integration with Existing Skills

| Pattern | Existing Skill |
|---------|---------------|
| Parallel dispatch | `dispatching-parallel-agents` |
| Adversarial review | `judgment-day`, `adversarial-review-plus` |
| Complex orchestration | `orchestrator` |
| Repeat until done | `autonomous-loop` |
| Root cause analysis | `systematic-debugging` |
| Large-scale triage | `jira-epic`, `jira-task` |

## When NOT to Use

- Simple coding tasks (single file, single concern)
- Tasks completable in < 3 trivial steps
- Context window can hold entire task without drift
- Token budget is tight and task doesn't need multi-agent

Overhead: 2-5x more tokens than single-agent approach. Only pay when needed.

## Auto-Detection Triggers

Self-check before executing ANY task:
1. Will this task span > 10 tool calls? → Consider expand-synthesize
2. Does it need verification of its own output? → Add adversarial verifier
3. Could self-preference bias affect result? → Use tournament or verifier
4. Is work volume unknown? → Use repeat-until-done loop
5. Are there > 50 items to classify? → Use large-scale triage pattern

## References

- `doc/articulo-flujos-de-trabajo.md` — fuente original (Anthropic: Dynamic Workflows in Claude Code)
