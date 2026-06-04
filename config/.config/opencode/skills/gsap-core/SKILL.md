---
name: gsap-core
description: >
  GSAP core API patterns: gsap.to(), from(), fromTo(), easing, duration, stagger, defaults.
  Trigger: When using GSAP for animations - vanilla JS or any framework.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Creating single tweens (not timelines)
- Animating CSS properties, transforms, colors
- Setting default animations
- Using staggers for批量 animations

## Critical Patterns

### Imports & Registration

```typescript
import { gsap } from "gsap";

// Plugins registered once per app
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```

### Transform Aliases (PREFER THESE)

GSAP provides shortcuts — USE THEM:

| Alias | Maps to |
|-------|---------|
| `x` | `transform: translateX()` |
| `y` | `transform: translateY()` |
| `xPercent` | `transform: translateX()` |
| `yPercent` | `transform: translateY()` |
| `rotation` | `transform: rotate()` |
| `rotationX`, `rotationY` | `transform: rotateX/Y()` |
| `scale` | `transform: scale()` |
| `scaleX`, `scaleY` | `transform: scaleX/Y()` |
| `skewX`, `skewY` | `transform: skewX/Y()` |

### autoAlpha

Use `autoAlpha` INSTEAD of `opacity` when toggling visibility:
- Animates to `opacity: 0` AND sets `visibility: hidden` (improves performance)
- Animates to `opacity > 0` AND sets `visibility: visible`

```typescript
// ✅ DO THIS
gsap.to(element, { autoAlpha: 0, duration: 0.5 });

// ❌ NOT THIS
gsap.to(element, { opacity: 0, visibility: "hidden", duration: 0.5 });
```

## Basic Syntax

### gsap.to()

```typescript
gsap.to(target, {
  x: 100,
  y: 50,
  rotation: 360,
  scale: 1.5,
  autoAlpha: 1,
  duration: 0.8,
  ease: "power2.inOut",
  delay: 0.1,
});
```

### gsap.from()

```typescript
gsap.from(target, {
  x: -100,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
});
```

### gsap.fromTo()

```typescript
gsap.fromTo(target,
  { x: -50, opacity: 0 },
  { x: 0, opacity: 1, duration: 0.5 }
);
```

## Stagger

```typescript
// Simple stagger - 0.1s between each
gsap.to(".box", { x: 100, stagger: 0.1 });

// Stagger with function
gsap.to(".box", {
  x: 100,
  stagger: (i, target) => i * 0.1
});

// Stagger by index in from
gsap.from(".card", {
  y: 50,
  opacity: 0,
  stagger: 0.1,
  delay: 0.2
});
```

## Defaults

```typescript
// Set global defaults
gsap.defaults({
  duration: 0.5,
  ease: "power2.out",
});

// Per-animation overrides work
gsap.to(element, { duration: 1, ease: "elastic.out" });
```

## Keyframe Animations

```typescript
gsap.to(element, {
  keyframes: [
    { x: 100, duration: 0.2 },
    { y: 50, duration: 0.3 },
    { x: 0, y: 0, duration: 0.4 }
  ]
});
```

## Easing Reference

| Ease | Use Case |
|------|----------|
| `"none"` | Linear, no easing |
| `"power1"`, `"power2"`, `"power3"`, `"power4"` | Quadratic/cubic/quartic ease |
| `"power1.in"`, `"power2.out"`, etc. | In/out variations |
| `"back.out"`, `"back.inOut"` | Overshoot effect |
| `"elastic.out"` | Spring-like bounce |
| `"bounce.out"` | Bounce effect |
| `"circ.out"`, `"circ.inOut"` | Circular easing |
| `"expo.out"`, `"expo.inOut"` | Exponential |

## Commands

```bash
# Install GSAP
npm install gsap

# Install plugins
npm install gsap ScrollTrigger
```

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]