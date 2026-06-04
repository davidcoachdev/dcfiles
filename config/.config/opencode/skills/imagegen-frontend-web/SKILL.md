---
name: imagegen-frontend-web
description: Generates website reference images - hero sections, landing pages, multi-section layouts with strong typography and anti-slop art direction.
---

# ImageGen: Frontend Web

## OUTPUT
This skill generates **IMAGES only** (no code). Use with ChatGPT Images, Codex image mode, or any image-generating agent.

## PROMPT TEMPLATE

When using this skill, prompt the image generator:

```
Create a modern website hero section following these design principles:

- Layout: [Asymmetric split / centered / left-aligned with image]
- Typography: Premium fonts (Geist, Satoshi, or Outfit), large headlines
- Colors: [Describe palette - neutral base + accent]
- Style: Clean, high-end, NOT generic AI template look

Section type: [Hero / Landing / Feature / Pricing / About / Contact]
Industry: [SaaS / Ecommerce / Portfolio / Startup / etc.]
Vibe: [Professional / Creative / Minimal / Bold]
```

## EXAMPLE PROMPTS

### SaaS Hero
```
Hero section for a developer tool. Dark theme with accent color (electric blue). 
Large bold headline, subtext, two CTA buttons. Abstract geometric background pattern.
Clean, modern, NOT generic "AI slop". Premium feel like Vercel/Linear landing pages.
```

### Portfolio
```
Minimal portfolio hero. White background, black text. Large typography name. 
Subtle photography. Clean grid of work samples below. Editorial style,
similar to Notion or Awwwards winners. Professional but distinctive.
```

### Ecommerce
```
Ecommerce landing page hero. Split layout - product image on right, 
headline and CTA on left. Soft shadows, warm color palette.
High-quality product shot with lifestyle feel. Trust signals below CTA.
```

## DESIGN REQUIREMENTS

### Anti-Slop Rules
- NO centered text-over-dark-image
- NO purple/blue gradient backgrounds
- NO Inter font (use premium alternatives)
- NO generic "3-card feature row"
- NO boring stock photos

### Strong Elements
- Asymmetric layouts
- Bold typography hierarchy
- Cohesive color system
- Thoughtful spacing
- Unique/artful composition

### Technical Quality
- Proper hierarchy (H1 vs H2 vs body)
- Readable typography at all sizes
- Good contrast
- Mobile considerations (can show responsive hints)

## USE WITH CODE

After generating images:
1. Analyze the images
2. Use image-to-code-skill to implement
3. Or manually build matching the reference

## FORBIDDEN PATTERNS (for image prompts)
- Generic "tech startup" look
- Purple/neon gradients
- Centered everything
- 3 equal columns
- Unsplash-style stock photos