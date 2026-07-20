---
name: Resize Handle (Size Grip)
platform: web
slug: resize-handle
tag: resize
url: https://namethatui.com/web/resize-handle
source: NameThatUI (namethatui.com)
also_called: size grip, resize grip, gripper, resizer, drag corner
---

# Resize Handle (Size Grip)

> Demo interactivo: https://namethatui.com/web/resize-handle

**Plataforma:** web · **Tag/API:** `resize` · **También llamado:** size grip, resize grip, gripper, resizer, drag corner

## Descripción
“Three small diagonal lines at the bottom right of a text field” is the resize handle, or size grip — the ribbed corner you drag to resize the box. Browsers add it to <textarea> automatically; the CSS resize property controls it and ::-webkit-resizer styles the pixel itself. Don't confuse it with an auto-growing textarea (field-sizing: content) — that's behavior with no pixel to grab — or with the square selection handles on a canvas editor, which live on the Drag and Drop page.

## Si lo llamaste…
“three small diagonal lines at the bottom right of a text field”“the corner thing you drag to make the text box bigger”“the little diagonal stripes in the corner of a comment box”“the drag corner of a textarea”“the grippy corner on an input”
…you meant a resize handle (size grip).

## Anatomía — cada parte, nombrada
1. Size grip::-webkit-resizer
“The little diagonal stripes” are the size grip itself — the ribbed triangle in the corner whose only job is to be grabbed.

## Prompt para IA (paste-ready)
Style the resize handle (size grip) of my textarea: the diagonal-ribbed corner browsers add by default. Control it with CSS resize (use resize: vertical so dragging can't break the layout horizontally, resize: none to remove it), set min-height/max-height bounds, and style the grip itself via ::-webkit-resizer where supported.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my textarea's resize handle (CSS resize, ::-webkit-resizer). Rule out: the grip missing because resize: none or overflow: visible is set (the grip needs overflow other than visible); dragging blowing up the layout because resize: both is allowed where resize: vertical was intended and no max-width/max-height bounds exist; the grip invisible on a dark theme because ::-webkit-resizer wasn't restyled; Firefox ignoring ::-webkit-resizer (it draws its own grip — don't rely on styling it). The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| CSS | resize | resize: vertical keeps a textarea from breaking your layout sideways |
|-----|--------------------------------------------------------------------------------------------|----------------------------------------------------------------------|
| CSS | ::-webkit-resizer | the grip pixel itself — styleable in WebKit/Blink |
| HTML | `textarea` | grows the grip by default in most browsers |
| CSS | field-sizing: content | the AUTO-growing alternative — behavior, not this pixel |

## Ver también
- [Form Field](https://namethatui.com/web/form-field) (web)
- [Drag & Drop](https://namethatui.com/web/drag-and-drop) (web)
