---
name: skill-auditor
description: "Trigger: audit skills, auditar skills, revisar skills, auditoría de skills, skill review, skill audit. Audita todas las skills del proyecto: detecta redundancias, cáscaras vacías, problemas de frontmatter, y genera informes por cluster con plan de merge/delete/fix/split."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Activation Contract

Ejecutar cuando el usuario pide auditar, revisar, o analizar sus skills instaladas.

## Criterios de Auditoría

### 1. Estructura (por cada skill)

- **Frontmatter:** debe tener `name`, `description` (una línea, quoted), `license`, `metadata.author`, `metadata.version`
- **Description:** no usar `description: >` multilínea, no duplicar "Trigger:" dentro del string
- **Keywords:** NO debe tener sección `## Keywords` (viola regla del skill-creator)
- **Tamaño:** <50 líneas → demasiado thin, >500 líneas → posible split

### 2. Contenido

- ¿Tiene código/patrones/workflows accionables o es solo descripción de rol?
- ¿Es una cáscara vacía de ~23 líneas? → candidato a DELETE
- ¿Es una tabla de routing/índice sin contenido propio? → mover a AGENTS.md o mergear

### 3. Redundancia

- Agrupar skills por dominio (UI/Design, Backend, Code Review, Git, CV, Expert Personas, etc.)
- Detectar skills con >70% de overlap → candidatas a MERGE
- Detectar skills que son subset claro de otra → merge a la más completa

## Procedimiento

1. Leer `.atl/skill-registry.md` para obtener el catálogo completo
2. Contar líneas de cada `SKILL.md` con `wc -l`
3. Agrupar por dominio usando los nombres y descripciones
4. Para cada cluster problemático, leer los SKILL.md y evaluar con los criterios
5. Usar `grep` para detectar problemas estructurales:
   - `grep "## Keywords"` → skills con keywords prohibidos
   - `grep "description: >"` → descriptions multilínea
   - `grep -L "metadata:"` → skills sin metadata
6. Generar reportes separados por cluster

## Estructura de Output

Crear en `auditoria/skills/`:

```
auditoria/skills/
├── README.md              # Directorio con bookmarks a cada informe
├── informe-final.md       # Resumen ejecutivo con plan priorizado
├── ui-design/
│   └── informe.md
├── expert-personas/
│   └── informe.md
├── backend/
│   └── informe.md
├── code-review/
│   └── informe.md
├── git-github/
│   └── informe.md
└── cv-resume/
    └── informe.md
```

Cada `informe.md` debe tener:
- Tabla detalle por skill (líneas, frontmatter, trigger, keywords, grado, merge con, notas)
- Plan de merge con justificación
- Lista de skills a eliminar con motivo
- Resultado: X → Y skills
- Bookmarks para navegar entre informes (`[← directorio] [← anterior] [→ siguiente]`)

## Grados

- **KEEP** — skill saludable, mantener
- **MERGE** — mergear en otra skill (especificar destino)
- **DELETE** — eliminar (cáscara vacía o totalmente redundante)
- **FIX** — necesita reparación (falta contenido, frontmatter roto)
- **SPLIT** — demasiado grande, dividir

## Reglas

- No modificar skills durante la auditoría, solo generar informes
- No actuar sin orden explícita del usuario
- Priorizar merges que más reducen redundancia
- Marcar con 🔴 P0, 🟠 P1, 🟡 P2, 🟢 P3 en el plan de acción
