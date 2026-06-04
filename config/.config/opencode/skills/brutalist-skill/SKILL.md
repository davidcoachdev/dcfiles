---
name: brutalist-skill
description: "BETA" - Hard mechanical UI combining Swiss typographic print aesthetics with CRT terminal vibes. Sharp contrast, experimental layouts.
---

# Brutalist Skill ⚠️ BETA

## AESTHETIC
Swiss style + CRT terminal. Mechanical, raw, experimental. Not for everyone.

## DESIGN RULES

### Typography (SWISS)
- Bold, large headlines
- Tight tracking
- Mono for certain elements
- Classic Swiss fonts or heavygrotesque

### Colors (HIGH CONTRAST)
- Black and white primarily
- ONE harsh accent (red, electric blue, acid green, yellow)
- No subtle gradients
- High contrast always

### Layout (EXPERIMENTAL)
- Asymmetric
- Overlapping elements OK
- Grid-breaking allowed
- Raw positioning

### Borders (THICK)
- Thick black borders (2px, 3px)
- Sharp corners (small radius or none)
- Brutal dividers

## COMPONENT STYLE

### Cards
```tsx
// Bold, raw
<div className="border-3 border-black bg-white p-6">
  <h2 className="text-2xl font-bold tracking-tight mb-4">Title</h2>
  <p className="font-mono text-sm">Content</p>
</div>
```

### Buttons
```tsx
// Hard, impactful
<button className="border-2 border-black bg-black text-white px-6 py-3 font-bold hover:bg-white hover:text-black transition-colors">
  ACTION
</button>
```

### Backgrounds
```tsx
// Grid or scanline effects
<div className="bg-[url('/grid.svg')] bg-repeat">
  Content
</div>
```

## MOTION

- Sharp transitions (no soft springs)
- Blinking elements
- Glitch effects OK
- Mechanical feel

## FORBIDDEN (WITHIN THIS STYLE)

- Soft shadows → thick borders
- Subtle colors → high contrast
- Round corners → sharp
- Elegant → raw/mechanical

## WARNING

This style is BETA. Not all implementations will work. Test thoroughly.

## PRE-FLIGHT
- [ ] High contrast colors
- [ ] Thick borders
- [ ] Swiss typography
- [ ] Experimental layout