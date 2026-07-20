---
name: Modal Dialog vs. Drawer vs. Sheet
platform: web
slug: dialog-drawer-sheet
tag: <dialog>
url: https://namethatui.com/web/dialog-drawer-sheet
source: NameThatUI (namethatui.com)
also_called: modal, side panel, slide-over, bottom sheet
---

# Modal Dialog vs. Drawer vs. Sheet

> Demo interactivo: https://namethatui.com/web/dialog-drawer-sheet

**Plataforma:** web · **Tag/API:** `<dialog>` · **También llamado:** modal, side panel, slide-over, bottom sheet

## Descripción
A modal dialog is centered, blocks the underlying interface, and suits a short decision or focused task. A drawer slides from a side edge and preserves more visual context for browsing or editing. A sheet is edge-attached too, most often rising from the bottom for compact actions or mobile layouts; all three need explicit dismissal and managed focus when modal.

## Si lo llamaste…
“the popup in the middle that blocks the page”“the panel that slides in from the side”“the tray that comes up from the bottom”“an overlay for editing without leaving the page”“the floating box with a dark background behind it”
…you meant a modal dialog vs. drawer vs. sheet.

## Anatomía — cada parte, nombrada
1. Modal surface`dialog`
“The actual floating box in the middle” is the modal surface.
2. Scrim::backdrop
“The dark see-through background behind the popup” is the scrim.

## Prompt para IA (paste-ready)
Use a Modal Dialog built with `dialog` and open it with HTMLDialogElement.showModal() so the browser places it in the top layer, makes the page behind it inert, provides ::backdrop, and supports Escape. Use a side Drawer for contextual editing or a bottom Sheet for compact/mobile actions; add a scrim and modal focus management only when those surfaces are actually modal.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my dialog/drawer/sheet (HTMLDialogElement, Radix Dialog, vaul). Rule out: show() used where showModal() was needed so there is no backdrop and no inert background; body scroll not locked so the page scrolls behind; focus not returned to the trigger on close; Escape closing it because onCancel is unhandled when you wanted it blocked; a nested dialog closing its parent. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| HTML | `dialog` |  |
|------|----------------------------------------------------------------------------------------------|--|
| HTML | HTMLDialogElement.showModal() |  |
| ARIA | role="dialog" |  |
| Radix | Dialog |  |
| shadcn/ui | Sheet |  |

## Ver también
- [Scrim (Backdrop / Overlay)](https://namethatui.com/web/scrim) (web)
- [Popover vs. Dropdown Menu vs. Tooltip](https://namethatui.com/web/popover-dropdown-tooltip) (web)
- [Sheet](https://namethatui.com/macos/sheet) (macOS)
- [Sidebar (Source List)](https://namethatui.com/macos/sidebar) (macOS)
- [Lightbox](https://namethatui.com/web/lightbox) (web)
- [Hamburger Menu (Nav Drawer)](https://namethatui.com/web/hamburger-menu) (web)
