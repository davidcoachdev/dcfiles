---
name: Menu Bar
platform: macos
slug: menu-bar
tag: NSApp.mainMenu
url: https://namethatui.com/macos/menu-bar
source: NameThatUI (namethatui.com)
also_called: menubar, system menu bar, top bar
---

# Menu Bar

> Demo interactivo: https://namethatui.com/macos/menu-bar

**Plataforma:** macos · **Tag/API:** `NSApp.mainMenu` · **También llamado:** menubar, system menu bar, top bar

## Descripción
The menu bar is the translucent strip across the top of the Mac screen. On the left are the system-owned Apple menu followed by the frontmost app’s main menu; the right side holds menu bar extras, followed by system status items and the clock. Every piece below has its own real name; hover a number to see exactly which part it names.

## Si lo llamaste…
“the bar at the top of the mac screen”“the strip with the apple logo and the clock”“top bar on mac with app menus”“where the wifi and battery icons live”“the thing that shows File Edit View at the top”
…you meant a menu bar.

## Anatomía — cada parte, nombrada
1. App menus (main menu)NSApp.mainMenu
“The File Edit View menus at the top” have a real name: the app's main menu.
2. Menu bar extra (status item)NSStatusItem
“The little icon near the clock” is a status item in NSStatusBar.system; SwiftUI calls it MenuBarExtra.
3. Template iconNSImage.isTemplate
The monochrome glyph that recolors itself for light/dark menu bars — a template image, usually an SF Symbol.
4. Highlighted stateNSStatusBarButton.isHighlighted
The pale rounded pill behind the icon while its menu or popover is open — the hardest-to-describe pixel on this page.
5. MenuNSMenu
“The dropdown” from a menu bar icon is an NSMenu — translucent, rounded, vibrancy-backed.
6. Selection highlight (menu item)NSMenuItem
“The blue bar when you hover an option”: the menu item's selection highlight, tinted with the system accent color.
7. Separator itemNSMenuItem.separator()
“The little line between options” is a separator item.
8. Key equivalentNSMenuItem.keyEquivalent
“The ⌘Q text on the right side of a menu option” is the item's key equivalent.

## Prompt para IA (paste-ready)
Work on the macOS menu bar: the app's main menu (NSApp.mainMenu) sits on the left after the Apple menu; menu bar extras (NSStatusItem in NSStatusBar.system) sit on the right before the clock. Use the exact part names: status item, its highlighted state, NSMenu, NSMenuItem, separator item.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS menu bar (NSMenu main menu, NSMenuItem). Rule out: items permanently greyed because their action has no target and nothing in the responder chain implements it; automatic enabling turned off (autoenablesItems) without manual validation; keyboard shortcuts defined but never firing because the item is disabled at validation time; the app menu title coming from the bundle display name, not from code. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSApp.mainMenu | the app's menus on the left |
|--------|----------------------------------------------------------------------------------------------------|-----------------------------|
| AppKit | NSStatusBar.system | the icon area on the right |
| SwiftUI | MenuBarExtra | one right-side icon, macOS 13+ |

## Ver también
- [Menu Bar Extra (Status Item)](https://namethatui.com/macos/menu-bar-extra) (macOS)
- [Context Menu](https://namethatui.com/macos/context-menu) (macOS)
- [Visual Effect Material (Vibrancy)](https://namethatui.com/macos/vibrancy) (macOS)
- [Site Header vs. Navigation Bar](https://namethatui.com/web/header-navbar) (web)
