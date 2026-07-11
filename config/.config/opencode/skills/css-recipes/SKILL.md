---
name: css-recipes
description: >
  CSS recipes and visual effects from MengTo: masked reveals, staggered word reveals, gooey blobs, container lines, beautiful shadows, corner diagonals, corner lasers, alpha masking, border gradients, progressive blur, marquees, and number details.
  Trigger: When building CSS-only effects, scroll reveals, decorative UI details, shadows, gradients, masks, or visual polish.
license: Apache-2.0
metadata:
  author: gentleman-programming + MengTo
  version: "1.0"
  merged_from: [
    "masked-reveal", "staggered-word-reveal", "gooey-blob-system",
    "container-lines", "beautiful-shadows", "corner-diagonals",
    "corner-lasers", "css-alpha-masking", "css-border-gradient",
    "progressive-blur", "marquee-loop", "number-details"
  ]
---

# CSS Recipes — Visual Effects from MengTo

## Index of Recipes

| # | Recipe | Use Case |
|---|--------|----------|
| 1 | [Masked Reveal](#1-masked-reveal) | Word-by-word text reveal on scroll |
| 2 | [Staggered Word Reveal](#2-staggered-word-reveal) | Zero-dep word stagger with CSS transitions |
| 3 | [Gooey Blob System](#3-gooey-blob-system) | SVG filter organic fluid shapes |
| 4 | [Container Lines](#4-container-lines) | Vertical guide lines + corner squares |
| 5 | [Beautiful Shadows](#5-beautiful-shadows) | Polished layered shadow utilities |
| 6 | [Corner Diagonals](#6-corner-diagonals) | Diagonal-cut corners/clip-path shapes |
| 7 | [Corner Lasers](#7-corner-lasers) | Corner-anchored beam composition |
| 8 | [CSS Alpha Masking](#8-css-alpha-masking) | Edge fades with mask-image |
| 9 | [Border Gradients](#9-border-gradients) | Subtle gradient border treatments |
| 10 | [Progressive Blur](#10-progressive-blur) | Layered backdrop-filter blur mask |
| 11 | [Marquee Loop](#11-marquee-loop) | Seamless infinite scroll loops |
| 12 | [Number Details](#12-number-details) | Decorative 01/02/03 markers |

---

## 1) Masked Reveal

Word-by-word staggered text reveal on scroll using GSAP ScrollTrigger. Priority over SplitText to avoid paid plugin.

### Motion Defaults
- Trigger: `start: "top 82%"`
- Duration: `0.7s` to `0.9s`
- Stagger: `0.025s` to `0.045s` per word
- Ease: `power3.out` or `expo.out`

### HTML + CSS

```html
<h1 class="masked-reveal" data-masked-reveal>
  Design systems that feel alive from the first scroll.
</h1>

<style>
  .masked-reveal { visibility: visible; }
  html.js .masked-reveal[data-masked-reveal] { visibility: hidden; }
  html.js .masked-reveal.is-split { visibility: visible; }

  .masked-reveal .word-mask {
    display: inline-block; overflow: hidden; vertical-align: top;
  }
  .masked-reveal .word {
    display: inline-block; transform: translateY(110%); will-change: transform;
  }

  @media (prefers-reduced-motion: reduce) {
    html.js .masked-reveal[data-masked-reveal] { visibility: visible; }
    .masked-reveal .word { transform: none; }
  }
</style>
```

### JS (GSAP)

```js
document.documentElement.classList.add("js");
gsap.registerPlugin(ScrollTrigger);

function splitMaskedReveal(element) {
  if (element.dataset.maskedRevealReady === "true") return;
  const text = element.textContent.trim();
  element.setAttribute("aria-label", text);
  element.innerHTML = text.split(/(\s+)/)
    .map(part => !part.trim() ? part :
      `<span class="word-mask" aria-hidden="true"><span class="word">${part.replace(/&/g,"&amp;").replace(/</g,"&lt;")}</span></span>`
    ).join("");
  element.dataset.maskedRevealReady = "true";
  element.classList.add("is-split");
}

function initMaskedReveals(selector = "[data-masked-reveal]") {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll(selector).forEach((el) => {
    splitMaskedReveal(el);
    const words = el.querySelectorAll(".word");
    gsap.set(el, { autoAlpha: 1 });
    gsap.fromTo(words,
      { yPercent: 110 },
      { yPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.035,
        scrollTrigger: { trigger: el, start: "top 82%", once: true } }
    );
  });
}
initMaskedReveals();
```

### Rules
- Use on short headlines, labels, section intros — avoid long paragraphs
- Screen readers get full text via `aria-label`. Spaces preserved.
- Reduced-motion: static text. Cleanup ScrollTrigger in SPAs.

---

## 2) Staggered Word Reveal

Zero-dependency word reveal using CSS transitions + IntersectionObserver. No GSAP needed.

### Motion Defaults
- Initial: `opacity: 0`, `translateY(20px)`
- Duration: `0.8s`, Ease: `cubic-bezier(0.16, 1, 0.3, 1)`
- Stagger: `0.06s` to `0.08s` per word (via `--word-index`)

### HTML + CSS

```html
<h1 class="word-reveal" data-word-reveal>
  Build interfaces that feel calm, cinematic, and alive.
</h1>

<style>
  html.js .word-reveal[data-word-reveal]:not(.is-ready) { opacity: 0; }

  .word-reveal__word {
    display: inline-block;
    opacity: 0;
    transform: translate3d(0, 20px, 0);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: calc(var(--word-index) * 0.07s);
  }

  .word-reveal.is-visible .word-reveal__word {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  @media (prefers-reduced-motion: reduce) {
    .word-reveal__word { opacity: 1; transform: none; transition: none; }
  }
</style>
```

### JS (Zero-dep)

```js
document.documentElement.classList.add("js");

function splitWordReveal(element) {
  if (element.dataset.wordRevealReady === "true") return;
  const text = element.textContent || "";
  const parts = text.split(/(\s+)/);
  let wordIndex = 0;
  element.textContent = "";
  element.setAttribute("aria-label", text.trim());

  parts.forEach((part) => {
    if (!part.trim()) { element.appendChild(document.createTextNode(part)); return; }
    const word = document.createElement("span");
    word.className = "word-reveal__word";
    word.setAttribute("aria-hidden", "true");
    word.style.setProperty("--word-index", wordIndex);
    word.textContent = part;
    element.appendChild(word);
    wordIndex += 1;
  });
  element.dataset.wordRevealReady = "true";
  element.classList.add("is-ready");
}

function initWordReveals(selector = "[data-word-reveal]") {
  const els = Array.from(document.querySelectorAll(selector));
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.forEach(el => el.classList.add("is-ready", "is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, io) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });

  els.forEach(el => { splitWordReveal(el); observer.observe(el); });
}
document.addEventListener("DOMContentLoaded", () => initWordReveals());
```

### Taste
- Stagger words, not letters. No bounce/rotation/blur. Transform + opacity only.
- Do not split text with links or inline markup.

---

## 3) Gooey Blob System

Organic fluid shapes using SVG filters (blur + color matrix threshold).

### SVG Filter Setup

```html
<svg style="position: absolute; width: 0; height: 0;">
  <filter id="goo">
    <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
    <feColorMatrix in="blur" mode="matrix"
      values="1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 22 -9" result="goo" />
    <feBlend in="SourceGraphic" in2="goo" />
  </filter>
</svg>
```

```css
.gooey-blobs {
  filter: url(#goo);
  position: relative;
}

.gooey-blob {
  position: absolute;
  border-radius: 50%;
  background: var(--accent, #8b5cf6);
  will-change: transform;
}
```

### Rules
- Animate overlapping circles so they approach and separate naturally
- Smooth continuous motion, no fast jittery movement
- Provide static/simplified fallback for reduced motion
- Use as background accent, loader, cursor field, or hero atmosphere

---

## 4) Container Lines

Vertical page-width guide lines with mini corner squares for editorial/technical layouts.

```css
:root {
  --container-max: 1120px;
  --container-pad: clamp(20px, 4vw, 48px);
  --line-color: rgba(24, 24, 27, 0.14);
  --corner-size: 6px;
}

.container-lines {
  position: relative;
  isolation: isolate;
}

.container-lines::before,
.container-lines::after {
  content: "";
  position: absolute; top: 0; bottom: 0; z-index: -1;
  width: 1px; background: var(--line-color);
  pointer-events: none;
}

.container-lines::before {
  left: max(var(--container-pad), calc((100vw - var(--container-max)) / 2));
}
.container-lines::after {
  right: max(var(--container-pad), calc((100vw - var(--container-max)) / 2));
}
```

### Corner Squares

```css
.corner-squares { position: relative; }
.corner-squares .corner {
  position: absolute;
  width: var(--corner-size); height: var(--corner-size);
  background: rgba(24, 24, 27, 0.28);
  pointer-events: none;
}
.corner.top-left { top: 0; left: 0; transform: translate(-50%, -50%); }
.corner.top-right { top: 0; right: 0; transform: translate(50%, -50%); }
.corner.bottom-left { bottom: 0; left: 0; transform: translate(-50%, 50%); }
.corner.bottom-right { right: 0; bottom: 0; transform: translate(50%, 50%); }
```

### Rules
- Lines at page/section level only, not nested components
- Mini squares: `4px` to `8px`. Small and exact.
- pointer-events: none to avoid blocking UI

---

## 5) Beautiful Shadows

Polished layered shadow utilities for Tailwind. Neutral, no colored tinting.

### Shadow Utilities

```txt
/* Beautiful sm — compact cards, form controls, pills */
shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]

/* Beautiful md — cards, panels, popovers */
shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]

/* Beautiful lg — hero media, feature callouts, modals */
shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]
```

### Rules
- One shadow strength per component. Don't mix with default Tailwind shadows.
- Keep neutral — no colored tinting.
- Pair with clean surface fill and consistent border-radius.

---

## 6) Corner Diagonals

Diagonal-cut corners using `clip-path: polygon()`. For buttons, cards, panels.

### Cut Tokens

```css
:root {
  --corner-cut-sm: 8px;
  --corner-cut-md: 14px;
  --corner-cut-lg: 24px;
}
```

### Core Shapes

```css
/* All corners cut */
.cut-all {
  --cut: var(--corner-cut-md);
  clip-path: polygon(
    var(--cut) 0, calc(100% - var(--cut)) 0, 100% var(--cut),
    100% calc(100% - var(--cut)), calc(100% - var(--cut)) 100%,
    var(--cut) 100%, 0 calc(100% - var(--cut)), 0 var(--cut)
  );
}

/* Top-left + bottom-right only */
.cut-tl-br {
  --cut: var(--corner-cut-md);
  clip-path: polygon(
    var(--cut) 0, 100% 0, 100% calc(100% - var(--cut)),
    calc(100% - var(--cut)) 100%, 0 100%, 0 var(--cut)
  );
}
```

### Bordered Shell Pattern

```css
.cut-shell {
  --cut: var(--corner-cut-md);
  --border-size: 1px;
  position: relative; padding: var(--border-size);
  background: linear-gradient(135deg, rgba(255,255,255,.34), transparent 46%, rgba(255,255,255,.08));
  clip-path: polygon(
    var(--cut) 0, 100% 0, 100% calc(100% - var(--cut)),
    calc(100% - var(--cut)) 100%, 0 100%, 0 var(--cut)
  );
}
.cut-shell__inner {
  padding: clamp(16px, 2.4vw, 28px);
  background: rgba(10, 14, 24, 0.82);
  clip-path: inherit;
}
```

### Rules
- Cut sizes: `6-10px` for controls, `12-18px` for cards, `20-32px` for panels
- Reuse same cut size across a component family
- Buttons keep 44px min-height for touch targets

---

## 7) Corner Lasers

Corner-anchored laser beam composition with thin beams, bright emitter, bloom + fog.

**Scope**: Corner-based beam compositions only. Beams originate from or converge at a corner/edge junction.

### Visual Target
- 2-3 thin laser beams meeting at a bright corner emitter
- Beam core: near white. Halo: primary accent color.
- Atmospheric glow around the emitter for volumetric feel

### Implementation
- Prefer raw WebGL shader or canvas linework
- SDF/line-distance logic for thin, crisp beams
- Motion: slow pulsing, faint shimmer — NOT chaotic flicker

### Tuning
- Corner position: move emitter inward to frame composition
- Beam thickness: core thin + outer glow separate
- Color: derive halo tint from design accent

---

## 8) CSS Alpha Masking

Edge fades using `mask-image: linear-gradient()`.

### Horizontal Fade

```css
mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
-webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
```

### Vertical Fade

```css
mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
-webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
```

### Customization
- Direction: `to right`, `to left`, `to bottom`, `to top`
- Fade depth: adjust `15%` and `85%` stops
- Strength: `rgba(0,0,0,0.2)` for softer fades

### Pitfalls
- ⚠️ Always include `-webkit-mask-image` for Safari
- Element needs visible content behind it

---

## 9) Border Gradients

Subtle gradient border treatments for cards, panels, buttons.

### Simple CSS Pattern (solid/translucent fill)

```css
.gradient-border {
  --surface: rgba(10, 14, 24, 0.72);
  --border-a: rgba(255, 255, 255, 0.34);
  --border-b: rgba(125, 92, 255, 0.36);
  --border-c: rgba(255, 255, 255, 0.08);

  border: 1px solid transparent;
  border-radius: 20px;
  background:
    linear-gradient(var(--surface), var(--surface)) padding-box,
    linear-gradient(135deg, var(--border-a), var(--border-b), var(--border-c)) border-box;
}
```

### Masked Pattern (for complex backgrounds)

```css
.gradient-border-mask {
  position: relative;
  border-radius: 20px;
}
.gradient-border-mask::before {
  content: ""; position: absolute; inset: 0;
  border-radius: inherit; padding: 1px;
  background: linear-gradient(145deg, rgba(255,255,255,.34), rgba(125,92,255,.36) 45%, rgba(255,255,255,.08));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

### Tailwind One-off

```html
<div class="rounded-2xl border border-transparent
  [background:linear-gradient(rgba(10,14,24,.72),rgba(10,14,24,.72))_padding-box,linear-gradient(135deg,rgba(255,255,255,.34),rgba(125,92,255,.36),rgba(255,255,255,.08))_border-box]">
```

### Rules
- Apply to ONE hierarchy level at a time (primary card, active tab, selected plan)
- No rainbow or animated gradients by default
- Keep opacity below 0.4 on most stops — subtle beats shiny
- Check light AND dark themes separately

---

## 10) Progressive Blur

Layered `backdrop-filter` blur mask that fades from viewport edge. No JS needed.

### Top Blur

```html
<div class="gradient-blur">
  <div></div><div></div><div></div><div></div><div></div><div></div>
</div>

<style>
  .gradient-blur {
    position: fixed; z-index: 5; inset: 0 0 auto 0;
    height: 12%; pointer-events: none;
  }

  .gradient-blur > div,
  .gradient-blur::before,
  .gradient-blur::after {
    position: absolute; inset: 0;
  }

  .gradient-blur::before {
    content: ""; z-index: 1;
    backdrop-filter: blur(0.5px);
    mask: linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%);
  }

  /* Layer 1-6: each has double the blur (1px, 2px, 4px, 8px, 16px, 32px) */
  .gradient-blur > div:nth-of-type(1) { z-index: 2; backdrop-filter: blur(1px);
    mask: linear-gradient(to top, rgba(0,0,0,0) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,0) 50%); }
  .gradient-blur > div:nth-of-type(2) { z-index: 3; backdrop-filter: blur(2px);
    mask: linear-gradient(to top, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 62.5%); }
  .gradient-blur > div:nth-of-type(3) { z-index: 4; backdrop-filter: blur(4px);
    mask: linear-gradient(to top, rgba(0,0,0,0) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,0) 75%); }
  .gradient-blur > div:nth-of-type(4) { z-index: 5; backdrop-filter: blur(8px);
    mask: linear-gradient(to top, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 87.5%); }
  .gradient-blur > div:nth-of-type(5) { z-index: 6; backdrop-filter: blur(16px);
    mask: linear-gradient(to top, rgba(0,0,0,0) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%); }
  .gradient-blur > div:nth-of-type(6) { z-index: 7; backdrop-filter: blur(32px);
    mask: linear-gradient(to top, rgba(0,0,0,0) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,1) 100%); }

  .gradient-blur::after {
    content: ""; z-index: 8;
    backdrop-filter: blur(64px);
    mask: linear-gradient(to top, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%); }
</style>
```

For **bottom blur**, flip `inset: auto 0 0 0` and change gradient direction to `to bottom`.

### Customization
- Direction: flip `to top` ↔ `to bottom`
- Height: adjust `.gradient-blur` height percentage
- Steps: add/remove layers for smoothness

### Pitfalls
- `backdrop-filter` needs content behind it — won't blur a flat background
- High blur values are GPU-heavy; reduce steps on low-end devices

---

## 11) Marquee Loop

Seamless infinite scroll loop using CSS transforms.

### HTML

```html
<div class="marquee" data-marquee>
  <div class="marquee__track" data-marquee-track>
    <div class="marquee__item">Logo 1</div>
    <div class="marquee__item">Logo 2</div>
    <div class="marquee__item">Logo 3</div>
    <!-- Duplicate for seamless loop -->
    <div class="marquee__item">Logo 1</div>
    <div class="marquee__item">Logo 2</div>
    <div class="marquee__item">Logo 3</div>
  </div>
</div>
```

### CSS

```css
.marquee {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.marquee__track {
  display: flex;
  gap: 2rem;
  width: fit-content;
  animation: marqueeScroll 20s linear infinite;
}

@keyframes marqueeScroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track { animation: none; }
}
```

### Rules
- Duplicate items so end matches beginning (0 → -50%)
- Mask edges with `mask-image` for fade in/out
- Pause on hover only when interaction is useful
- No CPU-heavy shadows or filters on moving items

---

## 12) Number Details

Decorative `01`, `02`, `03` numeric markers for process steps, features, cards.

```css
.step-marker {
  font-family: "SF Mono", "JetBrains Mono", monospace;
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(24, 24, 27, 0.28);
  letter-spacing: 0.05em;
  user-select: none;
}
```

```html
<div class="step">
  <span class="step-marker">01</span>
  <h3>Research</h3>
</div>
```

### Rules
- Use two-digit numbers (01, 02, 03) for consistency
- Predictable positions: card corners, beside headings, timeline rails
- Low contrast — architectural, not competing with content
- Mono/narrow uppercase typography
- Same style across all numbered elements in one section
