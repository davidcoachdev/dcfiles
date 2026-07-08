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

## Common Pitfalls (from MengTo)

### ❌ Animating layout properties → jank
```typescript
// ❌ Triggers layout/reflow
gsap.to(element, { left: 100, top: 50, width: 200 });

// ✅ GPU accelerated
gsap.to(element, { x: 100, y: 50, scale: 1.5 });
```

### ❌ ScrollTrigger not firing
- Ensure trigger element exists and has height
- Check for nested scroll containers (need `scroller` config)
- Call `ScrollTrigger.refresh()` after dynamic content loads

### ❌ Not cleaning up in SPAs
```typescript
// ✅ Use gsap.context() in React/Vue
const ctx = gsap.context(() => {
  gsap.to(element, { x: 100 });
}, scopeRef);
return () => ctx.revert();
```

### ❌ FOUC before fonts/images load
- Initialize after layout is stable
- Run `ScrollTrigger.refresh()` after images finish loading

## What to Ask the User (Requirements)

When requirements are unclear, ask:
1. Is this a **static site** or **SPA** (React/Next/Vue)? Any page transitions?
2. Do we need **scroll-driven sections** (pin/scrub/snap)?
3. **Performance constraints**: mobile support, reduced motion preferences?
4. Is this **decorative** (hero) or **functional 3D** (product viewer)?
5. Target devices: mobile? older devices?

## Quick Recipes (from MengTo)

### Hero Entrance (Stagger)
```typescript
gsap.from(".hero [data-anim]", {
  y: 24,
  autoAlpha: 0,
  duration: 0.8,
  ease: "power2.out",
  stagger: 0.06,
});
```

### Sequenced Timeline
```typescript
const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.6 } });
tl.from(".nav", { y: -20, autoAlpha: 0 })
  .from(".hero-title", { y: 30, autoAlpha: 0 }, "-=0.2")
  .from(".hero-cta", { scale: 0.95, autoAlpha: 0 }, "-=0.2");
```

### Scroll-Scrub Pinned Section
```typescript
gsap.registerPlugin(ScrollTrigger);

gsap.timeline({
  scrollTrigger: {
    trigger: ".story",
    start: "top top",
    end: "+=800",
    scrub: 1,
    pin: true,
  },
}).to(".story .panel", { xPercent: -200 });
```

## External Resources

- [Official Documentation]