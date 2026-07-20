---
name: Text Scramble (Decode Effect)
platform: web
slug: text-scramble
tag: ScrambleTextPlugin
url: https://namethatui.com/web/text-scramble
source: NameThatUI (namethatui.com)
also_called: decode effect, matrix text effect, shuffle text
---

# Text Scramble (Decode Effect)

> Demo interactivo: https://namethatui.com/web/text-scramble

**Plataforma:** web · **Tag/API:** `ScrambleTextPlugin` · **También llamado:** decode effect, matrix text effect, shuffle text

## Descripción
/ ScrambleTextPlugin · requestAnimationFrame + charset swap /

## Si lo llamaste…
“the text that shuffles random letters until it spells the word”“the matrix style decoding text”“letters cycling before they land on the real ones”“the hacker text effect”“glitchy letters that resolve into a title”
…you meant a text scramble (decode effect).

## Anatomía — cada parte, nombrada
1. Glyph churnchars (ScrambleTextPlugin)
“The random letters still spinning at the end while the rest has settled” is the churn — the not-yet-locked characters drawn from the scramble charset.

## Prompt para IA (paste-ready)
Build a text scramble (decode) effect: each character cycles random glyphs and locks into the real one left to right (GSAP ScrambleTextPlugin, or a requestAnimationFrame loop with a per-character settle deadline). Use a monospace font or tabular glyphs so width never jitters, expose the final string via aria-label with the churning span aria-hidden, and honor prefers-reduced-motion by rendering the text instantly.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my text scramble effect (GSAP ScrambleTextPlugin / rAF charset loop). Rule out: layout jitter because glyph widths differ (needs monospace or tabular-nums); the animation never settling because the per-character deadline keeps resetting on re-render; screen readers announcing garbage (final text must live in aria-label, churn aria-hidden); the effect re-running on every state change instead of once per mount; reduced-motion users getting the churn instead of instant text. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| GSAP | ScrambleTextPlugin | the canonical implementation — free since GSAP 3.13 |
|------|--------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| JS | requestAnimationFrame + charset swap | the hand-rolled version: per-character reveal deadline, random glyphs until then |
| CSS | font-variant-numeric: tabular-nums | monospace/tabular glyphs stop the line jittering while it churns |
| A11 y | aria-label + aria-hidden churn | screen readers get the final text, never the noise |

## Ver también
- [Marquee](https://namethatui.com/web/marquee) (web)
- [Skeleton vs. Spinner](https://namethatui.com/web/skeleton-spinner) (web)
