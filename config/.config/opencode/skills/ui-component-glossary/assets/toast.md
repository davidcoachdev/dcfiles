---
name: Toast (Snackbar)
platform: web
slug: toast
tag: role="status"
url: https://namethatui.com/web/toast
source: NameThatUI (namethatui.com)
also_called: snackbar, status toast, in-app notification
---

# Toast (Snackbar)

> Demo interactivo: https://namethatui.com/web/toast

**Plataforma:** web · **Tag/API:** `role="status"` · **También llamado:** snackbar, status toast, in-app notification

## Descripción
A toast is a compact, non-modal status message that appears in a screen corner after an action and dismisses automatically. It confirms transient outcomes such as saving or copying without interrupting the workflow. Unlike a notification banner, it does not occupy a persistent place in the page layout or demand acknowledgement.

## Si lo llamaste…
“the little message that pops up in the corner”“confirmation that disappears by itself”“saved successfully popup”“temporary message after clicking a button”“small alert at the bottom of the screen”“notification pop up”
…you meant a toast (snackbar).

## Anatomía — cada parte, nombrada
1. Toast viewportToaster
“The corner where all the little messages stack” is the toast viewport.
2. Status messagerole="status"
“The saved successfully text that appears by itself” is the toast's status message.
3. Toast actionToastAction
“The Undo button inside the temporary message” is the toast action.

## Prompt para IA (paste-ready)
Show a Toast (Snackbar) through a role="status" live region after the action succeeds. Place it in a consistent corner without blocking the page, auto-dismiss only nonessential messages after a short delay, and pause that timer while the toast is hovered or contains keyboard focus.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my toast (aria-live region, sonner). Rule out: no aria-live region so screen readers never announce it; the auto-dismiss timer not pausing on hover/focus; stacked toasts overlapping instead of shifting; the exit animation racing the removal so it snaps; toasts rendering under modals because of z-index order. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| ARIA | role="status" |  |
|------|---------------------------------------------------------------------------------------------------|--|
| shadcn/ui | Toaster |  |
| Sonner | toast() |  |
| ARIA | aria-live="polite" | announces non-urgent updates |

## Ver también
- [Scrim (Backdrop / Overlay)](https://namethatui.com/web/scrim) (web)
- [Empty State](https://namethatui.com/web/empty-state) (web)
- [Popover vs. Dropdown Menu vs. Tooltip](https://namethatui.com/web/popover-dropdown-tooltip) (web)
- [Spring Animation](https://namethatui.com/web/spring) (web)
