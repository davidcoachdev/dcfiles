---
name: marquee-loop
description: >
  Seamless infinite marquee loops for logos, testimonials, screenshots, tags,
  or feature chips. Pure CSS + HTML, no JS libraries. Trigger: When building
  infinite scrolling logos, testimonial carousels, tag clouds, or any repeating
  horizontal/vertical scroll animation.
license: Apache-2.0
metadata:
  author: gentleman-programming (inspired by MengTo/Skills)
  version: "1.0"
---

## When to Use

- Logo clouds, testimonial strips, screenshot galleries
- Tag lists, feature chips, recurring UI patterns
- Any content that loops seamlessly without user interaction

## Core Pattern

The trick: **duplicate the item sequence** so the end and beginning match perfectly, then animate the track from 0 to -50%.

## HTML Structure

```html
<div class="marquee">
  <div class="marquee__track">
    <div class="marquee__content">
      <!-- Items -->
      <span>Item 1</span>
      <span>Item 2</span>
      <span>Item 3</span>
      <span>Item 4</span>
    </div>
    <div class="marquee__content" aria-hidden="true">
      <!-- DUPLICATE of items above -->
      <span>Item 1</span>
      <span>Item 2</span>
      <span>Item 3</span>
      <span>Item 4</span>
    </div>
  </div>
</div>
```

## CSS

```css
.marquee {
  overflow: hidden;
  mask: linear-gradient(
    to right,
    transparent 0%,
    black 5%,
    black 95%,
    transparent 100%
  );
  -webkit-mask: linear-gradient(
    to right,
    transparent 0%,
    black 5%,
    black 95%,
    transparent 100%
  );
}

.marquee__track {
  display: flex;
  width: fit-content;
  animation: marquee-scroll 30s linear infinite;
}

.marquee__content {
  display: flex;
  gap: 2rem;
  flex-shrink: 0;
}

@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
```

### Variant: Reverse

```css
.marquee__track.marquee--reverse {
  animation-direction: reverse;
}
```

### Variant: Pause on Hover

```css
.marquee:hover .marquee__track {
  animation-play-state: paused;
}
```

### Variant: Vertical Marquee

```css
.marquee--vertical .marquee__track {
  flex-direction: column;
  animation: marquee-scroll-vertical 30s linear infinite;
}

@keyframes marquee-scroll-vertical {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-50%);
  }
}
```

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    animation: none;
  }
  .marquee {
    overflow-x: auto;
  }
}
```

## Customization Knobs

| Variable | Default | Notes |
|----------|---------|-------|
| Duration | 30s | Longer = slower. Adjust for content width |
| Gap | 2rem | Space between items |
| Mask fade | 5% / 95% | Edge fade width |
| Direction | normal | `reverse` for opposite scroll |

## Guardrails

- ❌ Do NOT animate unique content users must read carefully (pricing, legal)
- ❌ Do NOT use heavy shadows or filters on EVERY moving item (GPU hit)
- ❌ Do NOT animate `left`/`right` — use `transform: translateX()` only
- ❌ Do NOT forget the edge mask (`transparent` → `black`) for clean entry/exit
- ✅ Keep item widths stable to prevent jumps during the loop
- ✅ Always duplicate the content for seamless loop
- ✅ Always respect `prefers-reduced-motion`

## Common Pitfalls

- Items jump at loop boundary → the duplicated content must be IDENTICAL
- Edge cut-off is harsh → adjust `transparent` stops in the mask
- Performance stutter → reduce number of items, avoid per-item shadows
- Mobile jank → increase duration (slower) or disable entirely
