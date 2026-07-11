# Design Token Semantics

## Three-Layer Architecture

```
Option tokens    → raw values (#ff0000, 16px, 400)
Decision tokens  → semantic meaning ($color-error, $text-body)
Component tokens → component-specific ($button-bg, $card-border)
```

## Layer 1: Option Tokens

Raw design values. No semantic meaning.

```json
{
  "color": { "red": { "value": "#ff0000" } },
  "spacing": { "md": { "value": "16px" } },
  "font": { "weight": { "normal": { "value": "400" } } }
}
```

## Layer 2: Decision Tokens (Semantic)

Reference option tokens. Define HOW styles apply contextually.

```json
{
  "color": {
    "error": { "value": "{color.red}" },
    "primary": { "value": "{color.blue}" }
  },
  "text": {
    "body": { "value": "{font.size.md}" },
    "heading": { "value": "{font.size.lg}" }
  }
}
```

## Layer 3: Component Tokens

Reference decision tokens. Define WHERE styles apply.

```json
{
  "button": {
    "primary": {
      "background": { "value": "{color.primary}" },
      "text": { "value": "{color.surface}" }
    },
    "danger": {
      "background": { "value": "{color.error}" }
    }
  }
}
```

## Rules

- Each layer references the layer above it
- Option → Decision → Component
- Component tokens should NOT reference option tokens directly
- Decision tokens carry meaning (error, success, warning, info)
- Start with 2 layers if design is stable; add 3rd when flexibility needed

## Sources

- Martin Fowler — Design Token-Based UI Architecture (martinfowler.com/articles/design-token-based-ui-architecture.html)
- Fernando Ruiz — Token Architecture (Global vs Semantic vs Component) (fernandoux.com)
