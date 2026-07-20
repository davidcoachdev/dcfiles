---
name: Hover Card
platform: web
slug: hover-card
tag: HoverCard
url: https://namethatui.com/web/hover-card
source: NameThatUI (namethatui.com)
also_called: hover preview, profile preview, preview card
---

# Hover Card

> Demo interactivo: https://namethatui.com/web/hover-card

**Plataforma:** web · **Tag/API:** `HoverCard` · **También llamado:** hover preview, profile preview, preview card

## Descripción
A hover card is a rich preview associated with a person, place, or linked object. It reveals more information than a tooltip and may include passive metadata or a small number of actions, while leaving the underlying page usable. Its open and close delays must allow the pointer to move from the trigger into the card without flicker.

## Si lo llamaste…
“the profile preview when you hover a username”“the rich popup that appears over a link”“the little user card shown on hover”“a tooltip with an avatar and details”“the preview before opening a profile”
…you meant a hover card.

## Anatomía — cada parte, nombrada
1. Preview triggerHoverCardTrigger
“The username that reveals a card when I hover it” is the preview trigger.
2. Preview contentHoverCardContent
“The richer little profile popup” is the preview content.

## Prompt para IA (paste-ready)
Add a hover card using Radix HoverCard to preview the linked profile with an avatar and summary. Reveal it from both hover and keyboard focus after a short delay, keep it open while the pointer crosses into the card, and reverse the opacity and transform transitions smoothly on exit.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my hover card (Radix HoverCard, mouseenter/mouseleave). Rule out: the card closing while the pointer travels from trigger to card — you need a hover-intent delay or safe-polygon; touch devices never opening it because there is no hover — provide a tap/focus path; open/close delays tuned so short it flickers on skim; the card trapped under another stacking context. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| Radix | HoverCard |  |
|-------|-----------------------------------------------------------------------------------------------|--|
| CSS | :hover |  |
| HTML | popover |  |
| CSS | :focus-visible |  |

## Ver también
- [Popover vs. Dropdown Menu vs. Tooltip](https://namethatui.com/web/popover-dropdown-tooltip) (web)
- [Combobox (Autocomplete / Typeahead)](https://namethatui.com/web/combobox) (web)
- [Focus Ring (:focus-visible)](https://namethatui.com/web/focus-ring-web) (web)
- [Popover](https://namethatui.com/macos/popover) (macOS)
- [Card](https://namethatui.com/web/card) (web)
