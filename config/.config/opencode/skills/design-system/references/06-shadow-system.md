# Shadow System

Elevation system for depth and hierarchy.

## Scale

| Token | Value | Usage |
|-------|-------|-------|
| shadow-sm | 0 1px 2px rgba(0,0,0,0.05) | Subtle elevation (cards) |
| shadow-md | 0 4px 6px rgba(0,0,0,0.1) | Default elevation (dropdowns) |
| shadow-lg | 0 10px 15px rgba(0,0,0,0.1) | High elevation (modals) |
| shadow-xl | 0 20px 25px rgba(0,0,0,0.15) | Maximum elevation (popovers) |

## Implementation

### As CSS Custom Properties

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.15);
}
```

### Usage

```css
.card {
  box-shadow: var(--shadow-sm);
}

.dropdown {
  box-shadow: var(--shadow-md);
}

.modal {
  box-shadow: var(--shadow-lg);
}

.popover {
  box-shadow: var(--shadow-xl);
}
```

## Anti-Patterns

- ❌ Dramatic shadows (0 24px 60px) — see `ui-aesthetics` anti-AI rules
- ❌ Shadows used purely for decoration — use borders for technical/precise aesthetics
- ❌ Mixing shadow styles randomly — use the scale consistently

## When to Use Borders Instead

For precision/density design directions (see `design-principles` ref `08-design-directions`), prefer borders over shadows:

```css
.card {
  border: 0.5px solid rgba(255,255,255,0.06);
  /* no box-shadow */
}
```

## Sources

- [UX Architect — Shadow System](https://github.com/gentleman-programming/opencode-skills)
