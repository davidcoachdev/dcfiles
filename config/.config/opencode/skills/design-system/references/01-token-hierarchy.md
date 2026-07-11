# Token Hierarchy (3 Levels)

## The Three Layers

### 1. GLOBAL TOKENS — Raw values, never used directly in components

```css
--color-blue-500: #3b82f6;
--space-4: 1rem;
```

### 2. ALIAS TOKENS — Semantic purpose, the layer you USE

```css
--color-primary: var(--color-blue-500);
--space-gap: var(--space-4);
```

### 3. COMPONENT TOKENS — Specific to a component

```css
--button-bg: var(--color-primary);
--button-padding: var(--space-gap);
```

## Why This Matters

- Change `--color-primary` once → entire theme updates
- Dark mode: swap alias tokens, not every component
- Brand theme: override alias tokens, keep component tokens

## How It Works in Practice

```css
/* Global — raw values */
:root {
  --color-blue-500: #3b82f6;
  --color-red-500: #ef4444;
}

/* Alias — semantic meaning */
[data-theme="light"] {
  --color-primary: var(--color-blue-500);
  --color-danger: var(--color-red-500);
}

[data-theme="dark"] {
  --color-primary: var(--color-blue-400);
  --color-danger: var(--color-red-400);
}

/* Component — uses aliases, never globals */
.button {
  background: var(--color-primary);
}
```

## Sources

- [UX Architect — Token Hierarchy](https://github.com/gentleman-programming/opencode-skills)
