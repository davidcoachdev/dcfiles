---
name: Bento Grid
platform: web
slug: bento-grid
tag: display: grid + grid-column: span 2
url: https://namethatui.com/web/bento-grid
source: NameThatUI (namethatui.com)
also_called: bento box layout, feature grid, dashboard grid
---

# Bento Grid

> Demo interactivo: https://namethatui.com/web/bento-grid

**Plataforma:** web · **Tag/API:** `display: grid + grid-column: span 2` · **También llamado:** bento box layout, feature grid, dashboard grid

## Descripción
“Several boxes in a grid — bento” is a bento grid: one CSS grid where tiles span different numbers of cells, so a hero tile sits among small ones like compartments in a Japanese lunchbox. Apple's marketing pages made the style famous. The tell versus a plain card grid is the spanning: at least one tile takes 2×2 or 2×1 cells while everything stays aligned to the same tracks and gap.

## Si lo llamaste…
“several boxes in a grid bento”“boxes of different sizes in a grid”“the grid with one big box and smaller boxes around it”“the apple style feature grid with rounded cards”“dashboard made of different sized tiles”
…you meant a bento grid.

## Anatomía — cada parte, nombrada
1. Spanning tilegrid-column: span 2
“The one big box among the small ones” is a spanning tile — a normal grid item told to take two columns and/or two rows.
2. Gap (gutter)gap
“The even spacing between all the boxes” is the grid's gap — one value, never per-tile margins, which is why a bento looks machine-packed.

## Prompt para IA (paste-ready)
Build a bento grid: one CSS grid (display: grid; grid-template-columns: repeat(4, 1 fr); one consistent gap) where feature tiles span multiple cells via grid-column: span 2 / grid-row: span 2, every tile shares the same corner radius and an opaque background, and the whole composition reads as a single rounded box of differently sized compartments.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my bento grid (CSS grid with spanning tiles). Rule out: holes in the grid because a span exceeds the remaining columns in its row (consider grid-auto-flow: dense, noting it reorders visually vs DOM); uneven gutters from per-tile margins instead of the grid's single gap; tiles with different corner radii or translucent backgrounds breaking the lunchbox look; the hero tile collapsing on small screens because the span isn't reduced under a media query. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| CSS | display: grid + grid-column: span 2 | spanning cells are what make a grid a bento |
|-----|-------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| CSS | grid-template-columns: repeat(4, 1 fr) | the fixed track skeleton the spans play against |
| CSS | grid-template-areas | name the tiles instead of counting spans |
| Tailwind | col-span-2 row-span-2 |  |

## Ver también
- [Masonry Layout (Pinterest Grid)](https://namethatui.com/web/masonry) (web)
- [Drag & Drop](https://namethatui.com/web/drag-and-drop) (web)
- [Card](https://namethatui.com/web/card) (web)
