# Tailwind CSS 4 cn() Utility & Dynamic Styling

## The cn() Utility

`cn()` is a helper function that combines `clsx` and `tailwind-merge` to handle conditional and conflicting Tailwind classes.

### Setup

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### When to Use cn()

#### Conditional Classes

```typescript
<div className={cn("base-class", isActive && "active-class")} />
<button className={cn("px-4 py-2", disabled && "opacity-50 cursor-not-allowed")} />
```

#### Merging with Potential Conflicts

```typescript
// className might override default styles
<button className={cn("px-4 py-2 bg-blue-500", className)} />
```

#### Multiple Conditions

```typescript
<div className={cn(
  "rounded-lg border",
  variant === "primary" && "bg-blue-500 text-white",
  variant === "secondary" && "bg-gray-200 text-gray-800",
  size === "sm" && "px-2 py-1 text-sm",
  size === "lg" && "px-6 py-3 text-lg",
  disabled && "opacity-50 cursor-not-allowed"
)} />
```

### When NOT to Use cn()

```typescript
// ❌ Static classes - unnecessary wrapper
<div className={cn("flex items-center gap-2")} />

// ✅ Just use className directly
<div className="flex items-center gap-2" />
```

## Dynamic Values

### Using style Prop

For truly dynamic values that can't be expressed as Tailwind classes:

```typescript
// Dynamic percentage
<div style={{ width: `${percentage}%` }} />

// Dynamic opacity
<div style={{ opacity: isVisible ? 1 : 0 }} />

// Dynamic color
<div style={{ backgroundColor: dynamicColor }} />
```

### CSS Custom Properties

For theme-based dynamic values:

```typescript
<div style={{ "--progress": `${value}%` } as React.CSSProperties} />

<style>{`
  .progress-bar {
    width: var(--progress);
  }
`}</style>
```

## Style Constants for Libraries

When libraries don't accept className (like Recharts, Chart.js):

```typescript
const CHART_COLORS = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  text: "var(--color-text)",
  gridLine: "var(--color-border)",
};

// Usage with Recharts
<XAxis tick={{ fill: CHART_COLORS.text }} />
<CartesianGrid stroke={CHART_COLORS.gridLine} />
```

## Best Practices

1. **Use cn() for conditional classes** - Handles merging correctly
2. **Use style prop for dynamic values** - When Tailwind can't express it
3. **Use CSS variables for theming** - For library integrations
4. **Keep classes static when possible** - Better performance
5. **Avoid arbitrary values for colors** - Use theme instead

## References

- [clsx Documentation](https://github.com/lukeed/clsx)
- [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- [Tailwind CSS Dynamic Classes](https://tailwindcss.com/docs/content-configuration#dynamic-class-names)
