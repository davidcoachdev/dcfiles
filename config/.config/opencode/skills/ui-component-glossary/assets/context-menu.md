---
name: Context Menu
platform: macos
slug: context-menu
tag: NSMenu
url: https://namethatui.com/macos/context-menu
source: NameThatUI (namethatui.com)
also_called: contextual menu, right-click menu, shortcut menu
---

# Context Menu

> Demo interactivo: https://namethatui.com/macos/context-menu

**Plataforma:** macos · **Tag/API:** `NSMenu` · **También llamado:** contextual menu, right-click menu, shortcut menu

## Descripción
A context menu exposes actions relevant to the object under the pointer and opens from a secondary click or Control-click. It appears near that click and is made from standard menu items, separators, keyboard equivalents, and submenus. A dropdown menu has a visible control that opens it with a primary click, while a context menu is invoked directly from the content.

## Si lo llamaste…
“the menu that appears when you right click”“control click options for the thing under the pointer”“small action menu beside the selected item”“copy rename delete menu under the mouse”“menu that opens from a secondary click”
…you meant a context menu.

## Anatomía — cada parte, nombrada
1. Selection highlightNSMenuItem
“The blue bar behind the option under the pointer” is the menu item's selection highlight.
2. Separator itemNSMenuItem.separator()
“The little line between groups of right-click options” is a separator item.
3. Key equivalentNSMenuItem.keyEquivalent
“The keyboard shortcut text on the right” is the item's key equivalent.
4. Submenu indicatorNSMenuItem.submenu
“The sideways arrow that opens more options” is the submenu indicator.

## Prompt para IA (paste-ready)
Add a Context Menu using NSMenu on the target NSView (SwiftUI: View.contextMenu), opened by right-click or Control-click at the item under the pointer. Populate it with actions specific to that item; do not turn it into a primary-click dropdown anchored to a button.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS context menu (NSMenu, menu(for:), SwiftUI .contextMenu). Rule out: the menu built once and gone stale — implement menuNeedsUpdate/menuWillOpen; items greyed out because their target is nil and nothing in the responder chain implements the action; right-click, control-click and two-finger tap taking different code paths; a SwiftUI .contextMenu swallowing plain clicks on the row. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSMenu |  |
|--------|--------------------------------------------------------------------------------------------|--|
| SwiftUI | View.contextMenu(menuItems:) |  |
| AppKit | NSView.menu | the contextual menu associated with a view |
| AppKit | NSMenuItem |  |

## Ver también
- [Popover](https://namethatui.com/macos/popover) (macOS)
- [Pop-Up Button vs. Pull-Down Button vs. Combo Box](https://namethatui.com/macos/popup-pulldown-combo) (macOS)
- [Menu Bar Extra (Status Item)](https://namethatui.com/macos/menu-bar-extra) (macOS)
- [Focus Ring](https://namethatui.com/macos/focus-ring) (macOS)
