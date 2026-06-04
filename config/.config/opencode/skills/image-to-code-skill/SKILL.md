---
name: image-to-code-skill
description: Image-first pipeline - generate site references, analyze them, then implement the frontend to match.
---

# Image-to-Code Pipeline

## WORKFLOW (3 STEPS)

### Step 1: Generate Reference Images
Use imagegen-frontend-web or imagegen-frontend-mobile to create visual references.

### Step 2: Analyze Images
Study the generated images carefully:
- Identify layout patterns
- Note typography hierarchy
- Extract color palette
- Map component structure

### Step 3: Implement Frontend
Build the code matching the reference EXACTLY.

## ANALYSIS GUIDELINES

### Layout Analysis
- Grid structure (bento, masonry, split)
- Section hierarchy
- Spacing patterns
- Responsive behavior

### Visual Analysis
- Color palette (primary, accent, neutral)
- Typography (headings, body, sizes)
- Shadows and depth
- Border radius values

### Component Analysis
- What atoms/molecules/organisms?
- What are the states?
- What's the interaction model?

## IMPLEMENTATION RULES

### Match Exactness
- Replicate colors exactly
- Match typography sizes
- Copy spacing values
- Reproduce shadows

### Quality Standards
Use taste-skill standards for implementation quality (motion, performance, etc.)

## PROMPT TEMPLATE

```
Follow the image-to-code-skill:
1. Generate reference images using imagegen-frontend-web
2. Analyze the images for layout, colors, typography
3. Implement the frontend matching the reference exactly
```

## FORBIDDEN

- Ignoring image details
- Making up different colors
- Using different fonts than shown
- Simplifying complex layouts

## PRE-FLIGHT
- [ ] Images generated
- [ ] Analysis complete
- [ ] Implementation matches reference