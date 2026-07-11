# Tailwind CSS 4 Responsive Design & Dark Mode

## Responsive Design

Tailwind uses a mobile-first approach with breakpoints.

### Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Mobile-First Pattern

```html
<!-- Default (mobile) -->
<div class="w-full">
  <!-- md and up: 50% width -->
  <div class="md:w-1/2">
    <!-- lg and up: 33% width -->
    <div class="lg:w-1/3"></div>
  </div>
</div>
```

### Common Responsive Patterns

```html
<!-- Hide on mobile, show on md and up -->
<div class="hidden md:block"></div>

<!-- Different text sizes -->
<h1 class="text-2xl md:text-3xl lg:text-4xl"></h1>

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"></div>

<!-- Responsive padding -->
<div class="p-4 md:p-6 lg:p-8"></div>

<!-- Responsive flex direction -->
<div class="flex flex-col md:flex-row gap-4"></div>
```

## Dark Mode

Tailwind supports dark mode with the `dark:` prefix.

### Setup

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media'
  // ...
}
```

### Using Dark Mode

```html
<!-- Light mode: white, Dark mode: slate-900 -->
<div class="bg-white dark:bg-slate-900"></div>

<!-- Light mode: gray-900, Dark mode: white -->
<p class="text-gray-900 dark:text-white"></p>

<!-- Light mode: blue-500, Dark mode: blue-400 -->
<button class="bg-blue-500 dark:bg-blue-400"></button>
```

### Dark Mode with Responsive

```html
<!-- Combine dark mode with responsive -->
<div class="bg-white dark:bg-slate-900 md:p-6 dark:md:p-8"></div>
```

## Container Queries

For component-level responsive design:

```html
<div class="@container">
  <!-- sm: 384px, md: 448px, lg: 512px, xl: 576px, 2xl: 672px -->
  <div class="@md:grid @md:grid-cols-2"></div>
</div>
```

## Best Practices

1. **Mobile-first** - Start with mobile styles, add breakpoints
2. **Consistent spacing** - Use the spacing scale
3. **Dark mode pairs** - Always provide dark: alternative
4. **Avoid too many breakpoints** - Keep it simple
5. **Test responsiveness** - Check all breakpoints

## References

- [Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [Container Queries](https://tailwindcss.com/docs/container-queries)
