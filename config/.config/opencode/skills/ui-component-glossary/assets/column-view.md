---
name: Column View (Browser)
platform: macos
slug: column-view
tag: NSBrowser
url: https://namethatui.com/macos/column-view
source: NameThatUI (namethatui.com)
also_called: browser view, Finder column view, Miller columns, hierarchical browser
---

# Column View (Browser)

> Demo interactivo: https://namethatui.com/macos/column-view

**Plataforma:** macos · **Tag/API:** `NSBrowser` · **También llamado:** browser view, Finder column view, Miller columns, hierarchical browser

## Descripción
A column view is a hierarchical browser where every selected branch opens its children in the next column to the right. Finder's Column view is the familiar example: several ancestry levels remain visible at once, so the path is spatial rather than only textual. AppKit's native control is NSBrowser; NavigationSplitView is only an approximate SwiftUI composition.

## Si lo llamaste…
“the finder columns thing”“folders opening in columns to the right”“the file browser where every level gets a new column”“side by side columns showing a folder path”“the hierarchy browser with arrows at the end of rows”
…you meant a column view (browser).

## Anatomía — cada parte, nombrada
1. Path columnNSBrowser
“Each folder opening in a new column” is a path column in an NSBrowser.
2. Branch indicatorNSBrowserCell.isLeaf
“The little arrow at the end of a folder row” is the branch indicator for a non-leaf cell.
3. Selected pathNSBrowser.path
“The highlighted row in every column” is the selected path through the browser.

## Prompt para IA (paste-ready)
Build a Finder-style Column View with NSBrowser and NSBrowserCell: selecting a non-leaf row reveals its children in a new column immediately to the right, preserving the visible hierarchy path. Do not substitute a flat list or a single sidebar-detail split.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS column view (NSBrowser, Miller columns). Rule out: stale columns because reloadColumn/reloadData never ran after the model changed; confusing path-based selection with item-based delegate methods; lazy child loading never triggered because isLeafItem answers wrong; the horizontal scroll position jumping when columns are added. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSBrowser |  |
|--------|-----------------------------------------------------------------------------------------------|--|
| AppKit | NSBrowserCell |  |
| SwiftUI | NavigationSplitView | approximate; no direct equivalent |

## Ver también
- [Outline View](https://namethatui.com/macos/outline-view) (macOS)
- [Sidebar (Source List)](https://namethatui.com/macos/sidebar) (macOS)
- [Scroll View (Scroller)](https://namethatui.com/macos/scroll-view) (macOS)
- [Disclosure Triangle](https://namethatui.com/macos/disclosure-triangle) (macOS)
