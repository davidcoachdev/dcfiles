# Reuse Report: Rebaseline Dc-Dev — Core mínimo verificable (`dc-dev → dispatch → subagente real → resultado → receipt`)

> Fase 0 (Retrieve) del flujo Cavekit. Rebaseline **desde cero** del núcleo Dc-Dev.
> No autoriza implementación, reactivación del dispatch viejo, ni modificación de Cavekit/Gentle/SDD legacy.
> Feature acotado: `dc-dev` (entry) → dispatch → **subagente real** → resultado → **receipt**, preservando plugins funcionales (TTS), sin tocar legacy Cavekit/Gentle/SDD.

- **Índice escaneado:** 14 entradas en `context/refs/kit-index.json` (stale, feature "Dc-Dev unified agent") + ~70 artefactos locales revisados en `agents/dc-dev/`, `agents/dc-dev-superflow-*`, `hooks/dc-dev/`, `plugins/`, `context/kits/`, `context/plans/`, `context/impl/`, `context/refs/`, `tests/dc-dev/`.
- **Veredicto: PARTIAL.** Hay una base legacy sólida y testeada en disco (entry, preflight/approval, check/verdict, TDD, gold-loop, hooks de trace/scope/evidence, suite de 12 tests). El GAP crítico es **único y acotado**: el dispatch *real* a un subagente vivo y el receipt end-to-end no están implementados ni verificados en ningún lado (ni en legacy —stub—, ni en superflow —inconcluso—). El overlay `dc-dev-superflow-*` es inflación no probada y debe archivarse.

---

## 1. Fuentes consumidas (auditoría existente)

| Fuente | Veredicto de la auditoría | Uso aquí |
|---|---|---|
| `context/refs/dc-dev-superflow-reuse-report.md` (191 L) | PARTIAL, mega-arquitectura de 16 skills/12 agents | **Superseded** — propuso más de lo pedido; archivar. |
| `context/refs/reuse-report.md` (186 L, unificado) | PARTIAL, kits R1–R25 | Base de contrato; sobreescribir con este reporte. |
| `context/refs/caveman-reuse-report.md` | Adaptación Caveman | Archivar (fuera de scope mínimo). |
| `context/impl/check-1..5.md`, `trace.md` (1160 L) | Check 5 = `REVISE` | Historia; no convertir a aprobación. |
| `context/dc-dev-superflow/impl/{runtime-proof,dispatch-live-report}.md` | INCONCLUSIVE / setup-required | Confirma GAP de dispatch real. |
| `context/plans/dc-dev-hook-runtime.md` | Probe de hook surface real (OpenCode 1.18.18) | **Reusable** — restricción dura de enforcement. |
| `plugins/dc-dev-runtime.mjs` + `hooks/dc-dev/*` | Autoconsistente en disco | **Reusable** (módulos), con salvedad de registro global. |
| `opencode.json` (registro `dc-dev`, `dc-dev-superflow-*`, `dc_dev_superflow_dispatch`, `agent-flow-tts`) | Mix legacy + superflow | Mapea límites; TTS se preserva. |

---

## 2. Kits / artefactos REUTILIZABLES (core mínimo)

Scores deterministas 0.00–1.00 (`1.00` reusa directo; `0.75` por adaptador; `0.50` patrón parcial).

| # | Artefacto | Tipo | Score | Por qué aplica al core mínimo |
|---|---|---|---:|---|
| R1 | `plugins/agent-flow-tts.ts` + `.test.ts` | Plugin funcional | **1.00** | **PRESERVAR INTACTO.** TTS independiente, fails-silent, solo subagentes, debounce. Fuera de cualquier rebuild. |
| R2 | `context/kits/dc-dev-overview.md`, `front-door.md`, `gold-loop.md`, `protocols.md`, `enforcement.md` (R1–R25) | Contrato | **0.95** | Contrato canónico. Para core mínimo basta R2 (delegación), R4 (result contract), R10–R14 (loop/delegación/receipt), R20–R25 (enforcement). Adaptar conceptos; **no** llamar a Cavekit/Gentle. |
| R3 | `context/plans/dc-dev-contract.md` | Contrato | **0.95** | Frontera port/adapt/artifact/non-goals limpia y minimal. Reusar tal cual. |
| R4 | `context/plans/dc-dev-hook-runtime.md` | Probe | **0.90** | Lista los hooks **realmente** soportados (sin `command.executed`, sin `permission.*`). Restricción dura para cualquier enforcement del core. |
| R5 | `agents/dc-dev/entry/entry.mjs` + test | Módulo | **0.95** | `routeRequest`: triage consulta/build + gate de aprobación. Es el entry del pipeline. |
| R6 | `agents/dc-dev/preflight/preflight.mjs` + test | Módulo | **0.85** | Gate approve/stop atribuible. Base del receipt (el writer real Falta — ver Gaps). |
| R7 | `agents/dc-dev/check/{adversarial,verdict}/*.mjs` + tests | Módulo | **0.90** | `parseVerdict` (APPROVE/REVISE/REJECT + bloqueo P0/P1). Sólido y testeado. Es el "resultado". |
| R8 | `agents/dc-dev/delegation/delegation.mjs` + test | Módulo | **0.70** | Solo deduplicación en memoria + scope conflicto. **Reusar la lógica de dedup/scope; el launch real Falta.** |
| R9 | `agents/dc-dev/make/tdd/`, `protocol/`, `gold-loop/{lifecycle,iteration}/`, `spec-sync/` + tests | Módulos | **0.85** | Primitivos de TDD, protocolo Gentle-adaptado, bounded loop, sync bidireccional de kits. Reusar como biblioteca. |
| R10 | `hooks/dc-dev/{trace,trace-writer}`, `scope/scope-guard`, `evidence/evidence-parser`, `artifact-validation/` + tests | Primitivos | **0.90** | Trace determinista, write-scope, parser de evidencia real, validación de artefactos. Son los primitivos de receipt/enforcement. |
| R11 | `plugins/dc-dev-runtime.mjs` | Plugin | **0.60** | Los **módulos importados existen y están testeados**; pero es hook **global** en `opencode.json` (riesgo de romper flujos ajenos). Reusar los módulos, **no** su registro global. |
| R12 | `tests/dc-dev/**` (12 tests legacy: runtime-validation, e2e front-door, e2e gold-loop, result-contract, receipts/operational, model-separation, kit-coverage, final-coverage, security) | Suite | **0.90** | Baseline de verificación ya existente. Reusar como andamiaje de "verificable". |

---

## 3. Artefactos a ARCHIVAR (fuera de scope mínimo; conservar por valor)

No se borran; se marcan fuera del alcance del core mínimo para evitar que Sketch los reactive.

| Artefacto | Razón de archivo |
|---|---|
| `agents/dc-dev-superflow-*/` (coordinator, research, planner, security, reviewer, evaluator, recovery + `core/` 16 módulos) | Overlay aditivo paralelo al legacy `agents/dc-dev/`. Nunca se probó live (`debug agent` → "not found"). 7+ agents es inflación para un core mínimo. |
| `skills/dc-dev-superflow-*/` (16 skills) | Mismo razonamiento; capability-gate, recovery, provenance, token-efficiency, etc. son útiles como referencia futura, no para el core mínimo. |
| `context/dc-dev-superflow/{kits,impl,plans}/` (10 kits, tracking, build-site, scope.json, result.schema.json) | Historia de la intentona superflow. |
| `context/refs/dc-dev-superflow-reuse-report.md`, `caveman-reuse-report.md` | Reportes previos superseded por este. |
| `context/impl/{check-1..5}.md`, `trace.md` | Verificación histórica iterativa (Check 5 = REVISE). |
| `context/plans/dc-dev-*` (22, salvo `dc-dev-contract.md`, `dc-dev-hook-runtime.md`, `dc-dev-security-review.md`) | Exploraciones parciales/abandonadas del esfuerzo "unified agent" (config-design, context-protocol, hook-contract, model-routing, model-validation, operational-verification, runtime-validation, skill-cache, skill-resolution, unified-agent-build-site, adversarial-audit, final-verification). |
| `restore-backup-20260818-143514/` | Snapshot de backup; dejar intacto. |

---

## 4. Artefactos a DESCARTAR (inconsistentes / falsos)

| Inconsistencia | Evidencia | Decisión |
|---|---|---|
| **"El dispatch live funciona"** | `dispatch-live-report.md`: *"Live parent-to-subagent delegation is NOT proven"*; `runtime-proof.md`: INCONCLUSIVE; `opencode debug agent dc-dev-superflow-core` → "not found". | Descartar como hecho. Sketch debe **construir y verificar** dispatch real, no heredar la creencia. |
| **"25/25 + 12/12 passing = runtime correcto"** | La auditoría misma advierte: *"artifact-existence tests can false-pass without loading the real plugin or exercising live dispatch"*. | Tratar los focused-tests como **false-green risk**; la verificación debe incluir dispatch live. |
| **`transport.mjs` del superflow es "transporte"** | `transport.mjs` solo hace `admitOptionalTransport` (capability gate tts/browser/mcp). No contiene `session.prompt`/subtask. | Descartar como dispatch; es solo admisión de capacidad. |
| **Enfoque `kiroExplore` para delegación (DE-1)** | Make agent sin permiso para `kiroExplore`; dead-end documentado. | Descartar ese camino. |
| **Hook de runtime GLOBAL** | `dc-dev-runtime.mjs` registrado globalmente en `opencode.json` (línea 569). Auditoría: *"globally loaded runtime hook can break unrelated workflows"*. | Descartar registro global; preferir dispatch explícito acotado a Dc-Dev. |
| **Dependencias externas congeladas** | Caveman, Cavemem, Cavekit, Cavegemma, Caveman Code (freeze/abandon). | Descartar como dependencias de runtime. |
| **Check 5 = `REVISE`** | Estado final de la verificación previa. | No convertir a `ok`/aprobación. |
| **`agents/dc-dev/*` no cableados como agentes OpenCode** | Existen como código+tests pero `opencode.json` solo registra `dc-dev` + `dc-dev-superflow-*`. | Descartar la asunción de que el core legacy "ya corre"; requiere cableado + llamada SDK real. |

---

## 5. Gaps — lo que NO existe y hay que crear (nuevo, mínimo)

1. **Dispatch REAL**: implementación que invoca un subagente **registrado** vía `client.session.prompt`/`subtask` de `@opencode-ai/sdk` y captura su resultado. Ni legacy (stub) ni superflow (inconcluso) lo tienen.
2. **Receipt end-to-end**: writer JSONL que persiste `{status, selectedChild, requestId, timestamp, resultRef, evidenceRef, verdict}` atado a `context/impl/trace.md`. Hoy solo existe la idea en `preflight.test.mjs` y en la narrativa de `dispatch-live-report.md`.
3. **Cableado mínimo en `opencode.json`**: registrar el entry `dc-dev` + 1 subagente real de trabajo (no los 7 superflow), con permisos acotados.
4. **Test de dispatch live**: un test que arranca sesión fresca, despacha al subagente real, y valida receipt con `status: "dispatched"`/`"done"` + `selectedChild` observado. Esto cierra el gap de false-green.
5. **Confinamiento de scope write** del subagente real (reusar `scope-guard.mjs`, pero aplicado al hijo vivo, no solo al mapa en memoria).

---

## 6. Riesgos para Sketch

- **R-1 (mayor):** El dispatch real depende del runtime OpenCode y del permiso de delegación; si la sesión no resuelve el hijo registrado, el receipt debe ser `blocked`/`setup-required` (no inventar éxito). Verificación live obligatoria.
- **R-2:** `agents/dc-dev/*` legacy no están registrados como agentes → "reusar" implica cablearlos o reimplementar el entry mínimo que los invoque; no asumir que ya corren.
- **R-3:** Hook global de `dc-dev-runtime.mjs` puede romper flujos ajenos; si Sketch lo reactiva, debe ser acotado a Dc-Dev.
- **R-4:** TTS y cualquier transporte opcional **nunca** son canal de aprobación ni gate de seguridad (ya normado en `transport.mjs` y `agent-flow-tts.ts`).
- **R-5:** El `kit-index.json` actual está stale (feature "unified agent"); usarlo ciegamente desvía a la mega-arquitectura. Ver sección 8.
- **R-6:** OpenCode hook surface limitado (`command.execute.before`, `tool.execute.before/after`, `permission.ask`); enforcement que dependa de eventos no soportados debe caer a check-phase.

---

## 7. Restricciones HARD para Sketch (no negociables)

1. **No reactivar `dc_dev_superflow_dispatch`** ni los agents `dc-dev-superflow-*`; construir un dispatch mínimo nuevo y verificado.
2. **No tocar** `cavekit-*`, `gentle-orchestrator`, `sdd-*` legacy. Adaptar conceptos (R10–R14, Result Contract) sin dependencias a esas familias.
3. **Preservar intacto** `plugins/agent-flow-tts.ts` (y su registro). No derivar trabajo ni aprobación de TTS.
4. **Strict TDD:** cada acceptance criterion del core mínimo = test rojo→verde antes de verde.
5. **Dispatch verificable:** el receipt debe provenir de un subagente **real** ejecutado, no de una aserción del modelo ni de un stub en memoria.
6. **Fail-closed:** dispatch sin hijo resuelto / sin admisión / sin scope → `blocked` o `setup-required` + receipt, nunca `ok`.
7. **Sin inflación:** el core mínimo NO necesita capability-gate, recovery, provenance, token-efficiency, plan-graph de 7 agents. Esos se archivan.
8. **Sin secretos** en trace/receipt/result; `scope-guard` rechaza rutas protegidas.

---

## 8. kit-index.json (refresh recomendado)

El índice actual está stale. Sketch debe usar este mapeo acotado (ya reflejado en §2):

- Reutilizables: `agents/dc-dev/{entry,preflight,delegation,check,make,protocol,gold-loop,spec-sync}`, `hooks/dc-dev/*`, `plugins/dc-dev-runtime.mjs` (módulos), `context/kits/dc-dev-*`, `context/plans/dc-dev-{contract,hook-runtime,security-review}`, `tests/dc-dev/*`, `plugins/agent-flow-tts.ts` (preservar).
- Archivar: `agents/dc-dev-superflow-*`, `skills/dc-dev-superflow-*`, `context/dc-dev-superflow/*`, `context/refs/*-reuse-report.md` previos, `context/impl/*`, `restore-backup-*`.
- Gap (crear): dispatch real + receipt writer + test live + cableado mínimo.

---

## Result Contract

- **Candidatos reutilizables:** 12 (R1–R12 en §2), liderados por `agent-flow-tts` (preservar), `context/kits/dc-dev-*` (contrato), `agents/dc-dev/{entry,check,verdict}`, `hooks/dc-dev/*`, y `tests/dc-dev/*`.
- **Veredicto:** PARTIAL — base legacy sólida; GAP único y acotado = dispatch real + receipt end-to-end.
- **Archivar:** overlay `dc-dev-superflow-*` completo + reportes previos + exploraciones `context/plans/dc-dev-*` parciales.
- **Descartar:** creencia de dispatch live funcionando, false-green de tests focused, `transport.mjs` como dispatch, hook global, deps Caveman/Cavekit externas, Check 5 `REVISE`.
- **Next:** `/sdd-cavekit sketch` con este reporte como contexto **obligatorio** y respetando las 8 restricciones HARD de §7. Sketch propone SOLO artefactos `dc-dev-*` nuevos mínimos + el dispatch real verificable.
