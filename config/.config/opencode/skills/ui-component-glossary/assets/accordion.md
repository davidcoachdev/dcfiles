---
name: Accordion (Disclosure)
platform: web
slug: accordion
tag: <details>
url: https://namethatui.com/web/accordion
source: NameThatUI (namethatui.com)
also_called: disclosure, expandable sections, collapse, expander
---

# Accordion (Disclosure)

> Demo interactivo: https://namethatui.com/web/accordion

**Plataforma:** web · **Tag/API:** `<details>` · **También llamado:** disclosure, expandable sections, collapse, expander

## Descripción
An accordion is a vertical stack of headings that disclose or hide associated content. Opening a section expands it in place and moves the sections below, with either one or several panels allowed open depending on the pattern. Native `details` and `summary` elements provide the basic disclosure semantics.

## Si lo llamaste…
- "it has a plus icon when collapsed and minus icon when expanded"
- "the list where rows open to show more"
- "expand and collapse sections"
- "the faq with clickable questions"
- "stacked panels with little chevrons"
- "the section that pushes content down when opened"

…querías decir un **accordion (disclosure)**.

## Anatomía — cada parte, nombrada
1. **Disclosure trigger** — `<summary>`: "The FAQ question you click to open the answer".
2. **Disclosure indicator** — `<summary>::marker`: "The little chevron that turns when the row opens".
3. **Disclosure panel** — `<details>`: "The answer area that pushes everything down".

## Prompt para IA (paste-ready)
Build an Accordion from `details` and `summary` elements. Give grouped `details` elements the same name when only one section may be open, preserve native keyboard behavior, and animate the revealed panel without adding redundant `aria-expanded`; use `aria-expanded` only for a fully custom disclosure primitive.

### Debug prompt (cuando falla)
Debug my accordion (details/summary, Radix Accordion). Rule out: height auto refusing to animate — animate `grid-template-rows` `0fr` to `1fr` or use `interpolate-size`; single vs multiple type letting two panels open when one was intended; the default disclosure marker still rendering next to a custom icon; focus landing inside a closed panel because contents were hidden with opacity instead of display. The symptom:

## En el código (codebase)
| Framework | Nombre | Nota |
|-----------|--------|------|
| HTML | `details` | |
| HTML | `summary` | |
| HTML | `name` | groups details elements so only one is open |
| Radix | `Accordion` | |

## Ver también
- [Tabs](https://namethatui.com/web/tabs) (web)
- [Disclosure Triangle](https://namethatui.com/macos/disclosure-triangle) (macOS)
- [Sidebar (Source List)](https://namethatui.com/macos/sidebar) (macOS)
