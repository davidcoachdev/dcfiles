---
name: Sticky vs. Fixed Positioning
platform: web
slug: sticky-fixed
tag: position: sticky
url: https://namethatui.com/web/sticky-fixed
source: NameThatUI (namethatui.com)
also_called: sticky header, fixed header, pinned element
---

# Sticky vs. Fixed Positioning

> Demo interactivo: https://namethatui.com/web/sticky-fixed

**Plataforma:** web · **Tag/API:** `position: sticky` · **También llamado:** sticky header, fixed header, pinned element

## Descripción
A sticky element participates in normal layout until scrolling reaches its inset, then stays pinned within its containing scroll area. A fixed element is removed from normal flow and anchored to the viewport or a transformed containing block from the start. Sticky is usually right for table and section headers; fixed is typical for persistent viewport controls.

## Si lo llamaste…
“the header that stays while the panel scrolls”“the bar pinned to the top of the screen”“the element that starts scrolling then gets stuck”“keep this visible while scrolling”“the floating button fixed in the corner”“当我滚动页面的时候，实时保持显示”
…you meant a sticky vs. fixed positioning.

## Anatomía — cada parte, nombrada
1. Sticky thresholdtop
“The point where the header stops scrolling and sticks” is the sticky threshold.
2. Sticky scroll containerposition: sticky
“The panel the sticky header is trapped inside” is its scroll container.

## Prompt para IA (paste-ready)
Use position: sticky with top: 0 for the section header so it scrolls normally until it reaches the top of its nearest scrolling container, then remains there. Reserve position: fixed for UI that must stay anchored to the viewport independently of every scroll container.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my sticky/fixed positioning. Rule out: sticky doing nothing because an ancestor has overflow hidden/auto/scroll — that is the classic; sticky missing a top/bottom offset so it never engages; fixed behaving like absolute inside a transformed/filtered ancestor; the content jumping when an element switches to fixed because no placeholder reserves its height. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| CSS | position: sticky |  |
|-----|------------------------------------------------------------------------------------------------------|--|
| CSS | position: fixed |  |
| CSS | top |  |

## Ver también
- [Toolbar (Unified Title Bar)](https://namethatui.com/macos/toolbar) (macOS)
- [Sidebar (Source List)](https://namethatui.com/macos/sidebar) (macOS)
- [Popover vs. Dropdown Menu vs. Tooltip](https://namethatui.com/web/popover-dropdown-tooltip) (web)
- [Site Header vs. Navigation Bar](https://namethatui.com/web/header-navbar) (web)
- [Parallax Scrolling](https://namethatui.com/web/parallax) (web)
