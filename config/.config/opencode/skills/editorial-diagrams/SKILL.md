---
name: editorial-diagrams
description: >
  Create editorial-quality diagrams as self-contained HTML+SVG. 13 types:
  architecture, flowchart, sequence, state, ER, timeline, swimlane, quadrant,
  nested, tree, layers, venn, pyramid. Trigger: when user asks for diagrams,
  visuals, or to draw something.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

# Editorial Diagrams

Create visual diagrams as self-contained HTML files with inline SVG + CSS, following an opinionated editorial design system.

## When to Use

- User asks for: "diagram", "draw", "visual", "architecture", "flowchart", "make a chart"
- Documentation needs visual representation
- Blog post requires editorial-quality illustration

**Don't use for:**
- Quick ASCII/unicode diagrams → just write them directly
- Lists → use tables or bullets
- One-shape "diagrams" → write the sentence instead

## Philosophy

**The highest-quality move is usually deletion.**

- Every node represents a distinct idea
- Every arrow carries information
- One accent color, max 2 focal elements
- Target density: 4/10 — enough to be complete, not so dense it needs a guide

## First-Time Setup — Style Guide Gate

On first diagram in a new project, verify the style guide:

1. Check `references/style-guide.md`
2. If still using defaults (paper `#faf7f2`, ink `#1c1917`, accent `#b5523a`), ask user:

> *"Primera diagrama en este proyecto. El style guide tiene los defaults. Querés personalizarlo? Opciones: (a) onboarding —extraigo colores de tu web, (b) tokens manuales, (c) proceed con defaults."*

## Diagram Types

| Showing... | Use | Reference |
|---|---|---|
| Components + connections | Architecture | type-architecture.md |
| Decision logic | Flowchart | type-flowchart.md |
| Time-ordered messages | Sequence | type-sequence.md |
| States + transitions | State machine | type-state.md |
| Entities + fields | ER / data model | type-er.md |
| Events in time | Timeline | type-timeline.md |
| Cross-functional process | Swimlane | type-swimlane.md |
| Two-axis positioning | Quadrant | type-quadrant.md |
| Hierarchy by containment | Nested | type-nested.md |
| Parent → children | Tree | type-tree.md |
| Stacked abstractions | Layers | type-layers.md |
| Set overlap | Venn | type-venn.md |
| Ranked hierarchy | Pyramid | type-pyramid.md |

**Always load the relevant `references/type-*.md` before generating.**

## Design System

### Semantic Tokens (in style-guide.md)

| Role | Purpose | Default |
|---|---|---|
| `paper` | Page bg | `#faf7f2` |
| `paper-2` | Container bg | `#f2ede4` |
| `ink` | Primary text/stroke | `#1c1917` |
| `muted` | Secondary text | `#57534e` |
| `accent` | Focal (1-2 max) | `#b5523a` |
| `link` | API/external | `#2563eb` |

### Typography

- **Title**: Instrument Serif, 1.75rem
- **Node name**: Geist Sans, 12px, 600
- **Sublabel**: Geist Mono, 9px
- **Arrow label**: Geist Mono, 8px

### Grid Rule

**All values divisible by 4.** Coordinates, widths, heights, gaps. Non-negotiable.

## Anti-Patterns

| Anti-pattern | Why |
|---|---|
| Cyan/purple glow on dark | Looks "technical" without design |
| JetBrains Mono everywhere | Mono is for technical content only |
| Identical boxes | Erases hierarchy |
| Shadow on elements | Out. Borders are in. |
| Coral on every "important" node | Accent = 1-2 focal elements max |

## Complexity Budget

| Type | Max |
|---|---|
| Nodes | 9 |
| Arrows | 12 |
| Accent elements | 2 |
| Lifelines (sequence) | 5 |
| Lanes (swimlane) | 5 |

If exceeded → split into 2 diagrams.

## Pre-Output Checklist

- [ ] Right type selected?
- [ ] Would table/paragraph work better?
- [ ] Coral ≤2 elements?
- [ ] All coords divisible by 4?
- [ ] Arrows before boxes (z-order)?
- [ ] Arrow labels have opaque mask behind?

## Output

Always produce:
- Single `.html` file
- Embedded CSS (no external except Google Fonts)
- Inline SVG (no external images)
- No JavaScript required

## Quick Commands

```bash
# Browse gallery
open ~/.config/opencode/skills/editorial-diagrams/assets/index.html
```

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]