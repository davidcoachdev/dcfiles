# Component Patterns

## Compound Components

Flexible API that allows composing sub-components.

```tsx
// Usage: <Card><Card.Header /><Card.Body /></Card>
const Card = ({ children, className }) => (
  <div className={cn("rounded-lg border bg-surface", className)}>
    {children}
  </div>
);

Card.Header = ({ children }) => (
  <div className="px-4 py-3 border-b">{children}</div>
);

Card.Body = ({ children }) => (
  <div className="px-4 py-3">{children}</div>
);

Card.Footer = ({ children }) => (
  <div className="px-4 py-3 border-t">{children}</div>
);
```

### When to Use

- Components with multiple sections (Card, Modal, Dialog)
- When consumers need flexible composition
- Design system libraries

## Polymorphic Components

Render as any HTML element or custom component.

```tsx
type Props<C extends React.ElementType> = {
  as?: C;
} & React.ComponentPropsWithRef<C>;

function Text<C extends React.ElementType = "p">(
  { as, ...props }: Props<C>
) {
  const Component = as || "p";
  return <Component className="text-sm" {...props} />;
}

// Usage: <Text as="span">Inline text</Text>
// Usage: <Text as="h2">Heading</Text>
```

### When to Use

- Text components that need semantic flexibility
- Layout primitives (Box, Flex, Grid)
- When accessibility requires specific HTML elements

## Responsive Component Variants

Mobile-first, progressive enhancement.

```tsx
const Container = ({ children }) => (
  <div className="
    px-4          /* mobile: 16px padding */
    md:px-8       /* tablet: 32px padding */
    lg:px-12      /* desktop: 48px padding */
    max-w-7xl     /* max width */
    mx-auto       /* center */
  ">
    {children}
  </div>
);
```

### Responsive Pattern Guidelines

1. **Mobile-first** — write base styles for mobile, add breakpoints for larger
2. **Progressive enhancement** — functionality works at all sizes
3. **Test at 375px, 768px, 1024px, 1440px** — cover all major breakpoints

## Component Consistency Rules

| Component | Rule |
|-----------|------|
| **Buttons** | Fixed height (36px), consistent padding |
| **Inputs** | Same height as buttons, clear focus state |
| **Cards** | Consistent padding (16px), border-radius (8px) |
| **Spacing** | Never random — use scale |

## Sources

- [UX Architect — Component Patterns](https://github.com/gentleman-programming/opencode-skills)
