---
name: sdd-cavekit-sketch
description: >
  Fase Sketch — escribir kits con R-numbered requirements, acceptance criteria
  testeables, Strict TDD y security gates. Trigger: "/sdd-cavekit sketch", "write kits", "create specs"
---

## Sketch Phase — Escribir Kits (Gold)

Recibes: descripción de feature.
Produces: kits con acceptance criteria + Strict TDD + security gates.

### Principios del flujo gold (mismo idioma en todas las fases)
- **Calidad + Seguridad primero** — siempre, antes que speed/costo.
- **Strict TDD** — cada requirement tiene acceptance criteria que se convierte en test fallido primero (red → green → refactor).
- **Human-in-the-Loop (HITL)** — si el alcance es ambiguo o hay bloqueo, PREGUNTÁ. Una pregunta a la vez. Nunca asumas.
- **Patrones / Anti-patterns** — usá patrones conocidos; evitá god services, catch silencioso, abstracción prematura.
- **ROI** — solo lo que el usuario pidió. YAGNI: sacá requisitos no solicitados.

### Cavekit Structure
```
context/
├── refs/           # PRD, docs, research (input)
├── kits/           # R1, R2, R3... (output)
└── impl/           # Living tracking
```

### Formato de Kit (plantilla gold = fuente de verdad)
Usá `cavekit-writing/references/kit-gold-standard.md`. Cada kit tiene:
- **Goal** (una frase)
- **Constraints**: calidad, seguridad, Strict TDD (no negociables)
- **FR-1, FR-2...** con Acceptance Criteria testeables (observable, determinista, automatizable)
- **Security Gates**: checklist (sin secretos, authz, input validado, sin SQL/shell crudo)
- **Verification Plan**: comandos reales (test / lint / typecheck)
- **Definition of Done (Result Contract)**

### Reglas
1. **WHAT not HOW** — comportamiento, no framework.
2. Todos los requirements tienen acceptance criteria testeables.
3. **Security es cross-cutting**: cada dominio lista sus security gates.
4. **Out of Scope** es mandatory.
5. **Cross-references** entre dominios.
6. **Number sequentially** (R1, R2...).

### Human-in-the-Loop
Si la feature es ambigua: hacé 1 pregunta específica, esperá respuesta, seguí. No inventes alcance.

### Output (Result Contract)
```
{count} kits, {total_requirements} requirements, {total_criteria} acceptance criteria.
Security gates: {n} definidos.
Next: /sdd-cavekit map
```

### Auto-Load
- cavekit-writing (lee la plantilla gold)
- validation-first
- complexity-detection
