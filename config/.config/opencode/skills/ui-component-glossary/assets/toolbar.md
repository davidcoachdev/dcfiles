---
name: Toolbar (Unified Title Bar)
platform: macos
slug: toolbar
tag: NSToolbar
url: https://namethatui.com/macos/toolbar
source: NameThatUI (namethatui.com)
also_called: window toolbar, unified toolbar, title bar toolbar
---

# Toolbar (Unified Title Bar)

> Demo interactivo: https://namethatui.com/macos/toolbar

**Plataforma:** macos · **Tag/API:** `NSToolbar` · **También llamado:** window toolbar, unified toolbar, title bar toolbar

## Descripción
A toolbar holds the primary actions for a window and can share a single top row with the window title in the unified style. Its native toolbar items participate in macOS spacing, validation, customization, and overflow behavior. A title bar separator can appear between this chrome and the window's content, depending on the window style and scroll position.

## Si lo llamaste…
“the row of buttons across the top of a mac window”“title bar with search and action icons in it”“mac window header where the toolbar and title share one row”“top strip with customizable window actions”“line separating the toolbar from the window content”
…you meant a toolbar (unified title bar).

## Anatomía — cada parte, nombrada
1. Toolbar itemNSToolbarItem
One button, search field, control group, or flexible space in the toolbar is a toolbar item.
2. Toolbar item labelNSToolbarItem.label
The text shown beneath an icon in icon-and-text mode is the item label; the customization palette can use a separate palette label.
3. Overflow chevronNSToolbarItem.visibilityPriority
The trailing chevron that appears when items no longer fit opens the toolbar's overflow menu.
4. Title-bar separator stylesNSWindow.titlebarSeparatorStyle
The boundary under the toolbar can be automatic, a visible line, a shadow, or absent through the title-bar separator style.

## Prompt para IA (paste-ready)
Create a Toolbar (Unified Title Bar) with NSToolbar and NSWindow.ToolbarStyle.unified (SwiftUI: View.toolbar), using native NSToolbarItem placement and spacing. Keep the title inline with the actions and let NSWindow.titlebarSeparatorStyle control the divider above the content.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS toolbar (NSToolbar, NSToolbarItem). Rule out: items missing because they are absent from itemIdentifiers defaults vs alloweds; items greyed by validateToolbarItem returning false (or not implemented for custom views); user customization not persisting without autosavesConfiguration; unified title bar style shifting content layout under the toolbar. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSToolbar |  |
|--------|-----------------------------------------------------------------------------------------------|--|
| AppKit | NSToolbarItem |  |
| AppKit | NSWindow.ToolbarStyle.unified | places the window title inline with toolbar items |
| AppKit | NSWindow.titlebarSeparatorStyle |  |
| SwiftUI | View.toolbar(content:) |  |

## Ver también
- [Traffic Lights (Window Controls)](https://namethatui.com/macos/traffic-lights) (macOS)
- [Sidebar (Source List)](https://namethatui.com/macos/sidebar) (macOS)
- [Segmented Control](https://namethatui.com/macos/segmented-control) (macOS)
- [Inspector](https://namethatui.com/macos/inspector) (macOS)
