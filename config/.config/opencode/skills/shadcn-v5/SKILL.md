---
name: shadcn-v5
description: >
  shadcn/ui v5 component patterns, best practices, and CLI commands for building professional UIs.
  Trigger: When working with shadcn/ui components, adding components via CLI, styling with Tailwind, or composing component structures.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Adding or managing shadcn/ui components via CLI
- Composing component structures (Dialog, Select, Card, Tabs)
- Styling with Tailwind CSS and semantic colors
- Implementing dark mode and theming
- Building forms with Input, Select, Checkbox, etc.
- Following best practices for component composition

## Critical Rules

### ❌ NEVER DO

1. **NO custom `<button>` if shadcn Button exists** → Use `import { Button } from '@/components/ui/button'`
2. **NO hardcoded colors** → Use semantic tokens (`bg-primary`, `text-muted-foreground`)
3. **NO manual className merging** → Use `cn("class1", "class2")` utility
4. **NO custom implementations of standard components** → Use CLI to add components

### ✅ ALWAYS DO

1. **Check components/ui first** before creating any UI element
2. **Use CLI to add components**: `npx shadcn@latest add [component]`
3. **Use `cn()` for className merging**: `className={cn("base-class", condition && "conditional-class")}`
4. **Use lucide-react for icons** (or project icon library)
5. **Follow semantic color naming**: `bg-background`, `text-foreground`, `text-muted-foreground`

## Component Selection Quick Reference

| Need | Use |
|------|-----|
| Button/action | `Button` with variant |
| Form inputs | `Input`, `Select`, `Switch`, `Checkbox`, `RadioGroup`, `Textarea` |
| Toggle 2-5 options | `ToggleGroup` + `ToggleGroupItem` |
| Data display | `Table`, `Card`, `Badge`, `Avatar` |
| Navigation | `Sidebar`, `Tabs`, `Breadcrumb`, `Pagination` |
| Overlays | `Dialog`, `Sheet`, `Drawer`, `AlertDialog` |
| Feedback | `sonner` (toast), `Alert`, `Progress`, `Skeleton`, `Spinner` |
| Command palette | `Command` inside `Dialog` |
| Layout | `Card`, `Separator`, `Resizable`, `ScrollArea`, `Accordion` |
| Empty states | `Empty` |
| Menus | `DropdownMenu`, `ContextMenu`, `Menubar` |
| Tooltips | `Tooltip`, `HoverCard`, `Popover` |

## Styling Patterns

### Semantic Colors (use these, NOT raw values)

```tsx
// ✅ CORRECT - semantic tokens
<div className="bg-background text-foreground">
<Button variant="destructive">Delete</Button>
<Badge variant="secondary">New</Badge>

// ❌ WRONG - raw color values
<div className="bg-blue-500 text-gray-900">
<span className="text-red-600">Error</span>
```

### Spacing: gap-* NOT space-y-*

```tsx
// ✅ CORRECT
<div className="flex flex-col gap-4">

// ❌ WRONG
<div className="space-y-4">
```

### Equal dimensions: size-* NOT w-* h-*

```tsx
// ✅ CORRECT
<Avatar className="size-10">

// ❌ WRONG
<Avatar className="w-10 h-10">
```

### Icons in Buttons: data-icon attribute

```tsx
<Button>
  <SearchIcon data-icon="inline-start" />
  Search
</Button>
```

### Truncate: use shorthand

```tsx
// ✅ CORRECT
<p className="truncate">

// ❌ WRONG
<p className="overflow-hidden text-ellipsis whitespace-nowrap">
```

## Component Composition Rules

### Items ALWAYS inside their Group

```tsx
// ✅ CORRECT
<SelectGroup>
  <SelectItem value="1">Option 1</SelectItem>
</SelectGroup>

// ❌ WRONG
<SelectItem value="1">Option 1</SelectItem>
```

### Dialog, Sheet, Drawer ALWAYS need Title

```tsx
// ✅ CORRECT
<Dialog>
  <DialogTitle>Confirm Action</DialogTitle>
  <DialogContent>...</DialogContent>
</Dialog>

// ❌ WRONG - missing title for accessibility
<Dialog>
  <DialogContent>...</DialogContent>
</Dialog>
```

### Full Card composition

```tsx
// ✅ CORRECT
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>

// ❌ WRONG - dumping everything in CardContent
<Card>
  <CardContent>Title + Content + Footer</CardContent>
</Card>
```

### TabsTrigger must be inside TabsList

```tsx
// ✅ CORRECT
<Tabs>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
  </TabsList>
</Tabs>

// ❌ WRONG
<Tabs>
  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
</Tabs>
```

### Avatar always needs AvatarFallback

```tsx
// ✅ CORRECT
<Avatar>
  <AvatarImage src={user.avatar} />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

## Forms Pattern

### Always use FieldGroup + Field for form layout

```tsx
// ✅ CORRECT
<FieldGroup>
  <Field>
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <Input id="email" />
    <FieldDescription>Enter your email</FieldDescription>
  </Field>
</FieldGroup>

// ❌ WRONG - div with space-y
<div className="space-y-4">
  <Label>Email</Label>
  <Input />
</div>
```

### Validation: data-invalid on Field, aria-invalid on control

```tsx
<Field data-invalid>
  <FieldLabel>Email</FieldLabel>
  <Input aria-invalid />
  <FieldError>Invalid email</FieldError>
</Field>
```

## CLI Commands

```bash
# Initialize shadcn in project
npx shadcn@latest init

# Add components
npx shadcn@latest add button card dialog select
npx shadcn@latest add @magicui/shimmer-button  # from registry

# Check project info and installed components
npx shadcn@latest info --json

# Get component documentation URLs
npx shadcn@latest docs button dialog select

# View registry item details
npx shadcn@latest view @shadcn/button

# Preview changes before adding/updating
npx shadcn@latest add button --dry-run
npx shadcn@latest add button --diff button.tsx

# Search registries
npx shadcn@latest search @shadcn -q "sidebar"
```

## Project Context Fields

When working with shadcn projects, these fields from `npx shadcn@latest info` are critical:

| Field | Description | Action |
|-------|-------------|--------|
| `aliases` | Import path prefix (e.g., `@/`) | Use for imports, never hardcode |
| `isRSC` | React Server Components enabled | Add `"use client"` for client components |
| `tailwindVersion` | v4 uses `@theme inline`, v3 uses config | Follow correct pattern |
| `base` | `radix` or `base` primitive library | Affects component APIs |
| `iconLibrary` | Icon library (e.g., `lucide-react`) | Use correct import |
| `packageManager` | `npm`, `pnpm`, `bun` | Use for dependency installs |

## Dark Mode Setup (class-based)

```tsx
// 1. Create ThemeProvider
function ThemeProvider({ children, defaultTheme = "dark", storageKey = "vite-ui-theme" }) {
  const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) || defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  return (
    <Provider value={{ theme, setTheme }}>
      {children}
    </Provider>
  )
}

// 2. Wrap app in main.tsx
<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
  <App />
</ThemeProvider>

// 3. Toggle theme
const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark")
```

## References

- **shadcn/ui official docs**: https://ui.shadcn.com/
- **shadcn/ui GitHub**: https://github.com/shadcn-ui/ui
- **All Components List**: https://ui.shadcn.com/docs/components
- **Tailwind CSS**: https://tailwindcss.com/
- **lucide-react icons**: https://lucide.dev/
- **OKLCH color format**: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]