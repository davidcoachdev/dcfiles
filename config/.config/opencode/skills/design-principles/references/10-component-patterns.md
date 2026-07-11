# Component Patterns

Spacing scale, depth strategy, surface scale, and component consistency rules.

## Spacing Scale

Use 4px base:

```
4px   - Tight elements
8px   - Related elements
12px  - Component internal
16px  - Card padding
24px  - Section gaps
32px  - Major sections
```

## Depth Strategy: Borders-Only

Clean, technical depth without shadows:

```css
.card {
  border: 0.5px solid rgba(255,255,255,0.06);
  background: #1a1a1a;
}
```

## Surface Scale (Dark)

| Level | Background | Use |
|-------|------------|-----|
| Base | #0f0f0f | Page background |
| Subtle | #1a1a1a | Cards |
| Elevated | #242424 | Hover states |
| Active | #2d2d2d | Active/pressed |

## Color Tokens

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

## Component Consistency

| Component | Rule |
|-----------|------|
| **Buttons** | Fixed height (36px), consistent padding |
| **Inputs** | Same height as buttons, clear focus |
| **Cards** | Consistent padding (16px), border-radius (8px) |
| **Spacing** | Never random — use scale |

## Sources

- [Interface Design — Design Engineering Patterns](https://github.com/gentleman-programming/opencode-skills)
