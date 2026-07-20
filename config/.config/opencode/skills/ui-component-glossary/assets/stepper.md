---
name: Stepper
platform: macos
slug: stepper
tag: NSStepper
url: https://namethatui.com/macos/stepper
source: NameThatUI (namethatui.com)
also_called: stepper control, stepper arrows, numeric stepper, incrementer
---

# Stepper

> Demo interactivo: https://namethatui.com/macos/stepper

**Plataforma:** macos · **Tag/API:** `NSStepper` · **También llamado:** stepper control, stepper arrows, numeric stepper, incrementer

## Descripción
A stepper is a pair of small stacked arrow buttons for changing a value by a fixed increment. It commonly sits beside a numeric text field so users can either type an exact value or adjust it one step at a time. Its enabled states should reflect the configured minimum and maximum, and holding an arrow can repeat the change.

## Si lo llamaste…
“the tiny up and down arrows beside a number field”“little control that increases or decreases a value”“stacked arrow buttons next to a numeric input”“small plus minus style control for changing a number”“spinner arrows for adjusting a value one step at a time”
…you meant a stepper.

## Anatomía — cada parte, nombrada
1. Increment buttonNSStepper.increment
“The tiny upper arrow that raises the number” is the increment button.
2. Decrement buttonNSStepper.increment
“The tiny lower arrow that reduces the number” is the decrement button.

## Prompt para IA (paste-ready)
Place a native Stepper using NSStepper (SwiftUI: Stepper) beside the numeric field, with the compact up/down arrow pair vertically aligned to that field. Bind both controls to the same value and enforce the intended increment, minimum, and maximum.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS stepper (NSStepper, SwiftUI Stepper). Rule out: the stepper and its text field not bound to the same value so they drift; valueWraps looping from max back to min; autorepeat firing continuously while held when single steps were expected; a number formatter clamping or rejecting the value the stepper just set. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSStepper |  |
|--------|-----------------------------------------------------------------------------------------------|--|
| SwiftUI | Stepper |  |
| AppKit | NSStepper.increment |  |
| AppKit | NSStepper.minValue |  |
| AppKit | NSStepper.maxValue |  |

## Ver también
- [Slider](https://namethatui.com/macos/slider) (macOS)
- [Focus Ring](https://namethatui.com/macos/focus-ring) (macOS)
- [Segmented Control](https://namethatui.com/macos/segmented-control) (macOS)
- [Pop-Up Button vs. Pull-Down Button vs. Combo Box](https://namethatui.com/macos/popup-pulldown-combo) (macOS)
