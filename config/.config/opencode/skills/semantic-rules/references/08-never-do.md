# Never Do — Anti-Patterns

## HTML

- `<div>` or `<span>` as interactive elements → use `<button>` or `<a>`
- `<table>` for layout → use CSS Grid or Flexbox
- Heading elements purely for visual styling → use CSS
- Skip heading levels (h1 → h4) → use sequential hierarchy
- Remove `outline: none` without replacement → use custom focus style
- `<div onclick>` → use `<button onclick>`

## ARIA

- Add redundant roles to native elements (`<button role="button">`)
- Use ARIA when native HTML covers it
- Add `role="heading"` to actual heading elements
- Use `aria-label` when visible text exists

## Visual

- Use color alone to convey meaning → add icon, text, underline
- Style visual appearance that contradicts semantic role
- Hide interactive elements from keyboard but keep them visible

## Forms

- Inputs without labels
- Placeholder as only label
- Error messages not linked with `aria-describedby`
- Radio/checkbox groups without `<fieldset>` + `<legend>`

## Components

- Generic names (`Button`, `Card`, `Modal`) when intent is specific
- Component tokens referencing option tokens directly (skip decision layer)
- Inconsistent naming across same semantic concept

## Sources

- SubUX — Semantic Foundations (subux.pro/guides/article/semantic-foundations)
- Content Design Lab — Semantic HTML (contentdesignlab.co.uk/accessibility_semantic.html)
- Semi Design Accessibility (semi.design/en-US/experience/accessibility)
- D34dBlog — Semantics in Component Libraries (d34dman.com/posts/web-design/component-library-and-semantics/)
