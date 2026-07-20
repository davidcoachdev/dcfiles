---
name: Alert
platform: macos
slug: alert
tag: NSAlert
url: https://namethatui.com/macos/alert
source: NameThatUI (namethatui.com)
also_called: alert dialog, warning dialog, confirmation dialog, message box, system prompt
---

# Alert

> Demo interactivo: https://namethatui.com/macos/alert

**Plataforma:** macos · **Tag/API:** `NSAlert` · **También llamado:** alert dialog, warning dialog, confirmation dialog, message box, system prompt

## Descripción
“The little warning window with the app icon and two buttons” is an alert — NSAlert. It shows your app icon (badged with a yellow caution triangle for warnings), a bold message line, smaller informative text, and buttons where the first added is the blue default. Run it app-modal with runModal(), or attach it to a single window with beginSheetModal(for:) — then it slides out of that window's title bar like a sheet. The “Don't ask me again” checkbox is its built-in suppression button.

## Si lo llamaste…
“the popup with the app icon and a yellow warning triangle”“small window in the middle asking are you sure with two buttons”“the box with a don&#x27;t ask me again checkbox”“warning message with a bold line and smaller gray text under it”“the blue button that presses itself when you hit enter”“confirmation popup before deleting something”
…you meant a alert.

## Anatomía — cada parte, nombrada
1. Badged app iconNSAlert.icon
“The yellow triangle over the app icon” is the alert icon — your app's icon, badged with the caution symbol when alertStyle is .warning or .critical.
2. Message textNSAlert.messageText
“The bold line” is messageText — the one-sentence summary, phrased as a question when the alert asks for a decision.
3. Informative textNSAlert.informativeText
“The smaller gray text under the bold line” is informativeText — the consequences, spelled out in a sentence.
4. Suppression checkboxNSAlert.showsSuppressionButton
“The don't ask me again checkbox” is the suppression button — enable it with showsSuppressionButton and read suppressionButton.state after the alert returns.
5. Default buttonNSAlert.addButton(withTitle:)
“The blue button” is the default button — the first button added to the alert; it gets the accent color and the Return key.

## Prompt para IA (paste-ready)
Show a native macOS alert with NSAlert (SwiftUI: .alert): messageText is the bold summary line, informativeText the smaller explanation. Add buttons with addButton(withTitle:) — the first one becomes the blue default button and answers the Return key; a button titled Cancel answers Escape. Set showsSuppressionButton = true for the “Don't ask me again” checkbox and read suppressionButton.state afterwards.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS alert (NSAlert, SwiftUI View.alert). Rule out: presenting off the main thread; runModal blocking the whole app when beginSheetModal(for:) attached to one window was intended; the return-key default being the FIRST button added, not the one you expect; the suppression checkbox state never persisted to defaults. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSAlert |  |
|--------|---------------------------------------------------------------------------------------------|--|
| SwiftUI | .alert(_:isPresented:actions:message:) |  |
| AppKit | NSAlert.messageText |  |
| AppKit | NSAlert.informativeText |  |
| AppKit | NSAlert.showsSuppressionButton |  |
| AppKit | NSAlert.addButton(withTitle:) |  |
| AppKit | NSAlert.alertStyle | .warning / .informational / .critical |
| AppKit | NSAlert.beginSheetModal(for:completionHandler:) | attach to one window instead |

## Ver también
- [Sheet](https://namethatui.com/macos/sheet) (macOS)
- [Save Panel](https://namethatui.com/macos/save-panel) (macOS)
- [Panel (Floating Window / HUD)](https://namethatui.com/macos/panel) (macOS)
- [Modal Dialog vs. Drawer vs. Sheet](https://namethatui.com/web/dialog-drawer-sheet) (web)
