# Infinite Scroll

Carga continua de contenido al hacer scroll (paginación infinita).

## Profile

- **Uso**: Feeds, galerías, resultados de búsqueda, timelines
- **Alternativas**: Botón "Load more", paginación tradicional

## Intersection Observer Pattern

```html
<div id="container">
  <!-- items cargados dinámicamente -->
</div>
<div id="sentinel" style="height: 1px;"></div>
<div id="loading" style="display: none;">Loading...</div>
```

```javascript
const container = document.getElementById('container');
const sentinel = document.getElementById('sentinel');
const loading = document.getElementById('loading');
let page = 1;
let isLoading = false;
let hasMore = true;

async function loadMore() {
  if (isLoading || !hasMore) return;
  isLoading = true;
  loading.style.display = 'block';

  try {
    const res = await fetch(`/api/items?page=${page}`);
    const data = await res.json();
    if (data.items.length === 0) {
      hasMore = false;
      observer.unobserve(sentinel);
      return;
    }
    data.items.forEach(item => {
      const el = document.createElement('div');
      el.textContent = item.title;
      container.appendChild(el);
    });
    page++;
  } catch (err) {
    console.error('Failed to load:', err);
  } finally {
    isLoading = false;
    loading.style.display = 'none';
  }
}

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) loadMore();
}, { rootMargin: '200px' });

observer.observe(sentinel);

// Carga inicial
loadMore();
```

## Props

| Prop | Descripción |
|------|-------------|
| rootMargin | Anticipación: '200px' carga antes de llegar al final |
| threshold | 0 = detecta en cuanto aparece |
| debounce | Evitar múltiples requests simultáneas |
| hasMore | Señal del server si hay más páginas |

## Botón "Load More" (Alternativa)

```html
<button id="load-more" class="load-more">Load more</button>
```

```javascript
document.getElementById('load-more').addEventListener('click', loadMore);
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| Usar IntersectionObserver (no scroll events) | Escuchar scroll event (performance) |
| Mantener scroll position al cargar | Mover al usuario al cargar |
| Mostrar loading indicator | Carga silenciosa sin feedback |
| Incluir botón "Load more" como fallback | Solo infinite scroll sin alternativa |
| rootMargin generoso (200-400px) | Esperar a llegar exactamente al final |
| Add/remove items con animación | Cambios bruscos en el DOM |
| Preservar scroll en back navigation | Perder posición al volver atrás |
