---
name: Visual Effect Material (Vibrancy)
platform: macos
slug: vibrancy
tag: NSVisualEffectView
url: https://namethatui.com/macos/vibrancy
source: NameThatUI (namethatui.com)
also_called: visual effect material, frosted glass, translucent material, blur material
---

# Visual Effect Material (Vibrancy)

> Demo interactivo: https://namethatui.com/macos/vibrancy

**Plataforma:** macos · **Tag/API:** `NSVisualEffectView` · **También llamado:** visual effect material, frosted glass, translucent material, blur material

## Descripción
A visual effect material supplies the adaptive translucent background seen behind macOS sidebars, menus, and panels. NSVisualEffectView chooses the background effect through its Material and BlendingMode. Vibrancy is the related foreground treatment that increases contrast against that material; standard AppKit controls enable it where appropriate.

## Si lo llamaste…
“the frosted glass background behind a mac sidebar”“translucent blurred panel that shows colors through it”“see through material behind menus and huds”“mac blur effect that adapts to the wallpaper”“glassy background behind the window controls”
…you meant a visual effect material (vibrancy).

## Anatomía — cada parte, nombrada
1. Material layerNSVisualEffectView.Material
“The frosted glass background behind the panel” is the material layer.
2. Vibrant foregroundNSVisualEffectView.allowsVibrancy
“The text and icons that adapt against the glass” are the vibrant foreground.

## Prompt para IA (paste-ready)
Use an NSVisualEffectView for this Visual Effect Material background (SwiftUI: Material). Choose NSVisualEffectView.Material by semantic purpose and set the appropriate BlendingMode; let standard controls supply vibrancy automatically instead of recreating the effect with a fixed blur and opacity.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS vibrancy (NSVisualEffectView). Rule out: the wrong material for the surface (sidebar, menu, popover, hudWindow are distinct); blendingMode withinWindow when behindWindow was intended so nothing shows through; vibrant text/controls dead because they are not descendants of the effect view; everything going grey when the window deactivates via state followsWindowActiveState. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSVisualEffectView |  |
|--------|--------------------------------------------------------------------------------------------------------|--|
| AppKit | NSVisualEffectView.Material |  |
| AppKit | NSVisualEffectView.BlendingMode |  |
| SwiftUI | Material |  |

## Ver también
- [Sidebar (Source List)](https://namethatui.com/macos/sidebar) (macOS)
- [Panel (Floating Window / HUD)](https://namethatui.com/macos/panel) (macOS)
- [Popover](https://namethatui.com/macos/popover) (macOS)
- [Menu Bar Extra (Status Item)](https://namethatui.com/macos/menu-bar-extra) (macOS)
