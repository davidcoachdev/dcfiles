---
name: sdd-cavekit-map
description: >
  Fase Architect — generar task dependency graph desde kits.
  Trigger: "/sdd-cavekit map", "generate build plan", "map tasks"
---

## Map Phase — Generar Build Plan

Recibes: kits con R-numbers
Produces: task dependency graph

### Input
Lee todos los archivos en `context/kits/`

### Output: Build Site

```markdown
# Build Site: {feature}

## Coverage Matrix

| Requirement | Task(s) |
|--------------|---------|
| R1 (auth) | T-001, T-002 |
| R2 (api) | T-003, T-004 |
| R3 (data) | T-005 |

## Tasks

### Tier 0 — No Dependencies
| Task | Title | Spec | Requirement | Effort |
|------|-------|------|--------------|--------|
| T-001 | DB schema | spec.md | R1 | S |

### Tier 1 — Depends on Tier 0
| Task | Title | Spec | blockedBy | Effort |
|------|-------|------|------------|--------|
| T-002 | Auth module | spec.md | T-001 | M |
```

### Task Dependencies

- **Tier 0**: Sin dependencies
- **Tier 1**: Depende solo de Tier 0
- **Tier N**: Depende de tiers anteriores

### Cavekit Router

Score tasks para decidir modelo (para optimize costs):
- `depth: quick` — 8k tokens/task
- `depth: standard` — 20k tokens/task  
- `depth: thorough` — 45k tokens/task

### Coverage Check

Verificar que TODOS acceptance criteria tienen task que los cubre. Si no → gap.

### Output

Al terminar:
```
{count} tasks across {tiers} tiers.
Coverage: {covered}/{total} criteria mapped.
Next: /sdd-cavekit make
```

### Cavekit Auto-Load

Cargar skills:
- capability-discovery
- complexity-detection