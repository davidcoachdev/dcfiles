---
name: web-performance
description: >
  Frontend web performance optimization for faster loading and better user experience.
  Covers critical rendering path, image optimization, font loading, code splitting, caching,
  and runtime performance. Distinct from load/stress testing (see performance-tester).
  Trigger: When optimizing web performance, speeding up a site, reducing load time, fixing
  slow loading, or improving page speed.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Optimizing web page load time
- Reducing JS/CSS/image weight
- Implementing preload/preconnect/lazy-loading
- Tuning cache headers and service workers
- Runtime performance (layout thrash, long tasks, jank)
- NOT for load/stress testing → use `performance-tester`

## Performance Budget

| Resource | Budget | Why |
|----------|--------|-----|
| Total page weight | < 1.5 MB | 3G loads in ~4s |
| JavaScript (compressed) | < 300 KB | Parse + execution time |
| CSS (compressed) | < 100 KB | Render blocking |
| Images (above-fold) | < 500 KB | LCP impact |
| Fonts | < 100 KB | FOIT/FOUT prevention |
| Third-party | < 200 KB | Uncontrolled latency |

## Critical Rendering Path

### Server response
- **TTFB < 800ms.** Use CDN, edge cache, efficient backends.
- **Enable Brotli** (15-20% smaller than gzip) for text assets.
- **HTTP/2 or HTTP/3.** Multiplexing cuts connection overhead.
- **Edge cache HTML** when possible.
- **Send 103 Early Hints** for slow origins — `Link: </hero.webp>; rel=preload; as=image` lets the browser fetch before the 200 lands. Cloudflare reports 20-30% LCP improvement.

### Resource loading

```html
<!-- Preconnect to required origins -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://cdn.example.com" crossorigin>

<!-- Preload critical resources -->
<link rel="preload" href="/hero.webp" as="image" fetchpriority="high">
<link rel="preload" href="/font.woff2" as="font" type="font/woff2" crossorigin>

<!-- Defer non-critical CSS -->
<link rel="preload" href="/styles.css" as="style"
      onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/styles.css"></noscript>
```

### Prerender with Speculation Rules

```html
<script type="speculationrules">
{
  "prerender": [{
    "where": { "href_matches": "/*" },
    "eagerness": "moderate"
  }]
}
</script>
```

`moderate` triggers after ~200ms hover — intent-correlated, rarely wasted.

## JavaScript Optimization

```html
<!-- Parser-blocking (avoid) -->
<script src="/critical.js"></script>

<!-- Deferred (preferred) -->
<script defer src="/app.js"></script>

<!-- Async (independent scripts) -->
<script async src="/analytics.js"></script>

<!-- Module (deferred by default) -->
<script type="module" src="/app.mjs"></script>
```

```javascript
// Route-based splitting
const Dashboard = lazy(() => import('./Dashboard'));

// Component-based splitting
const HeavyChart = lazy(() => import('./HeavyChart'));

// Feature-based
if (user.isPremium) {
  const Premium = await import('./PremiumFeatures');
}
```

**Tree shaking:** `import debounce from 'lodash/debounce'` not `import _ from 'lodash'`.

## Image Optimization

| Format | Use case | Support |
|--------|----------|---------|
| AVIF | Photos, best compression | 92%+ |
| WebP | Photos, fallback | 97%+ |
| PNG | Graphics with transparency | Universal |
| SVG | Icons, logos | Universal |

**Responsive images with picture:**
```html
<picture>
  <source type="image/avif" srcset="hero-400.avif 400w, hero-800.avif 800w"
          sizes="(max-width: 600px) 100vw, 50vw">
  <source type="image/webp" srcset="hero-400.webp 400w, hero-800.webp 800w"
          sizes="(max-width: 600px) 100vw, 50vw">
  <img src="hero-800.jpg" width="1200" height="600"
       alt="Hero" loading="lazy" decoding="async">
</picture>
```

**LCP image priority:**
```html
<img src="hero.webp" fetchpriority="high" loading="eager" decoding="sync" alt="Hero">
```

## Font Optimization

```css
/* Fallback stack first */
body { font-family: 'Custom', -apple-system, BlinkMacSystemFont, sans-serif; }

@font-face {
  font-family: 'Custom';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap;        /* prevent invisible text */
  unicode-range: U+0000-00FF; /* subset to Latin */
}
```

Variable fonts: one file for all weights, range `font-weight: 100 900`.

## Caching Strategy

```
HTML:                    Cache-Control: no-cache, must-revalidate
Hashed static (1y):      Cache-Control: public, max-age=31536000, immutable
Unhashed static:         Cache-Control: public, max-age=86400, stale-while-revalidate=604800
API:                     Cache-Control: private, max-age=0, must-revalidate
```

Service worker cache-first for static assets (images, CSS, JS).

## Runtime Performance

**Avoid layout thrashing** — batch reads, then batch writes:
```javascript
// Bad: forces reflows
elements.forEach(el => {
  const h = el.offsetHeight;
  el.style.height = h + 10 + 'px';
});

// Good
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => { el.style.height = heights[i] + 10 + 'px'; });
```

**Virtualize long lists:**
```css
.virtual-list {
  content-visibility: auto;
  contain-intrinsic-size: 0 50px;
}
```

**Smooth navigations with View Transitions:**
```javascript
// Same-doc (SPA)
document.startViewTransition(() => swapDOM(newView));

// Cross-doc (MPA)
```
```css
@view-transition { navigation: auto; }
```

### AI-Generated Anti-Patterns

Code produced by LLMs tends to repeat the same performance mistakes. Watch for:

- **React:** state duplication instead of lifting state; `React.memo`/`useMemo`/`useCallback` wrapping everything "just in case" (cost without benefit); over-eager `useEffect` dependencies causing redundant re-renders or update loops.
- **Vue:** `watch`/`watchEffect` with broad dependencies triggering unnecessary updates; `computed` with side effects.
- **Angular:** `ChangeDetectionStrategy.Default` where `OnPush` would suffice; subscriptions without `takeUntil`/`async` pipe accumulating listeners.
- **Svelte:** `$:` blocks with expensive logic that re-runs more than needed.
- **Vanilla:** `scroll`/`resize` listeners without `passive: true` or debounce; DOM manipulation inside a loop forcing repeated reflow.
- **Network (any framework):** over-fetching data "just in case"; sequential `await`s where `Promise.all` would work; redundant API calls where one suffices; missing deduplication on parallel requests.

## Third-Party Scripts

- Always `async` or loaded on interaction (IntersectionObserver)
- Use **facade pattern** for embeds (YouTube, Maps) — static placeholder until click
- Audit quarterly — third-party bloat is silent

## Measurement

| Metric | Target | Tool |
|--------|--------|------|
| LCP | < 2.5s | Lighthouse, CrUX, web-vitals |
| FCP | < 1.8s | Lighthouse |
| INP | < 200ms | web-vitals, RUM |
| TBT | < 200ms | Lighthouse |
| Speed Index | < 3.4s | Lighthouse |

```bash
npx lighthouse https://example.com --output html --output-path report.html
```

## Audit Methodology

Distinguish audit mode before reporting:

- **Quick mode (default, no tool artifacts):** Scan source for structural anti-patterns. Tag every finding as `potential impact` — never as a measurement. Leave the scorecard `not measured`.
- **Deep mode (when artifacts provided):** Interpret real data from Lighthouse JSON, PageSpeed Insights, CrUX (field, p75), or DevTools traces. Populate the scorecard only with measured values.

**Metric-Honesty Rule:** Never fabricate metrics. An LLM reading static source cannot measure real-world LCP/INP/CLS. Field data (CrUX/RUM) and lab data (Lighthouse) are not interchangeable — label every scorecard value with its source (`Field`, `Lab`, `Trace`). If no data is available, return source-level findings only and mark the scorecard `not measured`.

**Scorecard template:**

| Metric | Value | Source | Target | Status |
|--------|-------|--------|--------|--------|
| LCP | [value or "not measured"] | [Field / Lab / Trace / —] | ≤ 2.5s | [Good / Needs Work / Poor / —] |
| INP | [value or "not measured"] | [Field / Lab / Trace / —] | ≤ 200ms | [Good / Needs Work / Poor / —] |
| CLS | [value or "not measured"] | [Field / Lab / Trace / —] | ≤ 0.1 | [Good / Needs Work / Poor / —] |

## Related Skills

- `core-web-vitals` — LCP/INP/CLS deep dive
- `web-quality-audit` — full-site audit orchestrator
- `performance-tester` — backend load/stress testing (different domain)
