---
name: Pagination
platform: web
slug: pagination
tag: <nav aria-label="pagination">
url: https://namethatui.com/web/pagination
source: NameThatUI (namethatui.com)
also_called: pager, paging controls, page navigation, page numbers, page control
---

# Pagination

> Demo interactivo: https://namethatui.com/web/pagination

**Plataforma:** web · **Tag/API:** `<nav aria-label="pagination">` · **También llamado:** pager, paging controls, page navigation, page numbers, page control

## Descripción
“The numbered buttons at the bottom of the list” are pagination — a nav landmark of page-number links with the current one marked aria-current="page". The “…” squeezed between numbers is the ellipsis (overflow indicator), and the row of little dots on a swipeable view has its own name: the page control (UIPageControl on Apple platforms; on a web carousel, the slide picker). If the list just grows as you scroll that's infinite scroll, and a “Load more” button is its cousin — pagination is the one with addressable, numbered pages.

## Si lo llamaste…
“datatable pagination”“page number for tables”“the numbered buttons at the bottom of the list”“previous 1 2 3 next”“the three dots between the page numbers”“the little dots showing which page you are on”
…you meant a pagination.

## Anatomía — cada parte, nombrada
1. Page-number linksaria-current="page"
“The 1 2 3 buttons” are page-number links — real links (or buttons) one per page, with exactly one carrying aria-current="page" as the current page.
2. Previous / next links`PaginationPrevious`
“The prev and next arrows on the ends” are the previous/next links — they step one page and disable (or hide) at the first and last page.
3. Ellipsis (overflow indicator)`PaginationEllipsis`
“The three dots between the numbers” are the ellipsis — a non-interactive stand-in for the collapsed page range (screen-reader text: “More pages”).
4. Page dots (page control)UIPageControl
“The little dots under a swipeable view” are a page control — one indicator per page, the solid dot marking the current page (UIPageControl; .tabViewStyle(.page) in SwiftUI).

## Prompt para IA (paste-ready)
Build pagination for this list: a  landmark containing page-number links with the current one marked aria-current="page", previous/next links at the ends, and an ellipsis (…) standing in for the collapsed range (shadcn/ui `Pagination` with PaginationEllipsis). Keep the visible page 1-based and convert to 0-based offsets in exactly one place; whenever filters, totals, or page size change, recompute total pages and clamp the current page.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my pagination (aria-current="page", ellipsis window logic, page state). Rule out: 0-based and 1-based page indices mixed at a boundary — URL, component state, API offset — instead of converted in one place; the current page left outside the valid range after a filter or page-size change (clamp when totals change); ellipsis window logic hiding a page even though all pages fit, or showing … for a single hidden page (test totals just below, at, and above the truncation threshold); the highlighted number missing aria-current="page" so screen readers announce only "3, link"; page dots out of sync with the content because the dots and the slides track different indices. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| HTML |  | the MDN recipe — a nav landmark holding a list of page links |
|------|-------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|
| ARIA | aria-current="page" | marks the ONE current page link |
| shadcn/ui | `Pagination` | with PaginationPrevious / PaginationEllipsis / PaginationNext |
| UIKit | UIPageControl | Apple's name for the row of page dots |
| SwiftUI | .tabViewStyle(.page) | a paged TabView showing the dot index |

## Ver también
- [Carousel](https://namethatui.com/web/carousel) (web)
- [Tabs](https://namethatui.com/web/tabs) (web)
- [Truncation (Ellipsis & Line Clamp)](https://namethatui.com/web/truncation) (web)
