---
name: Token Field
platform: macos
slug: token-field
tag: NSTokenField
url: https://namethatui.com/macos/token-field
source: NameThatUI (namethatui.com)
also_called: token input, recipient field, tag input, pill input
---

# Token Field

> Demo interactivo: https://namethatui.com/macos/token-field

**Plataforma:** macos · **Tag/API:** `NSTokenField` · **También llamado:** token input, recipient field, tag input, pill input

## Descripción
A token field converts recognized pieces of typed text into discrete rounded tokens, like recipients in a mail compose window. Each token represents one value and can be selected, edited, or removed without treating the whole field as plain text. AppKit provides token styling, completions, represented objects, and tokenizing separators through NSTokenField.

## Si lo llamaste…
“the text field with removable pills inside it”“the email address bubbles in the To field”“input that turns words into little tags”“rounded chips you can delete from a field”“the field where each recipient becomes its own bubble”
…you meant a token field.

## Anatomía — cada parte, nombrada
1. Token capsuleNSTokenField.TokenStyle
“The little rounded bubble around each recipient” is a token capsule.
2. Selected tokenNSTokenField
“The whole pill that highlights before I delete it” is the selected token.

## Prompt para IA (paste-ready)
Use a native Token Field (NSTokenField) with NSTokenField.TokenStyle so each recognized recipient or tag becomes a separately selectable, removable rounded token inside the editable field. Preserve token completion and keyboard deletion behavior.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS token field (NSTokenField). Rule out: text not becoming tokens until Return because the tokenizing character set lacks your separator; represented objects vs display strings confused in the delegate so tokens show raw identifiers; completions never appearing because the completion delegate method is not implemented; copy producing plain text because writing represented objects to the pasteboard is unimplemented. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSTokenField |  |
|--------|--------------------------------------------------------------------------------------------------|--|
| AppKit | NSTokenField.TokenStyle |  |
| AppKit | NSTokenFieldDelegate |  |

## Ver también
- [Search Field](https://namethatui.com/macos/search-field) (macOS)
- [Pop-Up Button vs. Pull-Down Button vs. Combo Box](https://namethatui.com/macos/popup-pulldown-combo) (macOS)
- [Badge vs. Chip vs. Pill vs. Tag](https://namethatui.com/web/badge-chip-pill) (web)
