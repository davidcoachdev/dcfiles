# Design Theme: Bento Grid

Layouts modulares estilo Bento Grid (tiles de tamaño variable).

## Profile

- **Vibe**: Moderno, modular, visual
- **Uso**: Landing pages, dashboards, portfolios, pricing
- **Inspiración**: Apple (Bento UI), Windows Metro, Notion

## Grid Pattern

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 16px;
}

/* Tiles de tamaño variable */
.bento-wide { grid-column: span 2; }
.bento-tall { grid-row: span 2; }
.bento-large { grid-column: span 2; grid-row: span 2; }
.bento-full { grid-column: 1 / -1; }
```

## Responsive

```css
@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .bento-wide, .bento-large { grid-column: span 2; }
}
@media (max-width: 480px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
  .bento-wide, .bento-large { grid-column: 1; }
}
```

## Tile Base

```css
.bento-tile {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
}
.bento-tile:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}
.bento-tile h3 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-secondary); margin-bottom: 8px; }
.bento-tile .value { font-size: 36px; font-weight: 700; }
```

## Example Layouts

### 4-column: Dashboard Stats

```
┌───────────────┬───────────────┬───────────────┬───────────────┐
│    Revenue    │   Users       │   Sessions    │   Bounce      │
│    $48k       │   12,400      │   8,200       │   32%         │
│    +12%       │   +8%         │   -3%         │   -5%         │
├───────────────┴───────┬───────┴───────┬───────┴───────────────┤
│     Chart (span 2)    │    Activity   │    Top Pages          │
│                       │    Feed       │    1. /home 12k       │
│                       │               │    2. /pricing 8k    │
└───────────────────────┴───────────────┴───────────────────────┘
```

### 3-column: Features

```
┌─────────────────────┬─────────────────────┬─────────────────────┐
│    Feature 1        │   Feature 2         │   Feature 3        │
│    (tall)           │   (wide)            │   (tall)           │
│    Icon + text      │                     │   Icon + text      │
│                     │                     │                     │
├─────────────────────┴─────────────────────┴─────────────────────┤
│                      Testimonial (full)                          │
│                      "Amazing product!"                          │
└─────────────────────────────────────────────────────────────────┘
```

## Async Image Loading

```css
.bento-tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}
.bento-tile.image-tile {
  padding: 0;
  overflow: hidden;
}
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| Usar gap de 16-24px | Gaps muy pequeños o cero |
| Máximo 4 columnas | 5+ columnas (ilegible) |
| Tiles con ratio 1:1, 2:1, 1:2 | Tiles de tamaño aleatorio |
| Contenido scaneable | Sobrecargar cada tile |
| Hover estados en tiles | Tiles sin feedback |
