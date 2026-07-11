# Design Theme: White Label

Diseño neutral pensado para ser customizado por terceros (clientes, partners).

## Profile

- **Vibe**: Profesional, genérico (intencionalmente)
- **Uso**: SaaS white-label, plataformas multi-tenant, themes customizables
- **Inspiración**: Shopify themes, WordPress themes, dashboard templates

## Color Palette

```css
:root {
  /* Colores base - el cliente los sobrescribe */
  --brand-primary: #2563eb;
  --brand-secondary: #1e40af;
  --brand-text: #ffffff;

  /* Neutros estables */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;
  --border: #e2e8f0;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-tertiary: #94a3b8;
}
```

## Architecture

```css
/* Sobrescritura por CSS custom properties */
.partner-theme-dark {
  --brand-primary: #a855f7;
  --brand-secondary: #7c3aed;
}
.partner-theme-green {
  --brand-primary: #10b981;
  --brand-secondary: #059669;
}
```

## Key Characteristics

- **Colores brand son variables**, no hardcodeados
- **Neutros no cambian** con el brand (bg, text, border)
- **Logos y favicons** configurables
- **Tipografía neutral** (Inter, system-ui)
- **Sin flourishes** ni decoraciones de agencia
- **Layouts estándar** (no experimentales)

## When to Use

- SaaS con plan white-label
- Agencias que revenden tu producto
- Plataformas multi-tenant
- Template markets

## When NOT to Use

- Producto direct-to-consumer
- Brand propio fuerte
- Proyectos creativos

## CSS Architecture

```css
/* buttons.css */
.btn-primary {
  background: var(--brand-primary);
  color: var(--brand-text);
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.15s;
}
.btn-primary:hover {
  background: var(--brand-secondary);
}

/* badges.css */
.badge {
  background: color-mix(in srgb, var(--brand-primary) 10%, transparent);
  color: var(--brand-primary);
  border: 1px solid color-mix(in srgb, var(--brand-primary) 20%, transparent);
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 13px;
}
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| Usar CSS variables para brand | Hardcodear colores de marca |
| Documentar qué se puede customizar | Asumir que el cliente sabe CSS |
| Proveer 3+ temas demo | Dejar el default genérico feo |
| Testear contraste con diferentes brands | Asumir colores claros/oscuros |
| Incluir guía de customización | Esperar que el cliente adivine |
