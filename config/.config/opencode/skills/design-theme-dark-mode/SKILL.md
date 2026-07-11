# Design Theme: Dark Mode

Patrones y buenas prácticas para implementar dark mode en cualquier proyecto.

## Profile

- **Vibe**: Confiable, accesible, profesional
- **Uso**: Cualquier app que ofrezca toggle light/dark
- **Inspiración**: Tailwind dark mode, sistema de GitHub

## Color Palette (Dark)

```css
:root {
  --bg-surface: #ffffff;
  --bg-surface-hover: #f5f5f5;
  --text-primary: #18181b;
  --text-secondary: #52525b;
  --border: #e4e4e7;
}
.dark {
  --bg-surface: #18181b;
  --bg-surface-hover: #27272a;
  --text-primary: #fafafa;
  --text-secondary: #a1a1aa;
  --border: #3f3f46;
}
```

## Key Characteristics

- **Surface elevada** en dark (no fondo absoluto negro)
- **Bordes más visibles** en dark que en light
- **Mantener mismo accent** en ambos modos
- **Saturar menos** colores en dark (evitar fatiga visual)
- **Sombras** se convierten en "glow" en dark

## When to Use

- Apps con lectura prolongada
- Productos con toggle dark/light
- Sistemas de diseño que escalan
- Developer tools

## Cuando NO

- Proyectos dark-first sin light mode
- Sitios content-light (pocas visitas)

## Implementation (CSS Custom Properties)

```css
/* tokens.css */
:root {
  --color-bg: var(--color-bg-light);
  --color-text: var(--color-text-light);
}
[data-theme="dark"] {
  --color-bg: var(--color-bg-dark);
  --color-text: var(--color-text-dark);
}

/* Usar 3 niveles de surface */
--surface-1: light/dark;
--surface-2: light/dark;
--surface-3: light/dark;

/* Opacity-based approach */
--text-primary: light/dark;
--text-secondary: con opacidad sobre bg;
--text-tertiary: con opacidad menor;
```

## Implementation (Tailwind)

```html
<div class="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
```

```js
// tailwind.config.js
darkMode: 'class',
// o 'media' para respetar preferencia del OS
```

## Toggle Button

```html
<button id="theme-toggle" aria-label="Toggle theme">
  <svg class="sun-icon" ...></svg>
  <svg class="moon-icon dark:hidden" ...></svg>
</button>
```

```js
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme',
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );
});
// Inicializar
if (localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
}
```

## Surface Elevation (Dark)

```css
/* Niveles de elevación en dark */
.elevation-0 { background: #0a0a0b; }  /* page bg */
.elevation-1 { background: #18181b; }  /* cards, dropdowns */
.elevation-2 { background: #27272a; }  /* modals, sidebars */
.elevation-3 { background: #3f3f46; }  /* tooltips, popovers */
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| Usar 3 niveles de surface | Usar `#000` puro |
| Reducir saturación en dark | Mantener colores idénticos |
| Probar contraste 4.5:1 | Asumir que "se ve bien" |
| Animar transición suave | Cambio instantáneo sin transición |
