# Migrating v7 → v8 — breaking-change checklist

Work top-down: imports → Application init → Graphics → Text → events → shaders/filters → cleanup.

## Initialization

**Async `app.init()`**
```ts
// v8
const app = new Application();
await app.init({ width: 800, height: 600 });
document.body.appendChild(app.canvas);
```
Fail: passing options to `new Application({...})` and using synchronously (ignored + deprecation warning).

**`app.canvas` replaces `app.view`** — `app.view` emits a deprecation warning.

**Type parameter**
```ts
new Application<Renderer<HTMLCanvasElement>>(); // v8
// was: new Application<HTMLCanvasElement>();
```

## Imports

**Single package**
```ts
import { Sprite, Application, Assets, Graphics } from 'pixi.js';
```
Fail: importing from deprecated v7 `@pixi/*` core sub-packages. **Deprecated `@pixi/*` (never use):** `@pixi/accessibility`, `@pixi/app`, `@pixi/assets`, `@pixi/compressed-textures`, `@pixi/core`, `@pixi/display`, `@pixi/events`, `@pixi/extensions`, `@pixi/extract`, `@pixi/filter-*`, `@pixi/graphics`, `@pixi/mesh*`, `@pixi/particle-container`, `@pixi/prepare`, `@pixi/sprite*`, `@pixi/spritesheet`, `@pixi/text*`. Supplemental packages like `@pixi/sound` are still valid.

**Custom builds** — the `@pixi/unsafe-eval` shim is replaced by `pixi.js/unsafe-eval` for strict-CSP environments.

## Graphics

```ts
// v7
const g = new Graphics();
g.beginFill(0xff0000);
g.drawRect(0, 0, 100, 100);
g.endFill();
g.lineStyle(2, 0x000000);
g.drawCircle(50, 50, 20);

// v8
const g = new Graphics();
g.rect(0, 0, 100, 100).fill(0xff0000);
g.circle(50, 50, 20).stroke({ width: 2, color: 0x000000 });
```
- `beginFill`/`endFill`/`lineStyle`/`drawRect`/`drawCircle`/`drawShape` removed.
- Draw shape, then `.fill()`/`.stroke()` (chainable).
- `cacheAsBitmap` → `cacheAsTexture(true)`.

## Text

```ts
// v7
new Text('hi', { fontFamily: 'Arial', fontSize: 24 });

// v8
new Text({ text: 'hi', style: { fontFamily: 'Arial', fontSize: 24 } });
```
- Constructor takes an options object `{ text, style }`.
- `style.fill` accepts a color; `style.stroke` is `{ color, width }`, not a string.

## Events

```ts
// v7
sprite.interactive = true;
sprite.on('click', fn);

// v8
sprite.eventMode = 'static';
sprite.on('pointertap', fn);
```
- `interactive` → `eventMode: 'static'`.
- `click`/`tap` → `pointertap`; mouse/touch events unified into pointer events.

## Shaders / filters

- `Shader.from(...)` now takes `GlProgram`/`GpuProgram`; uniforms wrapped in `UniformGroup` (UBO-friendly). See `references/filters.md` + official `pixi-filters`.
- `Filter` constructor changed; prefer `Filter.from({ glProgram, gpuProgram, resources })`.

## BaseTexture → TextureSource

```ts
// v7
texture.baseTexture;
// v8
texture.source; // TextureSource
```

## DisplayObject removed

`DisplayObject` base class is gone — use `Container`. `Container` is the universal node.

## Ticker

```ts
// v7
app.ticker.add((delta) => { /* delta is a raw number */ });

// v8
app.ticker.add((ticker) => { /* ticker.deltaTime / ticker.deltaMS */ });
```
The callback receives a `Ticker` instance, not a raw number. Use `ticker.deltaTime` (frame-normalized) or `ticker.deltaMS` (milliseconds).

## settings / utils removed

Global `settings` and many `utils` helpers moved into per-module APIs or removed. Replace `PIXI.settings.X` with the corresponding `app.init()` option or extension config.
