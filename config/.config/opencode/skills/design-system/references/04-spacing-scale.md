# Spacing Scale

Consistent 4px base spacing system.

## Scale

| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 4px | Icon gaps, tight spacing |
| space-2 | 8px | Inline padding, small gaps |
| space-3 | 12px | Standard gaps |
| space-4 | 16px | Card padding, section gaps |
| space-6 | 24px | Component separation |
| space-8 | 32px | Section separation |
| space-12 | 48px | Major sections |
| space-16 | 64px | Page sections |

## Implementation

### As CSS Custom Properties

```css
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
}
```

### As Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    spacing: {
      0: '0',
      1: '0.25rem',  // 4px
      2: '0.5rem',   // 8px
      3: '0.75rem',  // 12px
      4: '1rem',     // 16px
      6: '1.5rem',   // 24px
      8: '2rem',     // 32px
      12: '3rem',    // 48px
      16: '4rem',    // 64px
    }
  }
}
```

## Anti-Patterns

- ❌ Random spacing values (13px, 17px, 22px)
- ❌ Mixing spacing systems in same component
- ❌ Using pixels instead of rems in CSS custom properties
- ❌ Skipping scale values (e.g., 4px → 16px with nothing between)

## Sources

- [UX Architect — Spacing Scale](https://github.com/gentleman-programming/opencode-skills)
