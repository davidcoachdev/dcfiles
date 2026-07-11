# Forms & Inputs

## Label Every Input

Every `<input>`, `<select>`, `<textarea>` needs an associated `<label>`.

### Method 1: for/id pairing (preferred)

```html
<label for="email">Email</label>
<input type="email" id="email" name="email">
```

### Method 2: Wrap

```html
<label>
  Email
  <input type="email" name="email">
</label>
```

## Error Messages

Link errors with `aria-describedby`:

```html
<label for="password">Password</label>
<input type="password" id="password" aria-describedby="password-error" aria-invalid="true">
<span id="password-error" role="alert">Password must be at least 8 characters</span>
```

## Grouping

Use `<fieldset>` + `<legend>` for related inputs:

```html
<fieldset>
  <legend>Contact Method</legend>
  <label><input type="radio" name="contact" value="email"> Email</label>
  <label><input type="radio" name="contact" value="phone"> Phone</label>
</fieldset>
```

## Required & Optional

- Mark required fields with `required` attribute
- Indicate optional in label: "Name (optional)"
- Don't rely on `*` alone — use text or aria

## Form Structure

```html
<form>
  <fieldset>
    <legend>Account</legend>
    <label for="name">Name</label>
    <input id="name" required>
  </fieldset>
  <button type="submit">Create Account</button>
</form>
```

## Sources

- wA11y Design System — Forms & Inputs (wa11y.io/design-system/)
- SubUX — Semantic Foundations (subux.pro/guides/article/semantic-foundations)
