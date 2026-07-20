---
name: Switch vs. Checkbox vs. Radio
platform: web
slug: switch-checkbox-radio
tag: <input type="checkbox" role="switch">
url: https://namethatui.com/web/switch-checkbox-radio
source: NameThatUI (namethatui.com)
also_called: toggle switch, check box, radio button, option button
---

# Switch vs. Checkbox vs. Radio

> Demo interactivo: https://namethatui.com/web/switch-checkbox-radio

**Plataforma:** web · **Tag/API:** `<input type="checkbox" role="switch">` · **También llamado:** toggle switch, check box, radio button, option button

## Descripción
A switch controls a binary setting and communicates that the change takes effect immediately, like turning notifications on. A checkbox represents an independent form value and may wait for Save or Submit; several checkboxes can be selected. Radio buttons form a named group in which choosing one option clears the others.

## Si lo llamaste…
“the on off sliding control”“the square box with a checkmark”“the circles where only one can be picked”“a setting that changes immediately”“choose several versus choose exactly one”
…you meant a switch vs. checkbox vs. radio.

## Anatomía — cada parte, nombrada
1. Switch thumbrole="switch"
“The little circle that slides left and right” is the switch thumb.
2. Switch trackrole="switch"
“The rounded pill behind the moving circle” is the switch track.
3. Checkbox checkmark`input`
“The tick that appears inside the square box” is the checkbox checkmark.
4. Radio selection dot`input`
“The filled dot inside the chosen circle” is the radio selection dot.

## Prompt para IA (paste-ready)
Use an `input` for the binary on/off setting, a native `input` for each independent checked choice, and same-name `input` controls when exactly one option is allowed. Give every control a visible clickable label and expose its checked state through the native control.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my switch/checkbox/radio. Rule out: the control flipping visually while state stays stale — controlled input without onChange; label clicks not toggling because for/id association is missing; radios not behaving as a group because their name attributes differ; the indeterminate checkbox state gone — it is settable only from JS, not markup. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| HTML | `input` |  |
|------|---------------------------------------------------------------------------------------------------------------------------|--|
| HTML | `input` |  |
| HTML | `input` |  |
| shadcn/ui | Switch |  |
| shadcn/ui | Checkbox |  |

## Ver también
- [Toggle Group (Segmented Control)](https://namethatui.com/web/toggle-group) (web)
- [Badge vs. Chip vs. Pill vs. Tag](https://namethatui.com/web/badge-chip-pill) (web)
- [Focus Ring (:focus-visible)](https://namethatui.com/web/focus-ring-web) (web)
- [Segmented Control](https://namethatui.com/macos/segmented-control) (macOS)
