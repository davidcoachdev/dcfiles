---
name: Masonry Layout (Pinterest Grid)
platform: web
slug: masonry
tag: columns
url: https://namethatui.com/web/masonry
source: NameThatUI (namethatui.com)
also_called: waterfall layout, pinterest grid, brick layout
---

# Masonry Layout (Pinterest Grid)

> Demo interactivo: https://namethatui.com/web/masonry

**Plataforma:** web · **Tag/API:** `columns` · **También llamado:** waterfall layout, pinterest grid, brick layout

## Descripción
“The Pinterest grid where every card keeps its own height” is a masonry layout — each new item joins the shortest column, so cards pack like bricks with no row lines and a staggered bottom edge. Chinese UIs call it 瀑布流 (waterfall flow). CSS columns approximates it everywhere today; native masonry (Grid Lanes) shipped in Safari 26.

## Si lo llamaste…
“the pinterest style grid where every card is a different height”“photos stacked like bricks with no gaps”“columns where the cards don&#x27;t line up in rows”“the photo wall where images keep their own height”“cards that fill in under each other instead of in rows”
…you meant a masonry layout (pinterest grid).

## Anatomía — cada parte, nombrada
1. Packed columncolumns / grid track
“The cards stack straight down with nothing lining up sideways” — each column packs independently, which is the whole trick.

## Prompt para IA (paste-ready)
Build a masonry layout (Pinterest-style): native CSS first — @supports (grid-template-rows: masonry) { display: grid; grid-template-columns: repeat(3, 1 fr); grid-template-rows: masonry; } — with a CSS multi-column fallback (columns: 3; every card break-inside: avoid). Note the fallback orders items down each column, not across rows; if strict left-to-right order matters, use react-masonry-css instead. Reserve image aspect ratios so cards don't jump while loading.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my masonry layout (CSS columns fallback / grid-template-rows: masonry). Rule out: cards splitting across columns because break-inside: avoid is missing; item order reading down the first column when the design expects row-major; equal-height rows appearing because the browser lacks native masonry and there's no @supports fallback; the wall reshuffling as images load because width/height aren't reserved; margins on cards fighting the column-gap. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| CSS | columns | works everywhere today — but items flow DOWN each column, not across rows |
|-----|---------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| CSS | grid-template-rows: masonry | native (Grid Lanes): Safari 26; behind flags elsewhere in 2026 — pair with @supports |
| React | react-masonry-css | JS split into per-column stacks when row-major order matters |
| CSS | break-inside: avoid | stops cards splitting across columns in the fallback |

## Ver también
- [Bento Grid](https://namethatui.com/web/bento-grid) (web)
- [Lightbox](https://namethatui.com/web/lightbox) (web)
- [Card](https://namethatui.com/web/card) (web)
