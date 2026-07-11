# Design Theme: SaaS Dark

Tema oscuro para productos SaaS modernos. Más vibrante y contrastado que el classic-dark.

## Profile

- **Vibe**: Moderno, dinámico, tech
- **Uso**: Landing pages SaaS, pricing, features, dashboards
- **Inspiración**: Stripe Dark, Sentry, Notion Dark

## Color Palette

```css
:root {
  --bg-primary: #0f0f12;
  --bg-secondary: #1a1a24;
  --bg-tertiary: #252536;
  --border: #2a2a3e;
  --text-primary: #f1f1f6;
  --text-secondary: #a0a0b8;
  --text-tertiary: #6b6b80;
  --accent: #6366f1;
  --accent-subtle: #818cf8;
  --accent-bg: rgba(99, 102, 241, 0.1);
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
}
```

## Typography

```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-display: 'Cabinet Grotesk', 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

- Display: headings grandes (700 / 48px+)
- Body: 400 / 16px
- Small: 400 / 14px

## Key Characteristics

- **Fondo azulado oscuro** (`#0f0f12`), no gris neutro
- **Accent indigo/violeta** (`#6366f1`)
- **Glow sutil** en elementos activos (box-shadow con accent)
- **Cards con bg-tertiary** para profundidad
- **Gradients sutiles** en hero sections

## When to Use

- SaaS products en etapa growth/market fit
- Landing pages de productos tech
- Apps con dashboard + marketing en mismo brand
- Cuando querés sentir "innovación"

## When NOT to Use

- Productos enterprise clásicos (prefieren classic-dark)
- Apps content-heavy o de lectura
- Branding que compite con indigo

## Example: Hero Section

```html
<section class="hero">
  <h1>Build faster.<br><span class="gradient">Ship smarter.</span></h1>
  <p>Modern infrastructure for modern teams.</p>
  <div class="cta-group">
    <a href="#" class="btn-primary">Get started</a>
    <a href="#" class="btn-secondary">View demo</a>
  </div>
</section>
```

```css
.hero {
  background: var(--bg-primary);
  padding: 120px 24px;
  text-align: center;
}
.gradient {
  background: linear-gradient(135deg, var(--accent), var(--accent-subtle));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.cta-group { display: flex; gap: 16px; justify-content: center; }
.btn-primary {
  background: var(--accent);
  color: white;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
}
.btn-secondary {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border);
  padding: 12px 32px;
  border-radius: 8px;
}
```

## Referencia: Hero Sections (MengTo)

Patrones de hero section extraídos de MengTo/Skills. Aplican principalmente a temas SaaS oscuros.

### Layout Patterns

```
Centered (más común)
┌───────────────────────────────────────┐
│                                       │
│           Headline (48px+)            │
│        Subtitle supporting text       │
│          [CTA]   [Learn More]         │
│                                       │
│         Mockup / Dashboard image      │
└───────────────────────────────────────┘

Split (mitad texto, mitad visual)
┌───────────────────┬───────────────────┐
│                   │                   │
│   Headline        │   Ilustración /   │
│   Texto           │   Video /         │
│   CTA             │   Mockup          │
│                   │                   │
└───────────────────┴───────────────────┘

Full-bleed image (background hero)
┌───────────────────────────────────────┐
│  (imagen de fondo full-width)         │
│                                       │
│     Headline + CTA overlay            │
│                                       │
└───────────────────────────────────────┘
```

### Componentes Clave

```css
.hero-centered {
  text-align: center;
  padding: 120px 24px;
  max-width: 800px;
  margin: 0 auto;
}
.hero-centered h1 {
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 16px;
}
.hero-subtitle {
  font-size: clamp(18px, 2.5vw, 22px);
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 32px;
}
.hero-cta {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
```

```css
.hero-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  padding: 80px 40px;
  min-height: 80vh;
}
.hero-split .visual {
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-split .visual img,
.hero-split .visual video {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}
@media (max-width: 768px) {
  .hero-split { grid-template-columns: 1fr; gap: 40px; }
}
```

### Badge / Tag Above Headline

```html
<div class="hero-badge">✨ New: AI-powered analytics</div>
<h1>Make data-driven decisions</h1>
```

```css
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--accent-bg);
  color: var(--accent);
  border: 1px solid rgba(99, 102, 241, 0.2);
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
}
```

### Social Proof / Logos

```html
<div class="hero-logos">
  <p class="logos-label">Trusted by 10,000+ teams</p>
  <div class="logos-row">
    <img src="logo-1.svg" alt="">
    <img src="logo-2.svg" alt="">
    <img src="logo-3.svg" alt="">
  </div>
</div>
```

```css
.hero-logos { margin-top: 60px; }
.logos-label { font-size: 13px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px; }
.logos-row { display: flex; gap: 32px; align-items: center; justify-content: center; flex-wrap: wrap; opacity: 0.5; }
```

### Animación de entrada

```css
.hero-content > * {
  animation: heroFadeIn 0.6s ease-out both;
}
.hero-content > *:nth-child(1) { animation-delay: 0s; }
.hero-content > *:nth-child(2) { animation-delay: 0.1s; }
.hero-content > *:nth-child(3) { animation-delay: 0.2s; }
.hero-content > *:nth-child(4) { animation-delay: 0.3s; }

@keyframes heroFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## Example: Feature Grid

```css
.feature-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
  transition: all 0.2s;
}
.feature-card:hover {
  border-color: var(--accent);
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.1);
  transform: translateY(-2px);
}
.icon-wrapper {
  width: 48px; height: 48px;
  background: var(--accent-bg);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: var(--accent);
  margin-bottom: 16px;
}
```
