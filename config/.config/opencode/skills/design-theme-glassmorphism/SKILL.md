# Design Theme: Glassmorphism

Efecto vidrio (glass) con backdrop blur. Decorativo, no funcional.

## Profile

- **Vibe**: Moderno, limpio, espacial
- **Uso**: Cards overlays, navbars, modales, hero sections
- **Inspiración**: Apple (Big Sur+), Windows 11, Glassmorphism.io

## Color Palette

```css
:root {
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.12);
  --glass-shadow: rgba(0, 0, 0, 0.1);
  --glass-blur: 12px;
  --glass-saturate: 1.8;
}
.dark {
  --glass-bg: rgba(0, 0, 0, 0.3);
  --glass-border: rgba(255, 255, 255, 0.06);
  --glass-shadow: rgba(0, 0, 0, 0.3);
}
```

## Base CSS

```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  box-shadow: 0 4px 24px var(--glass-shadow);
}
```

## Key Characteristics

- **Backdrop blur** sobre contenido detrás
- **Borde semi-transparente** (white o light)
- **Sin opacidad** en el fondo sólido
- **Shadow sutil** para profundidad
- **Saturate** para que el blur no desluzca

## When to Use

- Navbars fijas con scroll
- Cards decorativas en hero
- Modales con overlay
- Pricing cards sobre fondos con gradientes
- Stats dashboard widgets

## When NOT to Use

- Cards con mucho texto (ilegible)
- Formularios (inputs necesitan contraste)
- Data tables
- Sobre fondos blancos o muy claros (no se nota)
- Mobile (performance de backdrop-filter)

## Variants

```css
/* Glass light */
.glass-light {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

/* Glass dark */
.glass-dark {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Glass colored */
.glass-accent {
  background: rgba(99, 102, 241, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(99, 102, 241, 0.2);
}
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| Usar sobre fondos con textura/gradient | Usar sobre fondo blanco liso |
| Combinar con sólidos opacos para texto | Poner texto largo sobre glass |
| Border-radius generoso | Ángulos rectos |
| Testear en Safari (mejor performance) | Depender de backdrop-filter en Firefox Android |
| Mantener contraste 4.5:1 en texto principal | Asumir que el blur arregla el contraste |

## Performance Note

`backdrop-filter` es costoso en GPU. Limitar a elementos pequeños (nav, modales, cards individuales) y evitar animar el blur en producción.
