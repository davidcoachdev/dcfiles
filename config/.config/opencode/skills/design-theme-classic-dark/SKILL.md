# Design Theme: Classic Dark

Tema oscuro clásico con focus en legibilidad y jerarquía visual.

## Profile

- **Vibe**: Sobrio, profesional, premium
- **Uso**: Dashboards, apps B2B, tools, documentación
- **Inspiración**: Vercel, GitHub Dark, Linear

## Color Palette

```css
:root {
  --bg-primary: #0a0a0b;
  --bg-secondary: #18181b;
  --bg-tertiary: #27272a;
  --border: #3f3f46;
  --text-primary: #fafafa;
  --text-secondary: #a1a1aa;
  --text-tertiary: #71717a;
  --accent: #3b82f6;
  --accent-hover: #2563eb;
  --success: #22c55e;
  --warning: #f59e0b;
  --error: #ef4444;
}
```

## Typography

```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

- Body: 400 / 15px
- Small: 400 / 13px
- Heading: 600 / 24px+
- Mono: código y datos

## Key Characteristics

- **Fondo casi negro** (`#0a0a0b`), no `#000`
- **Bordes sutiles** (`#3f3f46`), no sombras pesadas
- **Accent azul** estándar, sin saturación excesiva
- **Jerarquía con opacidad**: 3 niveles de texto
- **Sin gradients** (reservar para casos específicos)

## When to Use

- Apps profesionales que se usan 8h+
- Productos B2B, dashboards analytics
- Developer tools, CLIs, documentación
- Modo oscuro por defecto (dark-first)

## When NOT to Use

- Sitios content-heavy (blogs, noticias)
- Ecommerce (convierte mejor en light)
- Branding que requiere colores vibrantes

## Example: Card

```html
<div class="card">
  <h3>Monthly Revenue</h3>
  <p class="value">$48,290</p>
  <p class="change positive">+12.5% vs last month</p>
</div>
```

```css
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
}
.card h3 {
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.value {
  color: var(--text-primary);
  font-size: 32px;
  font-weight: 600;
  margin: 8px 0;
}
.change.positive { color: var(--success); }
```

## Example: Sidebar Nav

```css
.nav-item {
  color: var(--text-secondary);
  padding: 10px 16px;
  border-radius: 8px;
  transition: all 0.15s;
}
.nav-item:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}
.nav-item.active {
  background: var(--accent);
  color: white;
}
```
