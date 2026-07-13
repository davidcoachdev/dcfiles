# Playbook Maestro — Cavekit Flow de Grado Gold

Este documento es el capstone. Une el orchestrator (coordinador), la plantilla de kit
gold, el TDD estricto, las gates de seguridad y el human-in-the-loop en un flujo
coherente y repetible. Si seguís esto, tu Cavekit es uno de los mejores flujos
agentic: fiable, seguro, verificable y rentable.

---

## 0. Principios (no negociables)

1. **Calidad + Seguridad primero.** Siempre. Speed y costo vienen después.
2. **Human-in-the-loop.** El agente ejecuta; la opinión del humano cuenta siempre.
   Nunca asumas en un ítem bloqueado — preguntá.
3. **Strict TDD.** Rojo → verde → refactor. La cobertura no baja.
4. **Adaptar, no copiar.** Extraé patrones (Gentle-AI, prompts filtrados); nunca
   pegues código ajeno sin entenderlo.
5. **Rentabilidad.** Hacé el mínimo que cumple los criterios. Sin especulación, sin
   abstracción "por si acaso", cambios quirúrgicos.

## 1. Flujo end-to-end

```
Tarea entra
   │
   ▼
Orchestrator (COORDINA, no ejecuta)
   │  ├─ ¿algún trigger de delegación? → DELEGA ya (hard-stop)
   │  └─ asigna modelo por fase
   ▼
Sketch  → kits con plantilla gold (FR + AC testeables + TDD + security gates)
   ▼
Map     → grafo de tareas dependientes
   ▼
Make    → iteración autónoma con Strict TDD + per-phase model
   ▼
Check   → peer review ciego + verificación (test/lint/typecheck/build)
   ▼
Result Contract → resumen ejecutivo + artifacts + next + riesgos
   ▼
Archive  → syncing de specs delta
```

## 2. Reglas duras (del orchestrator)

- **Delegate-first / hard-stop:** si tocás código de implementación, pará y delegá.
  Vos coordinás.
- **Triggers de delegación:** gap de info, ambigüedad de alcance, bloqueo técnico,
  fallo repetido, skill faltante, pregunta del usuario → escalás inmediatamente.
- **Per-phase model:** Sketch/thinking = razonador fuerte; Make/Check = rápido+barato.
- **Quality & Security gates:** son puerta, no sugerencia.

## 3. Kits gold (usar la plantilla)

- Plantilla: `references/kit-gold-standard.md`.
- Cada requerimiento tiene **acceptance criteria testeables** (test, comando o
  comportamiento observable).
- Incluí siempre: Constraints, Strict TDD Plan, Security Gates, Verification Plan,
  Definition of Done (Result Contract).
- Un kit sin AC verificables = bug de spec → no arranques a codear.

## 4. Verification gates (antes de "verified")

Comandos reales del proyecto, todos deben salir 0:

- `test`  (ej. `npm test`, `pytest`, `go test ./...`)
- `lint`  (ej. `npm run lint`, `ruff check .`)
- `typecheck` (ej. `tsc --noEmit`)
- `build` (si aplica)
- **Security checklist** de la plantilla (sin secretos, authz, input validado,
  sin concatenación cruda SQL/shell, deps escaneadas).
- Cobertura delta ≥ 0 vs baseline.

"Debería funcionar" no es un resultado. Reportá el output.

## 5. Human-in-the-loop (cuándo preguntar)

- Ambigüedad de alcance que cambia el diseño.
- Bloqueo que necesita decisión del usuario o de otro equipo.
- Trade-off con implicancia de seguridad o costo.
- Antes de un cambio grande/no solicitado.

Una pregunta a la vez. Pará y esperá.

## 6. Anti-patterns (código y flujo)

- God service / clase 2000 líneas.
- `catch` silencioso, `TODO` como diseño.
- Abstracción prematura "por si acaso".
- Mezclar fases (el orchestrator codeando, o Make haciendo peer review).
- Aprobar trabajo propio sin verificar.
- Asumir en vez de preguntar cuando hay bloqueo.

## 7. Rentabilidad / ROI

- Mapeá cada criterio de aceptación a una verificación concreta.
- No agregues features no pedidas.
- Cambios quirúrgicos: cada línea trackea a un criterio.
- Reusá kits y patrones; no reinventes.

## 8. Memoria (Engram)

- Guardá decisiones, bugs, descubrimientos y convenciones PROACTIVAMENTE
  (`mem_save`) tras cada hito.
- Al cerrar sesión: `mem_session_summary` con Goal / Instructions / Discoveries /
  Accomplished / Next Steps / Relevant Files.
- Tras compactación: primero `mem_session_summary` con el resumen compactado.

## 9. Checklist de arranque de sesión

- [ ] ¿Tarea clara? Si no → preguntar.
- [ ] ¿Kit gold creado con AC testeables?
- [ ] ¿Modelo por fase asignado?
- [ ] ¿Delegación correcta (orchestrator no ejecuta)?
- [ ] ¿Gates de verificación + seguridad definidas?
- [ ] ¿Human-in-the-loop puntos identificados?
