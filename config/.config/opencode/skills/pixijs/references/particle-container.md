# ParticleContainer — PixiJS v8

`ParticleContainer` renders hundreds to tens of thousands of lightweight sprites in a **single draw call**. Use it for particle effects, bullet patterns, or any large set of similar-looking objects.

## Quick start

```ts
import { ParticleContainer, Particle, Rectangle, Assets } from 'pixi.js';

const texture = await Assets.load('particle.png');

const container = new ParticleContainer({
  texture,                                   // shared base texture for all particles
  boundsArea: new Rectangle(0, 0, app.screen.width, app.screen.height),
  dynamicProperties: {
    position: true,    // updates every frame
    rotation: false,   // static → faster
    color: false,
    // uvs: false, vertex: false
  },
});

for (let i = 0; i < 10000; i++) {
  container.addParticle(new Particle({
    texture,
    x: Math.random() * app.screen.width,
    y: Math.random() * app.screen.height,
  }));
}

app.stage.addChild(container);
```

## Rules

- Use `addParticle` / `removeParticle` (NOT `addChild`). `ParticleContainer` rejects normal children.
- Particles are not `Container` children — they have a restricted transform set (position, scale, rotation, tint, alpha, anchor).
- Wrap the `ParticleContainer` in a `Container` if you need to group it with other scene objects.
- All particles should share one base texture (atlas a sheet for variety).

## dynamicProperties

Lists which per-particle attributes change each frame. Anything `false` is uploaded once:

| Property | What it controls |
|---|---|
| `position` | x/y translation |
| `rotation` | rotation (radians) |
| `color` | tint + alpha |
| `uvs` | texture coordinates (animating within an atlas) |
| `vertex` | scale / anchor (per-vertex) |

Keep as many as possible `false`. Animating `position` + `rotation` while `color`/`uvs`/`vertex` stay `false` is the common fast config.

## Updating

```ts
container.particleChildren[0].x = 10; // mutate particles directly
// With dynamicProperties.position true, changes show next frame
container.update(); // force a re-upload if needed
```

## boundsArea

Set `boundsArea` so the container's bounds don't have to be computed from children (perf). Omit to auto-compute.

## When NOT to use

If objects need individual event handling, masks, or children, use a normal `Sprite` in a `Container` instead — `ParticleContainer` trades features for speed.
