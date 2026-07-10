---
name: theme-toggle-view-transitions
description: "Trigger: theme toggle, dark mode, light mode, theme switch, view transitions theme, theme transition effect, animated theme. Implement animated dark/light mode switching using the View Transitions API with SVG masks, clip-paths, and GIF reveals. Native browser API — zero dependencies."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
  reference: "https://theme-toggle.rdsx.dev"
  repo: "https://github.com/rudrodip/theme-toggle-effect"
---

## Core Pattern

Two lines of JS. The entire library.

```js
if (!document.startViewTransition) switchTheme()
document.startViewTransition(switchTheme)
```

- `switchTheme()` toggles a class (e.g. `.dark`) on `<html>` and persists the preference (localStorage, cookie, etc.)
- `document.startViewTransition()` wraps the DOM mutation and captures before/after snapshots
- **Fallback**: if View Transitions API is unsupported, theme still switches — just without animation

## CSS Architecture

Hook into `::view-transition-new(root)` and `::view-transition-old(root)` pseudo-elements:

```css
/* Kill old snapshot instantly — we only animate the new one in */
::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}

/* Animate new snapshot with a mask that grows */
::view-transition-new(root) {
  mask: url('data:image/svg+xml,...') center / 0 no-repeat;
  animation: scale 1s;
  animation-fill-mode: both;
}

::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}

@keyframes scale {
  to { mask-size: 200vmax; }
}
```

## Animation Recipes

### Circle reveal (cleanest)

```css
::view-transition-new(root) {
  mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="white"/></svg>') center / 0 no-repeat;
  animation: scale 1s;
}
```

### Circle with blur (softer edge)

```css
::view-transition-new(root) {
  mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="b"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="20" cy="20" r="18" fill="white" filter="url(%23b)"/></svg>') center / 0 no-repeat;
  animation: scale 1s;
}
```

### Origin-offset (pivot to corner)

Change `cx/cy`, `mask-position`, and `transform-origin`:

```css
::view-transition-new(root) {
  mask: url('...circle cx="0" cy="0"...') top left / 0 no-repeat;
  mask-origin: content-box;
  transform-origin: top left;
}
@keyframes scale {
  to { mask-size: 350vmax; }
}
```

### Clip-path reveal (polygon)

```css
::view-transition-new(root) { animation-name: reveal-light; }
.dark::view-transition-new(root) { animation-name: reveal-dark; }

@keyframes reveal-dark {
  from { clip-path: polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%); }
  to   { clip-path: polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%); }
}

@keyframes reveal-light {
  from { clip-path: polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%); }
  to   { clip-path: polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%); }
}
```

### Custom SVG asset (gradients, complex shapes)

Put SVG in `assets/custom-svg.svg` and reference it:

```css
::view-transition-new(root) {
  mask: url('assets/custom-svg.svg') top left / 0 no-repeat;
  animation: scale 1.5s;
}
```

### GIF mask (novelty)

```css
::view-transition-new(root) {
  mask: url('https://media.tenor.com/cyORI7kwShQAAAAi/shigure-ui-dance.gif') center / 0 no-repeat;
  animation: scale 3s;
}
```

## Easing Functions

Use `linear()` for premium feel — matches what `expo.out` / `expo.in` produce but via native CSS:

```css
:root {
  --expo-out: linear(
    0 0%, 0.1684 2.66%, 0.3165 5.49%,
    0.446 8.52%, 0.5581 11.78%,
    0.6535 15.29%, 0.7341 19.11%,
    0.8011 23.3%, 0.8557 27.93%,
    0.8962 32.68%, 0.9283 38.01%,
    0.9529 44.08%, 0.9711 51.14%,
    0.9833 59.06%, 0.9915 68.74%, 1 100%
  );
  --expo-in: linear(
    0 0%, 0.0085 31.26%, 0.0167 40.94%,
    0.0289 48.86%, 0.0471 55.92%,
    0.0717 61.99%, 0.1038 67.32%,
    0.1443 72.07%, 0.1989 76.7%,
    0.2659 80.89%, 0.3465 84.71%,
    0.4419 88.22%, 0.554 91.48%,
    0.6835 94.51%, 0.8316 97.34%, 1 100%
  );
}
```

## Decision Gates

| You want... | Use... |
|---|---|
| Clean reveal from center | Circle SVG mask (no blur) |
| Soft, organic feel | Circle SVG mask with `<feGaussianBlur>` |
| Reveal from a corner/button origin | Circle mask + offset `cx/cy` + `mask-position` |
| Sharp geometric transition | Clip-path polygon |
| Gradient or multi-color mask | Custom SVG file in `assets/` |
| Playful / novelty effect | GIF as mask |

## Framework Integration

### React

```tsx
function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const switchTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])

  const handleToggle = useCallback(() => {
    const t = theme === 'light' ? 'dark' : 'light'
    if (!document.startViewTransition) {
      setTheme(t)
      return
    }
    document.startViewTransition(() => setTheme(t))
  }, [theme])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return <button onClick={handleToggle}>Toggle {theme}</button>
}
```

> ⚠️ `document.startViewTransition()` wraps the state update — React batches the re-render inside the transition, so the snapshot is captured before the DOM changes.

### Vue

```vue
<script setup>
import { ref, watch } from 'vue'

const theme = ref('light')

function toggle() {
  const next = theme.value === 'light' ? 'dark' : 'light'
  if (!document.startViewTransition) {
    theme.value = next
    return
  }
  document.startViewTransition(() => { theme.value = next })
}

watch(theme, (val) => {
  document.documentElement.classList.toggle('dark', val === 'dark')
})
</script>
```

## Browser Support

| Browser | Status |
|---|---|
| Chrome 111+ | ✅ Full support |
| Edge 111+ | ✅ Full support |
| Opera 97+ | ✅ Full support |
| Safari 18.2+ | ⚠️ Behind flag (`ViewTransitions`) |
| Firefox | ❌ Not supported |

**Fallback strategy**: the `if (!document.startViewTransition) switchTheme()` guard ensures the theme still toggles — just without animation. This is acceptable degradation.

## Critical Rules

- `startViewTransition()` MUST wrap the DOM mutation synchronously — the callback is called synchronously, the snapshot is captured, then the callback runs. Do NOT call it with an async function.
- SVG data URIs in masks need `%23` instead of `#` in filters (URL encoding).
- GIF masks may stutter on first playback — they need to load before they animate.
- `mask-origin` and `transform-origin` must match the `mask-position` when offsetting origin.
- Test on actual devices — emulators don't always reproduce the transition.
