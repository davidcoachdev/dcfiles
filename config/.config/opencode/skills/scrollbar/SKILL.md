# Scrollbar

Customización de scrollbar nativa con CSS y alternativas JS.

## CSS Scrollbar (WebKit)

```css
/* Ancho */
::-webkit-scrollbar { width: 8px; height: 8px; }

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Thumb */
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
```

## Firefox

```css
/* Firefox (solo color, no width/height) */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}
```

## Dark Mode

```css
.dark ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}
.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
```

## Hide Scrollbar (manteniendo scroll)

```css
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE/Edge */
  scrollbar-width: none;      /* Firefox */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;              /* Chrome/Safari */
}
```

## Thin Scrollbar Utility

```css
.thin-scrollbar {
  scrollbar-width: thin;
}
.thin-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
.thin-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 2px;
}
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| Scrollbar sutil (no llama la atención) | Scrollbar de color brillante o neón |
| Mantener funcional (draggable thumb) | Scrollbar decorativa que no funciona |
| Heredar border-radius del container | Scrollbar con border-radius fijo |
| Respetar prefers-reduced-motion | Animaciones en scrollbar |
| Testear en Firefox (scrollbar-width: thin) | Asumir que todos los browsers usan WebKit |
