# Design Theme: Modern Neutral

Tema neutro claro con elegancia minimalista. El "modo por defecto" para productos premium.

## Profile

- **Vibe**: Limpio, espacioso, profesional
- **Uso**: Landing pages, blogs, docs, apps B2B
- **Inspiración**: Linear, Notion, Raycast

## Color Palette

```css
:root {
  --bg-primary: #fcfcfc;
  --bg-secondary: #f5f5f5;
  --bg-tertiary: #e8e8e8;
  --border: #e0e0e0;
  --text-primary: #1a1a1a;
  --text-secondary: #6b6b6b;
  --text-tertiary: #9e9e9e;
  --accent: #1a1a1a;
  --accent-hover: #3b3b3b;
  --accent-bg: rgba(0, 0, 0, 0.05);
}
```

## Typography

```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'SF Mono', 'JetBrains Mono', monospace;
```

- Body: 400 / 16px con line-height 1.6
- Heading: 600 / 20px+
- Display: 700 / 36px+

## Key Characteristics

- **Casi blanco** (`#fcfcfc`), no `#fff` puro
- **Máximo 3 grises** para jerarquía
- **Sin colores llamativos** (accent es negro/gris oscuro)
- **Mucho whitespace** (padding generoso)
- **Bordes finos** (1px, no sombras)
- **Sin gradients** ni decoraciones innecesarias

## When to Use

- Productos B2B enterprise
- Documentación y blogs
- Apps de productividad
- Cualquier proyecto donde el contenido es el rey

## When NOT to Use

- Productos de entretenimiento (muy soso)
- Apps para jóvenes/adolescentes
- Branding que requiere personalidad fuerte

## Example: Blog Post

```html
<article class="post">
  <h1>The Art of Simplicity</h1>
  <p class="meta">By Jane Doe · 5 min read</p>
  <p class="lead">In a world of noise, simplicity wins.</p>
  <p>Content goes here with generous spacing...</p>
</article>
```

```css
.post { max-width: 680px; margin: 0 auto; padding: 64px 24px; }
.post h1 {
  font-size: 36px; font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
}
.meta { color: var(--text-tertiary); font-size: 14px; }
.lead { color: var(--text-secondary); font-size: 20px; line-height: 1.6; }
.post p { color: var(--text-primary); line-height: 1.8; margin-bottom: 24px; }
```

## Example: Minimal Card

```css
.minimal-card {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px;
}
.minimal-card:hover {
  background: var(--bg-secondary);
  border-color: var(--text-tertiary);
}
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| Whitespace generoso | Apretar elementos |
| Tipografía como jerarquía | Depender de colores |
| 1px borders con border-radius 6-8px | Sombras pesadas |
| Contraste alto (text-primary) | Gris sobre gris |
