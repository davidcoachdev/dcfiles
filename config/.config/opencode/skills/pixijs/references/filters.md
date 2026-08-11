# Filters — PixiJS v8

Attach effects by assigning one filter (or an array) to `container.filters`. Filters run on the GPU per affected object.

## Built-in filters

```ts
import { AlphaFilter, BlurFilter, ColorMatrixFilter, DisplacementFilter, NoiseFilter, Sprite, Assets } from 'pixi.js';

const sprite = new Sprite(await Assets.load('hero.png'));

const alpha = new AlphaFilter({ alpha: 0.5 });

const blur = new BlurFilter({
  strength: 4,            // overall blur (strengthX/strengthY split axes)
  quality: 4,             // passes; higher = smoother, slower
  kernelSize: 5,          // must be odd: 5,7,9,...,15
  repeatEdgePixels: false,
});

const colorMatrix = new ColorMatrixFilter();
colorMatrix.brightness(1.5, false);     // (value, multiply) — multiply stacks on existing
colorMatrix.contrast(0.5, true);
colorMatrix.alpha = 0.7;                 // blend strength vs original
// presets: tint, hue, saturate, greyscale, sepia, negative, night, vintage, lsd, reset...

const dispTex = await Assets.load('displacement_map.png');
const disp = new DisplacementFilter({ sprite: new Sprite(dispTex), scale: { x: 20, y: 10 } });

const noise = new NoiseFilter({ noise: 0.5, seed: Math.random() });

sprite.filters = [blur, colorMatrix, disp, noise];
```

- `alpha` is a uniform transparency (no per-child layering needed).
- `colorMatrix.matrix` is the raw 20-element array for full control.

## Filter options

```ts
const blur = new BlurFilter({ strength: 4, antialias: 'on', blendRequired: false });
```

- `resolution` — filter texture resolution.
- `padding` — extra space around the object so the effect isn't clipped.
- `antialias` — smooth the filter's internal render.
- `blendRequired` — when the filter needs source blending.

## filterArea (perf)

Limit the region a filter samples to avoid full-screen passes:

```ts
import { Rectangle } from 'pixi.js';
container.filterArea = new Rectangle(0, 0, 800, 600);
```

## Custom filters (GLSL / WGSL)

```ts
import { Filter, GlProgram, GpuProgram } from 'pixi.js';

const filter = Filter.from({
  glProgram: GlProgram.from({ vertex, fragment }),   // GLSL
  gpuProgram: GpuProgram.from({ vertex, fragment }), // WGSL (WebGPU)
  resources: { uniforms: { uTime: 0 } },
});
filter.resources.uniforms.uTime = performance.now() / 1000;
```

See `references/uniform-types.md` in the official repo for uniform type mapping. Custom filters are covered in depth by the `pixi-filters` community package and `references/custom-rendering`.

## pixi-filters (community)

```bash
npm install pixi-filters
```

Adds `AdvancedBloomFilter`, `GlowFilter`, `DropShadowFilter`, `ShockwaveFilter`, `CRTFilter`, `ColorReplaceFilter`, and many more.

## Gotchas

- Filters force an off-screen render pass — use sparingly on many objects.
- Set `filterArea` to bound cost.
- Arrays of filters run in sequence (each is a separate pass).
