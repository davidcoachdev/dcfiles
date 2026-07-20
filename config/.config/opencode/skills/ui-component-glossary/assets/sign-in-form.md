---
name: Sign-in Form
platform: web
slug: sign-in-form
tag: autocomplete="current-password"
url: https://namethatui.com/web/sign-in-form
source: NameThatUI (namethatui.com)
also_called: login form, login page, login screen, sign-in page, auth form, authentication form
---

# Sign-in Form

> Demo interactivo: https://namethatui.com/web/sign-in-form

**Plataforma:** web · **Tag/API:** `autocomplete="current-password"` · **También llamado:** login form, login page, login screen, sign-in page, auth form, authentication form

## Descripción
“The eye icon on the password field”, “the sign in with google buttons”, “the line that says or” — a sign-in form (login form to everyone else) is a bundle of parts with real names: the password visibility toggle, the federated sign-in buttons (identity-provider buttons), and the sign-in method divider. Its most important part is invisible: autocomplete="username" and autocomplete="current-password" are what let password managers and passkeys fill the form at all.

## Si lo llamaste…
“登陆界面”“email box and password box with a login button”“the eye icon on the password field”“the sign in with google buttons”“the line that says or between the login buttons”“the screen where you type your email and password”
…you meant a sign-in form.

## Anatomía — cada parte, nombrada
1. Federated sign-in buttons"Continue with Google"
“The sign in with google / apple buttons” are federated sign-in buttons (identity-provider buttons; “social login” when the providers are social) — the approved labels are “Sign in with…” or “Continue with…”.
2. Sign-in method divider"or"
“The line with OR in the middle” is the sign-in method divider — a horizontal rule interrupted by the word “or”, separating the federated buttons from the email-and-password fields.
3. Password visibility toggle
“The eye icon in the password box” is the password visibility toggle (show-password button) — a type="button" so clicking it never submits the form.

## Prompt para IA (paste-ready)
Build a sign-in form (login form) with native form semantics: a real `form` containing a labeled email field (`input`), a labeled password field (`input`), and a  labeled "Sign in" so Enter submits. Add the password visibility toggle as a  with accessible name "Show password"; put the federated sign-in buttons ("Continue with Google" / "Continue with Apple") above a sign-in method divider — the thin rule with "or" in the middle. The autocomplete tokens are load-bearing: they are what makes password managers recognize and fill the fields.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my sign-in form (autocomplete tokens, password managers, Enter submission). Rule out: the password manager not filling because the email field lacks autocomplete="username" or the password says new-password on a SIGN-IN form; Enter doing nothing because the inputs are not inside a real `form` with a ; the eye toggle submitting the form because it is missing type="button"; mobile keyboards capitalizing the identifier because it is type="text" without autocapitalize="none"; framework state staying empty even though the browser autofilled the DOM (read values at submit time). The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| HTML | autocomplete="current-password" | on the password input — what makes password managers offer to fill |
|------|---------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| HTML | autocomplete="username" | on the email/username field, even when it's type="email" |
| HTML | `input` |  |
| HTML | autocomplete="username webauthn" | adds passkey autofill; webauthn goes last in the list |
| Web API | navigator.credentials.get({ publicKey, mediation: "conditional" }) | passkey sign-in (conditional mediation) |

## Ver también
- [Form Field](https://namethatui.com/web/form-field) (web)
- [Focus Ring (:focus-visible)](https://namethatui.com/web/focus-ring-web) (web)
- [Divider vs. Separator vs. Rule](https://namethatui.com/web/divider) (web)
