---
name: x-bookmark-quote-posts
description: >
  Workflow para revisar bookmarks de X/Twitter y convertirlos en drafts de quote
  posts. Accede a la sección de bookmarks vía browser headless, extrae posts
  recientes, y genera drafts con voz personal del usuario. No publica ni muta
  X — solo genera contenido para revisión.
  Trigger: X bookmarks, Twitter bookmarks, quote posts, bookmark automation,
  crear quote posts, revisar bookmarks, growth content X.
license: Apache-2.0
metadata:
  author: gentleman-programming (adapted from MengTo/Skills x-bookmark-quote-posts)
  version: "1.0"
---

# X Bookmark Quote Posts

## Overview

Convertir bookmarks recientes de X/Twitter en una cola de quote-post drafts. El output debe sonar a una persona real pensando en público desde experiencia vivida, no a commentary genérico de AI.

## Workflow

### 1. Preparación

- Cargar `obscura_browser` para navegación
- Identificar el workspace/repo de contenido activo
- Leer `AGENTS.md` si existe
- Revisar `git status --short`

### 2. Acceder a bookmarks

```text
https://x.com/i/bookmarks
```

Usar `obscura_browser_navigate` para abrir la URL.

**Reglas:**
- NUNCA postear, reply, quote, like, retweet, DM, follow, ni mutar X
- Si X pide login y no hay sesión activa, reportar blocker

### 3. Colectar bookmarks

- Extraer: autor, handle, URL fuente, timestamp, texto del post, article-card title/summary
- Default: últimos 30 días de bookmark feed
- Scroll para ~12-20 candidatos en la ventana de 30 días
- Incluir resource-list bookmarks útiles, no solo AI takes

### 4. Draftear quote posts

Formato de archivo:

```text
data/x/bookmark-quote-posts/YYYY-MM-DD.md
```

Cada draft:

```markdown
## #N - Autor - Tema

Source: https://x.com/...

[draft body - 2-3 párrafos, first-person, voz natural]
```

- 7-10 drafts por corrida
- Los mejores bajo `## Best Picks`, alternativos bajo `## Secondary Picks`
- Variedad de temas: tools, product ideas, design resources, technical lessons, industry takes

### 5. Voz

**Usar:**
- First person cuando fluya natural
- 2-3 párrafos por draft
- Lenguaje directo, aristas, especificidad humana
- Experiencia pasada real (building, designing, teaching, debugging, shipping)

**Evitar:**
- Cadencia "frase corta, blank line, frase corta"
- Frameworks genéricos tipo "the real skill is..."
- Empty agreement tipo "great point"
- Hype phrases: "game changer", "unlock", "hot take", "supercharge"
- Claims no grounded en el prompt actual o contexto del proyecto

### 6. Verificar antes de commit

- ✅ Cada draft tiene source URL
- ✅ Cada draft tiene 2-3 párrafos
- ✅ Sin frases que suenen a AI summary
- ✅ `git diff --check` OK
- ✅ Stage solo el archivo de bookmark quote posts

```bash
git add data/x/bookmark-quote-posts/YYYY-MM-DD.md
git commit -m "chore: refresh X bookmark quote posts for YYYY-MM-DD"
```

### 7. Reporte

Output final:

```
Output: data/x/bookmark-quote-posts/YYYY-MM-DD.md
Candidatos revisados: 15
Drafts escritos: 8
Time window: últimos 30 días
Browser: ok
Commit: abc1234
```

Referencia: Adaptado de MengTo/Skills — x-bookmark-quote-posts
