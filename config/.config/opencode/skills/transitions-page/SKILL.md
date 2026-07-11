# Page Transitions

Transiciones animadas entre páginas/views en SPAs y MPAs.

## Profile

- **Uso**: Transiciones suaves entre rutas, navegación con sensación nativa
- **Técnicas**: View Transitions API, CSS animations, JS libraries

## View Transitions API (NADA)

```css
/* Transición por defecto (crossfade) */
::view-transition-old(root) { animation: 0.3s ease-out both fade-out; }
::view-transition-new(root) { animation: 0.3s ease-in both fade-in; }

@keyframes fade-out { to { opacity: 0; } }
@keyframes fade-in { from { opacity: 0; } }
```

```javascript
// SPA (router-based)
document.querySelector('a').addEventListener('click', async (e) => {
  e.preventDefault();
  const url = e.target.href;
  await document.startViewTransition(() => {
    // Cambiar contenido de la página
    router.navigate(url);
  }).ready;
});
```

```javascript
// MPA (multi-page)
document.addEventListener('click', async (e) => {
  const link = e.target.closest('a[href]');
  if (!link || link.host !== location.host) return;
  e.preventDefault();
  await document.startViewTransition(() => {
    window.location.href = link.href;
  });
});
```

## Slide Transition

```css
::view-transition-old(root) {
  animation: 0.3s ease-out both slide-out-left;
}
::view-transition-new(root) {
  animation: 0.3s ease-in both slide-in-right;
}

@keyframes slide-out-left { to { transform: translateX(-30%); opacity: 0; } }
@keyframes slide-in-right { from { transform: translateX(30%); opacity: 0; } }
```

## Named Elements

```css
/* Elemento que persiste entre páginas */
header { view-transition-name: header; }
main  { view-transition-name: content; }

::view-transition-old(header) { animation: ...; }
::view-transition-new(header) { animation: ...; }
```

## CSS Animation Fallback (SPA)

```css
.page {
  animation: pageIn 0.3s ease-out;
}
.page-exit {
  animation: pageOut 0.2s ease-in;
}
@keyframes pageIn { from { opacity: 0; transform: translateY(10px); } }
@keyframes pageOut { to { opacity: 0; transform: translateY(-10px); } }
```

```javascript
// React Router example
function PageTransition({ children }) {
  const [exiting, setExiting] = useState(false);

  return (
    <div className={exiting ? 'page-exit' : 'page'}>...</div>
  );
}
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| 200-400ms de duración | Más de 500ms (lento) |
| Crossfade para transiciones simples | Slide complejo en una app de datos |
| View Transitions API (progressive enhancement) | Depender solo de JS |
| Mantener scroll position | Resetear scroll en cada transición |
| Compatibilidad: Chrome 111+, Safari 18.2+ | Usar sin fallback para browsers viejos |
