---
name: reference-to-spec
description: >
  Extract a technical implementation spec from a visual reference — video,
  screenshot, or live URL. Analyzes design system, layout, motion, typography,
  colors, and assets. Outputs a structured spec ready for implementation.
  Trigger: When the user provides a video, screenshot, or URL as a design
  reference and asks you to implement, recreate, or analyze it.
license: Apache-2.0
metadata:
  author: gentleman-programming (inspired by MengTo/Skills)
  version: "1.0"
---

## When to Use

- User provides a video/screenshot/URL and says "make this" or "recreate this"
- User asks you to analyze a design reference and extract its system
- User links a landing page and asks for a technical breakdown
- Need to convert a visual reference into implementable specs

---

## Core Workflow

1. **Locate the source**
   - Accept: URLs, local files, screenshots, videos, browser-visible pages
   - If the reference is inaccessible (broken link, private), ask for access before inventing details

2. **Inspect technically** (skip what isn't available)
   - **For videos**: run `ffprobe` for duration/dimensions, extract representative frames with `ffmpeg`
     ```bash
     ffprobe -v error -show_entries format=duration,size:stream=width,height,r_frame_rate -of json "$VIDEO"
     ffmpeg -y -i "$VIDEO" -vf fps=1 /tmp/frames/frame-%03d.jpg
     ```
   - **For URLs**: open the page, inspect HTML/CSS/JS, note libraries used (via `window.___`, script tags, or bundle analysis)
   - **For screenshots**: note dimensions, aspect ratio, content zones

3. **Extract the design system**
   - **Colors**: backgrounds, text, accents, surfaces. Note hex values or CSS variables
   - **Typography**: font family, weights used, sizes (relative hierarchy), line-height patterns
   - **Spacing**: margins, paddings, grid columns, gap patterns
   - **Shadows / Borders**: elevation layers, border radii, border styles
   - **Iconography**: style (outline/filled), weight, sizes

4. **Document layout structure**
   - Viewport framing (width used, centered vs full-bleed)
   - Grid system (columns, gutters, margins)
   - Section anatomy: header → hero → features → proof → footer (or whatever the page uses)
   - Sticky zones, overlays, fixed elements

5. **Document motion system**
   - Entrance animations (type, duration, easing)
   - Scroll-triggered effects (reveal, parallax, sticky)
   - Hover/interaction states (lift, glow, color shift)
   - Transitions between sections or states
   - Reduced motion: does it have a fallback?

6. **Document technical stack**
   - Libraries detected (GSAP, Framer Motion, Three.js, Lenis, etc.)
   - CSS features used (grid, subgrid, container queries, masks, filters)
   - Asset types (SVG icons, WebP images, video backgrounds, canvas)
   - Responsive behavior (breakpoints, mobile layout changes)

7. **Output the spec**

   ```markdown
   # Implementation Spec — [Project Name]

   ## Reference
   - Source: [URL/file]
   - Dimensions: [width x height]
   - Format: [video/screenshot/live page]

   ## Design Tokens
   | Token | Value | Usage |
   |-------|-------|-------|
   | --bg-primary | #0b0d17 | Page background |
   | --text-primary | #ffffff | Body text |
   | --accent | #7d5cff | CTAs, links |
   | ... | | |

   ## Typography
   - Font: [Family]
   - Scale: [sizes / weights used]
   - Hierarchy: H1 → H2 → Body → Small

   ## Layout
   - Grid: [12-col / custom / none]
   - Max-width: [value]
   - Sections: [ordered list with purpose per section]

   ## Motion
   - Easing: [type, e.g., power3.out]
   - Duration defaults: [micro/UI/section values]
   - Scroll: [ScrollTrigger / IntersectionObserver / none]
   - Reduced motion: [yes/no fallback]

   ## Stack Required
   - [Library A] — [purpose]
   - [Library B] — [purpose]
   ```

---

---

## Alternative Mode: Interaction Extraction

When the user has **existing HTML** (file, local server, or live URL) and wants **reusable prompts per interaction** rather than a full spec, use this workflow.

### When to use this mode

- User provides HTML and says "extract the interactions" or "create prompts for this"
- User wants reusable patterns per section/effect, not a spec
- Reference is already implemented and the goal is to capture its interaction ideas

### Workflow

1. **Inspect the source first**
   - Read the HTML, CSS, and scripts
   - Search for interaction terms: `mousemove`, `pointermove`, `canvas`, `webgl`, `ScrollTrigger`, `requestAnimationFrame`, `hover`, `sticky`, `pin`, `parallax`, `magnetic`, `glow`, `shader`, `animation`
   - Treat source behavior as truth. Do not infer exact effects from a screenshot when HTML is available.

2. **Split by interaction idea**
   - Each prompt = one reusable interaction concept (hero particle field, cursor glow on cards, scroll reveal system)
   - Do NOT split by implementation line count
   - Do NOT combine unrelated effects into one prompt

3. **Write per-interaction prompts**
   - Keep prompts flexible for any brand, color system, card size, or content model
   - Avoid hard-coded values (colors, sizes, thresholds, DOM ids, card types)
   - Focus on core idea, technology, implementation shape, interaction behavior, scroll choreography, performance, and accessibility

   Per-prompt structure:

   ```markdown
   ### [Interaction Name]

   **Core idea:** One sentence — what this interaction does
   **Technology:** Library/API choice with reasoning
   **Implementation:**
   - Setup / initialization
   - State management (if any)
   - Event wiring
   - Cleanup / teardown

   **Interaction behavior:**
   - Trigger (scroll position, hover, pointer move, timer)
   - Response (transform, opacity, color, position)
   - Easing and duration
   - Settled state

   **Scroll choreography** (if applicable):
   - Reveal threshold
   - Sticky/pinned behavior
   - Scrubbed values
   - Section handoff

   **Performance:**
   - Offscreen pause / debounce
   - Pixel ratio cap (canvas/WebGL)
   - Reduced motion fallback

   **Success:** How to verify it's working
   ```

4. **Name each prompt by the interaction concept** — `Hero Particle Field That Follows The Mouse`, `Cursor Glow Hover On Cards`, `Scroll Behavior And Section Reveal System`

### Library guidance for interaction prompts

When recommending libraries, prefer the project's existing stack. Fall back to:

| Scenario | Library |
|----------|---------|
| Simple hover/focus/opacity | CSS transitions or keyframes |
| Scroll reveal (no timeline control needed) | IntersectionObserver or Web Animations API |
| React component entrances / layout transitions | Framer Motion or Motion One |
| Complex scroll (pinned, scrubbed, multi-layer parallax) | GSAP + ScrollTrigger |
| Smooth scroll | Lenis (only when scroll choreography requires it) |
| Carousels / horizontal strips | CSS scroll-snap first; Embla / Keen Slider if controls needed |
| Authored vector animations | Rive or Lottie (pause offscreen) |
| 3D / shader / particles | Three.js or WebGL (cap pixel ratio, pause offscreen) |
| Sticky panels | CSS `position: sticky` first; GSAP pin only if timeline control needed |

Every animation plan must include:
- `prefers-reduced-motion` media query
- Touch-device behavior
- Keyboard / focus behavior
- Performance constraints

---

## Analysis Checklist

Verify each extracted element:
- ✓ Colors match across all sections (no missing context)
- ✓ Type scale is complete (not just H1)
- ✓ Layout matches actual reference (not assumed)
- ✓ Motion timing estimated from video frames
- ✓ Libraries verified from source code (not guessed)
- ✓ Responsive behavior noted (mobile != desktop)
- ✓ Assets mapped (images, icons, video) with source when available
- ✓ Reduced motion behavior noted

## Common Pitfalls

- ❌ Inventing colors or fonts not visible in the reference
- ❌ Guessing libraries without verifying source code
- ❌ Ignoring responsive behavior (assuming desktop-only)
- ❌ Forgetting reduced motion / accessibility requirements
- ❌ Writing vague spec ("make it beautiful") — convert taste to concrete tokens
- ❌ Mixing multiple reference styles into one spec

## Quality Bar

- Spec should be complete enough to implement WITHOUT seeing the original
- Every design token has a usage context, not just a value
- Motion descriptions name trigger, duration, easing, and fallback
- Layout section order preserves the reference's narrative flow
- Technical stack is verified, not assumed
