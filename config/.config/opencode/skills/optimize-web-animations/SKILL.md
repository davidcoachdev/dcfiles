---
name: optimize-web-animations
description: >
  Profilea, audita y optimiza animaciones web en producción. Cubre memory leaks
  en RAF loops, animaciones CSS offscreen, limpieza de observers/timers,
  rendimiento de canvas/WebGL/GSAP/Three.js. Usar cuando el usuario pida
  optimizar animaciones lentas, pausar animaciones fuera de pantalla, buscar
  memory leaks, reducir CPU/GPU, o arreglar jank en scroll.
  Trigger: optimize animations, animation performance, web animations, RAF
  cleanup, offscreen animations, pausar animaciones, memory leak animations.
license: Apache-2.0
metadata:
  author: gentleman-programming (adapted from MengTo/Skills optimize-web-animations)
  version: "1.0"
---

# Optimize Web Animations

## Core Rule

Medir la página real antes de editar. El objetivo NO es eliminar movimiento — es hacer que el trabajo offscreen se detenga, el motion visible se reanude correctamente, y el cleanup en unmount libere recursos.

## Workflow

### 1. Inspeccionar contexto del repo

- Leer `AGENTS.md` o instrucciones locales
- `git status --short` temprano
- Encontrar: componentes de página, animation hooks, CSS keyframes, `requestAnimationFrame`, `setInterval`, `setTimeout`, canvas/WebGL/physics components, GSAP timelines/tweens
- Buscar en effect cleanup: event listeners, observers, RAF loops, intervals, timers, media streams, WebGL textures/materials/renderers, async work post-unmount

### 2. Capturar baseline en browser

Usar `obscura_browser_navigate` para abrir la ruta. Tomar nota de:

- Conteo de animaciones CSS running vs paused por sección
- Canvases/WebGL activos
- Count de elementos DOM, canvases, imágenes, iframes
- Si hay herramientas de profiling disponibles, registrar JS heap metrics

### 3. Aplicar fixes

#### CSS Animations Offscreen

Agregar `IntersectionObserver` que togglea clase `is-offscreen`:

```css
main > section.is-offscreen .expensive-animation,
.expensive-animation.is-offscreen {
  animation-play-state: paused !important;
}
```

Incluir `::before` y `::after` para pseudo-element glimmers/skeletons.

#### RAF / Canvas / WebGL Loops

Gatear el RAF loop directamente:

```javascript
let rafId = null;
let isDisposed = false;

function startLoop(canvas) {
  function tick() {
    if (isDisposed) return;
    // render logic
    rafId = requestAnimationFrame(tick);
  }
  tick();
}

function stopLoop() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
}

// IntersectionObserver callback
observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) startLoop(canvas);
    else stopLoop();
  });
}, { threshold: 0.01 });
observer.observe(canvas);
```

#### Leak Hardening

- ✅ Clear EVERY timeout/interval del effect
- ✅ Cancel RAF antes de unmount Y antes de restartear loop
- ✅ Disconnect `IntersectionObserver`, `ResizeObserver`, `MutationObserver`
- ✅ Remove global/window/document listeners con MISMO handler reference
- ✅ Dispose Three.js textures, materials, geometries, renderers
- ✅ Kill GSAP tweens/timelines: `gsap.killTweensOf(node)`
- ✅ Stop media streams, pause detached video/audio
- ✅ Guard async loaders con flag `isDisposed`
- ✅ Cap frame deltas en physics loops post-pausa

#### React-Specific Cleanup

```javascript
useEffect(() => {
  const el = ref.current;
  let rafId;

  function tick() { /* ... */ rafId = requestAnimationFrame(tick); }
  rafId = requestAnimationFrame(tick);

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      rafId = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafId);
    }
  });
  if (el) observer.observe(el);

  return () => {
    cancelAnimationFrame(rafId);
    observer.disconnect();
  };
}, []);
```

### 4. Verificar

- Recargar ruta y re-ejecutar mediciones
- Confirmar `offscreenRunningCount: 0` para secciones fuera de pantalla
- Confirmar animaciones visibles siguen corriendo
- Confirmar RAF loops inactivos offscreen, activos in-view
- Ejercitar interacción normal (search/filter/navegación) para verificar que observer no rompe contenido dinámico

### 5. Commits

```bash
git diff --check
# Staging aislado si el worktree está sucio
GIT_INDEX_FILE=/tmp/animation-fix git read-tree HEAD
# aplicar solo los hunks necesarios
GIT_INDEX_FILE=/tmp/animation-fix git commit -m "perf: pause offscreen animations in <page>"
```

## Patrones Buenos

| Pattern | Uso |
|---------|-----|
| `is-offscreen` class | Section-level + element-level para secciones largas |
| `IntersectionObserver` threshold `0.01` | Gateo de animaciones |
| `animation-play-state: paused` | CSS animations (no cubre RAF loops) |
| RAF direct control | WebGL/canvas effects |
| Frame delta caps | Physics loops que reanudan post-pausa |
| `isDisposed` flag | Guard para loaders que resuelven post-unmount |

## Skills Relacionados

- `gsap-advanced`: ScrollTrigger, timelines, performance
- `gsap-react`: useGSAP hook, cleanup patterns
- `web-performance`: Core Web Vitals, carga, rendering

Referencia: Adaptado de MengTo/Skills — optimize-web-animations
