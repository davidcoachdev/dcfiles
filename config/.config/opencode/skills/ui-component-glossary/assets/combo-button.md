---
name: Combo Button
platform: macos
slug: combo-button
tag: NSComboButton
url: https://namethatui.com/macos/combo-button
source: NameThatUI (namethatui.com)
also_called: split button, menu-arrow button, action-and-menu button, NSComboButton
---

# Combo Button

> Demo interactivo: https://namethatui.com/macos/combo-button

**Plataforma:** macos · **Tag/API:** `NSComboButton` · **También llamado:** split button, menu-arrow button, action-and-menu button, NSComboButton

## Descripción
A combo button combines two adjacent targets: a main button that immediately performs the default action and a small arrow button that opens related alternatives. A pop-up button instead shows the current selected value, while a pull-down button opens a menu from the whole control and has no separate primary-action region. NSComboButton is available on macOS 13 and later.

## Si lo llamaste…
“the button with a separate little arrow attached”“one button that clicks and also has a dropdown”“the split action button with a menu on the right”“primary button joined to a tiny chevron button”“button where the label acts and the arrow opens choices”
…you meant a combo button.

## Anatomía — cada parte, nombrada
1. Primary action regionNSComboButton.action
“The main half that does the thing immediately” is the primary action region.
2. Menu disclosure regionNSComboButton.menu
“The separate little arrow attached to the button” is the menu disclosure region.
3. Split dividerNSComboButton.Style.split
“The tiny line between the label and arrow” is the split divider.

## Prompt para IA (paste-ready)
Use a Combo Button with NSComboButton (macOS 13+) in split style: clicking the main region performs the primary action, while the attached arrow region opens its NSMenu. Do not use a pop-up button, which displays a current selection, or a pull-down button, whose whole button opens an action menu.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS combo button (NSComboButton, macOS 13+). Rule out: unified vs split style confusion — in unified the whole button shows the menu, in split only the arrow section does; the menu property empty so the arrow does nothing; running on macOS 12 or earlier where NSComboButton does not exist and a popup-button fallback is needed. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSComboButton | macOS 13+ |
|--------|---------------------------------------------------------------------------------------------------|-----------|
| AppKit | NSComboButton.Style.split | separate action and menu regions |
| SwiftUI | Button + Menu | no single native SwiftUI equivalent |

## Ver también
- [Pop-Up Button vs. Pull-Down Button vs. Combo Box](https://namethatui.com/macos/popup-pulldown-combo) (macOS)
- [Toolbar (Unified Title Bar)](https://namethatui.com/macos/toolbar) (macOS)
- [Context Menu](https://namethatui.com/macos/context-menu) (macOS)
