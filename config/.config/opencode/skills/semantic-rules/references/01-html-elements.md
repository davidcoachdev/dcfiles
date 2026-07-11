# HTML Elements — Semantic Rules

## Native HTML > Everything Else

If native HTML works, USE it. No ARIA needed.

## Button vs Link

| Action | Element |
|--------|---------|
| Navigate to URL / location | `<a href>` |
| Action on current page | `<button>` |
| Submit form | `<button type="submit">` |

Visual appearance does NOT determine element. Function does. A link styled as button is still `<a>`.

## Landmarks

Use semantic landmarks for page structure:

| Element | Purpose |
|---------|---------|
| `<header>` | Page or section header |
| `<nav>` | Navigation links |
| `<main>` | Primary content (one per page) |
| `<section>` | Thematic grouping (must have heading) |
| `<article>` | Self-contained content |
| `<aside>` | Tangential/supplementary content |
| `<footer>` | Page or section footer |

## Lists & Tables

- `<ul>` / `<ol>` for item lists — NOT styled `<div>`s
- `<table>` ONLY for tabular data — NOT for layout
- `<th scope="col">` / `<th scope="row">` for headers
- `<caption>` for table descriptions

## Layout

- Use CSS Grid / Flexbox for layout
- Never use `<table>` for layout
- Generic containers (`<div>`, `<span>`) only when no semantic element fits

## Sources

- Content Design Lab — Semantic HTML (contentdesignlab.co.uk/accessibility_semantic.html)
- SubUX — Semantic Foundations (subux.pro/guides/article/semantic-foundations)
- wA11y Design System (wa11y.io/design-system/)
