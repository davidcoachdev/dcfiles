Buenas, no guardé nada en disco, el mensaje lo armé en la respuesta. Ahí va de nuevo con los links incluidos:

---

**Para:** Alan
**Asunto:** TencentDB Agent Memory — lo que vimos y propuesta para Engram

Alan, estuve viendo [TencentDB Agent Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory) (6.8k ⭐, 641 forks) con el pibe y la verdad que tiene cosas muy interesantes. Te hago un resumen rápido de lo que sacamos en limpio.

**Referencias:**
- Repo: https://github.com/TencentCloud/TencentDB-Agent-Memory
- README: https://github.com/TencentCloud/TencentDB-Agent-Memory/blob/main/README.md
- Plugin manifest (config schema): https://github.com/TencentCloud/TencentDB-Agent-Memory/blob/main/openclaw.plugin.json
- Hermes plugin provider doc: https://github.com/TencentCloud/TencentDB-Agent-Memory/blob/main/hermes-plugin/memory/memory_tencentdb/README.md
- Roadmap: https://github.com/TencentCloud/TencentDB-Agent-Memory#roadmap
- Benchmark results (PersonaMem 48% → 76%): https://github.com/TencentCloud/TencentDB-Agent-Memory#-highlights

**La idea central:** Memoria en capas (L0 Conversation → L1 Atom → L2 Scenario → L3 Persona) + symbolic memory con Mermaid canvas para compresión de contexto corto. Rechazan el vector store plano porque la recall sin jerarquía es una búsqueda ciega.

**Lo que más me gustó:**
- Pipeline automática que cada N turnos extrae hechos, los agrupa en escenarios y genera un perfil de usuario. Nosotros hacemos todo eso a mano con `mem_save`.
- Offloading automático de tool logs a Mermaid cuando el contexto se llena — ahorran hasta 61% de tokens en benchmarks reales (WideSearch: 221.31M → 85.64M).
- Trazabilidad completa de L3 persona hasta el raw text original via `node_id`. No es pérdida irreversible como la mayoría.
- Zero-config. Lo instalás y funciona.

**Lo que tienen de falencia:**
- Vendor lock-in heavy a OpenClaw y Hermes. Si no usás esos frameworks, no hay integration.
- Skill generation prometida pero no implementada (https://github.com/TencentCloud/TencentDB-Agent-Memory#roadmap).
- Targeting chino primero (BM25 con jieba por defecto).

**Lo que YA tenemos en Engram que sirve de base:**
- `topic_key` para upsert de memories (ideal para persona que evoluciona)
- `mem_save` para atoms L1
- Scope `project` / `personal` (justo lo que necesitamos para separar perfil de usuario vs proyecto)
- `mem_session_summary` que es nuestro equivalente a L2 Scenario

**Lo que nos falta para estar a la par:**
1. **Pipeline automática de extracción** — hooks en el harness que disparen extracción L1 cada N interacciones sin intervención manual
2. **Hybrid recall** — sumar embeddings (BM25 + vector + RRF) a nuestra búsqueda FTS5 actual
3. **Offloading automático de contexto** — cuando la ventana se llena, comprimir tool logs a representación simbólica y mantener trazabilidad
4. **Generación de perfil de usuario (L3)** — cada N memorias, un prompt que actualice un `persona.md` via `topic_key`

**Mi propuesta:** Arrancamos por la pipeline de extracción automática (L1) que es lo que más impacto da con menos esfuerzo — probablemente 2-3 días hábiles para un MVP. Después vemos embedding service y offloading.

¿Qué opinas? ¿Le damos para adelante? Si te copa, hacemos una llamada rápida para definir los hooks y arrancamos.

Abrazo,

-- 
[tu nombre]
