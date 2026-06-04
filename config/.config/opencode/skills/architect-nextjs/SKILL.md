---
name: architect-nextjs
description: >
  Next.js architecture with Scope Rule and Screaming Architecture patterns.
  Trigger: When setting up new Next.js projects, deciding component placement, or implementing Server Actions and route groups.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Setting up new Next.js 16+ project structure
- Deciding component placement (local vs shared)
- Refactoring codebases toward scalable architecture
- Implementing Server Actions, layouts, and route groups
- Applying the Scope Rule consistently

## Core Principles

### 1. The Scope Rule (Absolute Law)

**"Scope determines structure."**

| Usage | Location |
|-------|----------|
| Used by **1 feature** | `app/(feature)/_components/` |
| Used by **2+ features** | `src/shared/` |

**No Exceptions**: Do NOT pollute `shared/` with single-use components.

### 2. Screaming Architecture

Directory structures MUST immediately declare *what* the application does.

```
app/
├── (auth)/           # 👀 Authentication feature
│   ├── login/
│   │   └── _components/
│   ├── register/
│   │   └── _components/
│   └── _components/ # Shared auth components
├── (shop)/           # 👀 E-commerce feature
│   ├── products/
│   │   └── _components/
│   └── cart/
│       └── _components/
└── (blog)/          # 👀 Blog feature
    ├── posts/
    └── categories/
shared/               # ⚠️ ONLY for 2+ features
└── components/       # Global components
```

### 3. Next.js 16 Standards

- **App Router Only**: No `pages/` directory
- **Server-First**: Components are Server Components by default
- **Data Access**: Fetch directly in Server Components or via Server Actions

## Directory Structure

### Route Groups

Use `(feature)` syntax for top-level modules:

```
app/
├── (auth)/           # No URL impact
│   ├── login/page.tsx    # /login
│   └── register/page.tsx # /register
├── (dashboard)/     # /dashboard/*
│   ├── layout.tsx
│   ├── page.tsx
│   └── settings/
└── (public)/         # Public pages
    ├── about/page.tsx
    └── contact/page.tsx
```

### Private Folders

Use `_` prefix for folders that should NOT create routes:

```
app/
├── (feature)/
│   ├── page.tsx
│   ├── _components/     # NOT routed
│   ├── _actions/         # Server Actions (NOT routed)
│   └── _types/           # TypeScript types
```

## Decision Framework

### Step 1: Count Usage

```
Is the code used by:
├── 1 feature → app/(feature)/_components/
└── 2+ features → src/shared/
```

### Step 2: Determine Component Type

| Type | When to Use | Directive |
|------|-------------|-----------|
| **Server Component** | Static content, data fetching | Default (none) |
| **Client Component** | useState, useEffect, event handlers | `"use client"` |
| **Server Action** | Mutations, form handling | `"use server"` |

### Step 3: Push "use client" Down

```
❌ BAD: Entire page as client
app/(feature)/page.tsx (with "use client")

✅ GOOD: Only interactive leaf as client
app/(feature)/
├── page.tsx        # Server - fetches data
└── _components/
    └── Button.tsx  # Client - "use client" here
```

## Component Templates

### Server Component

```typescript
import { Suspense } from "react";
import { getData } from "@/shared/lib/api";

export default async function FeaturePage() {
  const data = await getData();

  return (
    <main>
      <Suspense fallback={<Skeleton />}>
        <Content data={data} />
      </Suspense>
    </main>
  );
}
```

### Client Component

```typescript
"use client";

import { useState } from "react";

interface Props {
  initialValue?: string;
}

export function InteractiveComponent({ initialValue = "" }: Props) {
  const [value, setValue] = useState(initialValue);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

### Server Action

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitForm(prevState: FormState, formData: FormData) {
  const validated = validateForm(formData);
  if (!validated.success) {
    return { errors: validated.errors };
  }

  await db.items.create({ data: validated.data });
  revalidatePath("/items");
  redirect("/items");
}
```

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Page | `page.tsx` | `app/(shop)/products/page.tsx` |
| Layout | `layout.tsx` | `app/(shop)/layout.tsx` |
| Component | `CamelCase.tsx` | `ProductCard.tsx` |
| Server Action | `kebab-case.ts` | `create-product.ts` |
| Hook | `useCamelCase.ts` | `useCart.ts` |
| Type | `kebab-case.ts` | `product-types.ts` |
| Utils | `kebab-case.ts` | `format-date.ts` |

## Quality Checklist

Before finalizing any structure:

- [ ] **Scope**: Is this used in >1 feature? If no → `_components/`
- [ ] **Server**: Is "use client" necessary? Can it be pushed down the tree?
- [ ] **Screaming**: Does folder name describe *what* it does?
- [ ] **Colocation**: Are hooks/types/styles next to component?

## Server Actions Placement

```
app/
└── (feature)/
    ├── _actions/           # Feature-specific actions
    │   ├── create-item.ts
    │   └── delete-item.ts
    └── page.tsx
```

```typescript
// app/(feature)/_actions/create-item.ts
"use server";

export async function createItem(formData: FormData) {
  "use server";
  // Implementation
}

// Usage in component
import { createItem } from "../_actions/create-item";
```

## Shared vs Local Decision

```
src/
├── shared/
│   └── components/    # Used by 2+ features
│       ├── Button.tsx
│       ├── Modal.tsx
│       └── Input.tsx
└── app/
    └── (feature)/
        └── _components/  # Used only by this feature
            ├── FeatureCard.tsx
            └── FeatureList.tsx
```

## Commands

```bash
# Create new feature route group
mkdir -p app/\(new-feature\)/page.tsx

# Create private components folder
mkdir -p app/\(feature\)/_components

# Create server actions
mkdir -p app/\(feature\)/_actions
```

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]