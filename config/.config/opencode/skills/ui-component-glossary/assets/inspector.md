---
name: Inspector
platform: macos
slug: inspector
tag: View.inspector(isPresented:content:)
url: https://namethatui.com/macos/inspector
source: NameThatUI (namethatui.com)
also_called: inspector panel, details sidebar, properties inspector, utility area
---

# Inspector

> Demo interactivo: https://namethatui.com/macos/inspector

**Plataforma:** macos · **Tag/API:** `View.inspector(isPresented:content:)` · **También llamado:** inspector panel, details sidebar, properties inspector, utility area

## Descripción
An inspector is a trailing panel that displays properties and controls for the item currently selected in the main content. Apps such as Keynote and Xcode organize formatting, identity, and configuration controls in inspectors so the document remains visible while details change. On macOS 14 and later SwiftUI provides a dedicated inspector modifier; classic AppKit layouts commonly build one as the trailing item of a split view.

## Si lo llamaste…
“the properties panel on the right side”“right sidebar that changes with the selected item”“keynote style format panel”“xcode panel showing details for what is selected”“collapsible settings column on the right”
…you meant a inspector.

## Anatomía — cada parte, nombrada
1. Inspector columnView.inspector(isPresented:content:)
“The properties panel on the right” is the inspector column.
2. Inspector section disclosureDisclosureGroup
“The little arrow that folds a group of settings” is an inspector section disclosure.
3. Inspector column dividerNSSplitViewItem
“The thin line you drag to resize the properties panel” is the inspector column divider.

## Prompt para IA (paste-ready)
Put these selection-specific controls in an Inspector using SwiftUI View.inspector(isPresented:content:) (macOS 14+), as a collapsible right-hand column with a sensible inspectorColumnWidth. The inspector must update with the selected object without replacing the main content.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS inspector (SwiftUI View.inspector(isPresented:), NSSplitViewItem(inspectorWithViewController:)). Rule out: the inspector auto-presenting as a sheet on narrow windows — that is the built-in adaptive behavior; the toggle binding out of sync because the user can also close it by dragging; min/ideal widths forcing a collapse on window resize; inspector content not tracking the current selection. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| SwiftUI | View.inspector(isPresented:content:) | macOS 14+ |
|---------|--------------------------------------------------------------------------------------------------------------------------|-----------|
| SwiftUI | View.inspectorColumnWidth(min:ideal:max:) |  |
| AppKit | NSSplitViewController | common foundation for a classic trailing inspector |
| AppKit | NSSplitViewItem |  |

## Ver también
- [Sidebar (Source List)](https://namethatui.com/macos/sidebar) (macOS)
- [Toolbar (Unified Title Bar)](https://namethatui.com/macos/toolbar) (macOS)
- [Visual Effect Material (Vibrancy)](https://namethatui.com/macos/vibrancy) (macOS)
- [Disclosure Triangle](https://namethatui.com/macos/disclosure-triangle) (macOS)
