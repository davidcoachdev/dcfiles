---
name: minimalist-skill
description: Editorial product UI (Notion/Linear vibes). Restrained palette, crisp borders, clean structure.
---

# Minimalist Skill - Editorial UI

## AESTHETIC
Notion, Linear, Raycast, Arc Browser - clean, functional, editorial product design.

## DESIGN RULES

### Palette (RESTRAINED)
- Only grays/zincs/slates (no color or ONE very subtle accent)
- White background or very light gray
- Black/dark gray for primary text
- Medium grays for secondary

### Typography
- San-serif ONLY
- Geist or Inter (clean, readable)
- Smaller sizes than default (good for dense info)
- Tight tracking on headings

### Borders (CRISP)
- 1px borders, not shadows
- Subtle gray borders (`border-gray-200`)
- Consistent everywhere

### Layout
- Dense but organized
- Multi-column where appropriate
- Less whitespace than soft-skill
- Information-dense

## COMPONENT STYLE

### Cards (Minimal)
```tsx
// Border-based, not shadow-based
<div className="border border-gray-200 rounded-lg p-4">
  Content
</div>
```

### Buttons
```tsx
// Simple, minimal
<button className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800">
  Action
</button>
// or
<button className="px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-50">
  Secondary
</button>
```

### Inputs
```tsx
// Simple borders, no fancy styles
<input className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200" />
```

### Tables (Great for this style)
```tsx
// Clean table with borders
<table className="w-full">
  <thead className="border-b border-gray-200">
    <tr>
      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Name</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-100">
    <tr className="hover:bg-gray-50">
      <td className="py-3 px-4 text-sm">Data</td>
    </tr>
  </tbody>
</table>
```

## DIFFERENCES

| Aspect | taste-skill | minimalist-skill |
|--------|-------------|------------------|
| Cards | Shadows | Borders |
| Colors | 1 accent | Grays only |
| Spacing | More | Less (dense) |
| Feel | Creative | Functional |

## FORBIDDEN

- ❌ Shadows on cards (use borders)
- ❌ Colorful UI (grays only, or ONE subtle)
- ❌ Large whitespace
- ❌ Decorative elements
- ❌ Complex gradients

## SUITS

- Productivity tools
- Admin dashboards
- Developer tools
- Documentation sites
- Any "Notion-like" product

## PRE-FLIGHT
- [ ] Grayscale palette
- [ ] Border-based cards
- [ ] Crisp typography
- [ ] Dense but organized