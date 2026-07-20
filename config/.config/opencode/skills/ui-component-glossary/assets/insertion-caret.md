---
name: Insertion Caret (Insertion Point)
platform: macos
slug: insertion-caret
tag: NSTextView.insertionPointColor
url: https://namethatui.com/macos/insertion-caret
source: NameThatUI (namethatui.com)
also_called: insertion point, text caret, text cursor, typing caret
---

# Insertion Caret (Insertion Point)

> Demo interactivo: https://namethatui.com/macos/insertion-caret

**Plataforma:** macos · **Tag/API:** `NSTextView.insertionPointColor` · **También llamado:** insertion point, text caret, text cursor, typing caret

## Descripción
/ NSTextView.insertionPointColor · NSTextView.selectedRange /

## Si lo llamaste…
“the blinking line where i am typing”“the little vertical bar inside the text field”“the cursor blinking between letters”“the line that shows where the next character goes”“typing indicator inside the input”“the blinking editor in the time field”“the text cursor that stays after i click the field”
…you meant a insertion caret (insertion point).

## Anatomía — cada parte, nombrada
1. Insertion caretNSTextView.insertionPointColor
The thin blinking line between characters is the insertion caret.

## Prompt para IA (paste-ready)
Show a text insertion caret (AppKit: NSTextView.insertionPointColor) as the thin blinking vertical line at the zero-length selectedRange where the next typed character will appear; on the web, style the same pixel with CSS caret-color.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my text insertion caret (NSTextView.insertionPointColor, selectedRange). Rule out: the field is not first responder; the selection has nonzero length so there is no single insertion point; custom text drawing covers the caret; the caret color has no contrast; focus is being moved by another view. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSTextView.insertionPointColor |  |
|--------|--------------------------------------------------------------------------------------------------------------------|--|
| AppKit | NSTextView.selectedRange | a zero-length selection is the insertion point |
| AppKit | NSTextView.drawInsertionPoint(in:color:turnedOn:) |  |
| CSS | caret-color |  |

## Ver también
- [Pointer (Cursor)](https://namethatui.com/macos/pointer) (macOS)
