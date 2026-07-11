# System Persistence

Create `.interface-design/system.md` to persist design decisions across sessions.

## Workflow

### New Project

1. Determine design direction from context (see `08-design-directions`)
2. State direction choices before building
3. Apply consistent spacing/depth/colors
4. Save system.md

### Existing System

1. Load `.interface-design/system.md`
2. Use established patterns
3. Maintain consistency
4. Add new patterns as needed

## System File Template

```markdown
# Design System

## Direction
Personality: [Precision & Density / Warmth / Sophistication / Boldness / Utility / Data]
Foundation: [Cool (slate) / Warm / Neutral]
Depth: [Borders-only / Subtle shadows / Layered / Strong]

## Tokens
### Spacing
Base: 4px
Scale: 4, 8, 12, 16, 24, 32

### Colors
--foreground: slate-900
--secondary: slate-600
--accent: blue-600

## Patterns
### Button Primary
- Height: 36px
- Padding: 12px 16px
- Radius: 6px
- Usage: Primary actions

### Card Default
- Border: 0.5px solid
- Padding: 16px
- Radius: 8px
```

## Core Principle

**Decisions compound.** A spacing value chosen once becomes a pattern. A depth strategy becomes an identity. Consistency beats perfection.

## Anti-Patterns

- ❌ Random spacing (14px, 17px, 22px...)
- ❌ Button heights drifting (36px, 38px, 40px...)
- ❌ Inconsistent border-radius
- ❌ No depth strategy
- ❌ Mixing surface treatments

## Sources

- [Interface Design — Design Engineering Patterns](https://github.com/gentleman-programming/opencode-skills)
