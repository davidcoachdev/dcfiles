---
name: The Three Dots (Overflow Menu)
platform: web
slug: three-dots
tag: <button>
url: https://namethatui.com/web/three-dots
source: NameThatUI (namethatui.com)
also_called: kebab menu, meatball menu, hamburger menu, overflow menu, more menu, ellipsis button
---

# The Three Dots (Overflow Menu)

> Demo interactivo: https://namethatui.com/web/three-dots

**Plataforma:** web · **Tag/API:** `<button>` · **También llamado:** kebab menu, meatball menu, hamburger menu, overflow menu, more menu, ellipsis button

## Descripción
Three horizontal dots are commonly called meatballs and three vertical dots a kebab; both usually open an overflow or More menu of secondary actions. Three horizontal lines are a hamburger button and normally open navigation, often in a drawer. An ellipsis inside a label such as “Open…” is punctuation, not an overflow icon: it signals that the command needs more input before it can finish.

## Si lo llamaste…
“the three dots menu”“the horizontal meatballs button”“the vertical kebab dots”“the three lines menu icon”“the three dots after Open”“why does this button end in dots”“the more options icon”
…you meant a the three dots (overflow menu).

## Anatomía — cada parte, nombrada
1. Horizontal dots (meatballs / More)button[aria-haspopup="menu"]
Three horizontal dots are nicknamed meatballs and usually open an overflow or More menu for the current item or area.
2. Vertical dots (kebab menu)button[aria-haspopup="menu"]
Three vertical dots are nicknamed a kebab and usually expose the same kind of secondary-actions menu.
3. Three lines (hamburger menu)button[aria-controls]
Three horizontal lines are a hamburger button; unlike overflow dots, it normally opens the site's main navigation in a drawer.
4. Command ellipsisOpen…
The ellipsis in “Open…” means the command will ask for more input before it completes; the dots are part of the label.

## Prompt para IA (paste-ready)
Use the correct three-mark control: a horizontal ellipsis (meatballs) or vertical ellipsis (kebab) button with aria-haspopup="menu" for a contextual Overflow/More menu; a three-line hamburger button with aria-controls for a navigation drawer; or an ellipsis inside a command label such as “Open…” only when the command asks for more input before completing.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my three-dots menu (kebab/meatballs, menu button). Rule out: the icon-only button missing an aria-label; the menu staying open after an item is chosen; outside-click and Escape not closing it; a hit target well under 24 px so taps miss on mobile. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| HTML |  |  |
|------|----------------------------------------------------------------------------------------------|--|
| ARIA | aria-haspopup="menu" |  |
| ARIA | aria-expanded="true|false" |  |
| CSS | text-overflow: ellipsis | unrelated truncation ellipsis |

## Ver también
- [Truncation (Ellipsis & Line Clamp)](https://namethatui.com/web/truncation) (web)
- [Popover vs. Dropdown Menu vs. Tooltip](https://namethatui.com/web/popover-dropdown-tooltip) (web)
- [Modal Dialog vs. Drawer vs. Sheet](https://namethatui.com/web/dialog-drawer-sheet) (web)
- [Context Menu](https://namethatui.com/macos/context-menu) (macOS)
- [Scrim (Backdrop / Overlay)](https://namethatui.com/web/scrim) (web)
- [Hamburger Menu (Nav Drawer)](https://namethatui.com/web/hamburger-menu) (web)
