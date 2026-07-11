# Canvas + WebGL Patterns

Patrones visuales implementados con Canvas 2D, WebGL o Three.js para fondos, partículas, glóbulos, y efectos atmosféricos.

## Cuándo usar este skill

- Cuando necesitás un **fondo animado con grid/líneas** estilo Tron o cyberpunk
- Cuando querés **partículas en forma de globo terráqueo** (globe particles)
- Cuando necesitás un **objeto 3D flotante** (toroid knot, icosaedro, etc.)
- Cuando querés un **efecto láser** animado con brillo (glow)
- Cuando necesitás un **fondo atmosférico animado** estilo aurora/nebulosa
- Cuando querés un **efecto dither** (píxeles dispersos) en el background
- Cuando el diseño requiere un canvas de alto impacto visual con WebGL

## Patrones incluidos

1. `background-grid-webgl` — Grid animado en perspectiva isométrica
2. `globe-particles` — Globo terráqueo con partículas
3. `webgl-3d-object` — Objeto 3D flotante (toroid knot, icosaedro)
4. `webgl-laser` — Línea láser animada con glow
5. `atmosphere-background` — Fondo atmosférico animado (aurora)
6. `dither-background` — Fondo con efecto dither (píxeles dispersos)

---

## 1. background-grid-webgl

Grid animado con efecto de profundidad (perspectiva isométrica). Ideal para fondos de hero sections o dashboards cyberpunk.

### Concepto

- Líneas de grid que se mueven en el eje Z (profundidad)
- Efecto de vanishing point
- Color único o gradiente, con opacidad sutil

### Setup básico

```html
<canvas id="grid-canvas"></canvas>
```

```javascript
const canvas = document.getElementById('grid-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const grid = {
  size: 40,        // spacing entre líneas
  speed: 0.5,      // velocidad de movimiento
  color: 'rgba(0, 150, 255, 0.15)',
  vanishingY: 0.6  // 0.6 = 60% desde arriba
};

function drawGrid(offset) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = grid.color;
  ctx.lineWidth = 1;

  const vY = canvas.height * grid.vanishingY + offset;

  // Líneas horizontales (se comprimen hacia vanishing point)
  for (let y = 0; y < canvas.height; y += grid.size) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Líneas verticales con perspectiva
  for (let x = 0; x <= canvas.width; x += grid.size) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
}

let offset = 0;
function animate() {
  offset += grid.speed;
  drawGrid(offset);
  requestAnimationFrame(animate);
}
animate();
```

### Variante Three.js (estereotipos)

```javascript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Grid helper de Three.js
const gridHelper = new THREE.GridHelper(20, 40, 0x00aaff, 0x0066ff);
gridHelper.position.y = -2;
scene.add(gridHelper);

let angle = 0;
function animate() {
  angle += 0.005;
  camera.position.x = Math.sin(angle) * 8;
  camera.position.z = Math.cos(angle) * 8;
  camera.position.y = 4;
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
```

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| size | number | 40 | Espaciado entre líneas del grid |
| speed | number | 0.5 | Velocidad de animación |
| color | string | rgba(...) | Color de las líneas |
| vanishingY | number | 0.6 | Posición del punto de fuga (0-1) |
| lineWidth | number | 1 | Grosor de línea |
| fadeAmount | number | 0.3 | Opacidad máxima de líneas lejanas |

---

## 2. globe-particles

Globo terráqueo compuesto por partículas (puntos) que rotan. Ideal para secciones "internacional", "cobertura global", o "nuestro equipo en el mundo".

### Concepto

- Partículas distribuidas en esfera
- Rotación continua en eje Y
- Tamaño variable según posición Z (profundidad)
- Efecto de "globe wireframe" con líneas opcionales

### Implementación Three.js

```javascript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

const particleCount = 2000;
const radius = 5;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

const color = new THREE.Color(0x4488ff);

for (let i = 0; i < particleCount; i++) {
  // Distribución uniforme en esfera
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);

  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);

  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = z;

  // Variación de color por profundidad
  const c = color.clone().multiplyScalar(0.5 + (z / radius) * 0.5);
  colors[i * 3] = c.r;
  colors[i * 3 + 1] = c.g;
  colors[i * 3 + 2] = c.b;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
  size: 0.08,
  vertexColors: true,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

camera.position.z = 10;

function animate() {
  particles.rotation.y += 0.002;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
```

### Variante Canvas 2D (sin dependencias)

```javascript
const canvas = document.getElementById('globe');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const count = 500;
const radius = 150;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

for (let i = 0; i < count; i++) {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  particles.push({
    theta,
    phi,
    x: 0, y: 0, z: 0
  });
}

let rotation = 0;
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rotation += 0.01;

  const sorted = particles.map(p => {
    const x = radius * Math.sin(p.phi) * Math.cos(p.theta + rotation);
    const y = radius * Math.sin(p.phi) * Math.sin(p.theta + rotation);
    const z = radius * Math.cos(p.phi);
    const scale = (z + radius) / (2 * radius);
    return { x, y, z, scale };
  }).sort((a, b) => a.z - b.z);

  sorted.forEach(p => {
    const screenX = centerX + p.x;
    const screenY = centerY + p.y;
    const size = 1 + p.scale * 2;
    ctx.beginPath();
    ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(100, 180, 255, ${0.3 + p.scale * 0.5})`;
    ctx.fill();
  });

  requestAnimationFrame(draw);
}
draw();
```

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| count | number | 2000 | Cantidad de partículas |
| radius | number | 5 | Radio del globo |
| rotationSpeed | number | 0.002 | Velocidad de rotación |
| color | string | #4488ff | Color base de partículas |
| particleSize | number | 0.08 | Tamaño de cada punto |
| showWireframe | boolean | false | Muestra líneas de longitud/latitud |

---

## 3. webgl-3d-object

Objeto 3D flotante con rotación lenta. Ideal para hero sections, "nuestro producto", o como elemento decorativo de alto impacto.

### Objetos soportados

- **ToroidKnot** (nudo toroidal) — el más vistoso y usado
- **Icosaedro** — geométrico, moderno
- **Torus** — simple, elegante
- **Octaedro** — sharp, tech
- **Dodecaedro** — sólido, premium

### Setup básico (ToroidKnot)

```javascript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 16);
const material = new THREE.MeshPhysicalMaterial({
  color: 0x4488ff,
  metalness: 0.3,
  roughness: 0.6,
  clearcoat: 0.8,
  clearcoatRoughness: 0.2,
  transparent: true,
  opacity: 0.9
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

camera.position.z = 3;

function animate() {
  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
```

### Variante wireframe (estilo tech)

```javascript
const geometry = new THREE.IcosahedronGeometry(1.5, 0);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff88,
  wireframe: true,
  transparent: true,
  opacity: 0.4
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

### Variante glow + post-processing

```javascript
// Requiere EffectComposer y UnrealBloomPass
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.3,   // strength
  0.5,   // radius
  0.1    // threshold
);
composer.addPass(bloomPass);

// En el loop, usar composer.render() en vez de renderer.render()
```

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| type | string | 'toroidKnot' | Tipo: toroidKnot, icosahedron, torus, octahedron, dodecahedron |
| color | number | 0x4488ff | Color del objeto |
| metalness | number | 0.3 | Metalness (solo PhysicalMaterial) |
| roughness | number | 0.6 | Roughness |
| clearcoat | number | 0.8 | Clearcoat (solo PhysicalMaterial) |
| wireframe | boolean | false | Modo wireframe |
| glow | boolean | false | Post-processing bloom |
| rotationSpeedX | number | 0.005 | Velocidad rotación en X |
| rotationSpeedY | number | 0.01 | Velocidad rotación en Y |
| floatAmplitude | number | 0 | Amplitud de flotación (0 = estático) |
| size | number | 1 | Escala del objeto |

---

## 4. webgl-laser

Línea láser animada con efecto de glow (brillo). Ideal para secciones "feature", timelines, o como separador visual impactante.

### Concepto

- Línea que dibuja un camino (path) animado
- Efecto de glow con blur o post-processing
- Color único o gradiente
- Variante: laser que "escribe" el path progresivamente

### Canvas 2D básico

```javascript
const canvas = document.getElementById('laser');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let progress = 0;

function drawLaser() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  progress = (progress + 0.005) % 1;

  // Path sinusoidal
  ctx.beginPath();
  const points = [];
  for (let t = 0; t <= progress; t += 0.01) {
    const x = t * canvas.width;
    const y = canvas.height / 2 + Math.sin(t * Math.PI * 4 + Date.now() * 0.001) * 50;
    points.push({ x, y });
    if (t === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  // Glow outer
  ctx.strokeStyle = 'rgba(0, 150, 255, 0.1)';
  ctx.lineWidth = 20;
  ctx.stroke();

  // Glow medium
  ctx.strokeStyle = 'rgba(0, 150, 255, 0.3)';
  ctx.lineWidth = 10;
  ctx.stroke();

  // Core
  ctx.strokeStyle = '#00aaff';
  ctx.lineWidth = 2;
  ctx.stroke();

  requestAnimationFrame(drawLaser);
}
drawLaser();
```

### Variante Three.js (LaserLine)

```javascript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Generar puntos del path
const points = [];
for (let i = 0; i < 100; i++) {
  const t = i / 100;
  const x = (t - 0.5) * 10;
  const y = Math.sin(t * Math.PI * 4) * 1.5;
  const z = 0;
  points.push(new THREE.Vector3(x, y, z));
}

const curve = new THREE.CatmullRomCurve3(points);
const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.05, 8, false);
const material = new THREE.MeshBasicMaterial({
  color: 0x00aaff,
  transparent: true,
  opacity: 0.8
});
const tube = new THREE.Mesh(tubeGeometry, material);
scene.add(tube);

// Glow point at start/end (opcional)
const glowGeometry = new THREE.SphereGeometry(0.15, 16, 16);
const glowMaterial = new THREE.MeshBasicMaterial({ color: 0x00aaff });
const glow = new THREE.Mesh(glowGeometry, glowMaterial);
scene.add(glow);

camera.position.z = 5;

let t = 0;
function animate() {
  t += 0.005;
  // Mover glow point a lo largo del path
  const pos = curve.getPoint(t % 1);
  glow.position.copy(pos);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
```

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| color | string | #00aaff | Color del láser |
| coreWidth | number | 2 | Grosor del núcleo |
| glowWidth | number | 20 | Ancho del glow exterior |
| glowIntensity | number | 0.3 | Opacidad del glow |
| speed | number | 0.005 | Velocidad de animación del path |
| pathFunction | function | sinusoidal | Función que genera el path |
| progressive | boolean | true | Si dibuja progresivamente o completo |

---

## 5. atmosphere-background

Fondo animado con efecto atmosférico (aurora, nebulosa, nubes de colores). Ideal para fondos de hero sections, login screens, o backgrounds de alto impacto.

### Concepto

- Múltiples capas de gradientes animados
- Colores que se mezclan y desplazan lentamente
- Efecto de "aurora" con curvas suaves y blur
- Variante: nebula con partículas

### Canvas 2D (aurora)

```javascript
const canvas = document.getElementById('atmosphere');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const layers = [
  { x: 0.3, y: 0.5, radius: 0.6, color: 'rgba(100, 50, 200, 0.3)', speedX: 0.0002, speedY: 0.0001 },
  { x: 0.7, y: 0.4, radius: 0.5, color: 'rgba(50, 100, 255, 0.25)', speedX: -0.0003, speedY: 0.0002 },
  { x: 0.5, y: 0.6, radius: 0.4, color: 'rgba(200, 50, 150, 0.2)', speedX: 0.0001, speedY: -0.0002 },
  { x: 0.2, y: 0.3, radius: 0.3, color: 'rgba(255, 100, 50, 0.15)', speedX: -0.0002, speedY: 0.0003 }
];

let time = 0;

function draw() {
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  time++;
  layers.forEach(l => {
    const x = (l.x + Math.sin(time * l.speedX)) * canvas.width;
    const y = (l.y + Math.cos(time * l.speedY)) * canvas.height;
    const r = l.radius * canvas.width;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, l.color);
    gradient.addColorStop(0.5, l.color.replace(/[\d.]+\)$/, '0.1)'));
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  requestAnimationFrame(draw);
}
draw();
```

### Variante Three.js (aurora con shader)

```javascript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Vertex Shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader con múltiples capas
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec3 color = vec3(0.04, 0.04, 0.1); // fondo oscuro

    // Capa 1
    float c1 = sin(uv.x * 3.0 + uTime * 0.3) * 0.5 + 0.5;
    c1 *= sin(uv.y * 2.0 + uTime * 0.2) * 0.5 + 0.5;
    color += vec3(0.3, 0.1, 0.5) * c1 * 0.3;

    // Capa 2
    float c2 = sin(uv.x * 5.0 - uTime * 0.2 + uv.y * 2.0) * 0.5 + 0.5;
    color += vec3(0.1, 0.3, 0.8) * c2 * 0.2;

    // Capa 3
    float c3 = sin(uv.x * 2.0 + uTime * 0.4 + uv.y * 4.0) * 0.5 + 0.5;
    color += vec3(0.6, 0.1, 0.4) * c3 * 0.15;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  }
});

const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
scene.add(mesh);

let time = 0;
function animate() {
  time += 0.01;
  material.uniforms.uTime.value = time;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
```

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| layers | array | [...] | Array de capas con {color, speed, radius} |
| background | string | #0a0a1a | Color de fondo base |
| blendMode | string | screen | Modo de mezcla |
| shader | boolean | false | Usa shader (Three.js) en vez de Canvas 2D |
| speed | number | 0.01 | Velocidad global de animación |

---

## 6. dither-background

Fondo con efecto dither (píxeles dispersos) animado. Ideal para estilos retro, glitch, o "tech art".

### Concepto

- Píxeles que aparecen/desaparecen con ruido
- Distribución pseudo-aleatoria con semilla
- Variante: dither sobre imagen existente
- Variante: dither animado (píxeles que se mueven)

### Canvas 2D básico

```javascript
const canvas = document.getElementById('dither');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cellSize = 4;
const cols = Math.ceil(canvas.width / cellSize);
const rows = Math.ceil(canvas.height / cellSize);

let time = 0;

function draw() {
  time += 0.02;
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      // Noise value
      const n = Math.sin(x * 0.5 + y * 1.3 + time) * 0.5 + 0.5;
      // Threshold dither
      const threshold = 0.5 + Math.sin(x * 0.1 + time * 0.5) * 0.2;

      if (n > threshold) {
        const brightness = Math.floor(n * 200);
        ctx.fillStyle = `rgb(${brightness}, ${brightness + 50}, ${brightness + 100})`;
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }

  requestAnimationFrame(draw);
}
draw();
```

### Dither sobre imagen (efecto glitch)

```javascript
const img = new Image();
img.src = 'https://...';
img.onload = function() {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Bayer matrix 4x4 simplificada
  const bayer = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5]
  ];

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const i = (y * canvas.width + x) * 4;
      const gray = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2];
      const threshold = (bayer[y % 4][x % 4] + 0.5) / 16;
      const value = gray > threshold * 255 ? 255 : 0;
      data[i] = data[i+1] = data[i+2] = value;
    }
  }

  ctx.putImageData(imageData, 0, 0);
};
```

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| cellSize | number | 4 | Tamaño del píxel dither |
| threshold | number | 0.5 | Corte para binarización |
| speed | number | 0.02 | Velocidad de animación |
| color1 | string | #0a0a0a | Color fondo |
| color2 | string | #4488ff | Color píxeles activos |
| mode | string | 'animated' | 'animated', 'static', 'image' |
| matrix | string | 'bayer' | 'bayer', 'random', 'ordered' |

---

## Consideraciones de performance

1. **Canvas 2D vs WebGL/Three.js**: Canvas 2D es suficiente para grids, auroras y dither simples. Three.js necesario para 3D objects, globe particles y shaders.

2. **Mobile first**: Reducir particle count, cell size, o resolution en mobile.

3. **requestAnimationFrame**: Siempre usar rAF, nunca setInterval.

4. **Resize handler**: Escuchar `window.resize` y re-calcular dimensiones.

5. **OffscreenCanvas**: Considerar para patterns que no necesitan interacción.

6. **`will-change`**: En CSS: `canvas { will-change: transform; }` para compositing por GPU.

7. **Memory leak**: Detener rAF cuando el componente se desmonta (return del useEffect / cleanup).

### Cleanup pattern

```javascript
let animationId;

function start() {
  function animate() {
    // ...
    animationId = requestAnimationFrame(animate);
  }
  animate();
}

function stop() {
  cancelAnimationFrame(animationId);
}
```

## React + Three.js (react-three-fiber)

Para usar estos patrones en React con R3F:

```jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function ToroidKnot() {
  return (
    <mesh>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshPhysicalMaterial
        color="#4488ff"
        metalness={0.3}
        roughness={0.6}
        clearcoat={0.8}
      />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ToroidKnot />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
```

## Referencias visuales

- **background-grid-webgl** → cyberpunk, Tron, dashboard backgrounds
- **globe-particles** → internacional, global, mapas, conexiones
- **webgl-3d-object** → tech product, hero, "innovación"
- **webgl-laser** → futurista, música, energía, señales
- **atmosphere-background** → aurora, space, dreamy, abstract
- **dither-background** → glitch, retro, indie, game dev
