---
name: Marquee
platform: web
slug: marquee
tag: animation + @keyframes translateX
url: https://namethatui.com/web/marquee
source: NameThatUI (namethatui.com)
also_called: ticker, logo carousel, auto-scrolling strip
---

# Marquee

> Demo interactivo: https://namethatui.com/web/marquee

**Plataforma:** web · **Tag/API:** `animation + @keyframes translateX` · **También llamado:** ticker, logo carousel, auto-scrolling strip

## Descripción
“The logos that slide across by themselves” is a marquee — content auto-scrolling in an endless horizontal loop, named after the deprecated <marquee> tag. Today it is a CSS transform loop over duplicated content, dissolved at both ends by an edge fade. Windows separately calls the indeterminate progress bar style “marquee”, which is a different thing.

## Si lo llamaste…
“the logos that scroll sideways by themselves”“the news ticker text”“the endless scrolling logo strip”“text that moves across the screen on its own”“the auto sliding brand logos”
…you meant a marquee.

## Anatomía — cada parte, nombrada
1. Edge fademask-image: linear-gradient(…)
“The logos dissolving at both ends of the strip” is the edge fade — a mask, not a painted gradient.

## Prompt para IA (paste-ready)
Build a marquee: an auto-scrolling horizontal strip using a CSS @keyframes translateX(-50%) loop over exactly-duplicated content (never the deprecated `marquee` tag), with edge fade masks, pause on hover via animation-play-state, and a prefers-reduced-motion fallback that stops the motion.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my marquee (CSS translateX keyframe loop, react-fast-marquee). Rule out: the loop jumping at the seam because the content is not duplicated exactly once and translated by exactly -50%; animating left/width on the main thread instead of transform; hover-pause missing (animation-play-state); motion still running under prefers-reduced-motion; the deprecated `marquee` tag pasted in from an old snippet. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| CSS | animation + @keyframes translateX | the modern way: a transform loop over duplicated content |
|-----|-----------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|
| HTML | `marquee` | long deprecated — never ship it, but it named the pattern |
| React | react-fast-marquee |  |
| CSS | animation-play-state: paused | hover-pause |

## Ver también
- [Carousel](https://namethatui.com/web/carousel) (web)
- [Truncation (Ellipsis & Line Clamp)](https://namethatui.com/web/truncation) (web)
- [Progress Ring vs. Spinner vs. Progress Bar](https://namethatui.com/web/progress-indicators) (web)
- [Easing (Timing Function)](https://namethatui.com/web/easing) (web)
- [Text Scramble (Decode Effect)](https://namethatui.com/web/text-scramble) (web)
