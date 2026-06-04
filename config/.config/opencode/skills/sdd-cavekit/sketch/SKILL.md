---
name: sdd-cavekit-sketch
description: >
  Fase Draft — escribir kits con R-numbered requirements y acceptance criteria.
  Trigger: "/sdd-cavekit sketch", "write kits", "create specs"
---

## Sketch Phase — Escribir Kits

Recibes: descripción de feature
Produces: kits con acceptance criteria

### Cavekit Structure

```
context/
├── refs/           # PRD, docs, research (input)
├── kits/           # R1, R2, R3... (output)
└── impl/           # Living tracking
```

### Formato de Kit

```markdown
# Kit: {Domain}

## Scope
{Una línea sobre qué cubre}

## Requirements

### R1: {Nombre}
**Description:** {Qué debe ser true — comportamiento, no implementación}
**Acceptance Criteria:**
- [ ] {Criterio 1 — observable, determinista, automatizable}
- [ ] {Criterio 2}
- [ ] {Criterio 3}
**Dependencies:** {None | R{n} from other kit}

### R2: {Nombre}
...

## Out of Scope
- {Cosa 1}
- {Cosa 2}

## Cross-References
- Depends on: kits/{other}.md R{n}
- Depended by: kits/{other}.md R{n}
```

### Reglas

1. **WHAT, not HOW** — describir comportamiento, no framework
2. **Todos los requirements tienen acceptance criteria** — si no es testeable, no sirve
3. **Out of Scope es mandatory** — previene sobre-building
4. **Cross-references** — domains se linked
5. **Number sequentially** — R1, R2, R3...

### Cavekit Index (overview)

```markdown
# Kit Overview

| Domain | Kit File | Summary |
|--------|---------|---------|
| Auth | kits/auth.md | Login, sessions, OAuth |
| API | kits/api.md | Endpoints, formats |
| Data | kits/data.md | Models, relationships |
```

### Cavekit Writing Skills

- **Validation-First**: Cada acceptance criterion debe poder verificarse automáticamente
- **Hierarchical**: Un index + domain kits individuales
- **Brownfield**: `/sketch --from-code` para existentes

### Output

Al terminar, reporta:
```
{count} kits, {total_requirements} requirements, {total_criteria} acceptance criteria.
Next: /sdd-cavekit map
```

### Cavekit Auto-Load

Cargar skills:
- cavekit-writing
- validation-first
- complexity-detection