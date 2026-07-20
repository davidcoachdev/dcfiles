---
name: Pop-Up Button vs. Pull-Down Button vs. Combo Box
platform: macos
slug: popup-pulldown-combo
tag: NSPopUpButton
url: https://namethatui.com/macos/popup-pulldown-combo
source: NameThatUI (namethatui.com)
also_called: pop-up menu button, pull-down menu button, combo box, menu picker
---

# Pop-Up Button vs. Pull-Down Button vs. Combo Box

> Demo interactivo: https://namethatui.com/macos/popup-pulldown-combo

**Plataforma:** macos · **Tag/API:** `NSPopUpButton` · **También llamado:** pop-up menu button, pull-down menu button, combo box, menu picker

## Descripción
A pop-up button represents a selection: its closed label shows the current choice, and opening it presents the available values. A pull-down button uses NSPopUpButton with pullsDown set to true and presents commands from a fixed button label rather than communicating a persistent selection. A combo box is a text field plus a drop-down list, so the user can type a value instead of being limited to the listed choices.

## Si lo llamaste…
“the dropdown that shows the currently selected option”“button with a little arrow that opens a menu of actions”“text field with a dropdown list attached”“mac menu button versus an editable dropdown”“selector that looks like a button and opens choices”“field where you can type or pick an existing value”
…you meant a pop-up button vs. pull-down button vs. combo box.

## Anatomía — cada parte, nombrada
1. Current-value labelNSPopUpButton.titleOfSelectedItem
“The dropdown text that shows what is selected” is the pop-up button's current-value label.
2. Pull-down indicatorNSPopUpButton.pullsDown
“The little arrow showing that this button opens actions” is the pull-down indicator.
3. Editable value fieldNSComboBox
“The dropdown field where I can type my own value” is the combo box's editable field.
4. Selected-item checkmarkNSMenuItem.state
“The checkmark next to the current choice” is the selected menu item's state mark.

## Prompt para IA (paste-ready)
Choose the correct control from Pop-Up Button vs. Pull-Down Button vs. Combo Box: use NSPopUpButton with pullsDown false for a persistent selection, the same control with pullsDown true for a menu of commands, or NSComboBox when the user may type a value as well as choose one. Preserve the native arrow, menu behavior, and displayed-value semantics of the chosen control.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS popup/pull-down/combo (NSPopUpButton, NSComboBox). Rule out: a pull-down consuming its FIRST menu item as the title — insert a dummy first item; popup selection not syncing because selectItem was never called after menu rebuild; autoenablesItems greying items whose actions lack targets; expecting a combo box to be a menu — it is an editable text field plus a list. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSPopUpButton | a selection control when pullsDown is false |
|--------|---------------------------------------------------------------------------------------------------|---------------------------------------------|
| AppKit | NSComboBox | an editable text field paired with a choices list |
| AppKit | NSPopUpButton.pullsDown | true makes it an action-oriented pull-down button |
| SwiftUI | Picker |  |

## Ver también
- [Context Menu](https://namethatui.com/macos/context-menu) (macOS)
- [Combobox (Autocomplete / Typeahead)](https://namethatui.com/web/combobox) (web)
- [Segmented Control](https://namethatui.com/macos/segmented-control) (macOS)
- [Popover vs. Dropdown Menu vs. Tooltip](https://namethatui.com/web/popover-dropdown-tooltip) (web)
