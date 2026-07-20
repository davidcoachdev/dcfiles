---
name: Focus Ring
platform: macos
slug: focus-ring
tag: NSView.focusRingType
url: https://namethatui.com/macos/focus-ring
source: NameThatUI (namethatui.com)
also_called: keyboard focus indicator, focus halo, first responder ring
---

# Focus Ring

> Demo interactivo: https://namethatui.com/macos/focus-ring

**Plataforma:** macos · **Tag/API:** `NSView.focusRingType` · **También llamado:** keyboard focus indicator, focus halo, first responder ring

## Descripción
A focus ring is the accent-colored glow, commonly blue, around the control that currently receives keyboard interaction. Text fields normally accept focus, while Full Keyboard Access allows Tab to move focus through additional controls such as buttons and pop-up buttons. AppKit draws the ring for the first responder according to its focusRingType, and custom layouts must leave enough space for that ring to remain visible.

## Si lo llamaste…
“the blue glow around the selected control”“outline that appears when you tab to a button”“blue border around the field that has keyboard focus”“highlight showing where keyboard input will go”“ring around buttons when full keyboard access is on”
…you meant a focus ring.

## Anatomía — cada parte, nombrada
1. First responderNSWindow.firstResponder
“The control that will get my typing” is the window's first responder.

## Prompt para IA (paste-ready)
Preserve the native Focus Ring around the first responder. In AppKit, make the control eligible for first-responder status, move focus with NSWindow.makeFirstResponder(_:), and keep NSView.focusRingType at .default; in SwiftUI, use View.focusable(_:) with FocusState. Leave enough space for the standard macOS accent-colored ring and do not replace it with a custom border.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS focus ring (NSView.focusRingType, SwiftUI .focusable/.focusEffectDisabled). Rule out: Full Keyboard Access (AppleKeyboardUIMode) on the user's Mac making every first control grab focus and show a ring; focusRingType = .none silenced by a custom drawFocusRingMask; the ring clipped by an ancestor that clips to bounds; SwiftUI focus state fighting an explicit makeFirstResponder call. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSView.focusRingType |  |
|--------|----------------------------------------------------------------------------------------------------------|--|
| AppKit | NSWindow.makeFirstResponder(_:) |  |
| AppKit | NSFocusRingType |  |
| SwiftUI | View.focusable(_:) |  |
| SwiftUI | FocusState |  |

## Ver también
- [Segmented Control](https://namethatui.com/macos/segmented-control) (macOS)
- [Stepper](https://namethatui.com/macos/stepper) (macOS)
- [Traffic Lights (Window Controls)](https://namethatui.com/macos/traffic-lights) (macOS)
- [Focus Ring (:focus-visible)](https://namethatui.com/web/focus-ring-web) (web)
