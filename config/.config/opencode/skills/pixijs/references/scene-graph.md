# Scene Graph — PixiJS v8

The scene graph is a tree of `Container` nodes; leaves (`Sprite`, `Graphics`, `Text`, `Mesh`, `Particle`) render pixels. `app.stage` is the root.

## Container basics

```ts
import { Container, Graphics } from 'pixi.js';

const root = new Container();
app.stage.addChild(root);

const box = new Graphics().rect(0, 0, 50, 50).fill(0xff0000);
root.addChild(box);

root.removeChild(box);
root.removeChildren();
```

- `addChild` / `addChildAt` / `removeChild` / `removeChildren`.
- Children render in array order (later = on top). Use `zIndex` + `sortableChildren = true` to sort by depth.
- `container.toGlobal(point)` / `container.toLocal(point)` convert coordinates between trees.

## Transforms

Every display object has `position` (`x`/`y`), `scale` (`x`/`y`), `rotation` (radians), `angle` (degrees), `pivot`, `skew`, and `alpha`.

```ts
box.position.set(100, 50);
box.scale.set(2);
box.rotation = Math.PI / 4;
box.alpha = 0.5;
box.visible = false; // skipped in render, still in tree
```

- `anchor` exists on `Sprite`/`Text` (0..1), not on `Container`.
- `width`/`height` are derived from scale × local bounds — setting them adjusts scale.

## Bounds

```ts
const b = box.getBounds();      // in screen space
const lb = box.getLocalBounds(); // in local space
console.log(b.x, b.y, b.width, b.height);
```

## Masks

```ts
import { Graphics } from 'pixi.js';
const mask = new Graphics().circle(0, 0, 80).fill(0xffffff);
app.stage.addChild(mask);
sprite.mask = mask; // mask must be in the scene graph
```

`Graphics` can also act as a stencil mask via `beginMask`/`endMask` on a `GraphicsContext`.

## RenderLayer (advanced ordering)

For cross-tree ordering without reparenting, assign `container.parentRenderLayer = new RenderLayer()` and add the layer to the stage. Useful for HUD/overlay layers that always render above world content.

## Destroy

```ts
box.destroy({ children: true }); // remove from parent + free children
```

Always destroy removed subtrees to free GPU memory (see `references/performance.md`).
