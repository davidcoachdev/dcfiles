# Keyboard Navigation & Focus

## Built-in Behavior

Semantic elements come with keyboard support:

| Element | Keyboard behavior |
|---------|-------------------|
| `<button>` | Tab to focus, Enter/Space to activate |
| `<a href>` | Tab to focus, Enter to navigate |
| `<input>` | Tab to focus, type to interact |
| `<select>` | Tab to focus, arrows to navigate options |

Don't break these with custom scripts.

## Focus States

- **Never** remove `outline` without high-visibility replacement
- Focus visible at **3:1 contrast** minimum
- Focus order = DOM order = visual order (top→bottom, left→right)

```css
/* BAD */
button:focus { outline: none; }

/* GOOD */
button:focus {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
}
```

## Focus Management

- Initial focus: set to first logical element
- Modal: focus first element, trap inside, return on close
- Navigation: arrows for related items (menu, tabs, radio group)
- Disappearing element: focus returns to previous position

## Tab Order

```
✅ Logical DOM order → matches visual order
❌ Positive tabindex → breaks natural flow
❌ Display:none / visibility:hidden → removed from tab order (correct)
❗ Invisible but focusable → confusing, fix it
```

## Sources

- Semi Design Accessibility (semi.design/en-US/experience/accessibility)
- Content Design Lab — Semantic HTML (contentdesignlab.co.uk/accessibility_semantic.html)
- wA11y Design System (wa11y.io/design-system/)
