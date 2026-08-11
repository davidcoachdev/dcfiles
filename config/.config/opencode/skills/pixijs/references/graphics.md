# Graphics — PixiJS v8

`Graphics` is the vector-drawing leaf. Draw a shape or path, then apply `fill()` and/or `stroke()`. Every method returns `this` for chaining. The instructions live on a `GraphicsContext` that can be shared between instances.

## Shapes

```ts
const g = new Graphics();
g.rect(x, y, w, h);
g.roundRect(x, y, w, h, radius);
g.circle(cx, cy, radius);
g.ellipse(cx, cy, halfW, halfH);
g.poly([x1, y1, x2, y2, ...]);        // flat point array
g.star(cx, cy, points, radius, innerRadius?, rotation?);
g.regularPoly(cx, cy, radius, sides, rotation?);
```

## Paths

```ts
g.moveTo(x, y)
 .lineTo(x, y)
 .bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
 .quadraticCurveTo(cpx, cpy, x, y)
 .arc(cx, cy, radius, startAngle, endAngle)
 .arcTo(x1, y1, x2, y2, radius)
 .closePath();
```

## Fill & stroke

```ts
g.rect(10, 10, 200, 100)
 .fill({ color: 0x3498db, alpha: 0.8 })
 .stroke({ width: 3, color: 0x2c3e50, alpha: 1, alignment: 0.5 });

g.circle(300, 60, 40).fill(0xe74c3c);   // color shorthand works
```

- `fill()` / `stroke()` accept a color (number) or options `{ color, alpha, width, alignment, texture, matrix }`.
- `alignment`: `0` = inner, `0.5` = centered, `1` = outer (stroke only).
- Call order matters: fill/stroke apply to the shapes drawn since the last style.

## Gradients

```ts
import { FillGradient } from 'pixi.js';

const grad = new FillGradient(0, 0, 0, 200); // linear, top→bottom
grad.addColorStop(0, 0xff0000);
grad.addColorStop(1, 0x0000ff);
g.rect(0, 0, 100, 200).fill(grad);

// Radial: new FillGradient({ type: 'radial', center: {x,y}, innerRadius, outerRadius, ... })
```

`FillPattern` wraps a `Texture` for tiled fills.

## Holes

```ts
g.rect(0, 0, 100, 100).fill(0x00ff00);
g.beginHole();
g.circle(50, 50, 30);
g.endHole();
```

## GraphicsContext sharing

```ts
import { Graphics, GraphicsContext } from 'pixi.js';
const ctx = new GraphicsContext().rect(0, 0, 50, 50).fill(0xffffff);
const a = new Graphics(ctx);
const b = new Graphics(ctx); // shares the same drawing instructions
```

## Utilities

- `g.clear()` — remove all drawing instructions.
- `g.clone()` — copy.
- `g.containsPoint(point)` — hit test.
- `g.bounds` / `g.getLocalBounds()` — bounding box.
- `g.cut()` — subtract a shape from the current path (even-odd).
