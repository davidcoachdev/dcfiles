---
name: soft-skill
description: Polished, calm, expensive UI with softer contrast, premium fonts, whitespace, and spring motion. For "premium/expensive" feel products.
---

# Soft Skill - Premium Surface Design

## AESTHETIC GOAL
"Expensive," "calm," "premium" feel. Think high-end SaaS, luxury brands, editorial products.

## DESIGN RULES

### Contrast (LOW)
- Background: Off-white (#FAFAFA) or soft gray (#F5F5F5)
- Text: Never pure black (#000), use gray-700 (#374151) or gray-800 (#1F2937)
- Cards: White with subtle borders, NO heavy shadows

### Typography
- Font: Geist, Outfit, or Satoshi (elegant, not aggressive)
- Headlines: `tracking-tight`, lighter weights (400-500)
- Body: `leading-relaxed`, generous line-height

### Spacing (HIGH)
- More whitespace than default taste-skill
- Large gaps between sections
- Generous padding inside cards (p-8, p-10)
- "Gallery" feel - everything breathes

### Colors
- Neutral palette (gray, zinc, slate)
- ONE subtle accent (soft blue, soft green, or blush)
- NO saturated colors
- Subtle gradients OK (very subtle)

### Motion (SPRING)
- Spring physics everywhere: `type: "spring", stiffness: 80, damping: 20`
- Slower transitions (0.4s, not 0.2s)
- Gentle, not aggressive
- Floating navigation works well

## COMPONENT STYLE

### Cards
```tsx
// Soft card style
<div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
  Content
</div>
```

### Buttons
```tsx
// Subtle, not bold
<Button variant="secondary" className="rounded-full">
  Learn More
</Button>
```

### Shadows
```tsx
// Light diffusion, NOT heavy
shadow-[0_2px_8px_rgba(0,0,0,0.04)]
// or
shadow-[0_8px_30px_rgb(0,0,0,0.04)]
```

## DIFFERENCES FROM DEFAULT TASTE-SKILL

| Aspect | taste-skill | soft-skill |
|--------|-------------|------------|
| Contrast | Higher | Lower |
| Spacing | Normal | MORE |
| Shadows | Medium diffusion | Light/subtle |
| Motion | Medium spring | Softer spring |
| Colors | More saturated | More neutral |

## FORBIDDEN

- ❌ High contrast (black on white)
- ❌ Bold saturated colors
- ❌ Heavy shadows
- ❌ Aggressive motion
- ❌ Dense layouts
- ❌ Inter font (too "techy")

## PRE-FLIGHT
- [ ] Low contrast palette
- [ ] Generous spacing
- [ ] Subtle shadows
- [ ] Spring motion throughout