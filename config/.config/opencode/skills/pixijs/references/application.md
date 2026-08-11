# Application — PixiJS v8

`Application` owns a renderer, a root `stage` Container, a canvas, and the Ticker/Resize/Culler plugins. The constructor takes no arguments; all config goes to the async `app.init()`.

## Lifecycle: construct → init → render → destroy

```ts
import { Application } from 'pixi.js';

const app = new Application();
await app.init({ width: 800, height: 600 });
document.body.appendChild(app.canvas);

// TickerPlugin calls app.render() each frame once init resolves (unless autoStart: false)
app.destroy(
  { removeView: true, releaseGlobalResources: true },
  { children: true, texture: true, textureSource: true },
);
```

- `new Application()` allocates the instance but creates nothing. Options passed here are ignored with a deprecation warning.
- `app.init(options)` is async; it builds the renderer and wires plugins. Must complete before using `app.canvas`, `app.renderer`, `app.screen`.
- `app.destroy(rendererDestroyOptions, stageDestroyOptions)` — first arg forwards to `renderer.destroy()`. Pass `true` or `{ removeView: true }` to remove the canvas. Add `releaseGlobalResources: true` to drain global pools (batches, texture caches) when tearing down and re-creating an app in the same tab; omitting it leaks pooled objects into the new app.

## Common init options

| Option | Purpose |
|---|---|
| `width` / `height` | Canvas size in pixels (ignored if `resizeTo` is set) |
| `resizeTo` | `window` or an Element — canvas auto-fits it |
| `background` / `backgroundColor` / `backgroundAlpha` | Clear color (CSS string or hex number) |
| `antialias` | Smooth edges (costs some perf) |
| `resolution` | Device pixel ratio; pair with `autoDensity: true` for crisp HiDPI |
| `autoDensity` | Scales canvas CSS size to match `resolution` |
| `preference` | `'webgl'` \| `'webgpu'` \| `['webgpu','webgl']` (fastest available) |
| `autoStart` | `false` to prevent the ticker from rendering automatically |
| `sharedTicker` | Use the global ticker instead of a per-app one |
| `canvas` | Provide your own canvas element |
| `eventFeatures` | Toggle subsets of the federated event system for perf |
| `gcActive` / `gcMaxUnusedTime` / `gcFrequency` | Texture GC tuning (ms) |
| `powerPreference` | `'high-performance'` \| `'low-power'` |

See `references/application-options.md` in the official repo for the exhaustive list.

## Access points

- `app.stage` — root Container.
- `app.renderer` — `WebGLRenderer` | `WebGPURenderer` | `CanvasRenderer` (check `app.renderer.name`).
- `app.canvas` — the `<canvas>` element.
- `app.screen` — Rectangle of the logical (CSS-pixel) size.
- `app.ticker` — the render loop.

## Manual render loop

```ts
const app = new Application();
await app.init({ autoStart: false, width: 800, height: 600 });
app.ticker.add(() => { /* update scene */ });
app.start(); // or call app.render() yourself
```

## CullerPlugin (off-screen skipping)

```ts
import { extensions, CullerPlugin } from 'pixi.js';
extensions.add(CullerPlugin);

myContainer.cullable = true;
myContainer.cullArea = new Rectangle(0, 0, 256, 256);
```
