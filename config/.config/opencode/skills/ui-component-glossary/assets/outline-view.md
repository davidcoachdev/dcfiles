---
name: Outline View
platform: macos
slug: outline-view
tag: NSOutlineView
url: https://namethatui.com/macos/outline-view
source: NameThatUI (namethatui.com)
also_called: tree view, hierarchical list, outline list, expandable table
---

# Outline View

> Demo interactivo: https://namethatui.com/macos/outline-view

**Plataforma:** macos · **Tag/API:** `NSOutlineView` · **También llamado:** tree view, hierarchical list, outline list, expandable table

## Descripción
An outline view is a tree-shaped list: rows can contain children, indentation shows depth, and disclosure triangles expand or collapse branches. A plain list has no hierarchy. A source list is a sidebar appearance and navigation convention that can be implemented with an outline view, but the terms are not interchangeable.

## Si lo llamaste…
“the indented list with little expand arrows”“tree of folders where rows have children”“a list with nested rows you can open and close”“the sidebar-looking list with hierarchy levels”“expandable rows indented under their parent”
…you meant a outline view.

## Anatomía — cada parte, nombrada
1. Disclosure triangleNSOutlineView
“The little expand arrow beside a row” is its disclosure triangle.
2. Indentation levelNSOutlineView.level(forItem:)
“How far a child row steps in from its parent” is its indentation level.
3. Row selection highlightNSTableRowView.isSelected
“The colored strip behind the current row” is the row selection highlight.

## Prompt para IA (paste-ready)
Use an Outline View with NSOutlineView (SwiftUI: OutlineGroup) for the indented hierarchy: parent rows receive disclosure triangles and expanding one reveals child rows directly beneath it. Use a flat list only when rows have no children; apply source-list styling separately if the outline serves as a sidebar.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS outline view (NSOutlineView). Rule out: rows refusing to expand because isItemExpandable and the child-count delegate answers disagree; reloadItem without reloadChildren:true leaving stale children; autosaveExpandedItems silently broken because items lack stable identity for persistentObject round-trips; row animations jumping because the model mutated before the animated update ran. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSOutlineView |  |
|--------|---------------------------------------------------------------------------------------------------|--|
| SwiftUI | OutlineGroup |  |
| SwiftUI | List | when supplied hierarchical children |

## Ver también
- [Disclosure Triangle](https://namethatui.com/macos/disclosure-triangle) (macOS)
- [Sidebar (Source List)](https://namethatui.com/macos/sidebar) (macOS)
- [Column View (Browser)](https://namethatui.com/macos/column-view) (macOS)
- [Scroll View (Scroller)](https://namethatui.com/macos/scroll-view) (macOS)
