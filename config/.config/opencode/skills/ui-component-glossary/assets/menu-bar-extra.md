---
name: Menu Bar Extra (Status Item)
platform: macos
slug: menu-bar-extra
tag: NSStatusItem
url: https://namethatui.com/macos/menu-bar-extra
source: NameThatUI (namethatui.com)
also_called: status item, menu bar icon, menu bar app, status bar item, tray icon (Windows term)
---

# Menu Bar Extra (Status Item)

> Demo interactivo: https://namethatui.com/macos/menu-bar-extra

**Plataforma:** macos · **Tag/API:** `NSStatusItem` · **También llamado:** status item, menu bar icon, menu bar app, status bar item, tray icon (Windows term)

## Descripción
A menu bar extra is the small icon on the right side of the macOS menu bar, next to the clock — Wi-Fi, battery, and third-party apps all live here. In AppKit it is an NSStatusItem; SwiftUI calls the whole construct a MenuBarExtra. When you click one, its button enters the highlighted state — a pale rounded background that stays visible for as long as its menu or popover is open, then fades when the menu closes.

## Si lo llamaste…
“the icon in the top right of the mac menu bar”“pale background behind the menu bar icon when you click it”“highlighted state when the menu bar icon&#x27;s menu is open”“little icon next to the clock on mac”“system tray icon on mac”“app icon at the top of the screen with a dropdown”
…you meant a menu bar extra (status item).

## Anatomía — cada parte, nombrada
1. Template iconNSImage.isTemplate
“The monochrome icon that recolors itself” is a template icon.
2. Highlighted stateNSStatusBarButton.isHighlighted
“The thing behind the menu bar icon that gets highlighted” is the status button's highlighted state.
3. Attached menu or popoverNSStatusItem.menu
“The actual menu bar window that opens” is the status item's attached menu or popover.

## Prompt para IA (paste-ready)
Add a menu bar extra — an NSStatusItem in the macOS menu bar (SwiftUI: MenuBarExtra). While its menu or popover is open, the status item's button must show its highlighted state: the pale rounded background (NSStatusBarButton.isHighlighted), exactly like system menu bar icons.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS menu bar extra (NSStatusItem, SwiftUI MenuBarExtra). Rule out: the status item deallocating because nothing retains it; the icon ignoring dark menu bars because the image is not marked template; the item silently hidden when the menu bar runs out of room; the button highlight sticking because isHighlighted is managed manually; MenuBarExtra window style behaving differently from menu style. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSStatusItem |  |
|--------|--------------------------------------------------------------------------------------------------|--|
| SwiftUI | MenuBarExtra | macOS 13+ |
| AppKit | NSStatusBar.system.statusItem(withLength:) | how one is created |
| AppKit | NSStatusBarButton.isHighlighted | the pale rounded background while its menu is open |

## Ver también
- [Popover](https://namethatui.com/macos/popover) (macOS)
- [Context Menu](https://namethatui.com/macos/context-menu) (macOS)
- [Visual Effect Material (Vibrancy)](https://namethatui.com/macos/vibrancy) (macOS)
