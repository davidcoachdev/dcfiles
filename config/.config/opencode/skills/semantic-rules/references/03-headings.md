# Heading Hierarchy

## Rules

- **One H1** per page
- **Never skip levels**: h1 → h2 → h3, NOT h1 → h4
- Headings = document outline, NOT visual styling
- Use CSS for visual size, semantic tags for structure

## Document Outline Example

```
H1: Page title
  H2: Major section
    H3: Subsection within H2
    H3: Another subsection
  H2: Next major section
    H3: Subsection
      H4: Deep subsection
```

## Common Mistakes

| Wrong | Right |
|-------|-------|
| Skip h1 → h3 | Use h1 → h2 → h3 |
| Multiple H1 | One H1, rest H2+ |
| Use heading for visual size | Use CSS for size, correct heading for structure |
| Empty headings for spacing | Use CSS margins/padding |

## Section Headings

Every `<section>` should have a heading as its first child.

```html
<section>
  <h2>Section Title</h2>
  <!-- section content -->
</section>
```

## Sources

- SubUX — Semantic Foundations (subux.pro/guides/article/semantic-foundations)
- Content Design Lab — Semantic HTML (contentdesignlab.co.uk/accessibility_semantic.html)
