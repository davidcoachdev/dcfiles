# Vanta.js

Fondos animados 3D con Vanta.js (wrapper de Three.js para noobs).

## Profile

- **Uso**: Fondos de hero sections con 3 líneas de JS
- **Dependencias**: Vanta.js corre sobre Three.js
- **Instalación**: CDN o npm (`vanta`, `three`)

## Efectos Disponibles

| Efecto | Descripción | Uso |
|--------|-------------|-----|
| WAVES | Ondas 3D | Hero sections, backgrounds |
| NET | Red de nodos conectados | Tech, cyberpunk |
| BIRDS | Pájaros/boids | Naturaleza, libertad |
| GLOBE | Globo terráqueo | Global/internacional |
| RINGS | Anillos rotando | Futurista, abstracto |
| CELLS | Estructura celular | Orgánico, biotech |
| FOG | Niebla animada | Atmosférico, dreamy |
| DOTS | Puntos en grid | Moderno, limpio |
| TRUNK | Árbol 3D generativo | Naturaleza |
| CLOUDS | Nubes | Atmosférico |

## CDN Setup

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js"></script>
<div id="vanta-bg" style="position: fixed; inset: 0; z-index: -1;"></div>
<script>
const vantaEffect = VANTA.WAVES({
  el: '#vanta-bg',
  color: 0x4488ff,
  backgroundColor: 0x0a0a1a,
  waveHeight: 20,
  speed: 1.0
});
</script>
```

## npm / ES Module

```bash
npm install three vanta
```

```javascript
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.waves.min';

const effect = WAVES({
  el: '#bg',
  THREE,
  color: 0x4488ff,
  backgroundColor: 0x0a0a1a
});
```

## Props Comunes

```javascript
VANTA.EFFECT({
  el: '#bg',
  THREE,                // solo npm
  color: 0x4488ff,      // color principal (hex)
  backgroundColor: 0x0a0a1a,  // fondo
  mouseControls: true,   // interactúa con mouse
  touchControls: true,   // interactúa con touch
  gyroControls: false,   // usa giroscopio
  minHeight: 200,
  minWidth: 200
});
```

## Cleanup

```javascript
// Guardar instancia
const effect = VANTA.WAVES({ el: '#bg' });

// Destruir al salir
function cleanup() {
  if (effect) effect.destroy();
}
```

## React Component

```jsx
import { useEffect, useRef } from 'react';
import WAVES from 'vanta/dist/vanta.waves.min';
import * as THREE from 'three';

export default function VantaBg() {
  const ref = useRef(null);

  useEffect(() => {
    const effect = WAVES({ el: ref.current, THREE });
    return () => effect.destroy();
  }, []);

  return <div ref={ref} style={{ position: 'fixed', inset: 0, zIndex: -1 }} />;
}
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| Usar en hero sections | Usar sobre contenido con texto (reduce legibilidad) |
| Desactivar en mobile si hay performance issues | Poner múltiples efectos en misma página |
| Usar cleanup en SPA | Olvidar destroy() → memory leak |
| Elegir efecto que matche el brand | Efecto random sin coherencia |
| Degradado graceful (fallback sólido) | Depender de Vanta para contenido crítico |
