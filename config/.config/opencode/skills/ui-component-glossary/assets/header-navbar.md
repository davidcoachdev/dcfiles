---
name: Site Header vs. Navigation Bar
platform: web
slug: header-navbar
tag: <header>
url: https://namethatui.com/web/header-navbar
source: NameThatUI (namethatui.com)
also_called: navbar, topbar, app bar, main navigation, page header
---

# Site Header vs. Navigation Bar

> Demo interactivo: https://namethatui.com/web/header-navbar

**Plataforma:** web · **Tag/API:** `<header>` · **También llamado:** navbar, topbar, app bar, main navigation, page header

## Descripción
“The navbar” is usually two nested things. The site header is the whole strip across the top — logo, links, search, sign-in — and in HTML it is the page-level <header>, the banner landmark. The navigation bar proper is only the group of destination links inside it: a <nav> element, with aria-current="page" marking the link for the page you are on. On macOS the bar at the very top of the screen is the menu bar — a different thing.

## Si lo llamaste…
“navbar”“the navigation bar at the top”“top navigation element with links to main pages”“topbar”“the bar at the top of the website with the links”“the header menu”
…you meant a site header vs. navigation bar.

## Anatomía — cada parte, nombrada
1. Site header
“The whole bar across the top of the site” is the site header — the full-width shell holding the brand, the nav, and the actions; the page's banner landmark.
2. Navigation region
“The home docs pricing links” are the navigation region — a  that wraps only the destination links, not the logo or buttons around them.
3. Current-page linkaria-current="page"
“The menu item that stays highlighted because you're on that page” is the current-page link — marked with aria-current="page" and styled off that attribute.

## Prompt para IA (paste-ready)
Build a site header with a navigation bar: a page-level  (the banner landmark) containing the brand mark, a  wrapping only the row of destination links, and the actions on the right. Mark the link for the current page with aria-current="page" and style the current state off that attribute, not off a class.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my site header / navbar (, , aria-current). Rule out: the whole header wrapped in  so screen readers announce buttons and the logo as navigation (only the link group is ); two unlabeled  elements (give each an aria-label); the current-page style set by a class that fell out of sync with the route instead of aria-current="page"; the header overlapping content because it was made position: fixed without reserving its height. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| HTML |  | page-level  is the banner landmark |
|------|----------------------------------------------------------------------------------------------|--------------------------------------------|
| HTML |  | only the group of destination links |
| ARIA | aria-current="page" | marks the link for the page you are on |
| ARIA | role="banner" |  |

## Ver también
- [Hamburger Menu (Nav Drawer)](https://namethatui.com/web/hamburger-menu) (web)
- [Sticky vs. Fixed Positioning](https://namethatui.com/web/sticky-fixed) (web)
- [Breadcrumbs](https://namethatui.com/web/breadcrumbs) (web)
- [Menu Bar](https://namethatui.com/macos/menu-bar) (macOS)
