---
name: gsap-react
description: >
  GSAP React patterns: useGSAP hook, refs, gsap.context(), cleanup, SSR compatibility.
  Trigger: When using GSAP in React components - animations, timelines, ScrollTrigger.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- GSAP animations in React
- useGSAP hook integration
- Component cleanup
- SSR projects
- Ref-based animations

## Critical Patterns

### Setup & Imports

```typescript
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

### useGSAP (RECOMMENDED)

```typescript
function MyComponent() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.to(".box", { x: 100, duration: 0.5 });
  }, { scope: containerRef });  // REQUIRED: scope prevents global selector leaks

  return (
    <div ref={containerRef}>
      <div className="box" />
    </div>
  );
}
```

### useGSAP with ScrollTrigger

```typescript
function ScrollSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.to(".item", {
      x: 200,
      scrollTrigger: {
        trigger: ".item",
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef}>
      <div className="item">Content</div>
    </section>
  );
}
```

### useGSAP Options

```typescript
useGSAP(callback, options);

// Available options:
{
  scope: ref | ".selector" | document,  // Required for scoped selectors
  dependencies?: [],                      // Re-run when these change
  revertOnKill?: boolean,                // Auto-cleanup (default: true)
}
```

### Without useGSAP (Legacy Pattern)

```typescript
// Only if useGSAP unavailable
function LegacyComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".box", { x: 100 });
    }, containerRef);

    return () => ctx.revert();  // Cleanup REQUIRED
  }, []);

  return <div ref={containerRef}><div className="box" /></div>;
}
```

### Multiple Animations

```typescript
function MultiAnimation() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".a", { x: 100 })
      .to(".b", { y: 50 }, "<")
      .to(".c", { opacity: 0 });

    return () => tl.kill();  // Or rely on revertOnKill
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <div className="a" />
      <div className="b" />
      <div className="c" />
    </div>
  );
}
```

### Dynamic Values from Props

```typescript
function DynamicAnimation({ delay = 0 }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.to(".box", {
      x: 100,
      delay,
      duration: 0.5
    });
  }, { scope: containerRef, dependencies: [delay] });  // Re-run when delay changes

  return (
    <div ref={containerRef}>
      <div className="box" />
    </div>
  );
}
```

### SSR Compatibility

```typescript
// useGSAP handles SSR automatically
// For manual handling:

function ServerComponent() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Only runs on client
  }, { scope: containerRef });

  // Or check for window
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.to(".box", { x: 100 });
    }
  }, []);

  return <div ref={containerRef}><div className="box" /></div>;
}
```

## Cleanup (CRITICAL)

```typescript
// useGSAP auto-cleans when component unmounts
// But explicit cleanup is recommended for complex cases:

useGSAP(() => {
  const tl = gsap.timeline();
  // ... animations

  return () => {
    tl.kill();  // Explicit cleanup
  };
}, { scope: containerRef });

// Or disable auto-cleanup:
useGSAP(() => {
  // animations
}, { scope: containerRef, revertOnKill: false });
```

## Commands

```bash
npm install gsap @gsap/react
```

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]