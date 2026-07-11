# Tailwind CSS 4 Skill

## Structure

```
tailwind-4/
├── SKILL.md                 # Main skill definition (205 lines)
├── references/              # Supporting documentation
│   ├── tailwind-fundamentals.md
│   ├── cn-utility-dynamic-styling.md
│   └── responsive-dark-mode.md
├── assets/                  # Code examples
│   └── tailwind-complete-example.tsx
└── scripts/                 # Utility scripts (empty)
```

## Quick Start

1. **Read SKILL.md** - Understand Tailwind CSS 4 patterns
2. **Study references/** - Deep dive into specific techniques
3. **Review assets/** - Real-world code examples

## Key Concepts

- **Utility-First** - Use small, single-purpose classes
- **Responsive Design** - Mobile-first breakpoints
- **Dark Mode** - Built-in dark mode support
- **cn() Utility** - Handle conditional and conflicting classes
- **Dynamic Styling** - Use style prop for truly dynamic values
- **Arbitrary Values** - Escape hatch for one-off values

## When to Use

- Styling React components
- Building responsive layouts
- Implementing dark mode
- Creating reusable component libraries
- Rapid UI development

## Critical Rules

### Never Use var() in className

```html
<!-- ❌ WRONG -->
<div class="bg-[var(--color-primary)]"></div>

<!-- ✅ CORRECT -->
<div class="bg-primary"></div>
```

### Never Use Hex Colors

```html
<!-- ❌ WRONG -->
<p class="text-[#ffffff]"></p>

<!-- ✅ CORRECT -->
<p class="text-white"></p>
```

## Common Patterns

### Flexbox

```html
<div class="flex items-center justify-between gap-4"></div>
<div class="flex flex-col gap-2"></div>
```

### Grid

```html
<div class="grid grid-cols-3 gap-4"></div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"></div>
```

### Responsive

```html
<div class="w-full md:w-1/2 lg:w-1/3"></div>
<div class="hidden md:block"></div>
```

### Dark Mode

```html
<div class="bg-white dark:bg-slate-900"></div>
<p class="text-gray-900 dark:text-white"></p>
```

## cn() Utility

```typescript
import { cn } from "@/lib/utils";

<div className={cn("base-class", isActive && "active-class")} />
```

## Related Skills

- `react-19` - React 19 patterns and hooks
- `nextjs-16` - Next.js 16 App Router patterns
- `ui-craft` - UI implementation and design
