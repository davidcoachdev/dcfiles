---
name: ui-anti-ai
description: "Trigger: When generating any frontend UI code - enforces Linear/Raycast/Stripe aesthetic. Prevents generic AI UI patterns: no floating cards, gradient-heavy dashboards, glassmorphism."

---

> **Absorbed:** `ui-aesthetics` (aesthetic direction routing + industry styles)
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Generating HTML, CSS, React, Vue, Svelte UI
- Building dashboards, landing pages, admin panels
- Any frontend code that might exhibit "AI-generated" aesthetic

## Critical Patterns

### The Problem: "AI UI" Bad Habits

AI generation produces recognizable bad patterns:
- Floating glass panels
- Oversized rounded corners (20-32px)
- Gradient-heavy dashboards
- Decorative "eyebrow" labels
- Decorative copy explaining the UI
- Dramatic shadows
- Transform animations on hover

### The Solution: Uncodixify

Think **Linear**, **Raycast**, **Stripe**, **GitHub**. They don't try to grab attention. They just work.

## Hard No Rules

### Bans

- ❌ No oversized rounded corners (max 12px)
- ❌ No pill button overload
- ❌ No glassmorphism/floating shells
- ❌ No soft corporate gradients
- ❌ No dark SaaS with blue-black gradients
- ❌ No decorative sidebar blobs
- ❌ No control room "cosplay"
- ❌ No sticky left rail unless needed
- ❌ No metric-card grid as first instinct
- ❌ No fake charts to fill space
- ❌ No glows, blur, frosted panels
- ❌ No "hero section" inside dashboards
- ❌ No overpadded layouts
- ❌ No mobile collapse to beige sandwich
- ❌ No ornamental labels like "Live Pulse"

### Specifically Banned Patterns

- Border radius 20-32px → USE 12px max
- Floating detached sidebar with rounded outer shell
- Sidebar 280px with brand block on top → USE 248px
- Donut chart with hand-wavy percentages
- UI cards using glows for hierarchy
- Mixed alignment (left + center blocks)
- "Premium dark mode" = blue-black gradients + cyan
- Eyebrow labels (uppercase with letter-spacing)
- Decorative copy like "Operational clarity..."
- Transform animations on hover (translateX)
- Dramatic shadows (0 24px 60px)
- Status dots with ::before pseudo-elements
- Tables with tag badges everywhere
- Nav badges showing "Live" status
- KPI cards in 3-column grid as default
- Multiple nested panel types

## Keep It Normal (Uncodexy-UI Standard)

| Element | Normal | AI Bad |
|---------|--------|--------|
| **Sidebars** | 240-260px fixed, solid bg, simple border-right | Floating glass shells, rounded outer |
| **Headers** | Simple text, h1/h2 hierarchy | Eyebrow labels, uppercase |
| **Sections** | Standard padding 20-30px | Hero blocks in dashboards |
| **Buttons** | Solid fills, 8-10px radius, no pill | Gradient backgrounds |
| **Cards** | 8-12px radius, subtle borders, no floating | Glows, dramatic shadows |
| **Forms** | Clear labels above, standard inputs | Fancy floating labels |
| **Inputs** | Solid borders, simple focus ring | Animated underlines |
| **Modals** | Centered, simple backdrop | Slide-in animations |
| **Badges** | 6-8px radius, simple | Glow effects |
| **Avatars** | Circle/rounded square | Decorative status rings |
| **Typography** | System fonts, clear hierarchy | Mixed serif/sans shortcuts |
| **Shadows** | Subtle 0 2px 8px max | Dramatic drop shadows |
| **Transitions** | 100-200ms simple | Bouncy, transform effects |
| **Layouts** | Standard grid/flex | Creative asymmetry |

## Color Schemes (Follow Priority)

### Priority Order

1. **Use existing project colors** if provided
2. **Pick from predefined palettes** below (choose randomly)
3. **NEVER invent random colors**

### Dark Palettes

| Name | Background | Surface | Primary | Secondary | Accent | Text |
|------|------------|---------|---------|----------|--------|------|
| Midnight Canvas | #0a0e27 | #151b3d | #6c8eff | #a78bfa | #f472b6 | #e2e8f0 |
| Obsidian Depth | #0f0f0f | #1a1a1a | #00d4aa | #00a3cc | #ff6b9d | #f5f5f5 |
| Slate Noir | #0f172a | #1e293b | #38bdf8 | #818cf8 | #fb923c | #f1f5f9 |
| Carbon Elegance | #121212 | #1e1e1e | #bb86fc | #03dac6 | #cf6679 | #e1e1e1 |
| Void Space | #0d1117 | #161b22 | #58a6ff | #79c0ff | #f78166 | #c9d1d9 |

### Light Palettes

| Name | Background | Surface | Primary | Secondary | Accent | Text |
|------|------------|---------|---------|----------|--------|------|
| Cloud Canvas | #fafafa | #ffffff | #2563eb | #7c3aed | #dc2626 | #0f172a |
| Pearl Minimal | #f8f9fa | #ffffff | #0066cc | #6610f2 | #ff6b35 | #212529 |
| Ivory Studio | #f5f5f4 | #fafaf9 | #0891b2 | #06b6d4 | #f59e0b | #1c1917 |
| Porcelain Clean | #f9fafb | #ffffff | #4f46e5 | #8b5cf6 | #ec4899 | #111827 |
| Frost Bright | #f1f5f9 | #f8fafc | #0f766e | #14b8a6 | #e11d48 | #0f172a |

## Rule

**If a UI choice feels like a default AI move, ban it and pick the harder, cleaner option.**

- Colors should stay calm, not fight
- Follow existing project palette first
- If no palette, choose randomly from predefined
- Do NOT generate random color combinations

## Commands

```bash
# No install needed - just follow rules when coding

# Before generating UI, verify:
# - No rounded corners > 12px
# - No glassmorphism effects
# - No decorative labels
# - No hero sections in dashboards
# - Follow color palette priority
```

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]