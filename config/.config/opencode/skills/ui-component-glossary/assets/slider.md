---
name: Slider
platform: macos
slug: slider
tag: NSSlider
url: https://namethatui.com/macos/slider
source: NameThatUI (namethatui.com)
also_called: slider control, seek bar, track bar, range control
---

# Slider

> Demo interactivo: https://namethatui.com/macos/slider

**Plataforma:** macos · **Tag/API:** `NSSlider` · **También llamado:** slider control, seek bar, track bar, range control

## Descripción
“The dot you drag along a line” is a slider — NSSlider. The circle is the knob, the groove is the track, and the leading portion up to the knob is tinted with the accent color. A continuous slider picks any value in the range; give it tick marks (the little lines below) and allowsTickMarkValuesOnly, and the knob snaps between fixed stops — the Key Repeat slider in System Settings is the classic tick-marked one.

## Si lo llamaste…
“the dot you drag left and right to change a value”“volume style control with a round knob on a line”“the bar with a circle you slide”“the little lines under the slider it snaps to”“the blue filled part of the slider line”“drag thing for picking a number between min and max”
…you meant a slider.

## Anatomía — cada parte, nombrada
1. Knob (thumb)NSSlider.knobThickness
“The round dot you drag” is the knob — AppKit calls it the knob; the web calls the same thing a thumb.
2. Filled trackSlider + .tint
“The blue part of the line before the knob” is the filled side of the track — it shows how far along the range the value sits.
3. TrackNSSlider.SliderType.linear
“The groove the dot slides along” is the track — the full range, end to end.
4. Tick marksNSSlider.numberOfTickMarks
“The little lines under the slider” are tick marks — with allowsTickMarkValuesOnly the knob only lands on them.

## Prompt para IA (paste-ready)
Use a native macOS slider — NSSlider (SwiftUI: Slider(value:in:step:)): horizontal linear style, round knob, the leading side of the track tinted with the accent color. For discrete values add tick marks below with numberOfTickMarks and tickMarkPosition = .below, and snap the knob to them with allowsTickMarkValuesOnly = true. Set isContinuous = true so the value updates while dragging.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS slider (NSSlider, SwiftUI Slider). Rule out: actions flooding on every pixel because isContinuous is on (or missing when live updates were wanted); allowsTickMarkValuesOnly snapping values you did not expect; a value binding writing back during drag and fighting the gesture; vertical orientation inferred from frame shape in AppKit, not set explicitly. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSSlider |  |
|--------|----------------------------------------------------------------------------------------------|--|
| SwiftUI | Slider(value:in:step:) |  |
| AppKit | NSSlider.numberOfTickMarks |  |
| AppKit | NSSlider.allowsTickMarkValuesOnly | snap to ticks |
| AppKit | NSSlider.tickMarkPosition | .below / .above |
| AppKit | NSSlider.isContinuous | act while dragging, not just on release |

## Ver también
- [Stepper](https://namethatui.com/macos/stepper) (macOS)
- [Level Indicator](https://namethatui.com/macos/level-indicator) (macOS)
- [Segmented Control](https://namethatui.com/macos/segmented-control) (macOS)
