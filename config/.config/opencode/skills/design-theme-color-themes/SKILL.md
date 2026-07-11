# Design Theme: Color Themes

Sistema de múltiples temas de color intercambiables.

## Profile

- **Vibe**: Flexible, sistemático, reusable
- **Uso**: Apps multi-tema, customizables por usuario
- **Inspiración**: VS Code themes, Dracula, Nord, Catppuccin

## Color Themes

```css
/* Dracula-inspired */
[data-theme="dracula"] {
  --bg: #282a36; --bg-alt: #44475a;
  --text: #f8f8f2; --accent: #bd93f9;
  --green: #50fa7b; --pink: #ff79c6;
  --cyan: #8be9fd; --orange: #ffb86c;
}

/* Nord-inspired */
[data-theme="nord"] {
  --bg: #2e3440; --bg-alt: #3b4252;
  --text: #eceff4; --accent: #88c0d0;
  --green: #a3be8c; --pink: #bf616a;
  --cyan: #8fbcbb; --orange: #d08770;
}

/* Catppuccin Mocha */
[data-theme="catppuccin"] {
  --bg: #1e1e2e; --bg-alt: #313244;
  --text: #cdd6f4; --accent: #cba6f7;
  --green: #a6e3a1; --pink: #f5c2e7;
  --cyan: #94e2d5; --orange: #fab387;
}

/* Light themes */
[data-theme="github-light"] {
  --bg: #ffffff; --bg-alt: #f6f8fa;
  --text: #24292f; --accent: #0969da;
  --green: #1a7f37; --orange: #bf8700;
}

[data-theme="solarized-light"] {
  --bg: #fdf6e3; --bg-alt: #eee8d5;
  --text: #586e75; --accent: #268bd2;
  --green: #859900; --orange: #cb4b16;
}
```

## Architecture

```css
/* tokens.css - define variables sin valores */
:root {
  --color-bg: initial;
  --color-bg-alt: initial;
  --color-text: initial;
  --color-accent: initial;
  /* ... */
}

/* themes.css - cada tema asigna valores */
@import './themes/dracula.css';
@import './themes/nord.css';
@import './themes/catppuccin.css';

/* usage.css - usa las variables */
.card { background: var(--color-bg-alt); color: var(--color-text); }
```

## Theme Picker Component

```html
<div class="theme-picker" role="radiogroup" aria-label="Color theme">
  <button class="theme-option" data-theme="dracula" aria-label="Dracula">
    <span class="swatch" style="background: #bd93f9"></span>
    Dracula
  </button>
  <button class="theme-option" data-theme="nord" aria-label="Nord">
    <span class="swatch" style="background: #88c0d0"></span>
    Nord
  </button>
  <!-- más temas -->
</div>
```

```js
document.querySelectorAll('.theme-option').forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  });
});
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| Definir TODOS los colores por tema | Mezclar variables y hardcode |
| Incluir light y dark themes | Solo dark o solo light |
| Testear contraste en cada tema | Asumir que un tema funciona para todo |
| Documentar el theme system | Que el dev siguiente tenga que adivinar |
| Persistir preferencia del usuario | Resetear en cada visita |
