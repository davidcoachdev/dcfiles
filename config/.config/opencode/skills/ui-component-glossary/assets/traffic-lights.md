---
name: Traffic Lights (Window Controls)
platform: macos
slug: traffic-lights
tag: NSWindow.standardWindowButton(_:)
url: https://namethatui.com/macos/traffic-lights
source: NameThatUI (namethatui.com)
also_called: window controls, title bar buttons, close minimize zoom buttons
---

# Traffic Lights (Window Controls)

> Demo interactivo: https://namethatui.com/macos/traffic-lights

**Plataforma:** macos · **Tag/API:** `NSWindow.standardWindowButton(_:)` · **También llamado:** window controls, title bar buttons, close minimize zoom buttons

## Descripción
Traffic lights are the red close, yellow minimize, and green window controls at the top-left of a macOS window. Their symbols appear when the pointer hovers over the group. The green control normally enters full screen and also exposes system window-arrangement choices; macOS still identifies it through NSWindow.ButtonType.zoomButton.

## Si lo llamaste…
“the three colored dots in the corner of a mac window”“red yellow and green buttons at the top left”“little x minus and arrows that appear when you hover”“mac window close minimize and full screen buttons”“green window button that makes the window bigger”
…you meant a traffic lights (window controls).

## Anatomía — cada parte, nombrada
1. Close buttonNSWindow.ButtonType.closeButton
The red control shows an x on group hover and closes the window rather than necessarily quitting the app.
2. Minimize buttonNSWindow.ButtonType.miniaturizeButton
The yellow control shows a minus on hover and miniaturizes the window into the Dock.
3. Zoom / full-screen buttonNSWindow.ButtonType.zoomButton
The green control normally enters full screen; Option-click invokes the traditional window Zoom behavior instead.
4. Dirty-document dotNSWindow.isDocumentEdited
The dark dot replacing the close button's x marks a document with unsaved changes.

## Prompt para IA (paste-ready)
Use the standard Traffic Lights from NSWindow.standardWindowButton(_:), preserving their native spacing, hover symbols, and the green button’s system-provided full-screen and window-arrangement behavior. Obtain the green control as .zoomButton and use NSWindow.toggleFullScreen(_:) only when explicitly invoking full screen; do not substitute custom circles.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS traffic lights (NSWindow.standardWindowButton). Rule out: buttons missing after changing styleMask or using borderless windows; hover glyphs gone because a custom titlebar accessory intercepts tracking; the green button zooming when you expected full screen (option-click zooms); repositioned buttons drifting after full-screen transitions because the themed frame re-lays them out. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSWindow.standardWindowButton(_:) |  |
|--------|-----------------------------------------------------------------------------------------------------------------------|--|
| AppKit | NSWindow.ButtonType | closeButton, miniaturizeButton, and zoomButton |
| AppKit | NSWindow.toggleFullScreen(_:) | enters or exits a Space-filling full-screen window |

## Ver también
- [Toolbar (Unified Title Bar)](https://namethatui.com/macos/toolbar) (macOS)
- [Focus Ring](https://namethatui.com/macos/focus-ring) (macOS)
- [Panel (Floating Window / HUD)](https://namethatui.com/macos/panel) (macOS)
