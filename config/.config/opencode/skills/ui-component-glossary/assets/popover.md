---
name: Popover
platform: macos
slug: popover
tag: NSPopover
url: https://namethatui.com/macos/popover
source: NameThatUI (namethatui.com)
also_called: anchored popover, popover bubble, callout
---

# Popover

> Demo interactivo: https://namethatui.com/macos/popover

**Plataforma:** macos · **Tag/API:** `NSPopover` · **También llamado:** anchored popover, popover bubble, callout

## Descripción
A popover is a lightweight floating bubble for controls or information related to one specific source view. Its arrow identifies the control that opened it, and AppKit chooses an edge that keeps the bubble onscreen. Depending on its behavior, it can close when the user interacts elsewhere or remain open until dismissed explicitly.

## Si lo llamaste…
“the little floating bubble with an arrow”“box that points back to the button that opened it”“small window attached to a toolbar button”“speech bubble panel anchored to a control”“floating settings bubble that closes when you click away”
…you meant a popover.

## Anatomía — cada parte, nombrada
1. Anchor arrowNSPopover.show(relativeTo:of:preferredEdge:)
“The little point on the bubble aimed at the button” is the anchor arrow. A classic bug in custom popovers is an arrow that reads as a separate triangle stuck onto the bubble — it must share the bubble's exact background and mask the border where they meet.
2. Positioning rectNSPopover.show(relativeTo:of:preferredEdge:)
“The exact bit of the button the bubble attaches to” is the positioning rect.

## Prompt para IA (paste-ready)
Present this as a Popover using NSPopover (SwiftUI: View.popover), with a visible anchor arrow aimed at the exact control that opened it. The arrow must share the bubble's exact background and blend seamlessly into it, never read as a separate triangle. It should remain visually attached to that control and dismiss with native popover behavior.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS popover (NSPopover, SwiftUI View.popover). Rule out: transient behavior closing it on the first click inside custom content that does not accept first responder; the arrow anchored to a stale positioning rect after layout changes; a custom-drawn anchor arrow reading as a detached triangle because it is painted under the bubble's border or shadow or with a mismatched fill; the popover detaching into a floating window when dragged (detachable delegate); SwiftUI popovers presenting as sheets in compact contexts. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSPopover |  |
|--------|-----------------------------------------------------------------------------------------------|--|
| AppKit | NSPopover.show(relativeTo:of:preferredEdge:) | positions the popover and its anchor arrow |
| SwiftUI | View.popover(isPresented:attachmentAnchor:arrowEdge:content:) |  |
| AppKit | NSPopover.Behavior |  |

## Ver también
- [Menu Bar Extra (Status Item)](https://namethatui.com/macos/menu-bar-extra) (macOS)
- [Context Menu](https://namethatui.com/macos/context-menu) (macOS)
- [Visual Effect Material (Vibrancy)](https://namethatui.com/macos/vibrancy) (macOS)
- [Popover vs. Dropdown Menu vs. Tooltip](https://namethatui.com/web/popover-dropdown-tooltip) (web)
