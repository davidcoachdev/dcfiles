---
name: Pointer (Cursor)
platform: macos
slug: pointer
tag: NSCursor
url: https://namethatui.com/macos/pointer
source: NameThatUI (namethatui.com)
also_called: cursor, mouse pointer, mouse cursor
---

# Pointer (Cursor)

> Demo interactivo: https://namethatui.com/macos/pointer

**Plataforma:** macos · **Tag/API:** `NSCursor` · **También llamado:** cursor, mouse pointer, mouse cursor

## Descripción
Every shape the Mac pointer takes has a real name. “The text cursor with little bits at the top and bottom” is the I-beam; the hand over a link is the pointing hand; the no-entry sign while dragging is operation not allowed. AppKit sets them through NSCursor, and views claim screen regions with cursor rects — when a pointer gets stuck in the wrong shape, a stale cursor rect is usually the culprit. (The rainbow “beach ball” is not an NSCursor: the system shows it when an app stops responding.)

## Si lo llamaste…
“the text cursor with little bits at the top and bottom”“mouse stuck in text editing mode”“the arrow turns into a hand over links”“double sided arrow when resizing a window”“cursor with a plus badge when dragging to copy”“the mouse becomes a no entry sign”“magnifying glass cursor with a plus in it”
…you meant a pointer (cursor).

## Prompt para IA (paste-ready)
Set the macOS pointer with NSCursor — e.g. NSCursor.iBeam.set() — or claim a region with NSView.addCursorRect(_:cursor:) inside resetCursorRects() (SwiftUI: View.pointerStyle(_:), macOS 15+). If the pointer stays stuck as the I-beam after the mouse leaves a text view, the stale cursor rect is the bug: call window.invalidateCursorRects(for: view) so the rects rebuild.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS pointer/cursor (NSCursor, NSTrackingArea). Rule out: the cursor flickering back to arrow because cursor rects reset on every layout — drive it from cursorUpdate with a tracking area instead; push/pop or hide/unhide calls unbalanced; the spinning beach ball meaning the main thread is blocked, not a cursor bug; a hidden cursor never restored after a drag. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSCursor |  |
|--------|----------------------------------------------------------------------------------------------|--|
| AppKit | NSCursor.iBeam | the text-editing pointer |
| AppKit | NSView.addCursorRect(_:cursor:) | claim a region; called from resetCursorRects() |
| SwiftUI | View.pointerStyle(_:) | macOS 15+ |
| CSS | cursor: text | the same shapes on the web: pointer, grab, not-allowed… |

## Ver también
- [Insertion Caret (Insertion Point)](https://namethatui.com/macos/insertion-caret) (macOS)
- [Search Field](https://namethatui.com/macos/search-field) (macOS)
- [Context Menu](https://namethatui.com/macos/context-menu) (macOS)
- [Split View](https://namethatui.com/macos/split-view) (macOS)
- [Focus Ring](https://namethatui.com/macos/focus-ring) (macOS)
