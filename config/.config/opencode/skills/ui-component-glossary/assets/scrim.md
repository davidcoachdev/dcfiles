---
name: Scrim (Backdrop / Overlay)
platform: web
slug: scrim
tag: ::backdrop
url: https://namethatui.com/web/scrim
source: NameThatUI (namethatui.com)
also_called: backdrop, overlay, modal overlay
---

# Scrim (Backdrop / Overlay)

> Demo interactivo: https://namethatui.com/web/scrim

**Plataforma:** web · **Tag/API:** `::backdrop` · **También llamado:** backdrop, overlay, modal overlay

## Descripción
A scrim is the translucent full-area layer between an open modal surface and the content behind it. It lowers background contrast, prevents accidental interaction, and makes the active layer obvious. Native HTML dialogs expose this layer as the ::backdrop pseudo-element.

## Si lo llamaste…
“the dark see-through layer behind a popup”“the page dimming when a modal opens”“the grey overlay behind a dialog”“the layer that blocks clicks behind the panel”“the faded background under a popup”“the greyed out background behind a popup”
…you meant a scrim (backdrop / overlay).

## Anatomía — cada parte, nombrada
1. Dim layer::backdrop
“The dark see-through layer behind the popup” is the scrim's dim layer.
2. Backdrop blurbackdrop-filter
“The page going soft behind the dark overlay” is the backdrop blur.
3. Light-dismiss areaHTMLDialogElement.close()
“The outside area I click to close the modal” is the light-dismiss area.

## Prompt para IA (paste-ready)
Add a scrim behind the modal using the `dialog`::backdrop pseudo-element. It should cover the viewport, dim and optionally blur the page, intercept pointer input, and fade reversibly with the modal.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my scrim/backdrop (::backdrop, fixed overlay). Rule out: scrolling chaining through to the page — set overscroll-behavior contain and lock body scroll; the scrim stacking under content because a transformed ancestor created its own stacking context; pointer-events still active while it fades out so it eats clicks invisibly; the dialog ::backdrop unstylable because the dialog was opened with show() not showModal(). The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| CSS | ::backdrop |  |
|-----|------------------------------------------------------------------------------------------------|--|
| HTML | `dialog` |  |
| CSS | backdrop-filter |  |

## Ver también
- [Modal Dialog vs. Drawer vs. Sheet](https://namethatui.com/web/dialog-drawer-sheet) (web)
- [Popover vs. Dropdown Menu vs. Tooltip](https://namethatui.com/web/popover-dropdown-tooltip) (web)
- [Visual Effect Material (Vibrancy)](https://namethatui.com/macos/vibrancy) (macOS)
- [Lightbox](https://namethatui.com/web/lightbox) (web)
- [Hamburger Menu (Nav Drawer)](https://namethatui.com/web/hamburger-menu) (web)
