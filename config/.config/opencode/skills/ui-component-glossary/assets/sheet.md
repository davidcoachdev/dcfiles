---
name: Sheet
platform: macos
slug: sheet
tag: NSWindow.beginSheet(_:completionHandler:)
url: https://namethatui.com/macos/sheet
source: NameThatUI (namethatui.com)
also_called: window-modal dialog, document-modal dialog, attached sheet
---

# Sheet

> Demo interactivo: https://namethatui.com/macos/sheet

**Plataforma:** macos · **Tag/API:** `NSWindow.beginSheet(_:completionHandler:)` · **También llamado:** window-modal dialog, document-modal dialog, attached sheet

## Descripción
A sheet is a modal panel attached to a particular window, traditionally descending from its title bar. It prevents interaction with that parent window while other app windows can remain usable. An app-modal dialog instead blocks the application as a whole and is not visually attached to one document window.

## Si lo llamaste…
“dialog that slides down from the window title bar”“modal attached to just one mac window”“panel hanging from the top of the document window”“save dialog attached to its parent window”“popup that blocks one window but not the whole app”
…you meant a sheet.

## Anatomía — cada parte, nombrada
1. Dimming layerView.sheet(isPresented:content:)
“The darkened area behind the sheet” is the dimming layer that marks the parent surface as temporarily unavailable.

## Prompt para IA (paste-ready)
Present this as a window-modal Sheet with NSWindow.beginSheet(_:completionHandler:) (SwiftUI: View.sheet), visibly attached beneath the parent window's title bar. Block only that parent window, not every window in the app.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS sheet (NSWindow.beginSheet(_:completionHandler:), SwiftUI View.sheet). Rule out: the isPresented/item binding never reset so it will not present a second time; endSheet never called so the parent window stays blocked; presenting from a view controller detached from the window so nothing appears; two sheets queued on one window presenting back-to-back unexpectedly. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSWindow.beginSheet(_:completionHandler:) |  |
|--------|-------------------------------------------------------------------------------------------------------------------------------|--|
| AppKit | NSWindow.endSheet(_:returnCode:) |  |
| SwiftUI | View.sheet(isPresented:onDismiss:content:) |  |
| AppKit | NSApplication.runModal(for:) | app-modal alternative, not a sheet |

## Ver también
- [Alert](https://namethatui.com/macos/alert) (macOS)
- [Panel (Floating Window / HUD)](https://namethatui.com/macos/panel) (macOS)
- [Scrim (Backdrop / Overlay)](https://namethatui.com/web/scrim) (web)
- [Modal Dialog vs. Drawer vs. Sheet](https://namethatui.com/web/dialog-drawer-sheet) (web)
- [Focus Ring](https://namethatui.com/macos/focus-ring) (macOS)
