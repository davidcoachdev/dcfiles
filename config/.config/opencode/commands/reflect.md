---
description: "Reflexiona la sesión y persiste correcciones/decisiones en Engram (memoria persistente) con tu aprobación"
---

Ejecutá el flujo de reflexión NOW, en esta sesión (no como subtarea — necesitás
el contexto completo de la conversación).

Pasos:
1. Leé el skill en `~/.config/opencode/skills/reflect/SKILL.md` y seguí su flujo.
2. Revisá la sesión actual en busca de correcciones, preferencias y decisiones del usuario.
3. Clasificadas por confianza (HIGH/MEDIUM/LOW) y asignales un `topic_key` estable.
4. Mostrame un resumen corto de qué vas a guardar en Engram y pedime aprobación.
5. Solo tras mi aprobación, llamá `mem_save` por cada ítem con el formato del skill.

No guardes nada sin que lo apruebe. $ARGUMENTS
