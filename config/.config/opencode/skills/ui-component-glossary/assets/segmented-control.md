---
name: Segmented Control
platform: macos
slug: segmented-control
tag: NSSegmentedControl
url: https://namethatui.com/macos/segmented-control
source: NameThatUI (namethatui.com)
also_called: segment control, segmented picker, button group
---

# Segmented Control

> Demo interactivo: https://namethatui.com/macos/segmented-control

**Plataforma:** macos · **Tag/API:** `NSSegmentedControl` · **También llamado:** segment control, segmented picker, button group

## Descripción
A segmented control groups a small set of related choices into one horizontal row of connected buttons. The selected segment receives a pressed or filled appearance, making the current mode immediately visible. NSSegmentedControl can also be configured for multiple or momentary tracking, but a segmented Picker normally represents one persistent selection.

## Si lo llamaste…
“the connected row of buttons where one stays selected”“pill split into several clickable choices”“small tabs that switch between views”“group of joined icon buttons in a toolbar”“horizontal selector with one pressed section”
…you meant a segmented control.

## Anatomía — cada parte, nombrada
1. Selected segmentNSSegmentedControl.selectedSegment
“The section that stays pressed” is the selected segment.
2. Segment dividerNSSegmentedControl
“The little line separating two choices in the pill” is a segment divider.

## Prompt para IA (paste-ready)
Use a Segmented Control with NSSegmentedControl (SwiftUI: a Picker with PickerStyle.segmented), showing the active segment with the native selected treatment. Keep the buttons connected as one control and bind selection so exactly one segment remains selected for this view switcher.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS segmented control (NSSegmentedControl). Rule out: trackingMode wrong — momentary segments fire and deselect, selectOne keeps a selection; selectedSegment being -1 in the action for momentary mode; segment images not template so dark mode breaks; auto segment widths jumping when labels change. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSSegmentedControl |  |
|--------|--------------------------------------------------------------------------------------------------------|--|
| SwiftUI | PickerStyle.segmented |  |
| AppKit | NSSegmentedControl.trackingMode | single, multiple, or momentary selection behavior |
| SwiftUI | View.pickerStyle(_:) |  |

## Ver también
- [Toolbar (Unified Title Bar)](https://namethatui.com/macos/toolbar) (macOS)
- [Tabs](https://namethatui.com/web/tabs) (web)
- [Toggle Group (Segmented Control)](https://namethatui.com/web/toggle-group) (web)
- [Focus Ring](https://namethatui.com/macos/focus-ring) (macOS)
