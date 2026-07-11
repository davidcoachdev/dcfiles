---
name: matterjs
description: >
  2D physics engine for interactive UI, games, and dynamic visual effects.
  Covers Engine/World setup, Render/Runner config, bodies, constraints,
  mouse interaction, SPA cleanup, and offscreen pause.
  Trigger: When implementing 2D physics interactions, gravity simulations,
  draggable physics objects, or any Matter.js physics scene.
license: Apache-2.0
metadata:
  author: gentleman-programming (inspired by MengTo/Skills)
  version: "1.0"
---

## When to Use

- Interactive 2D physics (falling, bouncing, colliding elements)
- Draggable objects with physics behavior
- Gravity-based UI elements or games
- Physics sandbox, simulations, or data visualizations

---

## Core Setup

### Minimal (quick start)

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"></script>
<script>
  const { Engine, Render, Runner, Bodies, Composite } = Matter;

  const engine = Engine.create();

  const render = Render.create({
    element: document.body,
    engine: engine,
    options: { width: 800, height: 600, wireframes: false },
  });

  const runner = Runner.create();
  Runner.run(runner, engine);
  Render.run(render);

  // Static ground
  const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
  // Dynamic box
  const box = Bodies.rectangle(400, 200, 80, 80);

  Composite.add(engine.world, [ground, box]);
</script>
```

### ES Module (npm)

```bash
npm i matter-js
```

```js
import Matter from "matter-js";
const { Engine, Render, Runner, Bodies, Composite } = Matter;
```

---

## Common Patterns

### Bodies

```js
// Rectangle (static: platform, dynamic: falling)
const platform = Bodies.rectangle(x, y, width, height, { isStatic: true });
const box = Bodies.rectangle(x, y, width, height);

// Circle
const ball = Bodies.circle(x, y, radius);

// Polygon (sides = 3 for triangle, 6 for hexagon, etc.)
const hex = Bodies.polygon(x, y, 6, radius);

// Compound body (multiple parts as one physics object)
const compound = Body.create({
  parts: [
    Bodies.rectangle(0, 0, 100, 20),
    Bodies.rectangle(0, -20, 20, 40),
  ],
});
```

### Adding to World

```js
// Single
Composite.add(engine.world, body);

// Multiple
Composite.add(engine.world, [bodyA, bodyB, bodyC]);
```

---

## Mouse Interaction

```js
const { Mouse, MouseConstraint } = Matter;

const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse,
  constraint: {
    stiffness: 0.2,
    render: { visible: false },
  },
});

Composite.add(engine.world, mouseConstraint);
render.mouse = mouse;
```

### Mouse Constraint Options

```js
{
  mouse: mouse,
  constraint: {
    stiffness: 0.2,       // lower = more elastic
    damping: 0.1,         // resistance to motion
    render: { visible: false },
    // angularStiffness: 0.1, // for rotation
  },
}
```

---

## Constraints & Joints

```js
const { Constraint } = Matter;

// Pin body to a point in space
const constraint = Constraint.create({
  pointA: { x: 400, y: 100 },
  bodyB: box,
  pointB: { x: 0, y: 0 },
  stiffness: 0.9,
  length: 0,
});
Composite.add(engine.world, constraint);

// Connect two bodies
const rope = Constraint.create({
  bodyA: body1,
  bodyB: body2,
  stiffness: 0.8,
  length: 100,
});
```

---

## Collision Events

```js
const { Events } = Matter;

Events.on(engine, "collisionStart", (event) => {
  event.pairs.forEach((pair) => {
    console.log("Collision:", pair.bodyA.label, pair.bodyB.label);
  });
});

Events.on(engine, "collisionEnd", (event) => { /* ... */ });
```

---

## Render Options

```js
Render.create({
  element: container,
  engine,
  options: {
    width: 800,
    height: 600,
    wireframes: false,        // true = debug outlines
    background: "#0f0f0f",
    // showAngleIndicator: true,
    // showVelocity: true,
    // showCollisions: true,
  },
});
```

### Custom Rendering (no Matter.Render)

Use this when you want to draw bodies yourself (e.g., with canvas, PixiJS, Three.js).

```js
function customUpdate() {
  Engine.update(engine, 1000 / 60);
  // Your custom render loop here
  requestAnimationFrame(customUpdate);
}
customUpdate();
```

---

## SPA Cleanup

```js
function cleanupPhysics() {
  Runner.stop(runner);
  Render.stop(render);
  if (render.canvas.parentNode) {
    render.canvas.parentNode.removeChild(render.canvas);
  }
  Engine.clear(engine);
  Composite.clear(engine.world, false);
}
```

## Offscreen Pause (performance)

```js
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      Runner.run(runner, engine);
    } else {
      Runner.stop(runner);
    }
  },
  { threshold: 0 }
);
observer.observe(container);

// Cleanup observer when component unmounts
// observer.disconnect();
```

---

## Performance Rules

- ✅ Use `isStatic: true` for scenery/ground (doesn't simulate)
- ✅ Pause runner when offscreen (IntersectionObserver)
- ✅ Limit total bodies (< 200 for mobile)
- ❌ No wireframes in production (set `wireframes: false`)
- ❌ No `Render.run()` + custom render simultaneously
- ❌ No high `stiffness` on mouse constraints (feels janky)

## What to Ask the User

- Viewport size and canvas dimensions?
- Are we using Matter.Render or custom rendering?
- Mouse/touch drag interaction needed?
- Should physics pause when offscreen?
- Gravity direction (default: down)?
