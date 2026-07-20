---
name: Parallax Scrolling
platform: web
slug: parallax
tag: animation-timeline: scroll()
url: https://namethatui.com/web/parallax
source: NameThatUI (namethatui.com)
also_called: parallax effect, parallax background, scroll-linked depth effect, fixed background
---

# Parallax Scrolling

> Demo interactivo: https://namethatui.com/web/parallax

**Plataforma:** web · **Tag/API:** `animation-timeline: scroll()` · **También llamado:** parallax effect, parallax background, scroll-linked depth effect, fixed background

## Descripción
“The background moves slower than the page” is parallax scrolling — layers translating at different rates while you scroll, faking depth. If the image doesn't move at all and content just slides over it, that's the fixed-background variant (background-attachment: fixed — famously ignored by iOS Safari), and one element holding still while the rest scrolls past it is position: sticky, not parallax. The modern driver is a scroll-driven animation: animation-timeline: scroll() maps scroll position straight onto animation progress.

## Si lo llamaste…
“efecto de imagen atras de web”“ful page paralax animation”“paralax”“the background moves slower than the page when you scroll”“the image stays still while the content scrolls over it”“3d depth effect when scrolling”
…you meant a parallax scrolling.

## Anatomía — cada parte, nombrada
1. Background layertranslateZ(-1 px) scale(2)
“The image behind that lags” is the background layer — the far plane moving at a fraction of scroll speed; the CSS trick pushes it back with translateZ(-1 px) and rescales it to fit.
2. Foreground layertranslateZ(0)
“The content that scrolls normally over it” is the foreground layer — the near plane moving at full scroll speed, which is what makes the lagging background read as depth.

## Prompt para IA (paste-ready)
Build a parallax scrolling section: layered depth where the background layer translates slower than the foreground as the user scrolls. Drive it with CSS scroll-driven animations (animation-timeline: scroll() — declared AFTER the animation shorthand, which otherwise resets it) or with Motion's useScroll + useTransform from "motion/react"; animate only transform/opacity. Do not use background-attachment: fixed — iOS Safari ignores it by design. Wrap the whole effect in @media (prefers-reduced-motion: reduce) and fall back to ordinary scrolling; parallax is a known vestibular trigger.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my parallax scrolling (scroll-driven animation / perspective trick / ScrollTrigger). Rule out: jank from layout work inside a scroll handler or from animating background-position instead of transform; background-attachment: fixed silently ignored on iOS Safari (by design — use a sticky or transformed layer instead); position: fixed children breaking because a perspective/transform ancestor became their containing block; a scroll-driven animation never starting because animation-timeline was declared before the animation shorthand or the scroller has no scrollable overflow; horizontal overflow introduced by the perspective trick's scale compensation; the effect still moving under prefers-reduced-motion: reduce. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| CSS | animation-timeline: scroll() | scroll-driven animation — progress follows the scrollbar; declare AFTER the animation shorthand |
|-----|------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| CSS | perspective + translateZ() + scale() | the classic pure-CSS depth trick — scale = 1 + (−z / perspective) |
| Motion | useScroll + useTransform | import from "motion/react" (the library formerly named framer-motion) |
| GSAP | ScrollTrigger { scrub: true } | tween progress pinned to scroll progress |
| CSS | background-attachment: fixed | the fixed-background lookalike — still ignored by iOS Safari, by design |

## Ver también
- [Sticky vs. Fixed Positioning](https://namethatui.com/web/sticky-fixed) (web)
- [Easing (Timing Function)](https://namethatui.com/web/easing) (web)
- [Spring Animation](https://namethatui.com/web/spring) (web)
