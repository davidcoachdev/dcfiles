---
name: Lightbox
platform: web
slug: lightbox
tag: <dialog>
url: https://namethatui.com/web/lightbox
source: NameThatUI (namethatui.com)
also_called: image viewer overlay, photo modal, gallery overlay
---

# Lightbox

> Demo interactivo: https://namethatui.com/web/lightbox

**Plataforma:** web · **Tag/API:** `<dialog>` · **También llamado:** image viewer overlay, photo modal, gallery overlay

## Descripción
“Click the picture and it opens big with everything dark behind it” is a lightbox: a modal image viewer layered over the page. The dark layer behind it is the scrim, the enlarged image sits center stage, and arrows page through the gallery. Modern lightboxes are built on the native <dialog> element and its ::backdrop.

## Si lo llamaste…
“when you click a photo and it opens big with a dark background”“the enlarged image popup in a gallery”“click the thumbnail and it zooms over the page”“the image viewer with arrows for the next photo”“the big photo over a black background”“a pattern for enlarging pictures”
…you meant a lightbox.

## Prompt para IA (paste-ready)
Build a lightbox: clicking a gallery thumbnail opens the full image in a modal `dialog` (aria-modal) over a dark ::backdrop scrim, with prev/next arrows, a close button, Escape and backdrop-click to dismiss, and a reversible fade/scale transition.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my lightbox (`dialog`, ::backdrop, PhotoSwipe-style image overlay). Rule out: opened with show() instead of showModal() so there is no backdrop and the page scrolls behind; arrow keys paging the gallery and scrolling the page at the same time; the full-size image loading only after the transition so it pops from blurry to sharp; focus not returning to the clicked thumbnail on close. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| HTML | `dialog` | the modern base layer for a lightbox |
|------|----------------------------------------------------------------------------------------------|--------------------------------------|
| CSS | ::backdrop |  |
| ARIA | role="dialog" aria-modal="true" |  |
| JS libs | PhotoSwipe · GLightbox | ready-made lightbox libraries |

## Ver también
- [Scrim (Backdrop / Overlay)](https://namethatui.com/web/scrim) (web)
- [Modal Dialog vs. Drawer vs. Sheet](https://namethatui.com/web/dialog-drawer-sheet) (web)
- [Masonry Layout (Pinterest Grid)](https://namethatui.com/web/masonry) (web)
- [Carousel](https://namethatui.com/web/carousel) (web)
