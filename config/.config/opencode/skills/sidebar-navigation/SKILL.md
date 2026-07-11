# Sidebar Navigation

Patrones de navegación lateral para dashboards y apps.

## Layout Base

```css
.app-layout {
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
.main-content {
  padding: 24px 32px;
  overflow-y: auto;
}
```

## Navigation Items

```css
.nav-section {
  margin-bottom: 24px;
}
.nav-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
  padding: 0 12px;
  margin-bottom: 8px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
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
.nav-item svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
.nav-badge {
  margin-left: auto;
  background: var(--accent-bg);
  color: var(--accent);
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}
.nav-item.active .nav-badge {
  background: rgba(255,255,255,0.2);
  color: white;
}
```

## Collapsible Submenu

```css
.nav-expandable {
  cursor: pointer;
}
.nav-expandable .chevron {
  margin-left: auto;
  transition: transform 0.2s;
}
.nav-expandable.open .chevron {
  transform: rotate(90deg);
}
.nav-submenu {
  display: none;
  padding-left: 28px;
  margin-top: 2px;
}
.nav-expandable.open + .nav-submenu {
  display: block;
}
```

## Collapsible Sidebar

```css
.app-layout.collapsed {
  grid-template-columns: 60px 1fr;
}
.app-layout.collapsed .nav-label { display: none; }
.app-layout.collapsed .nav-item span:not(.nav-badge) { display: none; }
.app-layout.collapsed .nav-badge { display: none; }
```

## Responsive

```css
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -280px;
    top: 0;
    bottom: 0;
    width: 260px;
    z-index: 100;
    transition: left 0.2s;
    box-shadow: 4px 0 20px rgba(0,0,0,0.1);
  }
  .sidebar.open { left: 0; }
  .sidebar-overlay {
    display: none;
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.3);
    z-index: 99;
  }
  .sidebar.open + .sidebar-overlay { display: block; }
  .app-layout { grid-template-columns: 1fr; }
}
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| Icon + label en cada item | Solo iconos (sin tooltip) |
| Secciones con labels | Lista plana interminable |
| Indicar active state | Dejar al usuario adivinar dónde está |
| Collapsible en mobile | Sidebar fijo que no se cierra |
| Keyboard nav con tab | Solo navegación por click |
| Scroll dentro del sidebar | Sidebar que empuja el contenido |
