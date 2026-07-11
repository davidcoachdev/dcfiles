---
name: animation-systems
description: >
  Product-grade motion design philosophy — Stripe, Linear, Apple, Vercel style.
  Covers motion principles, easing/duration defaults, choreography patterns,
  scroll/hover interactions, performance rules, and reduced motion accessibility.
  Trigger: When designing animation systems, adding motion to a product UI,
  or when the user asks for "Stripe-style", "Linear-style", or "Apple-level" animation.
license: Apache-0
metadata:
  author: gentleman-programming (inspired by MengTo/Skills)
  version: "1.0"
---

## When to Use

- Designing motion for a product UI (not a marketing splash page)
- User asks for "Stripe/Linear/Apple-level" animations
- Need to define animation tokens (durations, easings) for a project
- Reviewing animation performance or jank
- Building a motion system from scratch

## Why Motion Exists — The 5 Goals

Use animation ONLY to serve one of these:

1. **Explain hierarchy** — what matters most moves first
2. **Confirm action** — feedback that something happened
3. **Guide attention** — show where to look next
4. **Maintain continuity** — spatial relationships during transitions
5. **Add polish** — craft signals that communicate quality

If an animation doesn't serve one of these, DELETE it.

## The Stripe/Linear/Apple/Vercel Style

### 1. Restraint
- Fewer animations, better chosen
- One strong hero moment; everything else is supporting motion
- Not "more animation" — **better animation**

### 2. Clear Choreography
- Primary element moves first
- Secondary elements follow with small stagger
- Motion establishes a "reading order"

### 3. Physical but Not Cartoony
- Easing that feels HUMAN: soft acceleration + gentle settle
- Avoid bouncy defaults for serious product UI

### 4. Texture + Depth (Subtle)
- Small parallax, soft shadows, blur fades
- Avoid heavy 3D unless it's the hero

## Motion Primitives — Build These First

Reusable primitives that compose into any interaction.

### A) Fade + Rise (default entrance)
- **Use for**: text blocks, cards, modals
- Opacity: 0 → 1
- Y: 12–24px → 0
- Duration: 300–700ms depending on element size

### B) Scale + Fade (micro emphasis)
- **Use for**: popovers, toasts, selected states
- Scale: 0.98 → 1
- Opacity: 0 → 1

### C) Slide (navigation)
- **Use for**: drawers, step transitions
- Use `transform: translateX/Y` — NEVER animate layout properties

### D) Morph / Shared Element (high craft)
- **Use for**: tab indicators, expanding cards
- Requires consistent geometry + measured layout

## Defaults — A Starting System

### Durations (rule of thumb)
| Context | Duration |
|---------|----------|
| Micro (hover/press) | 120–200ms |
| UI state change (toggle, select) | 180–260ms |
| Small transitions (popover, toast) | 220–320ms |
| Page section entrance | 400–800ms |
| Hero sequences | 800–1600ms (with internal beats) |

### Easing (safe set — pick 2 and reuse everywhere)
- **UI**: `ease-out` with gentle settle
- **Emphasis**: slightly stronger ease (expo.out, power3.out)
- **Entering**: ease-out
- **Exiting**: ease-in (faster)
- Avoid elastic/bounce unless brand is deliberately playful

### Stagger Defaults
- 40–90ms per element (text lines / cards)
- Smaller stagger on mobile

## Choreography Patterns

### 1. Hero → Supporting Elements
Hero visual animates in → headline appears → CTA appears last.

### 2. Section Reveal on Scroll
- Trigger when section is ~20–30% visible
- Animate ONCE (don't replay on tiny scroll)

### 3. Hover: Lift + Glow
- Y: -2 to -6px
- Shadow: subtle increase
- Optional: border/gradient glow

### 4. Focus Ring + Micro Shift
- Form fields: focus ring + tiny scale/translate for responsiveness

## Performance Rules (non‑negotiable)

### Animate the Right Properties
✅ `transform` (translate/scale/rotate)
✅ `opacity`
❌ `width` / `height` / `top` / `left` (causes layout reflow)
❌ Expensive filters on large areas

### Respect the GPU
- Clamp device pixel ratio on heavy canvases (max 2)
- Keep blur subtle and small
- Avoid many simultaneous animated shadows

### Reduce Reflows
- Don't measure layout every frame
- For scroll effects, use a library that batches reads/writes

## Accessibility: Reduced Motion

ALWAYS support `prefers-reduced-motion`.

**Policy:**
- Keep content visible (no invisible state)
- Replace motion with **instant state** + subtle opacity fade
- Disable scroll-scrub/pin
- Disable parallax

**Ask the user:** "Do you want a reduced-motion mode that disables all non-essential motion?"

## Implementation Guidance

### For Simple Sites
- CSS transitions for small hovers/toggles
- ONE motion library (GSAP or Framer Motion) for complex sequences

### For Product Sites
Create a motion token set:
- `--duration-micro`, `--duration-ui`, `--duration-section`
- `--ease-default`, `--ease-emphasis`, `--ease-exit`
- `--offset-y`, `--stagger-default`
- Standard offsets: 8/16/24px

### For Hero Moments
- Use timelines (or keyframes) with labeled beats
- Lock camera/scene movement first, then layer text

## What to Ask the User
- What's the brand lane: Stripe (polished), Linear (minimal), Apple (cinematic), Vercel (developer/product)?
- What are the key moments? (hero, scroll story, hover cards, nav transitions)
- Any performance constraints? (mobile, low-end devices)
- Reduced motion requirements?

## Output Format

When asked to "add Stripe/Linear-style animation", return:
1. **Motion goals** — what we're communicating
2. **Motion tokens** — durations + easing + offsets
3. **Choreography plan** — timeline beats
4. **Implementation notes** — perf + reduced motion
5. **Code recipe** — CSS or GSAP/Framer depending on stack
