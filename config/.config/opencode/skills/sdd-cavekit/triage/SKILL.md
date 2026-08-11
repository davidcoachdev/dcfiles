---
name: sdd-cavekit-triage
description: >
  Triage de alcance (modelo sala de urgencias): clasifica cualquier petición entrante en
  Verde/Amarillo/Rojo y define el camino. Reusable por CUALQUIER flujo agentico (no hardcodea agentes).
---

## Triage — Gate 0 (salá de urgencias)

Objetivo: decidir el camino ANTES de cualquier fase pesada (retrieve/sketch/map/make).
NO es una fase que produce artefactos: es una DECISIÓN de enrutamiento, barata y determinista.

### Cómo clasificar (criterios)
- **🟢 Verde (trivial)**: cambio cosmético, 1 archivo, alcance clarísimo, sin lógica de negocio ni riesgo.
  - ej.: color de botón, typo, texto, config puntual, rename local.
- **🟡 Amarillo (standard)**: feature chica/media, alcance claro, 1-3 archivos o módulos, riesgo bajo.
- **🔴 Rojo (core)**: cambio de core / arquitectura / auth / data / API pública, riesgo alto, o alcance ambiguo.

### Señales rápidas
- Si tenés `complexity-detection`: quick → suele ser Verde; standard → Amarillo; thorough → Rojo.
- Si el alcance es ambiguo → 1 pregunta HITL y seguí; lo obvio (color de botón) se etiqueta sin preguntar.

### Resultado de enrutamiento (lo que el consumidor debe hacer)
- **Verde** → fast path: edición quirúrgica directa + 1 verify liviano. NO corras el loop completo ni retrieves.
- **Amarillo** → flujo standard: retrieve → sketch → map → make ↔ check.
- **Rojo** → flujo completo + rigor extra (eje seguridad pesado, HITL obligatorio por fase).

### Reglas
1. **NO spawnees un sub-agent solo para triage** — la decisión es coordinación; la hace el agente frontal inline.
2. **HITL solo si hay ambigüedad real de tier.**
3. **El triage va SIEMPRE primero** — protege las fases pesadas de trabajo innecesario.
4. **Determinista** — misma petición → mismo tier.

### Reutilizable en CUALQUIER flujo (stack/componente)
Esta skill es agnóstica al orquestador. Un flujo que la consuma:
1. La lee **inline** (tool `read`), no la delega a un sub-agent.
2. Clasifica la petición en un tier.
3. Mapea el tier a SUS propios agentes/fases.

#### Ejemplo de mapeo — Cavekit
| Tier | Agente/fase Cavekit |
|---|---|
| 🟢 Verde | `cavekit-make` (tarea única) → `cavekit-check` liviano. **Sin** `cavekit-orchestrator`. |
| 🟡 Amarillo | `cavekit-orchestrator` (retrieve→sketch→map→make↔check) |
| 🔴 Rojo | `cavekit-orchestrator` + énfasis seguridad/HITL |

> Otro flujo (p.ej. Gentle-SDD, Superpowers) define su propio mapeo manteniendo los mismos 3 tiers.
