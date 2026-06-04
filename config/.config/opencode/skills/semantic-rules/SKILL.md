---
name: semantic-rules
description: >
  Semantic HTML, ARIA, and design token semantics rules for accessible UI.
  Trigger: When writing semantic HTML, fixing accessibility issues, auditing semantics, choosing HTML elements, using ARIA, structuring design tokens semantically, or correcting non-semantic markup.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Building new components — pick correct semantic element first
- Auditing existing UI for accessibility / semantics gaps
- Fixing `<div onclick>`, heading skips, ARIA overuse
- Structuring design tokens (option → decision → component layers)
- Naming components semantically

## References

Load the reference matching your context:

| Context | Reference |
|---------|-----------|
| Pick HTML elements, button vs link, landmarks | [references/01-html-elements](references/01-html-elements.md) |
| ARIA rules — when to use, when NOT to use | [references/02-aria-rules](references/02-aria-rules.md) |
| Heading hierarchy, document outline | [references/03-headings](references/03-headings.md) |
| Forms, inputs, labels, error messages | [references/04-forms](references/04-forms.md) |
| Design token semantics (3-layer) | [references/05-design-tokens](references/05-design-tokens.md) |
| Component naming conventions | [references/06-component-naming](references/06-component-naming.md) |
| Keyboard navigation, focus states | [references/07-keyboard-focus](references/07-keyboard-focus.md) |
## Sources

- **Semantic HTML**: Content Design Lab (contentdesignlab.co.uk/accessibility_semantic.html)
- **ARIA vs Native HTML**: Fernando Ruiz (fernandoux.com) — "First rule of ARIA"
- **Heading hierarchy**: SubUX (subux.pro/guides/article/semantic-foundations)
- **Forms & inputs**: wA11y Design System (wa11y.io/design-system/)
- **Design token semantics (3-layer)**: Martin Fowler (martinfowler.com/articles/design-token-based-ui-architecture.html)
- **Keyboard & focus**: Semi Design Accessibility (semi.design/en-US/experience/accessibility)
- **Component naming**: D34dBlog (d34dman.com/posts/web-design/component-library-and-semantics/)
- **Semantic UI framework**: Semantic-Org (github.com/Semantic-Org/Semantic-Next)
