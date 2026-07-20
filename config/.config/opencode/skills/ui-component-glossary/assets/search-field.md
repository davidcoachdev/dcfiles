---
name: Search Field
platform: macos
slug: search-field
tag: NSSearchField
url: https://namethatui.com/macos/search-field
source: NameThatUI (namethatui.com)
also_called: search box, search bar, NSSearchField, searchable field
---

# Search Field

> Demo interactivo: https://namethatui.com/macos/search-field

**Plataforma:** macos · **Tag/API:** `NSSearchField` · **También llamado:** search box, search bar, NSSearchField, searchable field

## Descripción
A search field is a text input specialized for filtering or finding content. On macOS it normally includes a magnifying-glass search button, a cancel button that appears for a nonempty query, and optionally a menu of recent searches. SwiftUI's searchable modifier places the platform search field in an appropriate location such as the toolbar.

## Si lo llamaste…
“the rounded box with a magnifying glass”“the search input in the mac toolbar”“the little x that clears the search”“the magnifier button inside the text field”“the dropdown of recent searches”
…you meant a search field.

## Anatomía — cada parte, nombrada
1. Search buttonNSSearchFieldCell.searchButtonCell
The magnifying glass inside the leading edge is the search button, not just a decorative placeholder icon.
2. Cancel buttonNSSearchFieldCell.cancelButtonCell
“The little x that clears the search” is the field's cancel button.
3. Recent-searches menuNSSearchFieldCell.searchMenuTemplate
The menu attached to the search icon can list recent queries and a Clear Recents command.

## Prompt para IA (paste-ready)
Use a native Search Field with NSSearchField (SwiftUI: View.searchable), preserving its leading search button, trailing cancel button when text is present, and optional recent-search menu from NSSearchFieldCell.searchMenuTemplate.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS search field (NSSearchField). Rule out: search firing only on Return because sendsSearchStringImmediately is false; the clear button clearing text but your code never notified — watch for the empty-string action; the recents menu dead without recentsAutosaveName; the cancel button hidden at small control sizes. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSSearchField |  |
|--------|---------------------------------------------------------------------------------------------------|--|
| SwiftUI | View.searchable(text:placement:prompt:) |  |
| AppKit | NSSearchFieldCell |  |

## Ver también
- [Toolbar (Unified Title Bar)](https://namethatui.com/macos/toolbar) (macOS)
- [Combo Button](https://namethatui.com/macos/combo-button) (macOS)
- [Pop-Up Button vs. Pull-Down Button vs. Combo Box](https://namethatui.com/macos/popup-pulldown-combo) (macOS)
