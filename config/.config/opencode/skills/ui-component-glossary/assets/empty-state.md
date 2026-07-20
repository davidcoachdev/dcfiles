---
name: Empty State
platform: web
slug: empty-state
tag: <section>
url: https://namethatui.com/web/empty-state
source: NameThatUI (namethatui.com)
also_called: blank state, zero state, first-use state, no-results state
---

# Empty State

> Demo interactivo: https://namethatui.com/web/empty-state

**Plataforma:** web · **Tag/API:** `<section>` · **También llamado:** blank state, zero state, first-use state, no-results state

## Descripción
An empty state replaces a content view when there are no items to show, whether on first use, after filtering, or after everything is removed. It explains the situation without blame and offers the most useful next action. It is a designed product state, not merely whitespace or an error message.

## Si lo llamaste…
“the screen shown when there is nothing here”“the panel before the user creates their first item”“the no results message with a button”“the blank list explanation”“what to show instead of an empty white box”
…you meant a empty state.

## Anatomía — cada parte, nombrada
1. State illustrationaria-hidden="true"
“The quiet picture showing what this empty area is for” is the state illustration.
2. Recovery action
“The button that gets me out of the blank screen” is the recovery action.

## Prompt para IA (paste-ready)
Create an empty state as a labelled  with a simple icon, a one-line explanation of why the view is empty, and one primary action that resolves it. For a dynamically produced no-results state, announce the message with role="status" without moving focus.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my empty state. Rule out: the empty state flashing before data arrives because loading and truly-empty are one boolean; errors rendering the empty state instead of an error state; the call-to-action unreachable by keyboard; layout jumping when real content replaces it because heights were never reserved. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| HTML |  |  |
|------|-----------------------------------------------------------------------------------------------|--|
| ARIA | aria-labelledby |  |
| ARIA | role="status" | for a dynamically produced no-results message |

## Ver también
- [Skeleton vs. Spinner](https://namethatui.com/web/skeleton-spinner) (web)
- [Toast (Snackbar)](https://namethatui.com/web/toast) (web)
- [Command Palette](https://namethatui.com/web/command-palette) (web)
