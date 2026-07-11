# Design Tokens

Sistema de tokens de diseño para mantener consistencia visual.

## Concepto

Los design tokens son las variables atómicas de un sistema de diseño: colores, tipografía, spacing, breakpoints, shadows, etc. Reemplazan valores hardcodeados y permiten theming global.

## Estructura

```
tokens/
├── core/           # valores primitivos
│   ├── color.json
│   ├── typography.json
│   └── spacing.json
├── semantic/       # tokens semánticos (referencian core)
│   ├── light.json
│   └── dark.json
└── component/      # tokens de componente (opcional)
    └── button.json
```

## Core Tokens

```json
{
  "color": {
    "blue-50": "#eff6ff",
    "blue-100": "#dbeafe",
    "blue-500": "#3b82f6",
    "blue-900": "#1e3a5f",
    "gray-50": "#f9fafb",
    "gray-900": "#111827"
  },
  "spacing": {
    "1": "4px",
    "2": "8px",
    "4": "16px",
    "8": "32px",
    "12": "48px"
  },
  "font-size": {
    "sm": "14px",
    "base": "16px",
    "lg": "20px",
    "xl": "24px",
    "2xl": "32px"
  }
}
```

## Semantic Tokens

```json
// tokens/semantic/light.json
{
  "color": {
    "bg-primary": "{color.gray-50}",
    "bg-secondary": "#ffffff",
    "text-primary": "{color.gray-900}",
    "text-secondary": "#6b7280",
    "border": "#e5e7eb",
    "accent": "{color.blue-500}"
  }
}
```

## CSS Output

```css
:root {
  --color-bg-primary: #f9fafb;
  --color-bg-secondary: #ffffff;
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
  --color-border: #e5e7eb;
  --color-accent: #3b82f6;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
}

[data-theme="dark"] {
  --color-bg-primary: #111827;
  --color-bg-secondary: #1f2937;
  --color-text-primary: #f9fafb;
  --color-text-secondary: #d1d5db;
  --color-border: #374151;
}
```

## Herramientas

- **Style Dictionary** (Amazon): build pipeline tokens → CSS/JS/JSON
- **Theo** (Salesforce): token transform
- **Design Tokens W3C**: formato estándar
- **Figma Tokens**: sync Figma → code

## Style Dictionary Setup

```bash
npm install -D style-dictionary
```

```js
// style-dictionary.config.js
module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/tokens/',
      files: [{ destination: 'variables.css', format: 'css/variables' }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/tokens/',
      files: [{ destination: 'tokens.js', format: 'javascript/es6' }]
    }
  }
};
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| Empezar con tokens core (primitivas) | Crear tokens para cada componente |
| Usar naming semántico (`text-primary`) | Naming descriptivo (`text-dark-gray`) |
| Versionar tokens con el código | Tokens en sistema separado sin sync |
| Automatizar build con CI | Transformación manual |
| Documentar cada token | Asumir que se entienden solos |
