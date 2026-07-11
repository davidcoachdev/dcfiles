# Design Theme: Playful

Diseño divertido, colorido, con personalidad y movimiento.

## Profile

- **Vibe**: Alegre, juvenil, energético
- **Uso**: Apps infantiles, edtech, juegos, landing pages divertidas
- **Inspiración**: Duolingo, Notion (vibes), Figma community

## Color Palette

```css
:root {
  --pink: #ff6b9d;
  --yellow: #ffd93d;
  --blue: #6bcbff;
  --green: #6bffb8;
  --purple: #c06bff;
  --orange: #ff9f6b;
  --bg-primary: #fffef5;
  --bg-secondary: #fff8e7;
  --text-primary: #1a1a2e;
  --text-secondary: #5a5a7a;
}
```

## Typography

```css
--font-display: 'Fredoka', 'Nunito', system-ui, sans-serif;
--font-sans: 'Nunito', system-ui, sans-serif;
```

- Display: rounded, bold, generoso
- Body: rounded, friendly
- Tamaños grandes (mínimo 16px body)

## Key Characteristics

- **Colores saturados** y múltiples (5+ colores en paleta)
- **Border-radius grande** (16-24px)
- **Sombras coloridas** (box-shadow con color, no negro)
- **Animaciones divertidas**: bounce, wiggle, pop
- **Tipografía rounded** (redondeada)
- **Ilustraciones y emojis** integrados

## When to Use

- Productos para niños o jóvenes
- Edtech, gamificación
- Apps de bienestar, humor
- Landing pages de productos divertidos
- Onboarding flows

## When NOT to Use

- Productos enterprise B2B
- Apps de finanzas o legales
- Documentación seria
- Modo oscuro (pierde la alegría)

## Example: Fun Button

```css
.btn-fun {
  background: var(--pink);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 14px 32px;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 4px 0 #d94d7a, 0 6px 12px rgba(255, 107, 157, 0.3);
  transition: all 0.15s;
  cursor: pointer;
}
.btn-fun:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 #d94d7a, 0 8px 16px rgba(255, 107, 157, 0.4);
}
.btn-fun:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0 #d94d7a;
}
```

## Example: Colorful Card Grid

```css
.card-playful {
  background: white;
  border-radius: 20px;
  padding: 24px;
  border: 2px solid var(--border);
  transition: transform 0.2s;
}
.card-playful:nth-child(1) { border-color: var(--pink); }
.card-playful:nth-child(2) { border-color: var(--blue); }
.card-playful:nth-child(3) { border-color: var(--yellow); }
.card-playful:hover { transform: rotate(-1deg) scale(1.02); }
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| Usar colores saturados | Usar colores apagados |
| Border-radius grande | Ángulos rectos |
| Animaciones con bounce/ease-out | Animaciones lineales |
| Tipografía friendly | Serif formal |
| Mantener legibilidad | Sacrificar contraste por color |
