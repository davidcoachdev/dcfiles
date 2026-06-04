---
name: sdd-cavekit-make
description: >
  Fase Build — autonomous iteration loop hasta completar o budget.
  Trigger: "/sdd-cavekit make", "build", "run loop"
---

## Make Phase — Iteration Loop

Recibes: build site con task dependency graph
Produces: working code + tests

### Pre-flight

Verificar que coverage está completo antes de empezar:
- Todos acceptance criteria tienen taskassigned
- Si no →报告 gap, NO proceed

### The Loop

```
┌─────────────────────────────────────────────┐
│  Read build site → Find next unblocked task  │
│            ▼                                │
│  Load kit + acceptance criteria             │
│            ▼                              │
│  Implement task                           │
│            ▼                              │
│  Validate (build + tests + criteria)      │
│            ▼                              │
│  PASS → commit → mark done → next task       │
│  FAIL → diagnose → fix → revalidate       │
│            ▼                              │
│  Repeat until: all done OR budget exhaust  │
└─────────────────────────────────────────────┘
```

### Wave Execution

Tasks en el mismo tier pueden ejecutarse en paralelo:

```markdown
═══ Wave 1 ═══
3 task(s) ready:
  T-001: DB schema (tier 0)
  T-002: Auth middleware (tier 0)
  T-003: Config loader (tier 0)

Dispatching to subagents...
T-001 PASS, T-002 PASS, T-003 PASS → Merge
```

### Circuit Breakers

Prevenir infinite loops:
- **3 test failures** → task BLOCKED → abort
- **All blocked** → stop y report

### Validation Gates

| Gate | Qué valida |
|------|-----------|
| Gate 1 | Build compila |
| Gate 2 | Unit tests pass |
| Gate 3 | Acceptance criteria |
| Gate 4 | Code quality |

### Token Budget

- **session_budget**: 500k tokens default
- **task_budget**: según depth (8k/20k/45k)

### Implementation Tracking

Por cada task:
- Kit requirement reference
- Files modified
- Tests added
- Notes sobre decisiones

### Output

```
Loop complete.
{completed} tasks, {failed} failed, {remaining} remaining.
Build passes. Tests pass.
Next: /sdd-cavekit check
```

O si budget exhausted:
```
Budget exhausted at {pct}%.
{completed} done, {remaining} remaining.
Resume with /sdd-cavekit make --resume
```

### Cavekit Auto-Load

Cargar skills:
- autonomous-loop
- impl-tracking
- validation-first (para gates)