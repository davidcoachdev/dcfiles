# Design Theme: Retro

Estética retro, vaporwave, synthwave, 80s/90s inspired.

## Profile

- **Vibe**: Nostálgico, neon, audaz
- **Uso**: Landing pages retro, juegos, eventos, merch
- **Inspiración**: Synthwave '84, Outrun, Vaporwave aesthetics

## Color Palette

```css
:root {
  --neon-pink: #ff2d78;
  --neon-blue: #00d4ff;
  --neon-purple: #b826ff;
  --neon-yellow: #ffe600;
  --sunset-orange: #ff6b35;
  --sunset-red: #ff1744;
  --bg-dark: #0a0a2e;
  --bg-medium: #1a1a4e;
  --bg-light: #2a2a6e;
  --text-primary: #f0f0ff;
  --text-secondary: #a0a0e0;
}
```

## Typography

```css
--font-display: 'Orbitron', 'Press Start 2P', monospace;
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

- Display: tecnológica, uppercase
- Body: sans-serif normal (para legibilidad)
- Mono para detalles tech

## Key Characteristics

- **Grid perspective** en backgrounds (efecto Tron)
- **Neon glow** en textos y bordes (text-shadow)
- **Gradientes sunset**: magenta → azul → púrpura
- **Scanlines** superpuestas (opcional)
- **Border-radius mínimo** o ángulos rectos
- **Partículas y estrellas** en fondos

## When to Use

- Landing pages de productos retro-themed
- Gaming / esports
- Eventos nocturnos, festivales
- Apps creativas con personalidad ochentera

## When NOT to Use

- Productos B2B serios
- Apps de productividad
- Contenido de lectura prolongada

## Neon Text

```css
.neon-text {
  color: var(--neon-blue);
  text-shadow:
    0 0 7px var(--neon-blue),
    0 0 10px var(--neon-blue),
    0 0 21px var(--neon-blue),
    0 0 42px var(--neon-blue),
    0 0 82px var(--neon-blue);
}
.neon-pink {
  color: var(--neon-pink);
  text-shadow: 0 0 7px var(--neon-pink), 0 0 10px var(--neon-pink),
               0 0 21px var(--neon-pink), 0 0 42px var(--neon-pink);
}
```

## Grid Background

```css
.retro-grid {
  background:
    linear-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
}
```

## Sunset Gradient Background

```css
.retro-sunset {
  background: linear-gradient(
    180deg,
    #0a0a2e 0%,
    #1a1a4e 20%,
    #b826ff 40%,
    #ff2d78 60%,
    #ff6b35 80%,
    #ffe600 100%
  );
}
```

## Scanline Overlay

```css
.scanlines::after {
  content: '';
  position: fixed; inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0,0,0,0.03) 2px,
    rgba(0,0,0,0.03) 4px
  );
  pointer-events: none;
  z-index: 9999;
}
```
