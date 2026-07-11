# Component Naming

## Names Convey Purpose

Component names should indicate intent, not just type.

| Generic | Semantic |
|---------|----------|
| `Button` | `PrimaryButton`, `DangerButton`, `IconButton` |
| `Card` | `ProductCard`, `ProfileCard`, `ArticleCard` |
| `Input` | `SearchInput`, `EmailInput`, `PasswordInput` |
| `Modal` | `DeleteConfirmModal`, `OnboardingModal` |

## Naming Conventions

- **Primary/Secondary/Danger** for intent/variant
- **Domain name** for context: `ProductCard`, `UserAvatar`
- **Layout name** for structure: `TwoColumnLayout`, `SidebarNav`

## Anti-Patterns

- `UtilsButton`, `HelperCard` — meaningless
- `Component1`, `Widget2` — no semantic info
- `BigText` — describes appearance, not purpose

## Consistency

Same semantic concept = same name across the system.

```
✅ TextColor, BgColor, BorderColor
❌ TextColor, Background, BorderColour
```

## Sources

- D34dBlog — Semantics in Component Libraries (d34dman.com/posts/web-design/component-library-and-semantics/)
- Figma Blog — The Future of Design Systems is Semantic (figma.com/blog/the-future-of-design-systems-is-semantic/)
