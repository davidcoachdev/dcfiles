---
name: Easing (Timing Function)
platform: web
slug: easing
tag: transition-timing-function
url: https://namethatui.com/web/easing
source: NameThatUI (namethatui.com)
also_called: timing function, easing curve, bezier curve
---

# Easing (Timing Function)

> Demo interactivo: https://namethatui.com/web/easing

**Plataforma:** web · **Tag/API:** `transition-timing-function` · **También llamado:** timing function, easing curve, bezier curve

## Descripción
“The animation feels robotic” is almost always easing — the timing function, the curve that maps time to progress. Linear moves at constant speed; ease-out starts fast and lands softly; ease-in-out is the S-curve UI motion defaults to. The four numbers in cubic-bezier() are just the two control points of that graph.

## Si lo llamaste…
“the animation feels robotic and linear”“how the movement speeds up and slows down”“the curve that controls the animation speed”“make it start fast and end slow”“the s shaped graph in the animation settings”
…you meant a easing (timing function).

## Anatomía — cada parte, nombrada
1. Timing curvecubic-bezier(x1, y1, x2, y2)
“The S-shaped graph in the animation editor” is the timing curve itself — time runs left to right, progress bottom to top.

## Prompt para IA (paste-ready)
Fix the easing of my animation: replace linear/default timing with an explicit curve — transition-timing-function: cubic-bezier(.4, 0, .2, 1) for UI moves (fast start, soft landing), ease-out for things entering, ease-in for things leaving; keep durations 150–300 ms for interface transitions and never animate at linear speed unless it's a marquee-style continuous loop.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug the feel of my animation (CSS transition-timing-function / cubic-bezier). Rule out: no timing function set so it falls back to the default ease; linear timing making UI motion feel robotic; ease-in on an ENTERING element (arrivals want ease-out — decelerate into place); a cubic-bezier with y values outside 0–1 clipping instead of overshooting in transition shorthand order; duration so long the curve reads as lag. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| CSS | transition-timing-function | ease, ease-in, ease-out, ease-in-out, linear |
|-----|----------------------------------------------------------------------------------------------------------------|----------------------------------------------|
| CSS | cubic-bezier(.4, 0, .2, 1) | a custom curve — the four numbers are the two control points |
| CSS | linear(…) | piecewise curves beyond beziers (springs, bounces); baseline since 2023 |
| Motion | transition={{ ease: "easeInOut" }} |  |

## Ver también
- [Spring Animation](https://namethatui.com/web/spring) (web)
- [Marquee](https://namethatui.com/web/marquee) (web)
- [Parallax Scrolling](https://namethatui.com/web/parallax) (web)
