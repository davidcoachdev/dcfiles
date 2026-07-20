---
name: Dock Badge
platform: macos
slug: dock-badge
tag: NSDockTile.badgeLabel
url: https://namethatui.com/macos/dock-badge
source: NameThatUI (namethatui.com)
also_called: Dock tile badge, app icon badge, notification badge
---

# Dock Badge

> Demo interactivo: https://namethatui.com/macos/dock-badge

**Plataforma:** macos · **Tag/API:** `NSDockTile.badgeLabel` · **También llamado:** Dock tile badge, app icon badge, notification badge

## Descripción
A Dock badge is the small red label overlaid on an application's Dock icon, usually showing an unread or pending count. The label belongs to the app's NSDockTile and can also contain short status text. Requesting user attention makes the Dock icon bounce and is a separate, more interruptive signal that should be used sparingly.

## Si lo llamaste…
“the red number bubble on a dock icon”“unread count on the app icon in the dock”“little red label in the corner of a mac app icon”“number badge showing pending notifications”“the red dot or number on a dock icon”
…you meant a dock badge.

## Anatomía — cada parte, nombrada
1. Badge labelNSDockTile.badgeLabel
“The red number bubble on the app icon” is the Dock tile's badge label.
2. Attention bounceNSApplication.requestUserAttention(_:)
“The app icon jumping in the Dock” is an attention bounce, not part of the badge.

## Prompt para IA (paste-ready)
Show a Dock Badge by assigning the count to NSApp.dockTile.badgeLabel, clearing the label when no count remains. If stronger attention is warranted, call NSApplication.requestUserAttention(_:) separately to bounce the Dock icon; the bounce is not the badge itself.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS Dock badge (NSDockTile.badgeLabel, NSApp.dockTile). Rule out: clearing with the string zero instead of nil or empty so a 0 stays visible; setting the badge from a background thread; expecting the badge to survive quit — it lives only while the app runs (UNUserNotificationCenter badge APIs persist); long strings truncating in the tile. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSDockTile.badgeLabel |  |
|--------|-----------------------------------------------------------------------------------------------------------|--|
| AppKit | NSApplication.dockTile |  |
| AppKit | NSApplication.requestUserAttention(_:) | bounces the Dock icon; separate from the badge |
| AppKit | NSApplication.RequestUserAttentionType |  |

## Ver también
- [Badge vs. Chip vs. Pill vs. Tag](https://namethatui.com/web/badge-chip-pill) (web)
- [Menu Bar Extra (Status Item)](https://namethatui.com/macos/menu-bar-extra) (macOS)
- [Toast (Snackbar)](https://namethatui.com/web/toast) (web)
