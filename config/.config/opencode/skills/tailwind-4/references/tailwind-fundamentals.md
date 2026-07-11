# Tailwind CSS 4 Fundamentals

## Overview

Tailwind CSS 4 is a utility-first CSS framework that lets you build modern designs without leaving your HTML.

## Key Principles

1. **Utility-First** - Use small, single-purpose classes
2. **Responsive** - Mobile-first breakpoints
3. **Composable** - Combine utilities to create designs
4. **Customizable** - Extend with your own utilities

## Basic Utilities

### Display & Layout

```html
<!-- Flexbox -->
<div class="flex items-center justify-between gap-4"></div>
<div class="flex flex-col gap-2"></div>

<!-- Grid -->
<div class="grid grid-cols-3 gap-4"></div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"></div>

<!-- Display -->
<div class="block"></div>
<div class="inline-block"></div>
<div class="hidden md:block"></div>
```

### Spacing

```html
<!-- Padding -->
<div class="p-4"></div>
<div class="px-4 py-2"></div>
<div class="pt-4 pb-2"></div>

<!-- Margin -->
<div class="m-4"></div>
<div class="mx-auto"></div>
<div class="mt-8 mb-4"></div>

<!-- Gap -->
<div class="flex gap-4"></div>
```

### Typography

```html
<h1 class="text-2xl font-bold text-white"></h1>
<p class="text-sm text-slate-400"></p>
<span class="text-xs font-medium uppercase tracking-wide"></span>
```

### Colors

```html
<!-- Background -->
<div class="bg-white dark:bg-slate-900"></div>

<!-- Text -->
<p class="text-gray-900 dark:text-white"></p>

<!-- Border -->
<div class="border border-slate-700"></div>
```

### Responsive Design

```html
<!-- Mobile-first -->
<div class="w-full md:w-1/2 lg:w-1/3"></div>
<div class="text-sm md:text-base lg:text-lg"></div>

<!-- Breakpoints -->
<!-- sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px -->
```

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

## References

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Utility Reference](https://tailwindcss.com/docs/utility-first)
- [Responsive Design](https://tailwindcss.com/docs/responsive-design)
