# Design Theme: Gradient

Uso de gradientes como elemento central del diseño.

## Profile

- **Vibe**: Vibrante, llamativo, moderno
- **Uso**: Landing pages, hero sections, backgrounds, badges
- **Inspiración**: Stripe, Vercel, Linear gradients

## Color Palette

```css
:root {
  --gradient-primary: linear-gradient(135deg, #6366f1, #a855f7);
  --gradient-secondary: linear-gradient(135deg, #3b82f6, #06b6d4);
  --gradient-accent: linear-gradient(135deg, #f59e0b, #ef4444);
  --gradient-hero: linear-gradient(135deg, #0f0f12 0%, #1a1a2e 50%, #16213e 100%);
  --gradient-text: linear-gradient(135deg, #f1f1f6, #818cf8);
  --gradient-success: linear-gradient(135deg, #10b981, #34d399);
  --gradient-card: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%);
}
```

## Typography

Usar sans-serif neutra para no competir con los gradients. Inter o system-ui.

## Key Characteristics

- **Gradients como identidad**, no solo decoración
- **Text gradients** en headings (con `background-clip: text`)
- **Mesh gradients** en backgrounds (múltiples radial-gradients)
- **Gradients sutiles** en cards para profundidad
- **Nunca** gradients en body text

## When to Use

- Hero sections de productos creativos
- Badges, tags, pills con color
- Background de secciones destacadas
- Iconos y gráficos decorativos

## When NOT to Use

- Body text (ilegible)
- Cards con mucho contenido (distrae)
- Formularios y inputs (confunde jerarquía)
- Modo oscuro excesivo (pierde contraste)

## Text Gradient Pattern

```css
.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

## Mesh Gradient Background

```css
.mesh-bg {
  background:
    radial-gradient(ellipse 80% 60% at 10% 20%, rgba(99, 102, 241, 0.3), transparent),
    radial-gradient(ellipse 60% 80% at 90% 80%, rgba(168, 85, 247, 0.2), transparent),
    radial-gradient(ellipse 50% 50% at 50% 50%, rgba(59, 130, 246, 0.1), transparent),
    var(--bg-primary, #0f0f12);
}
```

## Gradient Border

```css
.gradient-border {
  position: relative;
  background: var(--bg-secondary);
  border-radius: 12px;
}
.gradient-border::before {
  content: '';
  position: absolute; inset: 0;
  border-radius: 12px;
  padding: 1px;
  background: var(--gradient-primary);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| Usar 2-3 colores máximo | Mezclar 6+ colores |
| Mantener contraste 4.5:1 en texto | Texto sobre gradient directo |
| Gradients suaves (45-90deg) | Cambios bruscos de color |
| Animar con transiciones lentas | Rotación constante de gradient |
| Complementar con sólidos | Gradient en todo |
