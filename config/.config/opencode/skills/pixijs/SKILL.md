---
name: pixijs
description: Use this skill when building 2D graphics, games, or interactive visualizations with PixiJS. Handles WebGL rendering, sprites, animations, and graphics.
---

# PixiJS Development

Use PixiJS for high-performance 2D WebGL rendering.

## When to use

- Building 2D games or interactive experiences
- Creating rich animated graphics for web
- Need GPU-accelerated 2D rendering
- Sprite-based animations
- Canvas/WebGL visualizations

## Setup

```bash
# New project
npm create pixi.js@latest

# Add to existing project
npm install pixi.js
```

## Core Concepts

### Application

```typescript
import { Application } from 'pixi.js';

const app = new Application();
await app.init({ width: 800, height: 600, background: '#1099bb' });
document.body.appendChild(app.canvas);
```

### Sprites

```typescript
import { Sprite, Assets } from 'pixi.js';

const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
const sprite = new Sprite(texture);
sprite.x = 100;
sprite.y = 100;
app.stage.addChild(sprite);
```

### Graphics (shapes)

```typescript
import { Graphics } from 'pixi.js';

const graphics = new Graphics();
graphics.rect(0, 0, 100, 100);
graphics.fill(0xff0000);
app.stage.addChild(graphics);
```

### Text

```typescript
import { Text } from 'pixi.js';

const text = new Text({ text: 'Hello!', style: { fontFamily: 'Arial', fontSize: 24 } });
app.stage.addChild(text);
```

### Animations

```typescript
// Ticker for game loop
app.ticker.add((ticker) => {
  sprite.rotation += 0.01 * ticker.deltaTime;
});
```

## Best Practices

- Use **Assets.load()** for async asset loading
- Use **Container** to organize scene hierarchy
- Use **Ticker** for animations (not setInterval)
- Use **Graphics** for programmatic shapes (no images needed)
- Use **ParticleContainer** for many sprites (faster)
- Use **RenderTexture** for effects

## Gotchas

- PixiJS v8 uses **await app.init()** instead of constructor
- Use **app.canvas** (not app.view) in v8
- Textures must be loaded before creating sprites
- Use **destroy()** to clean up (prevent memory leaks)
- Coordinates start at top-left (0,0)

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]