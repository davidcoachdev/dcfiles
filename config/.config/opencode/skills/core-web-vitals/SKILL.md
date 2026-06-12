---
name: core-web-vitals
description: >
  Specialized skill for the three Core Web Vitals that affect Google Search ranking: LCP,
  INP, and CLS. Focused on metric-specific diagnosis and optimization with concrete thresholds.
  Trigger: When improving Core Web Vitals, fixing LCP, reducing CLS, optimizing INP, debugging
  page experience signals, or preparing for a CWV audit.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Diagnosing poor LCP/INP/CLS scores
- Optimizing for Google page experience ranking
- Pre-launch CWV verification
- Field data (CrUX) debugging
- Lab vs field data reconciliation

## The Three Metrics (Google ranking signals)

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** Largest Contentful Paint | ≤ 2.5s | 2.5s – 4.0s | > 4.0s |
| **INP** Interaction to Next Paint | ≤ 200ms | 200ms – 500ms | > 500ms |
| **CLS** Cumulative Layout Shift | ≤ 0.1 | 0.1 – 0.25 | > 0.25 |

**75th percentile of real users** is the threshold — measured in the field, not lab.

## LCP: Largest Contentful Paint

What it measures: render time of the largest visible element (image, video, block-level text).

### Subparts (debug in DevTools Performance tab)
1. **TTFB** (Time to First Byte) — server response
2. **Render delay** — when browser starts rendering
3. **Load delay** — element fetch time

### Common causes
- Slow TTFB (server, no edge cache, no Early Hints)
- Render-blocking resources (CSS, sync JS)
- LCP image not preloaded, no `fetchpriority="high"`
- Web fonts blocking first paint (FOIT)
- Client-side rendering with no SSR/SSG

### Fixes
- CDN + edge cache HTML
- Preload LCP image: `<link rel="preload" href="/hero.webp" as="image" fetchpriority="high">`
- SSR/SSG the LCP element
- Defer non-critical CSS, inline critical
- Use `font-display: swap` + preload font
- AVIF/WebP with `<picture>` + `srcset`
- HTTP 103 Early Hints

## INP: Interaction to Next Paint

What it measures: latency of every interaction (click, tap, key) → next paint. Replaced FID in March 2024.

### Common causes
- Long tasks (>50ms) blocking main thread
- Large JS bundles / heavy hydration
- Synchronous XHR, forced reflows during handlers
- Heavy third-party scripts (analytics, tag managers)
- React-style re-renders without memoization

### Fixes
- **Break up long tasks** with `scheduler.yield()` or `setTimeout(0)` between chunks
- Code split by route + by interaction
- Debounce/throttle expensive handlers
- Use `content-visibility: auto` for off-screen sections
- Web Workers for heavy computation
- Reduce DOM size (target < 1500 nodes per section)

```javascript
// Break long task
async function processItems(items) {
  for (const item of items) {
    process(item);
    if (items.indexOf(item) % 50 === 0) {
      await new Promise(r => setTimeout(r, 0));  // yield
    }
  }
}
```

## CLS: Cumulative Layout Shift

What it measures: sum of all unexpected layout shifts during page lifetime.

```
CLS = (impact fraction) × (distance fraction)
```

### Common causes
- Images/embeds without `width`/`height` (or `aspect-ratio`)
- Ads, iframes, embeds injected dynamically
- Web fonts causing FOIT/FOUT shift
- Late-loading CSS (FOUC) changing layout
- Animations that trigger layout (not just transform/opacity)

### Fixes
- **Always set dimensions:** `<img width="1200" height="600">` or `aspect-ratio: 16/9`
- **Reserve space** for ads/embeds with min-height containers
- **`font-display: optional`** or `size-adjust` to match fallback metrics
- Use `transform`/`opacity` for animations, not `top`/`left`/`width`
- Avoid inserting content above existing content

```css
/* Match fallback to web font metrics */
@font-face {
  font-family: 'Inter';
  src: url('/Inter.woff2') format('woff2');
  size-adjust: 107%;
  ascent-override: 90%;
}
```

## Lab vs Field

- **Lab (Lighthouse, WebPageTest):** single device, single network — useful for debugging
- **Field (CrUX, RUM):** real users, real devices — what Google ranks on
- Both must pass. Lab green + field red = invisible to user. Field green + lab red = luck.

```javascript
import {onLCP, onINP, onCLS} from 'web-vitals';
onLCP(console.log); onINP(console.log); onCLS(console.log);
```

## Quick Wins (ordered by impact)

1. Preload LCP image with `fetchpriority="high"`
2. Set `width`/`height` on all `<img>` and `<video>`
3. `font-display: swap` + preload critical fonts
4. Defer non-critical CSS, inline critical above-the-fold
5. Code split by route
6. Break long tasks with `scheduler.yield()`
7. Send HTTP 103 Early Hints

## Related Skills

- `web-performance` — full perf optimization toolkit
- `web-quality-audit` — full-site audit orchestrator
