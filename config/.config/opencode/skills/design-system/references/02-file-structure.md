# Token File Structure

## Recommended Structure

```
tokens/
├── global.css      # Raw values (colors, spacing, typography, shadows)
├── alias.css       # Semantic mappings (primary, secondary, danger, etc.)
├── component.css   # Component-specific overrides
└── themes/
    ├── light.css   # Light mode alias overrides
    └── dark.css    # Dark mode alias overrides
```

## File Contents

### `global.css`

Raw, unsemantic values. Never used directly in components.

```css
:root {
  /* Colors */
  --color-blue-50: #eff6ff;
  --color-blue-500: #3b82f6;
  --color-blue-900: #1e3a5f;

  /* Spacing */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-4: 1rem;     /* 16px */
  --space-8: 2rem;     /* 32px */

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
}
```

### `alias.css`

Semantic mappings that give meaning to raw values.

```css
:root {
  --color-primary: var(--color-blue-500);
  --color-danger: var(--color-red-500);
  --color-text: var(--color-gray-900);
  --color-bg: var(--color-white);

  --space-sm: var(--space-2);
  --space-md: var(--space-4);
  --space-lg: var(--space-8);
}
```

### `themes/dark.css`

Override aliases only — keep global and component tokens unchanged.

```css
[data-theme="dark"] {
  --color-primary: var(--color-blue-400);
  --color-text: var(--color-gray-100);
  --color-bg: var(--color-gray-900);
}
```

### `component.css`

Components reference aliases, never globals.

```css
.btn-primary {
  background: var(--color-primary);
  color: var(--color-white);
  padding: var(--space-sm) var(--space-md);
}
```

## Sources

- [UX Architect — File Structure](https://github.com/gentleman-programming/opencode-skills)
