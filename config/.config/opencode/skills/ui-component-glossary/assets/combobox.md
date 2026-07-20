---
name: Combobox (Autocomplete / Typeahead)
platform: web
slug: combobox
tag: role="combobox"
url: https://namethatui.com/web/combobox
source: NameThatUI (namethatui.com)
also_called: autocomplete, typeahead, search select, editable dropdown
---

# Combobox (Autocomplete / Typeahead)

> Demo interactivo: https://namethatui.com/web/combobox

**Plataforma:** web · **Tag/API:** `role="combobox"` · **También llamado:** autocomplete, typeahead, search select, editable dropdown

## Descripción
A combobox combines an editable text field with a popup list of matching values. Typing narrows the choices while arrow keys move the active option and Enter commits it. Unlike a plain select, it supports searching or free-form input depending on the product rules.

## Si lo llamaste…
“输入下拉”“the input that suggests options as you type”“a searchable dropdown field”“the text box with matching results underneath”“a select where you can type to filter”“the address field that autocompletes”
…you meant a combobox (autocomplete / typeahead).

## Anatomía — cada parte, nombrada
1. Combobox inputrole="combobox"
“The searchable dropdown field I type into” is the combobox input.
2. Listbox popuprole="listbox"
“The matching results underneath the field” are the listbox popup.
3. Active optionaria-activedescendant
“The result highlighted as I press the arrow keys” is the active option.
4. Selected-option checkmarkaria-selected
“The checkmark next to the choice I already picked” is the selected-option indicator.

## Prompt para IA (paste-ready)
Build a labelled Combobox with role="combobox" and a controlled role="listbox" popup. Keep aria-expanded and aria-controls in sync, give each result role="option", retain DOM focus in the input with aria-activedescendant, and support Arrow keys, Enter, and Escape without autofocusing on mount.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my combobox (role=combobox, aria-activedescendant, cmdk/Radix). Rule out: the listbox closing on blur before the option click lands — handle selection on pointerdown or check relatedTarget; the highlighted index not resetting when the filter changes; aria-activedescendant pointing at a filtered-out option id; the mobile keyboard covering the list because nothing scrolls the field into view. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| ARIA | role="combobox" |  |
|------|-----------------------------------------------------------------------------------------------------|--|
| ARIA | role="listbox" |  |
| ARIA | aria-expanded |  |
| ARIA | aria-controls |  |
| ARIA | aria-activedescendant |  |
| HTML | `datalist` | a native limited alternative |

## Ver también
- [Command Palette](https://namethatui.com/web/command-palette) (web)
- [Pop-Up Button vs. Pull-Down Button vs. Combo Box](https://namethatui.com/macos/popup-pulldown-combo) (macOS)
- [Popover vs. Dropdown Menu vs. Tooltip](https://namethatui.com/web/popover-dropdown-tooltip) (web)
- [Date Picker](https://namethatui.com/web/date-picker) (web)
