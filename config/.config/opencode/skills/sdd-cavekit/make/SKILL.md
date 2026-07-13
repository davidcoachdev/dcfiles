---
name: sdd-cavekit-make
description: >
  Fase Make — iteration loop con Strict TDD y security gates. Trigger: "/sdd-cavekit make", "build", "run loop"
---

## Make Phase — Iteration Loop (Gold)

Recibes: build site con task dependency graph.
Produces: working code + tests (Strict TDD) + tracking.

### Principios gold
- **Strict TDD (OBLIGATORIO)**: para cada task, escribí el test fallido PRIMERO (red), implementá lo mínimo (green), refactor. La cobertura NO baja.
- **Security gates**: cada task con security gate los cumple antes de mark done.
- **Human-in-the-Loop**: si el task está bloqueado o el alcance es ambiguo → PARÁ y preguntá. No adivines. Una pregunta a la vez.
- **Surgical changes**: cada línea trackea a un acceptance criterion.

### Pre-flight
- Todos acceptance criteria + security gates tienen task asignado.
- Si no → reportá gap, NO proceed.

### The Loop
```
Read build site → next unblocked task
  → Load kit + AC + security gate
  → RED: write failing test
  → GREEN: minimal impl
  → REFACTOR
  → Validate (build + tests + security gate)
  → PASS → commit → mark done → next task
  → FAIL → diagnose → fix → revalidate
Repeat until: all done OR budget exhausted
```

### Wave Execution
Tareas del mismo tier en paralelo (subagents). Merge one at a time, validá entre merges.

### Circuit Breakers
- **3 test failures** → task BLOCKED → abort
- **All blocked** → stop y report

### Validation Gates (por task)
| Gate | Valida |
|------|--------|
| Gate 1 | Build compila |
| Gate 2 | Unit tests pass (Strict TDD) |
| Gate 3 | Acceptance criteria cumplidos |
| Gate 4 | Security gate checklist OK |
| Gate 5 | Sin anti-patterns (god service, catch silencioso) |

### Result Contract (por task)
- Kit requirement ref, files modified, tests added, security gate status.

### Output
```
Loop complete. {completed} tasks, {failed} failed.
Build passes. Tests pass (Strict TDD). Security gates: OK.
Next: /sdd-cavekit check
```

### Auto-Load
- autonomous-loop
- impl-tracking
- validation-first
