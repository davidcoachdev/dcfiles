---
name: Save Panel
platform: macos
slug: save-panel
tag: NSSavePanel
url: https://namethatui.com/macos/save-panel
source: NameThatUI (namethatui.com)
also_called: save dialog, save-as panel, file save picker, NSSavePanel
---

# Save Panel

> Demo interactivo: https://namethatui.com/macos/save-panel

**Plataforma:** macos · **Tag/API:** `NSSavePanel` · **También llamado:** save dialog, save-as panel, file save picker, NSSavePanel

## Descripción
A save panel is the system dialog for choosing a filename, location, and sometimes file format. Its compact form can expand into a Finder-like browser with a sidebar and directory contents. NSSavePanel supplies the native behavior, validation, sandbox integration, and sheet presentation.

## Si lo llamaste…
“the mac save as window”“the dialog where you name a file before saving”“the little arrow that expands the save dialog”“the file format dropdown in save as”“the finder sidebar inside the save window”
…you meant a save panel.

## Anatomía — cada parte, nombrada
1. Name fieldNSSavePanel.nameFieldStringValue
The editable Save As text box is the panel's name field.
2. Disclosure expansion buttonNSSavePanel.isExpanded
“The little arrow that makes the save window bigger” is the disclosure button for the panel's expanded browser.
3. Format pop-upNSSavePanel.allowedContentTypes
The file-type selector beneath the name is the format pop-up, constrained by the panel's allowed content types.

## Prompt para IA (paste-ready)
Present the standard Save Panel with NSSavePanel (SwiftUI workflow: View.fileExporter), including its editable name field, disclosure button for the expanded file browser, allowed-content-type format pop-up, and Finder-style sidebar. Do not rebuild the system save dialog from custom controls.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS save panel (NSSavePanel, NSOpenPanel). Rule out: sandboxed URLs failing later because startAccessingSecurityScopedResource was never called or a bookmark was never saved; allowedContentTypes filtering out everything so Save stays disabled; runModal blocking the app when beginSheetModal was intended; the panel opening in the wrong folder because directoryURL is set after presentation. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSSavePanel |  |
|--------|-------------------------------------------------------------------------------------------------|--|
| SwiftUI | View.fileExporter(isPresented:document:contentType:defaultFilename:onCompletion:) |  |
| AppKit | NSSavePanel.beginSheetModal(for:completionHandler:) |  |

## Ver también
- [Sheet](https://namethatui.com/macos/sheet) (macOS)
- [Sidebar (Source List)](https://namethatui.com/macos/sidebar) (macOS)
- [Disclosure Triangle](https://namethatui.com/macos/disclosure-triangle) (macOS)
- [Pop-Up Button vs. Pull-Down Button vs. Combo Box](https://namethatui.com/macos/popup-pulldown-combo) (macOS)
