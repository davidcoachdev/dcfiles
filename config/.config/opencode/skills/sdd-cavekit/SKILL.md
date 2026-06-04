---
name: sdd-cavekit
description: >
  SDD workflow con metodología Cavekit — Sketch → Map → Make → Check.
  Kits con acceptance criteria, iteration loops, peer review.
  Trigger: "/sdd-cavekit <feature>", "use cavekit", "sketch map make check"
---

## Cavekit SDD — Spec-Driven Development con Cavekit

Esta skill implementa SDD usando la metodología Cavekit:
- **Specify Before Building** — kits primero, código después
- **Acceptance Criteria** — cada requerimiento es verificable automáticamente
- **Iteration Loops** — hasta convergencia
- **Peer Review** — segundo agente revisa

### Fases del Hunt

```
/sdd-cavekit sketch → /sdd-cavekit map → /sdd-cavekit make → /sdd-cavekit check
     (kits)            (planes)         (build)          (verify)
```

Cuando invocas `/sdd-cavekit <feature>`:
1. **Draft (sketch)**: Escribir kits con R-numbers + acceptance criteria
2. **Architect (map)**: Generar task dependency graph
3. **Build (make)**: Iteration loop hasta completar o budget
4. **Inspect (check)**: Gap analysis + peer review

**Caveman**: Conversación en caveman mode (~75% menos tokens).

**Context Directory:**
```
context/
├── refs/           # Material de referencia (PRDs, docs)
├── kits/           # Requerimientos con acceptance criteria
├── plans/         # Task dependency graphs
└── impl/         # Tracking de implementación
```

### commands Disponibles

| Command | Phase | Qué hace |
|---------|-------|---------|
| `/sdd-cavekit sketch` | Draft | Escribir kits con R1, R2... + acceptance criteria |
| `/sdd-cavekit map` | Architect | Generar task graph desde kits |
| `/sdd-cavekit make` | Build | Autonomous loop hasta done |
| `/sdd-cavekit check` | Inspect | Gap analysis + peer review |
| `/sdd-cavekit ship` | All | sketch→map→make→check en un shot |

### Cavekit Writing Principles

Cada requirement: **R{number}: {description}**

**Acceptance Criteria** (testeables, automatizables):
- ❌ "UI должна хорошо выглядеть"
- ✅ "Button tiene touch target mínimo 44x44px"

**Formato de Kit:**
```markdown
### R1: {Nombre del requerimiento}
**Description:** {Qué debe ser cierto — comportamiento, no implementación}
**Acceptance Criteria:**
- [ ] {Criterio 1 — observable, determinista}
- [ ] {Criterio 2}
**Dependencies:** {Otros specs, o "None"}

## Out of Scope
- {Cosa explícitamente excluida}

## Cross-References
- Depends on: kits/{ dependency }.md R{n}
- Depended by: kits/{ dependent }.md R{n}
```

### Iteration Loop

Ejecutar mismo prompt hasta que diff → 0:

1. Apply changes → commit
2. Return step 1
3. **Convergence signal**: diff achicando entre iteraciones

**Si no converge**: el problema está UPSTREAM — fixear inputs (kits, validation), no iteration count.

### Peer Review (Check phase)

Segundo agente revisa:
- **Gap analysis**: built vs specified
- **Code quality**: bugs, security, patterns
- **Verdict**: APPROVE / REVISE / REJECT

---

## Skills Relacionadas (auto-load según contexto)

| Context | Skill |
|--------|-------|
| Escribir kits | cavekit-writing |
| Acceptance criteria | validation-first |
| Peer review | peer-review |
| Implement tracking | impl-tracking |
| Context architecture | context-architecture |
| Revision (fix upstream) | revision |

## Peer Review en Check Phase

**principio**: "The peer reviewer's job is to find what the builder missed — NOT to agree."

**6 modos de peer review**:

| Modo | Cuándo usar |
|-----|-----------|
| **Diff Critique** | Revisar changes vs kit requirements |
| **Design Challenge** | Antes de build (catch spec flaws) |
| **Threaded Debate** | Issues complejos, múltiples iteraciones |
| **Delegated Scrutiny** | reviewer tiene authority para reject |
| **Deciding Vote** | Voting entre múltiples modelos |
| **Coverage Audit** | Verificar coverage de tests |

**Verdict**: APPROVE / REVISE / REJECT

- **APPROVE**: Todos acceptance criteria pasan
- **REVIEW**: Fixes menores, puede proceed
- **REJECT**: Issues críticos, blockea

## Iteration Loop Fin

Fin del loop cuando:
- Todas las tasks completadas O
- Budget agotado O  
- Convergence detectada (diff achicando)

Output final: `<promise>CAVEKIT COMPLETE</promise>`