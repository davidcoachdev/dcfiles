---
name: Mac Window
platform: macos
slug: window
tag: NSWindow
url: https://namethatui.com/macos/window
source: NameThatUI (namethatui.com)
also_called: app window, document window, NSWindow, window frame
---

# Mac Window

> Demo interactivo: https://namethatui.com/macos/window

**Plataforma:** macos · **Tag/API:** `NSWindow` · **También llamado:** app window, document window, NSWindow, window frame

## Descripción
A Mac window is the movable, usually resizable frame that holds one app surface. Its top chrome can combine a draggable title bar, title, toolbar, accessories, and document tabs, while the red, yellow, and green traffic lights remain their own standard controls. Window tabs belong to the frame and group separate windows; an in-content tab view only switches content inside one window.

## Si lo llamaste…
“the whole mac app box on screen”“the top of the window where you can drag it”“the little control inside the title bar”“a button next to the traffic lights”“the tabs built into the mac window frame”“the tiny corner grip for resizing the window”
…you meant a mac window.

## Anatomía — cada parte, nombrada
1. Title barNSWindow.titleVisibility
“The strip across the top of the window” is the title bar, which can remain present even when its title text is hidden.
2. Window drag regionNSWindow.isMovableByWindowBackground
The blank area you grab to move the window is its drag region, not necessarily the visible title text.
3. Window titleNSWindow.title
The document or screen name printed in the title bar is the window title.
4. Unified toolbarNSWindow.ToolbarStyle.unified
When the title and window actions share one top row, that chrome uses the unified toolbar style.
5. Toolbar itemNSToolbarItem
One button, field, or flexible space placed in the window toolbar is a toolbar item.
6. Title-bar accessoryNSTitlebarAccessoryViewController
“The little control inside the title bar” is a title-bar accessory, separate from both the toolbar and traffic lights.
7. Title-bar separatorNSWindow.titlebarSeparatorStyle
The hairline between the window's top chrome and its content is the title-bar separator.
8. Window tabsNSWindowTabGroup
Tabs in the window frame group separate document windows; they are not an NSTabView inside the content area.
9. Resize edge / cornerNSWindow.StyleMask.resizable
“The tiny corner grip” means the resize edge or corner, which may be interactive even when no grip is drawn.

## Prompt para IA (paste-ready)
Build this as a native Mac Window (NSWindow; SwiftUI: Window or WindowGroup). Distinguish the draggable title-bar region from NSWindow.title, use an NSToolbar for unified chrome, attach custom title-bar controls with NSTitlebarAccessoryViewController, and preserve native window tabs and resize edges.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS window (NSWindow). Rule out: content underlapping the title bar because fullSizeContentView plus transparent title bar is set; the window not draggable where expected — isMovableByWindowBackground vs a draggable title bar area; keystrokes going nowhere because the first responder was cleared; frame autosave restoring an old position over your manual setFrame. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSWindow |  |
|--------|----------------------------------------------------------------------------------------------|--|
| SwiftUI | WindowGroup |  |
| SwiftUI | Window |  |
| AppKit | NSWindowController |  |

## Ver también
- [Traffic Lights (Window Controls)](https://namethatui.com/macos/traffic-lights) (macOS)
- [Toolbar (Unified Title Bar)](https://namethatui.com/macos/toolbar) (macOS)
- [Split View](https://namethatui.com/macos/split-view) (macOS)
- [Sidebar (Source List)](https://namethatui.com/macos/sidebar) (macOS)
