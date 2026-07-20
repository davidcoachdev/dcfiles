---
name: Split View
platform: macos
slug: split-view
tag: NSSplitView
url: https://namethatui.com/macos/split-view
source: NameThatUI (namethatui.com)
also_called: split pane, splitter view, multi-pane layout, navigation split view
---

# Split View

> Demo interactivo: https://namethatui.com/macos/split-view

**Plataforma:** macos · **Tag/API:** `NSSplitView` · **También llamado:** split pane, splitter view, multi-pane layout, navigation split view

## Descripción
A split view divides one window region into two or more panes that can resize independently. The line between them is a split-view divider or splitter when it can be dragged, not merely a decorative separator. A sidebar is one specialized pane and can collapse while the remaining pane expands.

## Si lo llamaste…
“the window divided into two resizable panels”“the line between the two panes that I drag”“the divider that resizes the sidebar”“the left panel that collapses into the edge”“the toolbar line that follows the sidebar divider”
…you meant a split view.

## Anatomía — cada parte, nombrada
1. Pane (split-view item)NSSplitViewItem
Each independently sized region on either side of the divider is a pane, represented by an NSSplitViewItem.
2. Split-view divider (splitter)NSSplitView.dividerThickness
“The line between the two panes that I drag” is the split-view divider, also called a splitter.
3. Sidebar collapse behaviorNSSplitViewItem.collapseBehavior
The way a sidebar folds away and yields its width to the next pane is its collapse behavior.
4. Tracking separator toolbar itemNSTrackingSeparatorToolbarItem
The toolbar divider that stays exactly above a moving split-view divider is a tracking separator.

## Prompt para IA (paste-ready)
Build a native Split View with NSSplitView and NSSplitViewItem (SwiftUI: NavigationSplitView), using a draggable divider between independently sized panes. Give a sidebar item native collapse behavior and align any toolbar boundary with NSTrackingSeparatorToolbarItem.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS split view (NSSplitView, NSSplitViewController). Rule out: divider position not persisting without autosaveName; holding priorities deciding which pane absorbs window resize — the lowest priority pane grows; delegate min/max constraints fighting Auto Layout constraints on the same panes; canCollapse snapping a pane closed on double-click unexpectedly. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSSplitView |  |
|--------|-------------------------------------------------------------------------------------------------|--|
| AppKit | NSSplitViewItem |  |
| SwiftUI | NavigationSplitView |  |
| AppKit | NSSplitViewController |  |

## Ver también
- [Sidebar (Source List)](https://namethatui.com/macos/sidebar) (macOS)
- [Inspector](https://namethatui.com/macos/inspector) (macOS)
- [Toolbar (Unified Title Bar)](https://namethatui.com/macos/toolbar) (macOS)
- [Mac Window](https://namethatui.com/macos/window) (macOS)
