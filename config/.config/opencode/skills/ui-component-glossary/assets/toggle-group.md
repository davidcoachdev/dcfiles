---
name: Toggle Group (Segmented Control)
platform: web
slug: toggle-group
tag: ToggleGroup
url: https://namethatui.com/web/toggle-group
source: NameThatUI (namethatui.com)
also_called: segmented control, button group, view switcher, segmented button
---

# Toggle Group (Segmented Control)

> Demo interactivo: https://namethatui.com/web/toggle-group

**Plataforma:** web · **Tag/API:** `ToggleGroup` · **También llamado:** segmented control, button group, view switcher, segmented button

## Descripción
A toggle group is a compact row of related buttons that behave as one selection control. In single-select form it is often called a segmented control and works well for switching a view or mode immediately. Unlike tabs, it changes a setting or presentation rather than labeling separate content panels.

## Si lo llamaste…
“the connected row of buttons where one stays selected”“the compact view switcher with segments”“the group of pill buttons for list or grid”“three choices inside one rounded control”“the ios style segmented buttons on the web”
…you meant a toggle group (segmented control).

## Anatomía — cada parte, nombrada
1. Selected togglearia-checked
“The button in the group that stays filled” is the selected toggle.
2. Segment dividerToggleGroup
“The little line between two choices in the pill” is the segment divider.

## Prompt para IA (paste-ready)
Build a persistent single-select Toggle Group using Radix ToggleGroup. Present the connected buttons as one segmented control, expose the group as role="radiogroup" with role="radio" items and aria-checked state, and support arrow-key movement between segments.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my toggle group (aria-pressed, Radix ToggleGroup). Rule out: single vs multiple semantics mixed up — one behaves like radios, the other like checkboxes; the pressed state invisible because only color changes and not enough of it; deselecting the last item leaving nothing active when one must always stay on; arrow keys dead because roving focus is unimplemented. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| Radix | ToggleGroup |  |
|-------|-------------------------------------------------------------------------------------------------|--|
| ARIA | role="radiogroup" |  |
| ARIA | role="radio" |  |
| ARIA | aria-checked |  |
| shadcn/ui | ToggleGroup |  |

## Ver también
- [Tabs](https://namethatui.com/web/tabs) (web)
- [Switch vs. Checkbox vs. Radio](https://namethatui.com/web/switch-checkbox-radio) (web)
- [Segmented Control](https://namethatui.com/macos/segmented-control) (macOS)
- [Badge vs. Chip vs. Pill vs. Tag](https://namethatui.com/web/badge-chip-pill) (web)
