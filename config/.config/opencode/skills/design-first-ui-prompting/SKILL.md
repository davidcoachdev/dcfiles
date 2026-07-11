---
name: design-first-ui-prompting
description: >
  Design-first, spec-driven prompting for UI generation.
  Covers prompt structure, constraints, typography/spacing rules, iteration
  workflow, and negative prompts for consistent UI outputs with AI image/models.
  Trigger: When generating UI with AI image models, writing prompts for UI
  generation, or when you need consistent design outputs across multiple iterations.
license: Apache-2.0
metadata:
  author: gentleman-programming (inspired by MengTo/Skills)
  version: "1.0"
---

## When to Use

- Generating UI components or pages with AI image generation (Midjourney, DALL-E, etc.)
- Writing prompts for UI that need consistency across multiple outputs
- User wants "variants" not "rerolls" — systematic iteration
- Need to communicate design intent precisely to an AI

## Core Principle

**Prompt like a design system, not a wish.**

Don't describe what you want vaguely. Give a spec that constrains the output so consistently that "variants" become meaningful.

## Prompt Template (copy/paste and fill)

```text
GOAL
- What are we making? (landing page hero / onboarding / dashboard / carousel slide)
- Who is it for? (persona)
- What's the success criteria? (clarity, conversion, vibe)

FORMAT
- Size/aspect: (1080x1350, 1920x1080, etc.)
- Safe margins: (90px)

LAYOUT (wireframe in words)
- Grid: (Swiss 6-col, 12-col, custom)
- Placement: (type-left / image-right, centered, asymmetric)
- Hierarchy: H1 → subhead → body → CTA

TYPE SYSTEM
- Font vibe: (Söhne, Neue Haas, SF Pro, Canela, etc.)
- Weights: (H1 700, body 400)
- Leading: (tight for H1, readable for body)
- Tracking: (micro labels wider)

COLOR + MATERIAL
- Background: (hex or description)
- Text: (white/ivory/charcoal)
- One accent only: (cyan/lime/purple)
- Texture: (subtle grain, no plastic HDR)

IMAGERY / UI STYLE
- UI style: (minimal / glass / editorial / playful 3D)
- If photo: lighting + crop + texture rules
- If 3D: materials + lighting + softness

COPY (render EXACTLY — line by line)
- Line 1:
- Line 2:
- ...

CONSTRAINTS (change 1–2 things only per iteration)
- FONT: ___
- STYLE: ___
- MODE: ___

NEGATIVE PROMPT
- No logos, no watermarks
- No extra text beyond provided lines
- No gibberish typography
- No generic stock photos
- No floating UI elements not specified
```

## Iteration Rules

### 1. Lock One "System", Then Iterate with Variants
- **First output**: nail layout + hierarchy + copy
- **Variants**: change ONE variable at a time:
  - angle / crop
  - accent color
  - card arrangement
  - background tone

### 2. Treat Typography as Fragile
If the model keeps misspelling or making up text:
- **2-pass workflow**: 
  1. Generate the visual WITHOUT text (reserve a clean text-safe area)
  2. Typeset in Figma (or add text manually in code)

### 3. Use "Constraints Cards"
When you want the model to obey a style:
- Add a small "Constraints" block with explicit values
- It anchors the output like a mini style guide

```text
Constraints
FONT   CANELA
STYLE  MINIMAL
MODE   DARK
```

### 4. Keep a Local Reference Pack
Don't ask the model to "remember" taste from previous outputs.
- Save references into a local folder
- Point prompts to the reference style explicitly

## Fast Iteration Checklist (what to tweak)
- ✓ Spacing: margins, leading, baseline rhythm
- ✓ Contrast: background vs text
- ✓ Hierarchy: one hero line, one support line
- ✓ One accent only (don't rainbow)
- ✓ Texture: add grain, remove smoothing

## Questions to Ask (when user is vague)
- What's the single message of this screen?
- What's the hierarchy (H1 / sub / CTA)?
- Which style lane: minimal editorial vs playful 3D vs glass UI?
- Any must-keep constraints (font vibe, color, spacing, grid)?

## Common Pitfalls
- Changing everything at once between iterations (can't isolate what worked)
- No negative prompts (model invents unwanted elements)
- Vague typography instructions (model makes up text)
- Too many accent colors (rainbow effect)
- No constraints on imagery style (mismatched photo styles)
