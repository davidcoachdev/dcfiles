---
name: Command Palette
platform: web
slug: command-palette
tag: Command
url: https://namethatui.com/web/command-palette
source: NameThatUI (namethatui.com)
also_called: command menu, quick actions, launcher, command bar
---

# Command Palette

> Demo interactivo: https://namethatui.com/web/command-palette

**Plataforma:** web · **Tag/API:** `Command` · **También llamado:** command menu, quick actions, launcher, command bar

## Descripción
A command palette is a keyboard-first overlay that searches actions, pages, and objects from one place. It commonly opens with ⌘K or Ctrl+K, highlights one result at a time, and executes the selected command with Enter. It is broader than a combobox because it launches heterogeneous commands rather than choosing one field value.

## Si lo llamaste…
“the command k menu”“the searchable list of app actions”“the quick launcher in the middle of the screen”“the keyboard popup for jumping anywhere”“the vscode style command search”“the cmd k popup”
…you meant a command palette.

## Anatomía — cada parte, nombrada
1. Command inputCommandInput
“The search field at the top of the ⌘K menu” is the command input.
2. Command groupCommandGroup
“The labeled section grouping similar actions” is a command group.
3. Active commandCommandItem
“The result with the highlight that Enter will run” is the active command.
4. Command shortcutCommandShortcut
“The ⌘ letters aligned on the right of an action” are the command shortcut.

## Prompt para IA (paste-ready)
Add a Command Palette using the shadcn/ui Command component inside a role="dialog", opened by ⌘K or Ctrl+K. Filter actions as the user types, support arrow-key selection and Enter, and restore focus to the invoking control on dismissal.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my command palette (cmdk, Dialog + Command). Rule out: the cmd/ctrl-K listener attached to the wrong scope or eaten by the browser; the filter state persisting from the previous open — reset on open; focus escaping the dialog because the trap ignores portaled content; keydown firing during IME composition (check isComposing); the palette rendered under a higher stacking context. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| shadcn/ui | Command |  |
|-----------|---------------------------------------------------------------------------------------------|--|
| ARIA | role="dialog" |  |
| ARIA | role="combobox" |  |
| Radix | Dialog |  |

## Ver también
- [Combobox (Autocomplete / Typeahead)](https://namethatui.com/web/combobox) (web)
- [Modal Dialog vs. Drawer vs. Sheet](https://namethatui.com/web/dialog-drawer-sheet) (web)
- [Focus Ring (:focus-visible)](https://namethatui.com/web/focus-ring-web) (web)
- [Toolbar (Unified Title Bar)](https://namethatui.com/macos/toolbar) (macOS)
