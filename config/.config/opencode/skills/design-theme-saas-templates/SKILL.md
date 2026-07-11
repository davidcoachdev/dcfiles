# Design Theme: SaaS Templates

Patrones de layout y componentes para productos SaaS.

## Profile

- **Vibe**: Funcional, data-driven, profesional
- **Uso**: Dashboards, analytics, admin panels
- **Inspiración**: Linear, Vercel, Sentry

## Layout Patterns

### Sidebar Layout

```css
.saas-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
}
.sidebar {
  background: var(--bg-secondary);
  border-right: 1px solid var(--border);
  padding: 16px;
  overflow-y: auto;
}
.main {
  padding: 24px 32px;
  overflow-y: auto;
}
```

### Top Nav + Content

```css
.saas-top-nav {
  display: grid;
  grid-template-rows: 56px 1fr;
  min-height: 100vh;
}
.topbar {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border);
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

## Page Patterns

### Index Page (List + Actions)

```
┌──────────────────────────────────────────┐
│ 🔍 Search    Filters    + New Item       │
├──────────────────────────────────────────┤
│  Item 1                    status  ⋮     │
│  Item 2                    status  ⋮     │
│  Item 3                    status  ⋮     │
├──────────────────────────────────────────┤
│ ← Prev     Page 1 of 10     Next →       │
└──────────────────────────────────────────┘
```

```html
<div class="page">
  <header class="page-header">
    <h1>Projects</h1>
    <div class="page-actions">
      <input type="search" placeholder="Search...">
      <button class="btn-primary">+ New</button>
    </div>
  </header>
  <table class="data-table">
    <!-- rows -->
  </table>
  <footer class="pagination">
    <span>1-10 of 100</span>
    <div class="pagination-controls">...</div>
  </footer>
</div>
```

### Detail Page

```
┌──────────────────────────────────────────┐
│ ← Back to Projects                       │
│ Project Name               Edit  Delete  │
├──────┬───────────────────────────────────┤
│ Nav  │  Content Area                     │
│ tabs │                                    │
│      │  Section 1                        │
│      │  Section 2                        │
└──────┴───────────────────────────────────┘
```

## Component Patterns

### Data Table

```css
.data-table {
  width: 100%;
  border-collapse: collapse;
}
.data-table th {
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border);
}
.data-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}
.data-table tr:hover td {
  background: var(--bg-secondary);
}
```

### Empty State

```css
.empty-state {
  text-align: center;
  padding: 80px 24px;
}
.empty-state svg { /* icon grande */ }
.empty-state h3 { margin: 16px 0 8px; }
.empty-state p { color: var(--text-secondary); margin-bottom: 24px; }
```

## Stats/Widget Grid

```css
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}
.stat-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
}
.stat-card .label { font-size: 13px; color: var(--text-secondary); margin-bottom: 4px; }
.stat-card .value { font-size: 28px; font-weight: 700; }
.stat-card .change { font-size: 13px; margin-top: 4px; }
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| Sidebar colapsable | Sidebar fijo que no se cierra |
| Paginación + search + filters | Cargar 1000 rows sin control |
| Empty states en cada lista | Dejar pantallas en blanco |
| Loading skeletons | Spinners genéricos |
| Shortcuts de teclado | Solo navegación por click |
| Data export | Información sin salida |
