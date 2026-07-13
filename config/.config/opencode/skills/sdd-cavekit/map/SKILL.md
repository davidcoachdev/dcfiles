---
name: sdd-cavekit-map
description: >
  Fase Map — generar task dependency graph desde kits, incluyendo tasks de
  security/calidad. Trigger: "/sdd-cavekit map", "generate build plan", "map tasks"
---

## Map Phase — Generar Build Plan (Gold)

Recibes: kits con R-numbers + security gates.
Produces: task dependency graph (funcional + security + calidad).

### Principios gold
- **ROI**: el router asigna depth (quick/standard/thorough) para optimizar costo sin sacrificar calidad.
- **Cobertura total**: TODO acceptance criterion Y todo security gate debe tener task que lo cubra.
- **Calidad + Seguridad** son primeros ciudadanos: no solo tareas funcionales.

### Input
Lee `context/kits/`.

### Output: Build Site
```markdown
# Build Site: {feature}

## Coverage Matrix
| Requirement / Gate | Task(s) |
|-------------------|---------|
| R1 (auth)         | T-001, T-002 |
| R1 Security Gate  | T-003 |

## Tasks
### Tier 0 — No Dependencies
| Task | Title | Spec | Requirement | Effort |
|------|-------|------|--------------|--------|
| T-001 | DB schema | spec.md | R1 | S |

### Tier N — Depends on Tier N-1
```

### Task Dependencies (Tiers)
- **Tier 0**: sin dependencies
- **Tier N**: depende solo de tiers anteriores

### Cavekit Router (ROI)
- `depth: quick` — 8k tokens/task
- `depth: standard` — 20k tokens/task
- `depth: thorough` — 45k tokens/task

### Coverage Check (OBLIGATORIO)
Verificar que TODOS acceptance criteria + security gates tienen task. Si falta → gap, NO proceed.

### Output (Result Contract)
```
{count} tasks across {tiers} tiers.
Coverage: {covered}/{total} criteria + gates mapped.
Next: /sdd-cavekit make
```

### Auto-Load
- capability-discovery
- complexity-detection
