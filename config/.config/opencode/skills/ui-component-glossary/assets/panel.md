---
name: Panel (Floating Window / HUD)
platform: macos
slug: panel
tag: NSPanel
url: https://namethatui.com/macos/panel
source: NameThatUI (namethatui.com)
also_called: floating panel, utility panel, HUD window, heads-up display
---

# Panel (Floating Window / HUD)

> Demo interactivo: https://namethatui.com/macos/panel

**Plataforma:** macos · **Tag/API:** `NSPanel` · **También llamado:** floating panel, utility panel, HUD window, heads-up display

## Descripción
A panel is an auxiliary window for tools, controls, or transient information rather than a primary document. It can float above normal windows, hide when its app becomes inactive, or use a HUD appearance. A non-activating panel can accept appropriate interaction without bringing the entire app forward, which suits command launchers and Spotlight-like surfaces.

## Si lo llamaste…
“small utility window that stays above the main window”“floating controls palette on mac”“dark translucent heads up display window”“spotlight style window that does not activate the app”“tool window that follows the active document”
…you meant a panel (floating window / hud).

## Anatomía — cada parte, nombrada
1. Floating window levelNSWindow.Level.floating
“The utility window that stays above the document” uses a floating window level.
2. HUD chromeNSWindow.StyleMask.hudWindow
“The dark translucent heads-up-display frame” is HUD chrome.

## Prompt para IA (paste-ready)
Implement this auxiliary surface as a Panel (Floating Window / HUD) using NSPanel, with NSWindow.Level.floating so it stays above its related document windows. If it should behave like Spotlight, use the nonactivatingPanel style so showing it does not activate the app or steal focus unnecessarily.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS panel (NSPanel). Rule out: the panel stealing focus from the main window because the nonactivatingPanel style mask is missing; text fields inside refusing input because the panel cannot become key; the panel vanishing on app deactivate via hidesOnDeactivate; a floating window level fighting other always-on-top windows. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSPanel |  |
|--------|---------------------------------------------------------------------------------------------|--|
| AppKit | NSWindow.StyleMask.nonactivatingPanel | allows a panel that does not activate its app |
| AppKit | NSWindow.StyleMask.hudWindow | heads-up-display panel appearance |
| AppKit | NSWindow.Level.floating |  |
| AppKit | NSPanel.becomesKeyOnlyIfNeeded |  |

## Ver también
- [Sheet](https://namethatui.com/macos/sheet) (macOS)
- [Popover](https://namethatui.com/macos/popover) (macOS)
- [Visual Effect Material (Vibrancy)](https://namethatui.com/macos/vibrancy) (macOS)
- [Command Palette](https://namethatui.com/web/command-palette) (web)
