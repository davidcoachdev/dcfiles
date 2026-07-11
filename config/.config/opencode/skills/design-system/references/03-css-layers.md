# CSS Architecture Patterns

## Utility-First (Recommended: Tailwind)

```css
/* Tailwind's approach: compose utilities, don't write custom CSS */
<button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
  Click me
</button>

/* Extract to component when repeated */
.btn-primary {
  @apply px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark;
}
```

## CSS Custom Properties at Scale

Use CSS layers for clean separation of concerns.

```css
/* Base layer: reset + tokens */
@layer base {
  :root { /* global tokens */ }
  [data-theme="dark"] { /* dark overrides */ }
}

/* Component layer */
@layer components {
  .card { /* structural styles */ }
}

/* Utility layer: overrides */
@layer utilities {
  .gap-4 { gap: var(--space-4); }
}
```

## BEM When Needed (Legacy Projects)

For projects that don't use utility classes or CSS-in-JS.

```css
/* Block */
.card {}

/* Element */
.card__header {}
.card__body {}
.card__footer {}

/* Modifier */
.card--featured {}
.card__header--compact {}
```

## Architecture Decision Guide

| Context | Approach | Why |
|---------|----------|-----|
| New project, Tailwind available | Utility-first + @apply | Fastest iteration, no custom CSS |
| New project, no Tailwind | CSS Custom Properties + @layer | Clean separation, easy theming |
| Legacy project | BEM | Predictable, low migration cost |
| Design system library | CSS Custom Properties + compound components | Maximum flexibility |

## Sources

- [UX Architect — CSS Architecture](https://github.com/gentleman-programming/opencode-skills)
