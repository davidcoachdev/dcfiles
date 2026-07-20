---
name: Sidebar (Source List)
platform: macos
slug: sidebar
tag: NavigationSplitView
url: https://namethatui.com/macos/sidebar
source: NameThatUI (namethatui.com)
also_called: source list, navigation sidebar, split view sidebar
---

# Sidebar (Source List)

> Demo interactivo: https://namethatui.com/macos/sidebar

**Plataforma:** macos · **Tag/API:** `NavigationSplitView` · **También llamado:** source list, navigation sidebar, split view sidebar

## Descripción
A sidebar is the leftmost navigation column used by apps such as Finder and Mail to organize destinations into sections. AppKit calls its list appearance a source list, while modern SwiftUI normally builds the structure with NavigationSplitView and sidebar list style. It can collapse independently of the main content and often uses a translucent material behind its rows.

## Si lo llamaste…
“the translucent list down the left side of a mac app”“finder style navigation column”“left panel with sections and selected rows”“sidebar that collapses next to the main content”“list of folders or pages on the left”“mac navigation rail with a frosted background”
…you meant a sidebar (source list).

## Anatomía — cada parte, nombrada
1. Source-list styleNSTableView.Style.sourceList
The spacious, vibrancy-aware Finder-like treatment of the rows is AppKit's source-list style.
2. Section headerNSOutlineViewDelegate.outlineView(_:isGroupItem:)
The small emphasized label dividing destinations into groups such as Favorites or iCloud is a section header.
3. Selection pillNSTableRowView.isSelected
“The rounded colored background behind the current row” is the sidebar's selection pill.
4. Sidebar toggle toolbar buttonNSSplitViewController.toggleSidebar(_:)
The standard split-rectangle toolbar icon that reveals or hides the leading column is the sidebar toggle.

## Prompt para IA (paste-ready)
Build a macOS Sidebar (Source List) with NavigationSplitView (AppKit: NSSplitViewController), using the native translucent sidebar appearance and source-list row selection. It must occupy the left column, support collapsing, and keep navigation separate from the detail content.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS sidebar (NSSplitViewController sidebar item, SwiftUI NavigationSplitView). Rule out: the frosted vibrancy missing because the sidebar content is not inside the sidebar-material effect view; toggleSidebar wired to the wrong split view item; the width not persisting without an autosaveName; the selection highlight losing its rounded inset style when the list style changes. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| SwiftUI | NavigationSplitView |  |
|---------|---------------------------------------------------------------------------------------------------------|--|
| AppKit | NSSplitViewController |  |
| AppKit | NSSplitViewItem(sidebarWithViewController:) |  |
| AppKit | NSTableView.Style.sourceList | the standard AppKit list appearance |
| SwiftUI | ListStyle.sidebar |  |

## Ver también
- [Inspector](https://namethatui.com/macos/inspector) (macOS)
- [Toolbar (Unified Title Bar)](https://namethatui.com/macos/toolbar) (macOS)
- [Visual Effect Material (Vibrancy)](https://namethatui.com/macos/vibrancy) (macOS)
- [Disclosure Triangle](https://namethatui.com/macos/disclosure-triangle) (macOS)
