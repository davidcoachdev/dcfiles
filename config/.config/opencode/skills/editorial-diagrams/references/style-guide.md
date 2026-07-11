# Style Guide

**Single source of truth for colors, typography, tokens.** Every diagram reads from here.

## Tokens

### Semantic Roles

| Role | Purpose | Default Light | Default Dark |
|---|---|---|---|
| `paper` | Page bg | `#faf7f2` | `#1c1917` |
| `paper-2` | Container bg | `#f2ede4` | `#292524` |
| `ink` | Primary text/stroke | `#1c1917` | `#faf7f2` |
| `muted` | Secondary text | `#57534e` | `#a8a29e` |
| `soft` | Sublabels | `#78716c` | `#8e8680` |
| `rule` | Hairline border | `rgba(28,25,23,0.12)` | `rgba(250,247,242,0.12)` |
| `accent` | Focal (1-2 max) | `#b5523a` | `#d6724a` |
| `accent-tint` | Accent fill | `rgba(181,82,58,0.08)` | `rgba(214,114,74,0.10)` |
| `link` | API/external | `#2563eb` | `#60a5fa` |

### Typography

| Role | Family | Size | Weight |
|---|---|---|---|
| `title` | Instrument Serif | 1.75rem | 400 |
| `node-name` | Geist Sans | 12px | 600 |
| `sublabel` | Geist Mono | 9px | 400 |
| `eyebrow` | Geist Mono | 7-8px | 500 |
| `arrow-label` | Geist Mono | 8px | 400 |

### Node Treatments

| Type | Fill | Stroke |
|---|---|---|
| `focal` (1-2 max) | `accent-tint` | `accent` |
| `backend` | white | `ink` |
| `store` | `ink@0.05` | `muted` |
| `external` | `ink@0.03` | `ink@0.30` |
| `input` | `muted@0.10` | `soft` |
| `optional` | `ink@0.02` | `ink@0.20` dashed |
| `security` | `accent@0.05` | `accent@0.50` dashed |

## Grid Rule

**All values divisible by 4.** Coordinates, widths, heights, gaps, padding.

## Customizing

1. Edit hex values directly
2. Run onboarding (see `onboarding.md`)
3. Verify contrast: ink on paper must be WCAG AA

## Font Stack

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

**Never use JetBrains Mono as blanket dev font.** Mono = technical (ports, URLs, field types). Names = Geist sans.