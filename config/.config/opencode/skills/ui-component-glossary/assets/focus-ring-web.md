---
name: Focus Ring (:focus-visible)
platform: web
slug: focus-ring-web
tag: :focus-visible
url: https://namethatui.com/web/focus-ring-web
source: NameThatUI (namethatui.com)
also_called: focus indicator, keyboard focus outline, focus halo
---

# Focus Ring (:focus-visible)

> Demo interactivo: https://namethatui.com/web/focus-ring-web

**Plataforma:** web · **Tag/API:** `:focus-visible` · **También llamado:** focus indicator, keyboard focus outline, focus halo

## Descripción
A focus ring identifies the element that will receive the next keyboard action. The :focus pseudo-class matches any focused element, while :focus-visible lets the browser show the strong indicator when the input modality or control needs it, most notably during keyboard navigation. Never remove the default outline without supplying an equally visible replacement.

## Si lo llamaste…
“the outline around a button after pressing tab”“the blue ring on the selected control”“keyboard navigation highlight”“the border showing which button has focus”“the ring that should not appear on every mouse click”
…you meant a focus ring (:focus-visible).

## Anatomía — cada parte, nombrada
1. Focus outlineoutline
“The blue line around the button after I press Tab” is the focus outline.
2. Outline offsetoutline-offset
“The little gap between the control and its focus line” is the outline offset.

## Prompt para IA (paste-ready)
Style the keyboard focus ring with :focus-visible instead of suppressing the browser outline globally. Make it high contrast and clearly offset from the control; use :focus only for state that must apply regardless of whether focus came from keyboard or pointer.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my focus ring (outline, :focus-visible). Rule out: a global outline:none killing keyboard navigation everywhere; :focus styling mouse clicks when :focus-visible was intended; the ring clipped by an overflow-hidden ancestor — use outline-offset or box-shadow inside; a box-shadow ring invisible against a same-color background; programmatic .focus() not showing a ring without focus-visible options. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| CSS | :focus-visible |  |
|-----|----------------------------------------------------------------------------------------------------|--|
| CSS | :focus |  |
| HTML | tabindex |  |

## Ver también
- [Form Field](https://namethatui.com/web/form-field) (web)
- [Focus Ring](https://namethatui.com/macos/focus-ring) (macOS)
- [Command Palette](https://namethatui.com/web/command-palette) (web)
- [Switch vs. Checkbox vs. Radio](https://namethatui.com/web/switch-checkbox-radio) (web)
- [Toggle Group (Segmented Control)](https://namethatui.com/web/toggle-group) (web)
- [Sign-in Form](https://namethatui.com/web/sign-in-form) (web)
