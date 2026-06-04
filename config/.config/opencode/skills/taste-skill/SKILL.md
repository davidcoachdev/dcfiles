---
name: taste-skill
description: Senior UI/UX Engineer. Architect digital interfaces overriding default LLM biases. Enforces metric-based rules, strict component architecture, CSS hardware acceleration, and balanced design engineering.
---

> **Absorbed:** `frontend-taste-pro` (architecture + state patterns), `gpt-taste` (GPT/Codex dial overrides), `motion` (animation rules), `ui-style` (typography + color tokens)

# High-Agency Frontend Skill

## 1. ACTIVE BASELINE CONFIGURATION
* DESIGN_VARIANCE: 8 (1=Perfect Symmetry, 10=Artsy Chaos)
* MOTION_INTENSITY: 6 (1=Static, 10=Cinematic/Magic Physics)
* VISUAL_DENSITY: 4 (1=Art Gallery/Airy, 10=Pilot Cockpit/Packed Data)

Use these as global variables throughout. Adapt based on user requests.

## 2. DEFAULT ARCHITECTURE & CONVENTIONS

### Dependency Verification
* **MANDATORY:** Check `package.json` before importing ANY 3rd party (framer-motion, lucide-react, zustand, etc). If missing, output install command.

### Framework Defaults
* React or Next.js. Default to Server Components (RSC).
* **RSC SAFETY:** Global state works ONLY in Client Components. Wrap providers in `"use client"`.
* **INTERACTIVITY ISOLATION:** Motion/Liquid Glass → extract as leaf component with `'use client'`.

### Styling Policy
* Tailwind CSS (v3/v4). Check `package.json` first.
* **T4 Guard:** v4 = `@tailwindcss/postcss` or Vite plugin (NOT `tailwindcss` plugin in postcss.config.js).

### Responsive & Spacing
* Breakpoints: `sm`, `md`, `lg`, `xl`
* Container: `max-w-[1400px] mx-auto` or `max-w-7xl`
* **Viewport Stability:** ALWAYS use `min-h-[100dvh]` NOT `h-screen` (mobile bug)
* **Grid over Flex:** CSS Grid (`grid grid-cols-3`) NOT flex math (`w-[calc(33%-1rem)]`)

### Icons
Use `@phosphor-icons/react` or `@radix-ui/react-icons`. Standardize `strokeWidth` (1.5 or 2.0).

## 3. DESIGN ENGINEERING DIRECTIVES (Bias Correction)

### Rule 1: Deterministic Typography
* Headlines: `text-4xl md:text-6xl tracking-tighter leading-none`
* **ANTI-SLOP:** NO Inter for "Premium". Use Geist, Outfit, Satoshi, Cabinet Grotesk
* **TECHNICAL UI:** Serif BANNED for Dashboard/Software. Use high-end Sans-Serif (Geist + Geist Mono)
* Body: `text-base text-gray-600 leading-relaxed max-w-[65ch]`

### Rule 2: Color Calibration
* Max 1 Accent Color, Saturation < 80%
* **THE LILA BAN:** AI Purple/Blue aesthetic STRICTLY BANNED. Use Zinc/Slate base + single accent (Emerald, Electric Blue, Deep Rose)

### Rule 3: Layout Diversification
* **ANTI-CENTER:** Centered Hero/H1 BANNED when DESIGN_VARIANCE > 4. Force Split Screen, Left Aligned, or Asymmetric

### Rule 4: Materiality & Shadows
* **DASHBOARD HARDENING:** VISUAL_DENSITY > 7 → NO generic cards. Use `border-t`, `divide-y`, or negative space
* Use cards ONLY when elevation communicates hierarchy

### Rule 5: Interactive UI States
* **Mandatory:** Loading (skeletons), Empty States, Error States, Tactile Feedback (`scale-[0.98]`, `-translate-y-[1px]`)

### Rule 6: Data & Form Patterns
* Labels above input. Helper text optional. Error below. Use `gap-2` for input blocks

## 4. CREATIVE PROACTIVITY (Anti-Slop Implementation)

### Liquid Glass
Beyond `backdrop-blur`: add 1px inner border (`border-white/10`) + subtle inner shadow

### Magnetic Micro-physics (MOTION > 5)
Buttons pull toward cursor. Use Framer Motion `useMotionValue` and `useTransform` (NOT useState)

### Perpetual Micro-Interactions (MOTION > 5)
Pulse, Typewriter, Float, Shimmer, Carousel. Spring Physics (`type: "spring", stiffness: 100, damping: 20`)

### Layout Transitions
Use Framer Motion `layout` and `layoutId` for smooth re-ordering

### Staggered Orchestration
`staggerChildren` or CSS cascade (`animation-delay: calc(var(--index) * 100ms)`)

## 5. PERFORMANCE GUARDRAILS
* Grain/noise filters: ONLY on `fixed pointer-events-none` (NOT scroll containers)
* Hardware Acceleration: Animate ONLY `transform` and `opacity`
* Z-Index Restraint: NO spam `z-50`. Use systematic layers (nav/modal/toast)

## 6. DIAL DEFINITIONS

### DESIGN_VARIANCE (1-10)
* 1-3: Symmetrical grids, equal paddings
* 4-7: Offset layouts, varied aspect ratios
* 8-10: Masonry, fractional grids, massive whitespace
* **MOBILE:** Levels 4-10 → fall back to single column on < 768px

### MOTION_INTENSITY (1-10)
* 1-3: No auto-animations, :hover/:active only
* 4-7: Fluid CSS transitions, load-in cascades
* 8-10: Complex scroll-triggered, Framer Motion hooks (NO window.addEventListener('scroll'))

### VISUAL_DENSITY (1-10)
* 1-3: Art Gallery mode, huge gaps
* 4-7: Normal app spacing
* 8-10: Cockpit mode, no cards, 1px lines, `font-mono` for numbers

## 7. AI TELLS (FORBIDDEN PATTERNS)

### Visual & CSS
* NO Neon/Outer Glows (use inner borders or tinted shadows)
* NO Pure Black (#000000 → Zinc-950)
* NO Oversaturated Accents
* NO Gradient Text on large headers
* NO Custom Mouse Cursors

### Typography
* NO Inter Font for premium (Geist/Outfit/Satoshi)
* NO Oversized H1s (control hierarchy with weight/color)
* Serif ONLY for editorial, NEVER on dashboards

### Layout
* NO 3-Equal-Column Card Layouts (use 2-col Zig-Zag or horizontal scroll)
* Align & Space Perfectly

### Content
* NO Generic Names ("John Doe", "Sarah Chan")
* NO Generic Avatars (use creative placeholders or specific styling)
* NO Fake Numbers (use organic: 47.2%, not 99.99%)
* NO Startup Slop Names ("Acme", "Nexus", "SmartFlow")
* NO Filler Words ("Elevate", "Seamless", "Unleash")
* NO Broken Unsplash Links (use picsum.photos)

## 8. THE CREATIVE ARSENAL

### Navigation
Mac OS Dock Magnification, Magnetic Button, Gooey Menu, Dynamic Island, Contextual Radial Menu, Floating Speed Dial, Mega Menu Reveal

### Layout & Grids
Bento Grid, Masonry, Chroma Grid, Split Screen Scroll, Curtain Reveal

### Cards & Containers
Parallax Tilt Card, Spotlight Border Card, Glassmorphism Panel, Holographic Foil Card, Tinder Swipe Stack, Morphing Modal

### Scroll-Animations
Sticky Scroll Stack, Horizontal Scroll Hijack, Zoom Parallax, Scroll Progress Path, Liquid Swipe Transition

### Galleries & Media
Dome Gallery, Coverflow Carousel, Drag-to-Pan Grid, Hover Image Trail, Glitch Effect

### Typography
Kinetic Marquee, Text Mask Reveal, Text Scramble Effect, Circular Text Path

### Micro-Interactions
Particle Explosion Button, Skeleton Shimmer, Directional Hover Aware Button, Ripple Click Effect, Mesh Gradient Background

## 9. THE "MOTION-ENGINE" BENTO PARADIGM

### A. Core Design
* Aesthetic: High-end, minimal, functional
* Palette: Background #f9fafb, Cards #ffffff with 1px border-slate-200/50
* Surfaces: `rounded-[2.5rem]`, diffusion shadow
* Labels: OUTSIDE and BELOW cards (gallery style)
* Padding: `p-8` or `p-10`

### B. Animation Specs
* Spring Physics: NO linear easing
* Layout Transitions: `layout` and `layoutId` props
* Infinite Loops: Pulse, Typewriter, Float, Carousel
* **PERFORMANCE:** Memoize + isolate in Client Component

### C. 5-Card Archetypes
1. Intelligent List with auto-sort (layoutId)
2. Command Input with Typewriter Effect
3. Live Status with breathing indicators
4. Wide Data Stream (Infinite Carousel)
5. Contextual UI (Focus Mode with staggered highlight)

## 10. FINAL PRE-FLIGHT CHECK
- [ ] Global state used appropriately?
- [ ] Mobile layout safe for high-variance designs?
- [ ] Full-height uses `min-h-[100dvh]` NOT `h-screen`?
- [ ] useEffect animations have strict cleanup?
- [ ] Empty, loading, error states provided?
- [ ] Cards omitted where spacing suffices?
- [ ] Heavy animations isolated in Client Components?