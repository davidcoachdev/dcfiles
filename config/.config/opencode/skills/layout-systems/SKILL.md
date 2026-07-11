# Layout Systems

Patrones de layout y sistemas de cuadrícula para web.

## Profile

- **Uso**: Definir la estructura visual de cualquier página
- **Técnicas**: Flexbox, CSS Grid, subgrid, container queries, composition

## Flexbox (1D)

```css
.flex-row   { display: flex; flex-direction: row; }
.flex-col   { display: flex; flex-direction: column; }
.flex-wrap  { flex-wrap: wrap; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-1 { gap: 4px; }
.gap-2 { gap: 8px; }
.gap-4 { gap: 16px; }
.gap-8 { gap: 32px; }
```

## CSS Grid (2D)

```css
.grid-2  { display: grid; grid-template-columns: repeat(2, 1fr); }
.grid-3  { display: grid; grid-template-columns: repeat(3, 1fr); }
.grid-4  { display: grid; grid-template-columns: repeat(4, 1fr); }
.grid-auto { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); }
.grid-auto-fit { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
```

## Auto-fit vs Auto-fill

```css
/* auto-fill: crea tracks vacíos si sobran */
.grid-fill { grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); }

/* auto-fit: colapsa tracks vacíos, stretch */
.grid-fit { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
```

## Subgrid

```css
.parent-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.child-grid {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 3;
}
```

## Container Queries

```css
.card-container { container-type: inline-size; }

@container (min-width: 400px) {
  .card { display: grid; grid-template-columns: 200px 1fr; }
}
@container (max-width: 399px) {
  .card { display: flex; flex-direction: column; }
}
```

## Stack (Composition)

```css
.stack { display: flex; flex-direction: column; }
.stack-sm { gap: 8px; }
.stack-md { gap: 16px; }
.stack-lg { gap: 32px; }
```

## Cluster (Wrap)

```css
.cluster {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}
```

## Center

```css
.center {
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
}
.center-wide { max-width: 1100px; }
.center-narrow { max-width: 560px; }
```

## Switcher (Sidebar)

```css
.with-sidebar {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 24px;
}
@media (max-width: 768px) {
  .with-sidebar { grid-template-columns: 1fr; }
}
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| Usar Grid para layouts 2D | Grid para una sola fila (usa flex) |
| Usar Flexbox para componentes 1D | Flexbox para grillas completas |
| Container queries para componentes reusables | Media queries basadas en viewport |
| Autofit para grillas responsivas | Breakpoints fijos para cada columna |
| Combinar subgrid con grid padre | Anidar grids sin subgrid |
