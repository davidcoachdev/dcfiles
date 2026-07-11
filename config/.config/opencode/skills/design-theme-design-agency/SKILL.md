# Design Theme: Design Agency

Estilo de agencia creativa: audaz, tipográfico, con personalidad fuerte.

## Profile

- **Vibe**: Creativo, premium, confiado
- **Uso**: Portfolios de agencias, estudios creativos, freelancers
- **Inspiración**: Awwwards, SiteSee, FWA

## Color Palette

```css
:root {
  --bg-primary: #fafafa;
  --bg-secondary: #f0f0f0;
  --text-primary: #0d0d0d;
  --text-secondary: #5a5a5a;
  --accent: #ff5e00;
  --accent-secondary: #0047ff;
  --border: #d4d4d4;
}
```

## Typography

```css
--font-display: 'Space Grotesk', 'Clash Display', sans-serif;
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

- Display oversized (700 / 64px+)
- Body generoso (400 / 18px)
- Tracking suelto en headings

## Key Characteristics

- **Tipografía protagonista**: tamaños enormes, letter-spacing negativo
- **Color accent llamativo** (naranja, rojo, verde lima)
- **Grids asimétricos** y layouts rotos
- **Hover effects** animados en todo
- **Imágenes grandes** y full-bleed
- **Bordes gruesos** o sin bordes

## When to Use

- Portfolio de agencia/estudio
- Landing page de servicio creativo
- Proyecto donde el diseño ES el producto
- Freelancers de alto nivel

## When NOT to Use

- SaaS/apps funcionales (muy ruidoso)
- Documentación o contenido denso
- Clientes que prefieren "seguro"

## Example: Case Study Card

```html
<a href="#" class="case-study">
  <div class="case-image">
    <img src="project.jpg" alt="">
    <div class="overlay">View project</div>
  </div>
  <div class="case-info">
    <span class="tag">Branding</span>
    <h2>Nova Identity</h2>
    <p>Complete brand redesign for a fintech startup.</p>
  </div>
</a>
```

```css
.case-study {
  display: block;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
}
.case-image { position: relative; aspect-ratio: 4/3; overflow: hidden; }
.case-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.case-study:hover img { transform: scale(1.05); }
.overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex; align-items: center; justify-content: center;
  color: white; font-weight: 600;
  opacity: 0; transition: opacity 0.3s;
}
.case-study:hover .overlay { opacity: 1; }
.case-info { padding: 20px 0; }
.tag { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent); }
.case-info h2 { font-size: 24px; font-weight: 700; margin: 8px 0; }
```

## Hero Layout

```css
.hero-agency {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 80px 40px;
  align-items: center;
}
.hero-agency h1 {
  font-size: clamp(48px, 8vw, 96px);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 0.9;
}
.hero-agency .accent-word { color: var(--accent); }
```
