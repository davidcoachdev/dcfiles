# Performance — PixiJS v8

Profile before optimizing. PixiJS handles a lot out of the box; use browser DevTools Performance + GPU profiling first, then apply the targeted fix below.

## 1. Destroy with cleanup

```ts
import { Sprite, Assets } from 'pixi.js';

const texture = await Assets.load('character.png');
const sprite = new Sprite(texture);

sprite.destroy();                                          // sprite only, keep texture for reuse
sprite.destroy({ children: true, texture: true, textureSource: true }); // sprite + GPU texture
Assets.unload('character.png');                            // remove from cache + free GPU
```

## 2. App destroy / recreate

```ts
app.destroy({ releaseGlobalResources: true }); // drains global pools (batches, texture caches)
const newApp = new Application();
await newApp.init({ width: 800, height: 600 });
```

Without `releaseGlobalResources: true`, pooled objects from the old app leak into the new one (flicker/corruption).

## 3. Texture garbage collection

PixiJS auto-collects idle GPU resources via `GCSystem`. Defaults: checks every 30s, removes resources idle 60s.

```ts
await app.init({ gcActive: true, gcMaxUnusedTime: 120000, gcFrequency: 60000 });
```

(`textureGC.*` init options are deprecated since 8.15.0 — use these instead.)

## 4. Batching

Sprites sharing a base texture + similar state batch into one draw call. To maximize batching: reuse one atlas/texture, avoid constantly changing blend modes/filters/tints between neighbors, and keep shaders uniform.

## 5. Culling (skip off-screen)

```ts
import { extensions, CullerPlugin } from 'pixi.js';
extensions.add(CullerPlugin);
offscreenContainer.cullable = true;
offscreenContainer.cullArea = new Rectangle(0, 0, 256, 256);
```

## 6. cacheAsTexture (bake static groups)

```ts
container.cacheAsTexture(true);
container.updateCacheTexture(); // re-bake after changes
container.cacheAsTexture(false); // release
container.destroy({ children: true });
```

Use for complex static groups (UI panels, backgrounds) that don't change every frame.

## 7. Object pooling

Reuse `Sprite`/`Particle` instances instead of allocating per frame:

```ts
const pool: Sprite[] = [];
function getSprite() { return pool.pop() ?? new Sprite(texture); }
function freeSprite(s) { s.visible = false; pool.push(s); }
```

## 8. Text

Use `BitmapText` for many dynamic labels (see `references/text.md`). `Text` re-rasterizes on change.

## 9. Resolution / antialias tradeoffs

- `resolution: devicePixelRatio` + `autoDensity` = crisp but 4× pixels on Retina (more GPU). Lower it for huge canvases.
- `antialias: true` smooths edges at a perf cost; turn off for pixel-art (use `scaleMode: 'nearest'`).

## 10. Filters

Each filter is an off-screen pass. Set `filterArea` (see `references/filters.md`) and avoid filtering thousands of objects.
