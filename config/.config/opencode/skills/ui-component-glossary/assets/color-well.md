---
name: Color Well
platform: macos
slug: color-well
tag: NSColorWell
url: https://namethatui.com/macos/color-well
source: NameThatUI (namethatui.com)
also_called: color picker button, color swatch control, color chooser, color selector
---

# Color Well

> Demo interactivo: https://namethatui.com/macos/color-well

**Plataforma:** macos · **Tag/API:** `NSColorWell` · **También llamado:** color picker button, color swatch control, color chooser, color selector

## Descripción
“The little square showing the current color” is a color well — NSColorWell. Since macOS 13 it has three styles: minimal (just the swatch), default, and expanded — the modern one with a caret button attached. Clicking the expanded well opens a quick popover with a grid of swatches and an eyedropper; the caret opens the full color panel. The eyedropper that samples any pixel on screen is its own one-call API: NSColorSampler.

## Si lo llamaste…
“the small rectangle showing the current color”“color swatch you click to open the color picker”“the eyedropper for picking a color from the screen”“little colored square with an arrow next to it”“the grid of color squares that pops up”“control for choosing a color in settings”
…you meant a color well.

## Anatomía — cada parte, nombrada
1. Color swatchNSColorWell.color
“The colored area itself” is the swatch — it always displays the well's current color and is the click target for the quick picker.
2. Color-panel buttonNSColorWell.Style.expanded
“The little arrow segment next to the swatch” is the dedicated button the expanded style adds — it opens the full color panel.
3. Quick color popoverNSColorWell.colorWellStyle
“The grid of color squares that pops up” is the expanded style's quick picker — swatches for fast choices, without the full panel.
4. Eyedropper (color sampler)NSColorSampler
“The eyedropper that picks a color from anywhere on screen” is the system color sampler — one call: NSColorSampler().show { color in … }.

## Prompt para IA (paste-ready)
Add a native macOS color well — NSColorWell (SwiftUI: ColorPicker). Use colorWellStyle = .expanded for the modern two-part control: clicking the swatch opens the quick color-grid popover with an eyedropper, and the caret button opens the full NSColorPanel. For a standalone screen-color eyedropper use NSColorSampler().show { color in … }.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS color well (NSColorWell, SwiftUI ColorPicker). Rule out: the shared NSColorPanel serving every well in the app so two wells fight over it; continuous updates flooding your target action instead of committing on close; the eyedropper failing without Screen Recording permission; colors shifting because sRGB and Display P3 color spaces are being mixed. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSColorWell |  |
|--------|-------------------------------------------------------------------------------------------------|--|
| SwiftUI | ColorPicker |  |
| AppKit | NSColorWell.colorWellStyle | .minimal / .default / .expanded (macOS 13+) |
| AppKit | NSColorWell.color |  |
| AppKit | NSColorSampler | the standalone eyedropper |
| AppKit | NSColorWell.supportsAlpha |  |

## Ver también
- [Popover](https://namethatui.com/macos/popover) (macOS)
- [Pop-Up Button vs. Pull-Down Button vs. Combo Box](https://namethatui.com/macos/popup-pulldown-combo) (macOS)
- [Panel (Floating Window / HUD)](https://namethatui.com/macos/panel) (macOS)
