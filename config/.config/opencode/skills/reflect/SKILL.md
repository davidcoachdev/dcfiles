---
name: reflect
description: "Trigger: /reflect, aprender de correcciones, persistir preferencias en Engram, nunca repetir errores. Revisa la sesión actual, extrae correcciones/decisiones del usuario y guárdalas en memoria persistente (Engram) con aprobación explícita."
license: MIT
metadata:
  author: dcdebian
  version: "1.0"
---

# Reflect — Aprende de las correcciones, nunca las repitas

Versión nativa de OpenCode del "reflect system". A diferencia del repo original
(haddock-development/claude-reflect-system), aquí:

- El **detector es el propio LLM**, no regex frágil → mucho menos falsos positivos.
- El **almacén es Engram** (MCP ya conectado), no archivos de skill mutados a ciego.
- Siempre **Human-in-the-Loop**: se muestra qué se guardará y el usuario aprueba.

## Cuándo usar

- El usuario corrigió algo: "no, usa X en vez de Y", "siempre haz Z", "nunca hagas W".
- El usuario reveló una preferencia o decisión de arquitectura.
- Al final de una sesión productiva, para no perder lo aprendido.
- Invocado manualmente con `/reflect`.

## Flujo

1. **Revisa la sesión** (la conversación actual está en tu contexto).
   Busca señales del usuario, clasificadas por confianza:

   - 🔴 **HIGH** — correcciones explícitas: "usa X en vez de Y", "nunca hagas X",
     "siempre verifica X". → `type: preference` o `pattern`.
   - 🟡 **MEDIUM** — decisiones/acuerdos: "hagamos X", "vamos con esta arquitectura".
     → `type: decision` o `architecture`.
   - 🟢 **LOW** — observaciones/sugerencias: "¿consideraste X?", "¿qué tal Y?".
     → `type: discovery`. Solo guardar si aporta valor duradero.

2. **Descarta ruido**: no guardes correcciones triviales, locales a un solo archivo
   que el diff ya captura, ni opiniones que contradigan aprendizajes previos sin
   contexto. Si hay conflicto con un recuerdo existente,优先 preguntar al usuario
   (no sobrescribir ciegamente).

3. **Asigna `topic_key` estable** (reusa la misma key para evolucionar un tema):
   - "usa uv en vez de pip" → `topic_key: python/package-manager`, `type: preference`
   - "corre tests antes de commit" → `topic_key: workflow/ci`, `type: pattern`
   - "no loguear secrets" → `topic_key: security/secrets`, `type: pattern`
   - decisión de arquitectura → `topic_key: architecture/<area>`, `type: decision`

   `scope`: `project` (default, convenciones del repo) o `personal` (preferencia tuya).

4. **Muestra al usuario** un resumen corto, ej:
   ```
   Voy a guardar en memoria (Engram):
   1. [preference / python/package-manager] Usar `uv` en vez de `pip`
   2. [pattern / workflow/ci] Correr tests antes de cada commit
   ¿Aprobás? (A = aprobar todo, o decime cuál descartar)
   ```

5. **Al aprobar**, llama `mem_save` por cada ítem:
   - `title`: verbo + qué (p.ej. "Prefiere uv sobre pip")
   - `type`: preference | pattern | decision | architecture | discovery | bugfix | config
   - `topic_key`: la key estable
   - `scope`: project | personal
   - `content`: formato **What / Why / Where / Learned**
   - `capture_prompt: false` (es una acción deliberada, no un prompt de usuario)

6. **Confirma** cuántos recuerdos se guardaron. No guardes nada sin aprobación.

## Notas de seguridad

- Nunca mutés archivos de skill ni `AGENTS.md` automáticamente. Engram es el único
  destino; es versionado, searchable y sobrevive a compaction.
- Si el usuario contradice un recuerdo previo, usá `mem_search` primero y resolvé el
  conflicto con él, no sobrescribiendo.
- Modo automático: un plugin (`reflect-reminder.js`) escribe un nudge en
  `session.idle`; no guarda memoria solo. La reflexión real queda a cargo del LLM
  vía `/reflect`.
