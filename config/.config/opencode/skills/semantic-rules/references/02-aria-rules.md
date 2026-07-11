# ARIA Rules

## First Rule of ARIA

**No ARIA is better than bad ARIA.**

If a native HTML element covers the semantic need, use it. ARIA fills gaps — not replaces.

## When to Use ARIA

| ARIA | When |
|------|------|
| `aria-label` | No visible text exists for accessible name |
| `aria-describedby` | Associate descriptive/help text with element |
| `aria-expanded` | Open/closed state of collapsible elements |
| `aria-hidden="true"` | Remove decorative elements from accessibility tree |
| `role="..."` | No native semantic equivalent exists |

## When NOT to Use ARIA

- On native elements that already have correct semantics (`<button>`, `<nav>`, etc.)
- Redundant roles (`<button role="button">`)
- To fix bad HTML — fix the HTML instead
- On invisible/hidden elements

## Anti-Patterns

| Wrong | Right |
|-------|-------|
| `<div role="button" onclick>` | `<button>` |
| `<span role="link" onclick>` | `<a href>` |
| `<div role="navigation">` | `<nav>` |
| `<button role="button">` | `<button>` |
| `<h2 role="heading" aria-level="2">` | `<h2>` |

## Testing ARIA

- Screen reader must announce correct role and state
- Keyboard behavior must match the role
- Focus management must be correct for interactive ARIA

## Sources

- Fernando Ruiz — ARIA vs Semantic HTML (fernandoux.com)
- wA11y Design System (wa11y.io/design-system/)
- Content Design Lab — Semantic HTML (contentdesignlab.co.uk/accessibility_semantic.html)
