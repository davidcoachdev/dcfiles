---
name: Popover vs. Dropdown Menu vs. Tooltip
platform: web
slug: popover-dropdown-tooltip
tag: popover
url: https://namethatui.com/web/popover-dropdown-tooltip
source: NameThatUI (namethatui.com)
also_called: popup, menu, hover hint, toggletip
---

# Popover vs. Dropdown Menu vs. Tooltip

> Demo interactivo: https://namethatui.com/web/popover-dropdown-tooltip

**Plataforma:** web · **Tag/API:** `popover` · **También llamado:** popup, menu, hover hint, toggletip

## Descripción
A popover opens on click and can contain rich text, controls, or forms; it stays until explicitly or externally dismissed. A dropdown menu also opens on click, but presents a keyboard-navigable list of actions and normally closes after selection. A tooltip is a brief, non-interactive label that appears on hover or keyboard focus and disappears when that trigger is left or blurred.

## Si lo llamaste…
“the little box attached to a button”“the list that opens under a menu button”“the label that appears when you hover”“a popup with controls inside it”“the tiny explanation next to an icon”
…you meant a popover vs. dropdown menu vs. tooltip.

## Anatomía — cada parte, nombrada
1. Overlay triggerpopovertarget
“The button the little box is attached to” is the overlay trigger.
2. Menu selection highlightrole="menuitem"
“The bar behind the dropdown action the arrows are on” is the menu selection highlight.
3. Tooltip arrowTooltip.Arrow
“The tiny point aiming the hover label at the icon” is the tooltip arrow.

## Prompt para IA (paste-ready)
Use the HTML popover attribute for the click-triggered rich overlay, role="menu" for the keyboard-navigable action list, and role="tooltip" only for a brief non-interactive hover or focus hint. Link the tooltip from its trigger with aria-describedby, keep every overlay anchored to its trigger, and implement the correct Escape, outside-click, and focus-dismissal behavior for each pattern.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my popover/dropdown/tooltip (Popover API, Radix, floating-ui). Rule out: the wrong primitive — tooltips are hover+focus, never interactive content; the panel clipped by an overflow ancestor instead of portaled to body or using the top-layer Popover API; flip/shift middleware missing so it overflows at viewport edges; outside-click closing it before the inside click registers. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| HTML | popover |  |
|------|---------------------------------------------------------------------------------------------|--|
| ARIA | role="tooltip" |  |
| ARIA | role="menu" |  |
| Radix | Popover |  |
| Radix | DropdownMenu |  |
| Radix | Tooltip |  |

## Ver también
- [Modal Dialog vs. Drawer vs. Sheet](https://namethatui.com/web/dialog-drawer-sheet) (web)
- [Hover Card](https://namethatui.com/web/hover-card) (web)
- [Context Menu](https://namethatui.com/macos/context-menu) (macOS)
- [Popover](https://namethatui.com/macos/popover) (macOS)
- [Date Picker](https://namethatui.com/web/date-picker) (web)
