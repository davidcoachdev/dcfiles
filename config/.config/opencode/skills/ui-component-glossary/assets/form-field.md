---
name: Form Field
platform: web
slug: form-field
tag: <label for>
url: https://namethatui.com/web/form-field
source: NameThatUI (namethatui.com)
also_called: text field, input field, form input, form control
---

# Form Field

> Demo interactivo: https://namethatui.com/web/form-field

**Plataforma:** web · **Tag/API:** `<label for>` · **También llamado:** text field, input field, form input, form control

## Descripción
“The gray text inside the box that disappears when you type” is the placeholder — one of five parts of a form field that each have a real name. The word above the box is the label (<label for>), the little red star is the required indicator, the small gray line underneath is helper text, and the red line that replaces it is the validation message. Wiring them up (for/id, aria-describedby, aria-invalid) is what makes the field usable by screen readers, not just sighted users.

## Si lo llamaste…
“the gray text inside the box that disappears when you type”“the little red star next to the label”“the small gray text under the input”“the red error message under the field”“the word above the text box”“hint text in the empty input”
…you meant a form field.

## Anatomía — cada parte, nombrada
1. Label`label`
“The word above the box” is the label — a real `label` tied to the input by for/id, so clicking it focuses the field.
2. Required indicatorrequired
“The little red star” marks a required field — the asterisk is decoration; the input itself carries the required attribute.
3. Placeholder::placeholder
“The gray text inside the box that disappears when you type” is the placeholder — an example or hint, never a substitute for the label.
4. Helper textaria-describedby
“The small gray line under the field” is helper text — link it to the input with aria-describedby so screen readers announce it.
5. Error messagearia-invalid="true"
“The red text under the box” is the validation message — pair the red border (aria-invalid, :user-invalid) with a message the field references.

## Prompt para IA (paste-ready)
Build the form field with full anatomy: a real `label` above the input (clicking it focuses the field), placeholder text as a hint only — never as the label, helper text below linked via aria-describedby, and required marked with the required attribute plus a visual asterisk. On invalid input set aria-invalid="true", style the red state with :user-invalid, and point aria-describedby at the error message.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my form field (label for/id, aria-describedby, placeholder). Rule out: the placeholder doing the label's job and vanishing on first keystroke; the label not associated so clicking it does not focus the input; error text not linked via aria-describedby so screen readers never hear it; autofill's yellow/blue fill overriding your styles (-webkit-autofill). The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| HTML | `label` |  |
|------|-------------------------------------------------------------------------------------------------|--|
| CSS | ::placeholder |  |
| ARIA | aria-describedby | links helper/error text to the input |
| ARIA | aria-invalid |  |
| CSS | :user-invalid | invalid only after interaction |
| HTML | required |  |

## Ver también
- [Focus Ring (:focus-visible)](https://namethatui.com/web/focus-ring-web) (web)
- [Combobox (Autocomplete / Typeahead)](https://namethatui.com/web/combobox) (web)
- [Switch vs. Checkbox vs. Radio](https://namethatui.com/web/switch-checkbox-radio) (web)
- [Resize Handle (Size Grip)](https://namethatui.com/web/resize-handle) (web)
- [Sign-in Form](https://namethatui.com/web/sign-in-form) (web)
- [Date Picker](https://namethatui.com/web/date-picker) (web)
