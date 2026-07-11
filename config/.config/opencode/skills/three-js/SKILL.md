# Three.js

Guía rápida de patrones y configuraciones para Three.js visuales en el browser.

## Cuando usar este skill

- Necesitás un objeto 3D en una landing page
- Querés partículas, fondos animados o visuales con WebGL
- Estás usando react-three-fiber (R3F) o Three.js vanilla

## Setup Básico

```javascript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Objeto simple
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhysicalMaterial({ color: 0x4488ff, metalness: 0.3, roughness: 0.6 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

camera.position.z = 3;

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
```

## Geometrías Comunes

```javascript
new THREE.BoxGeometry(1, 1, 1);
new THREE.SphereGeometry(1, 32, 32);
new THREE.TorusGeometry(1, 0.3, 16, 100);
new THREE.TorusKnotGeometry(1, 0.3, 128, 16); // el más vistoso
new THREE.IcosahedronGeometry(1, 0);
new THREE.PlaneGeometry(2, 2);
new THREE.CylinderGeometry(1, 1, 2, 32);
```

## Materiales

```javascript
// Básico (sin luces)
new THREE.MeshBasicMaterial({ color: 0x4488ff, wireframe: true });

// Estándar (con luces)
new THREE.MeshStandardMaterial({ color: 0x4488ff, metalness: 0.3, roughness: 0.6 });

// Físico (con clearcoat)
new THREE.MeshPhysicalMaterial({
  color: 0x4488ff,
  metalness: 0.0,
  roughness: 0.2,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
  transparent: true,
  opacity: 0.9
});
```

## Luces Rápidas

```javascript
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

const directional = new THREE.DirectionalLight(0xffffff, 1);
directional.position.set(5, 5, 5);
scene.add(directional);

const point = new THREE.PointLight(0x4488ff, 2, 10);
point.position.set(2, 3, 4);
scene.add(point);
```

## OrbitControls

```javascript
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.0;
```

## Responsive

```javascript
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
```

## Cleanup

```javascript
function cleanup() {
  renderer.dispose();
  scene.traverse(obj => {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) obj.material.dispose();
  });
  cancelAnimationFrame(animationId);
}
```

## Patrón: Background de Partículas

Ver `canvas-webgl-patterns` para globe-particles.

## Patrón: Post-Processing (Bloom)

```javascript
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.3, 0.5, 0.1);
composer.addPass(bloom);

// En el loop, usar composer.render() en vez de renderer.render()
```

## Errores Comunes

- **No se ve nada**: 90% es la cámara apuntando mal o la escena sin luces
- **Performance**: Reducir polygon count, limitar draw calls, usar BufferGeometry
- **Mobile**: Testear sin post-processing, reducir pixel ratio
- **Memory leaks**: Siempre dispose() al desmontar
