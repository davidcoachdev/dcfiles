---
name: Drag & Drop
platform: web
slug: drag-and-drop
tag: ondrop
url: https://namethatui.com/web/drag-and-drop
source: NameThatUI (namethatui.com)
also_called: drag and drop, drag-and-drop interaction, direct manipulation, sortable drag
---

# Drag & Drop

> Demo interactivo: https://namethatui.com/web/drag-and-drop

**Plataforma:** web · **Tag/API:** `ondrop` · **También llamado:** drag and drop, drag-and-drop interaction, direct manipulation, sortable drag

## Descripción
Drag and drop lets someone move or place an object directly. A grip says where to grab, a drag preview follows the pointer, and an insertion line or highlighted target previews the destination before release. Selection resize handles are related controls around a selected object: they resize it rather than move it.

## Si lo llamaste…
“those kind of a 3x3 or 2x2”“those squares, you know, that are on the corners”“line indicators for where it will drop”“the neighboring terminal is highlighted as a whole”“half of that terminal is highlighted”“the ghost copy that follows the pointer”
…you meant a drag & drop.

## Anatomía — cada parte, nombrada
1. Drag handle (grip)draggable="true"
“Those kind of a 3 x3 or 2 x2” dots are a drag handle, also called a grip or grabber.
2. Selection resize handlespointer events
“Those squares, you know, that are on the corners” are selection resize handles around the selected object.
3. Drop indicator (insertion line)ondragover
“Line indicators for where it will drop” are drop indicators, often drawn as an insertion line between items.
4. Drop-target highlightondragover
“The neighboring terminal is highlighted as a whole” describes a drop-target highlight over the destination region.
5. Drag preview (ghost)DataTransfer.setDragImage()
The translucent copy that follows the pointer during a drag is the drag preview, often called the ghost.

## Prompt para IA (paste-ready)
Build a Drag & Drop interaction with HTML draggable, ondragover, and ondrop (or @dnd-kit/core): show a drag handle, selection resize handles where applicable, a drag preview, and an insertion line or highlighted drop target before release. Do not use the deprecated aria-grabbed state; announce the picked-up item, available destination, and drop result through an ARIA live region.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my drag and drop (HTML draggable, ondragover/ondrop, dnd-kit). Rule out: drop never firing because dragover does not call preventDefault — that is the classic; dragleave firing when entering child elements so the highlight flickers — keep an enter/leave counter; setDragImage ignored because the ghost element is not in the DOM; touch devices doing nothing because native HTML5 DnD has no touch events — use a pointer-based library. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| HTML | ondrop |  |
|------|--------------------------------------------------------------------------------------------|--|
| HTML | ondragover |  |
| HTML | draggable="true" |  |
| ARIA | aria-grabbed | deprecated; announce drag state and drop results with live regions instead |
| dnd-kit | @dnd-kit/core |  |

## Ver también
- [Split View](https://namethatui.com/macos/split-view) (macOS)
- [Focus Ring (:focus-visible)](https://namethatui.com/web/focus-ring-web) (web)
- [The Three Dots (Overflow Menu)](https://namethatui.com/web/three-dots) (web)
- [Bento Grid](https://namethatui.com/web/bento-grid) (web)
- [Resize Handle (Size Grip)](https://namethatui.com/web/resize-handle) (web)
