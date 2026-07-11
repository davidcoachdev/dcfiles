# Typography Scale

Consistent type scale with size, weight, line height, and usage.

## Scale

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| text-xs | 12px | 400 | 1.33 | Captions, badges |
| text-sm | 14px | 400 | 1.43 | Body small, helper text |
| text-base | 16px | 400 | 1.5 | Body text |
| text-lg | 18px | 500 | 1.33 | Subheadings |
| text-xl | 20px | 600 | 1.4 | H4 |
| text-2xl | 24px | 600 | 1.33 | H3 |
| text-3xl | 30px | 700 | 1.2 | H2 |
| text-4xl | 36px | 800 | 1.1 | H1 |

## Implementation

### As CSS Custom Properties

```css
:root {
  /* Font sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */

  /* Line heights */
  --leading-tight: 1.1;
  --leading-normal: 1.33;
  --leading-relaxed: 1.5;

  /* Font weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
}
```

## Typography Principles

1. Use **regular and bold only** for body text
2. Reserve extreme weights for large headings
3. Use **sentence case** — avoid ALL CAPS
4. Use **dark grey** instead of pure black (#000000)
5. Use **left alignment** for body text
6. Use **line height ≥1.5** for body text

## Sources

- [UX Architect — Typography Scale](https://github.com/gentleman-programming/opencode-skills)
- [Adham Dannaway - Typography Tips](https://adhamdannaway.com/blog/ui-design/16-ui-design-tips)
