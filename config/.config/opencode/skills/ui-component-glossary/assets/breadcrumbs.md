---
name: Breadcrumbs
platform: web
slug: breadcrumbs
tag: <nav>
url: https://namethatui.com/web/breadcrumbs
source: NameThatUI (namethatui.com)
also_called: breadcrumb trail, path navigation, hierarchy trail
---

# Breadcrumbs

> Demo interactivo: https://namethatui.com/web/breadcrumbs

**Plataforma:** web · **Tag/API:** `<nav>` · **También llamado:** breadcrumb trail, path navigation, hierarchy trail

## Descripción
Breadcrumbs show the current page's position in a hierarchy and offer direct links back to its ancestors. The final item is the current location rather than a link, and separators are decorative. Deep paths may collapse middle levels into an ellipsis without hiding the root or current page.

## Si lo llamaste…
“the home slash section slash current page links”“the trail above a page title”“links showing where you are in the site”“the folder path style navigation”“the row with chevrons between page names”
…you meant a breadcrumbs.

## Anatomía — cada parte, nombrada
1. Breadcrumb separatoraria-hidden="true"
“The little slash or chevron between page names” is the breadcrumb separator.
2. Current-page crumbaria-current="page"
“The last page name that is not a link” is the current-page crumb.
3. Collapsed ancestorsBreadcrumbEllipsis
“The three dots hiding the middle of the path” are collapsed ancestors.

## Prompt para IA (paste-ready)
Add breadcrumbs inside a , linking each ancestor and marking the final item aria-current="page". Collapse low-value middle ancestors into an ellipsis when space is tight while keeping the current page visible.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my breadcrumbs (nav aria-label=breadcrumb, aria-current=page). Rule out: separators typed into the markup so screen readers announce every slash — draw them with CSS pseudo-elements; aria-current missing from the last crumb; long trails needing middle-crumb collapse instead of wrapping to two lines; the current page rendered as a link to itself. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| HTML |  |  |
|------|-------------------------------------------------------------------------------------------|--|
| ARIA | aria-label="Breadcrumb" |  |
| ARIA | aria-current="page" |  |
| shadcn/ui | Breadcrumb |  |

## Ver también
- [Sidebar (Source List)](https://namethatui.com/macos/sidebar) (macOS)
- [Tabs](https://namethatui.com/web/tabs) (web)
- [Toolbar (Unified Title Bar)](https://namethatui.com/macos/toolbar) (macOS)
- [Site Header vs. Navigation Bar](https://namethatui.com/web/header-navbar) (web)
