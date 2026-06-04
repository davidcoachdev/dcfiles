---
name: interface-design
description: >
  Design engineering patterns for consistent UI: craft, memory, and systematic consistency.
  Trigger: When building dashboards, apps, tools, admin panels - not marketing sites.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Building dashboards, admin panels, SaaS tools
- Creating consistent UI components
- Need systematic spacing/depth/color decisions
- Want design decisions remembered across sessions

## Core Principle

**Decisions compound.** A spacing value chosen once becomes a pattern. A depth strategy becomes an identity. Consistency beats perfection.

## Design Directions

### 1. Precision & Density

- **Feel**: Tight, technical, monochrome
- **Use**: Developer tools, admin dashboards
- **Depth**: Borders-only
- **Surfaces**: Minimal elevation shifts

### 2. Warmth & Approachability

- **Feel**: Generous spacing, soft shadows
- **Use**: Collaborative tools, consumer apps
- **Depth**: Subtle shadows
- **Surfaces**: Soft elevation

### 3. Sophistication & Trust

- **Feel**: Cool tones, layered depth
- **Use**: Finance, enterprise B2B
- **Depth**: Layered surfaces
- **Surfaces**: Multi-level elevation

### 4. Boldness & Clarity

- **Feel**: High contrast, dramatic space
- **Use**: Modern dashboards, data-heavy apps
- **Depth**: Strong borders + shadows
- **Surfaces**: Clear hierarchy

### 5. Utility & Function

- **Feel**: Muted, functional density
- **Use**: GitHub-style tools
- **Depth**: Minimal
- **Surfaces**: Flat with borders

### 6. Data & Analysis

- **Feel**: Chart-optimized, numbers-first
- **Use**: Analytics, BI tools
- **Depth**: Dense information
- **Surfaces**: Compact

## System File

Create `.interface-design/system.md` to persist decisions:

```markdown
# Design System

## Direction
Personality: Precision & Density
Foundation: Cool (slate)
Depth: Borders-only

## Tokens
### Spacing
Base: 4px
Scale: 4, 8, 12, 16, 24, 32

### Colors
--foreground: slate-900
--secondary: slate-600
--accent: blue-600

## Patterns
### Button Primary
- Height: 36px
- Padding: 12px 16px
- Radius: 6px
- Usage: Primary actions

### Card Default
- Border: 0.5px solid
- Padding: 16px
- Radius: 8px
```

## Critical Patterns

### Depth Strategy: Borders-Only

```css
/* Clean, technical depth */
.card {
  border: 0.5px solid rgba(255,255,255,0.06);
  background: #1a1a1a;
}
```

### Surface Scale (Dark)

| Level | Background | Use |
|-------|------------|-----|
| Base | #0f0f0f | Page background |
| Subtle | #1a1a1a | Cards |
| Elevated | #242424 | Hover states |
| Active | #2d2d2d | Active/pressed |

### Spacing Scale

Use 4px base:

```
4px   - Tight elements
8px   - Related elements
12px  - Component internal
16px  - Card padding
24px  - Section gaps
32px  - Major sections
```

### Color Tokens

```css
/* Always define semantic roles */
--foreground: slate-900;
--foreground-muted: slate-600;
--background: white;
--background-subtle: slate-50;
--accent: blue-600;
--accent-muted: blue-50;
--border: slate-200;
--border-subtle: rgba(0,0,0,0.05);
```

### Component Consistency

| Component | Rule |
|-----------|------|
| **Buttons** | Fixed height (36px), consistent padding |
| **Inputs** | Same height as buttons, clear focus |
| **Cards** | Consistent padding (16px), border-radius (8px) |
| **Spacing** | Never random - use scale |

## Anti-Patterns

- ❌ Random spacing (14px, 17px, 22px...)
- ❌ Button heights drifting (36px, 38px, 40px...)
- ❌ Inconsistent border-radius
- ❌ No depth strategy
- ❌ Mixing surface treatments

## Workflow

### New Project

1. Determine design direction from context
2. State direction choices before building
3. Apply consistent spacing/depth/colors
4. Offer to save system.md

### Existing System

1. Load .interface-design/system.md
2. Use established patterns
3. Maintain consistency
4. Add new patterns as needed

## Commands

```bash
# Create system file directory
mkdir -p .interface-design

# Save system
# (manual - write to .interface-design/system.md)
```

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]