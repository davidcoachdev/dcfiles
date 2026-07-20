---
name: Spring Animation
platform: web
slug: spring
tag: transition={{ type: "spring", stiffness, damping }}
url: https://namethatui.com/web/spring
source: NameThatUI (namethatui.com)
also_called: spring physics, bouncy animation, spring transition
---

# Spring Animation

> Demo interactivo: https://namethatui.com/web/spring

**Plataforma:** web · **Tag/API:** `transition={{ type: "spring", stiffness, damping }}` · **También llamado:** spring physics, bouncy animation, spring transition

## Descripción
“It bounces a little past where it lands” is a spring animation — motion driven by physics (stiffness, damping, mass) instead of a duration and curve. The signature is the overshoot: the element passes its target and settles back. Springs also retarget mid-flight gracefully, which is why gesture-driven UIs use them.

## Si lo llamaste…
“the bouncy animation that goes past and comes back”“it overshoots a little and settles”“the jelly bounce when a panel opens”“ios style bouncy movement”“animation with stiffness and damping instead of duration”
…you meant a spring animation.

## Anatomía — cada parte, nombrada
1. Overshootdamping
“Where it goes past the line and comes back” is the overshoot — damping controls how much of it survives.

## Prompt para IA (paste-ready)
Give this animation spring physics: use Motion's transition={{ type: "spring", stiffness: 300, damping: 22 }} (or react-spring) instead of a duration+easing pair — the element should slightly overshoot its target and settle; raise damping to kill wobble, raise stiffness for snap. For pure CSS, bake the spring into a linear() timing function.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my spring animation (Motion type: "spring", react-spring, CSS linear()). Rule out: damping too low so it wobbles like jelly; stiffness too low so it feels underwater; a duration fighting the physics (springs compute their own settle time); the overshoot clipped by an overflow-hidden parent; interruptions snapping because the spring restarts from the target instead of retargeting from current velocity. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| Motion | transition={{ type: "spring", stiffness, damping }} | no duration — the physics decide when it stops |
|--------|-----------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------|
| CSS | linear(…) | a spring baked into keypoints — springs as pure CSS |
| React | react-spring |  |
| SwiftUI | .spring(response:dampingFraction:) | the same idea on Apple platforms |

## Ver también
- [Easing (Timing Function)](https://namethatui.com/web/easing) (web)
- [Toast (Snackbar)](https://namethatui.com/web/toast) (web)
- [Parallax Scrolling](https://namethatui.com/web/parallax) (web)
