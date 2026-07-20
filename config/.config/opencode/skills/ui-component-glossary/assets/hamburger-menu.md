---
name: Hamburger Menu (Nav Drawer)
platform: web
slug: hamburger-menu
tag: aria-expanded + aria-controls
url: https://namethatui.com/web/hamburger-menu
source: NameThatUI (namethatui.com)
also_called: navigation drawer, hamburger button, side menu, off-canvas menu
---

# Hamburger Menu (Nav Drawer)

> Demo interactivo: https://namethatui.com/web/hamburger-menu

**Plataforma:** web · **Tag/API:** `aria-expanded + aria-controls` · **También llamado:** navigation drawer, hamburger button, side menu, off-canvas menu

## Descripción
“The three horizontal lines used to open a menu” are a hamburger button, and the panel it slides open is a navigation drawer. The button is just the trigger — three stacked lines, usually top-left on phones; the drawer is an off-canvas <nav> that slides over the page above a scrim. The icon's siblings (dots, ellipsis) live under The Three Dots; this page is the icon-plus-drawer navigation pattern itself.

## Si lo llamaste…
“the three horizontal lines used to open a menu”“three line side menu that expands to the full size of the screen”“the burger menu on mobile sites”“the menu that slides in from the side when you tap the lines”“the stacked lines button at the top corner”“the side panel with all the page links”
…you meant a hamburger menu (nav drawer).

## Anatomía — cada parte, nombrada
1. Hamburger buttonaria-expanded
“The three stacked lines” are the hamburger button — a plain toggle whose aria-expanded tracks the drawer.
2. Navigation drawerSheet side="left"
“The side menu that slides over the page” is the navigation drawer — an off-canvas  panel above a scrim.

## Prompt para IA (paste-ready)
Build a hamburger menu: a  drawing three stacked lines that toggles a navigation drawer — an off-canvas  panel sliding in from the left over a scrim (shadcn Sheet side="left", Material NavigationDrawer). Lock body scroll while open, close on Escape and scrim tap, keep aria-expanded in sync, and return focus to the button on close.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my hamburger menu (aria-expanded toggle + off-canvas  drawer). Rule out: the drawer rendering under the scrim or page header (z-order); body still scrolling behind the open drawer; aria-expanded never flipping so screen readers see a dead button; focus staying lost in the drawer after close instead of returning to the button; the drawer animating from the wrong edge because translate-x sign flipped; the menu unreachable on desktop because the toggle is hidden above the breakpoint but the nav links never reappear. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| ARIA | aria-expanded + aria-controls | the toggle button's contract |
|------|-------------------------------------------------------------------------------------------------------------------|------------------------------|
| HTML |  | the drawer content is navigation |
| shadcn/ui | Sheet side="left" | the usual React building block |
| Material | NavigationDrawer | Android/Material's name for the panel |

## Ver también
- [The Three Dots (Overflow Menu)](https://namethatui.com/web/three-dots) (web)
- [Modal Dialog vs. Drawer vs. Sheet](https://namethatui.com/web/dialog-drawer-sheet) (web)
- [Scrim (Backdrop / Overlay)](https://namethatui.com/web/scrim) (web)
- [Site Header vs. Navigation Bar](https://namethatui.com/web/header-navbar) (web)
