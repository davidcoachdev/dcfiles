# Smooth Scroll

Scroll suave en la página: nativo, CSS, o con librerías.

## Native CSS (HTML)

```css
html {
  scroll-behavior: smooth;
}
```

```html
<a href="#section-2">Go to Section 2</a>
```

✅ Sin JS, sin librerías, accesible
❌ Sin control sobre easing o duración
❌ No funciona en Safari sin flags

## Native JS

```javascript
document.querySelector('a[href^="#"]').addEventListener('click', e => {
  e.preventDefault();
  const target = document.querySelector(e.currentTarget.getAttribute('href'));
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
```

## Custom JS con easing

```javascript
function smoothScroll(targetY, duration = 800) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// Uso
document.querySelector('a[href="#section"]').addEventListener('click', e => {
  e.preventDefault();
  const target = document.querySelector('#section');
  smoothScroll(target.offsetTop);
});
```

## Librerías Populares

| Librería | Bundle | Notas |
|----------|--------|-------|
| Lenis | ~10KB | Smooth scroll + easing, moderna |
| Locomotive Scroll | ~15KB | Smooth + parallax, usada en Awwwards |
| SmoothScroll.js | ~8KB | Clásica, simple |

## Lenis (Recomendada)

```bash
npm install lenis
```

```javascript
import Lenis from 'lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Navegación con smooth scroll
lenis.on('scroll', (e) => console.log(e));
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| Usar smooth scroll para anchor links | Aplicar a todo scroll (molesta) |
| Respetar prefers-reduced-motion | Forzar animación si el user no quiere |
| 400-800ms de duración | Más de 1 segundo (lento) |
| Easing natural (ease-in-out) | Easing lineal |
| Testear en Safari | Asumir que scroll-behavior funciona everywhere |
