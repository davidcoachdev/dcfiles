---
name: cinematic-scroll-storytelling
description: >
  Build cinematic scroll-driven landing pages with Lenis smooth scrolling,
  GSAP ScrollTrigger, scroll-linked progression, staggered text reveals,
  sticky card stacks, parallax backgrounds, and immersive preloaders.
  Trigger: When building premium editorial scroll experiences, portfolio sites,
  product storytelling pages, or when the user asks for "scroll storytelling",
  "cinematic scroll", or "Awwwards-level" scroll animations.
license: Apache-2.0
metadata:
  author: gentleman-programming (inspired by MengTo/Skills)
  version: "1.0"
---

## When to Use

- Building a portfolio, studio, or product landing page with narrative scroll
- User asks for "scroll storytelling", "cinematic scroll", "sticky cards", or "scroll-driven narrative"
- Project needs Lenis smooth scrolling + GSAP ScrollTrigger
- Premium editorial feel (Apple-level, Awwwards-style)

## Core Stack

```bash
npm i gsap lenis
```

```js
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  const lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    wheelMultiplier: 0.9,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

window.addEventListener("load", () => ScrollTrigger.refresh());
```

## Motion Tokens
| Token | Value |
|-------|-------|
| Enter ease | `power3.out` or `power4.out` |
| Scrubbed scenes | `ease: "none"` with `scrub: 0.8–1.4` |
| Text reveal duration | 0.8s–1.1s |
| Card reveal duration | 0.9s–1.2s |
| Word stagger | 0.035s–0.07s |
| Line stagger | 0.08s–0.14s |
| Card stagger | 0.06s–0.1s |
| Reveal offset (Y) | 24–48px |
| Blur (start→end) | 4–10px → 0px |
| Sticky card scale depth | 1 → 0.92 |

## Page Anatomy

1. **Preloader** — black screen, progress bar, brand/title, intro fade
2. **Hero** — image parallax, masked headline reveal, subtle scroll cue
3. **Intro** — word-by-word kinetic typography
4. **Story sections** — scroll-triggered fade-up, blur-in, clip reveals
5. **Recent Projects** — sticky card stack with scale + layered depth
6. **Gallery / Proof** — scroll-scrubbed horizontal or progressive reveals
7. **Footer** — parallax reveal or slow upward handoff

## Markup Pattern

```html
<div class="preloader" data-preloader>
  <div class="preloader__bar" data-preloader-bar></div>
</div>

<main>
  <section class="hero" data-parallax-section>
    <img data-parallax-layer data-speed="-0.18" src="/hero.jpg" alt="">
    <h1 data-split-reveal>Design that unfolds with cinematic restraint.</h1>
  </section>

  <section data-story-section>
    <p data-split-reveal="words">Every block arrives with quiet intent.</p>
  </section>

  <section class="project-stack" data-sticky-stack>
    <article data-stack-card>Project One</article>
    <article data-stack-card>Project Two</article>
    <article data-stack-card>Project Three</article>
  </section>

  <footer data-footer-parallax>...</footer>
</main>
```

## Implementation Recipes

### Preloader Sequence

```js
function initPreloader() {
  const loader = document.querySelector("[data-preloader]");
  const bar = document.querySelector("[data-preloader-bar]");
  if (!loader) return Promise.resolve();
  if (reduceMotion) { loader.remove(); return Promise.resolve(); }

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => { loader.remove(); resolve(); },
    });

    tl.fromTo(bar, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 1.1 })
      .to(loader, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "+=0.15");
  });
}
```

### Split Text Reveal

```js
function splitWords(element) {
  if (element.dataset.splitReady === "true") return;

  const text = element.textContent || "";
  const parts = text.split(/(\s+)/);
  element.textContent = "";
  element.setAttribute("aria-label", text.trim());

  parts.forEach((part) => {
    if (!part.trim()) {
      element.appendChild(document.createTextNode(part));
      return;
    }
    const mask = document.createElement("span");
    const word = document.createElement("span");
    mask.className = "split-word-mask";
    word.className = "split-word";
    word.textContent = part;
    mask.setAttribute("aria-hidden", "true");
    mask.appendChild(word);
    element.appendChild(mask);
  });

  element.dataset.splitReady = "true";
}

function initSplitReveals() {
  if (reduceMotion) {
    gsap.set("[data-split-reveal]", { autoAlpha: 1 });
    return;
  }

  gsap.utils.toArray("[data-split-reveal]").forEach((element) => {
    splitWords(element);
    const words = element.querySelectorAll(".split-word");

    gsap.fromTo(
      words,
      { yPercent: 110, autoAlpha: 0, filter: "blur(8px)" },
      {
        yPercent: 0, autoAlpha: 1, filter: "blur(0px)",
        duration: 0.95, ease: "power4.out", stagger: 0.05,
        scrollTrigger: { trigger: element, start: "top 82%", once: true },
      }
    );
  });
}
```

```css
.split-word-mask {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
}
.split-word {
  display: inline-block;
  will-change: transform, opacity, filter;
}
```

### Sticky Card Stack

```css
[data-sticky-stack] { position: relative; }
[data-stack-card] {
  position: sticky;
  top: 12vh;
  transform-origin: center top;
  will-change: transform, opacity;
}
```

```js
function initStickyCardStack() {
  if (reduceMotion) return;

  gsap.utils.toArray("[data-sticky-stack]").forEach((stack) => {
    const cards = gsap.utils.toArray(stack.querySelectorAll("[data-stack-card]"));

    cards.forEach((card, index) => {
      const nextCard = cards[index + 1];
      if (!nextCard) return;

      gsap.to(card, {
        scale: 0.92 + index * 0.015,
        autoAlpha: 0.72,
        y: -24,
        ease: "none",
        scrollTrigger: {
          trigger: nextCard, start: "top 78%", end: "top 24%",
          scrub: true, invalidateOnRefresh: true,
        },
      });
    });
  });
}
```

### Parallax Layers

```js
function initParallax() {
  if (reduceMotion) return;

  gsap.utils.toArray("[data-parallax-layer]").forEach((layer) => {
    const speed = Number(layer.dataset.speed || -0.16);
    const section = layer.closest("[data-parallax-section]") || layer;

    gsap.to(layer, {
      y: () => window.innerHeight * speed,
      ease: "none",
      scrollTrigger: {
        trigger: section, start: "top bottom", end: "bottom top",
        scrub: 1, invalidateOnRefresh: true,
      },
    });
  });
}
```

### Footer Parallax Reveal

```js
function initFooterReveal() {
  if (reduceMotion) return;

  const footer = document.querySelector("[data-footer-parallax]");
  if (!footer) return;

  gsap.fromTo(footer,
    { yPercent: -12, autoAlpha: 0.85 },
    {
      yPercent: 0, autoAlpha: 1, ease: "none",
      scrollTrigger: { trigger: footer, start: "top bottom", end: "top 45%", scrub: 1 },
    }
  );
}
```

## Build Order
1. Build the static page first (no animations)
2. Add preloader + hero entrance
3. Add split text reveals
4. Add section-by-section reveals
5. Add sticky card stack progression
6. Add parallax layers
7. Add scrubbed pinned scenes (only where story needs them)
8. Add reduced-motion + touch fallbacks
9. Browser QA across desktop + mobile

## QA Checklist
- ✓ Content readable with JavaScript disabled
- ✓ Reduced-motion users see static content, no smooth-scroll layer
- ✓ Scroll-triggered reveals play ONCE (not on every tiny scroll)
- ✓ Scroll-linked scenes use `scrub` intentionally
- ✓ Sticky cards don't overlap footer or trap the page
- ✓ Parallax stays subtle — doesn't harm readability
- ✓ Preloader exits reliably even if images load slowly
- ✓ `ScrollTrigger.refresh()` runs after images/fonts/layout shifts
- ✓ Mobile has simplified pinning or no pinning if performance drops

## Style Guide

| DO | DON'T |
|----|-------|
| power3.out / power4.out | bounce, elastic, springy |
| fade + rise entrances | aggressive scale jumps |
| subtle parallax (0.1–0.2) | heavy 3D on non-hero elements |
| one strong hero moment | flashy gaming effects everywhere |
| reduced-motion support | scroll hijacking without fallback |
