# Fullpage Scroll

Scroll vertical con snap a secciones completas (full screen).

## Profile

- **Uso**: Landing pages narrativas, portfolios, presentaciones
- **Alternativas**: Locomotive Scroll, ScrollMagic, intersection observer manual

## CSS Snap (sin librerías)

```css
.fullpage-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}
.section {
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

```html
<div class="fullpage-container">
  <section class="section" id="home">...</section>
  <section class="section" id="about">...</section>
  <section class="section" id="work">...</section>
  <section class="section" id="contact">...</section>
</div>
```

## Navigation Dots

```html
<nav class="fullpage-nav">
  <a href="#home" class="dot active"></a>
  <a href="#about" class="dot"></a>
  <a href="#work" class="dot"></a>
  <a href="#contact" class="dot"></a>
</nav>
```

```css
.fullpage-nav {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 100;
}
.dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  transition: all 0.2s;
}
.dot.active { background: white; transform: scale(1.3); }
```

## JavaScript: Scroll Tracking

```javascript
const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('.dot');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      dots.forEach(d => d.classList.toggle('active', d.getAttribute('href') === `#${id}`));
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => observer.observe(s));
```

## Variante: Horizontal

```css
.horizontal-scroll {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  height: 100vh;
}
.horizontal-section {
  min-width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
}
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| Usar en landing pages narrativas | Usar en contenido funcional (docs, dashboards) |
| Desactivar snap en mobile (a veces) | Forzar fullpage en contenido largo |
| Incluir skip link accesible | Ignorar accesibilidad del scroll |
| Navegación visible (dots/arrows) | Dejar al usuario sin indicación |
| Transiciones suaves entre secciones | Scroll brusco sin easing |
