# Assets — PixiJS v8

`Assets` loads and caches resources by key. Always `await` before using the result.

## Basic load

```ts
import { Assets, Sprite, Texture } from 'pixi.js';

const texture = await Assets.load('bunny.png');        // auto-detected type
const sprite = new Sprite(texture);

const texture2 = await Assets.load<Texture>({ src: 'hero.png', data: { scaleMode: 'nearest' } });
```

- Returns the resolved asset; `Assets.load` understands images, atlases, fonts, video, audio, JSON.
- `Assets.get('key')` returns a previously loaded asset synchronously (throws if not loaded).

## Bundles & manifests

Group related assets and load them together (shows progress easily).

```ts
import { Assets } from 'pixi.js';

// Define a bundle
Assets.addBundle('game', {
  bunny: 'bunny.png',
  button: 'button.png',
  font: 'font.fnt', // BitmapFont
});

// Or from a manifest
await Assets.init({ manifest: { bundles: [{ name: 'game', assets: { bunny: 'bunny.png' } }] });

const assets = await Assets.loadBundle('game');
const sprite = new Sprite(assets.bunny);
```

## Spritesheets (atlases)

```ts
const sheet = await Assets.load('sheet.json'); // TexturePacker / pixi atlas
const frame = sheet.textures['frameName'];
const sprite = new Sprite(frame);
```

## Fonts

```ts
await Assets.load('font.ttf');                 // web font
await Assets.load({ src: 'font.fnt', data: { family: 'MyFont' } }); // BitmapFont
```

## Video textures

```ts
import { Assets, Sprite } from 'pixi.js';
const videoTex = await Assets.load('clip.mp4'); // VideoSource
const sprite = new Sprite(videoTex);
```

Control playback via the underlying `HTMLVideoElement` (`videoTex.source` / `videoTex.resource`).

## GIFs (needs `pixi.js/gif`)

```ts
import { GifSprite } from 'pixi.js/gif';
const gif = await Assets.load('anim.gif');
const sprite = new GifSprite({ source: gif, autoPlay: true });
```

## SVG

```ts
const tex = await Assets.load({ src: 'icon.svg', data: { scaleMode: 'linear', resolution: 2 } });
```

## Unload (free GPU memory)

```ts
Assets.unload('bunny.png');     // removes from cache + frees GPU resource
Assets.unloadBundle('game');
```

Use this when a screen/level is torn down. See `references/performance.md` for memory strategy.
