---
name: redesign-skill
description: Audit existing project UI first, then fix layout, spacing, hierarchy, and styling. For upgrading legacy projects.
---

# Redesign Skill - Existing Projects

## WORKFLOW

### Phase 1: Audit (MANDATORY)
Before writing ANY code, audit the existing project:

1. **Scan all pages/components** - What exists?
2. **Identify design debt** - What's broken?
3. **Rank issues** - What's most impactful?
4. **Plan fixes** - Where to start?

### Phase 2: Fix
After audit, fix in priority order:

1. Layout problems (centering, spacing)
2. Typography hierarchy (inconsistent sizes)
3. Color system (inconsistent palette)
4. Component inconsistencies
5. Add motion where missing

## AUDIT CHECKLIST

```
□ Layout: Centered? Consistent grid? Responsive?
□ Typography: Font consistency? Size hierarchy? Readability?
□ Colors: Single palette? Accent usage? Dark/light consistent?
□ Components: Consistent buttons? Cards? Forms?
□ Spacing: Consistent gaps? Padding? Margins?
□ Motion: Any animations? What patterns?
□ Accessibility: Contrast? Labels? Keyboard nav?
```

## FIX PRIORITY

### P0 (Critical - Do First)
- Broken layouts
- Unreadable text
- Inconsistent buttons
- Mobile breaks

### P1 (Important - Do Second)
- Typography hierarchy
- Color system cleanup
- Spacing consistency

### P2 (Polish - Do Third)
- Motion additions
- Micro-interactions
- Empty/loading states

## PATTERNS TO FIX

### Common Redesign Issues
```tsx
// BEFORE (bad)
<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
  <button>Click me</button>
</div>

// AFTER (good with taste-skill)
<div className="flex justify-center mt-5">
  <Button variant="primary">Click me</Button>
</div>
```

## DON'TS

- ❌ Don't rewrite everything (fix incrementally)
- ❌ Don't change design system without reason
- ❌ Don't add motion where existing works
- ❌ Don't break working functionality

## PRE-FLIGHT
- [ ] Audit complete
- [ ] Issues ranked
- [ ] Fix plan defined
- [ ] P0 fixes prioritized