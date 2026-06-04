---
name: imagegen-frontend-mobile
description: Generates mobile app screens and flows - iOS, Android, cross-platform mockups with readable typography and coherent visual sets.
---

# ImageGen: Frontend Mobile

## OUTPUT
This skill generates **IMAGES only** (no code). Use with ChatGPT Images, Codex image mode, or any image-generating agent.

## PROMPT TEMPLATE

When using this skill, prompt the image generator:

```
Create a [iOS/Android/Cross-platform] mobile screen for [app type]:

- Style: [Clean / Dark mode / Glassmorphism / etc.]
- Screen: [Home / Detail / Form / Settings / etc.]
- Components: [Describe key UI elements]
- Typography: [iOS SF / Material / Custom]
- Mood: [Professional / Playful / Minimal / etc.]
```

## EXAMPLE PROMPTS

### iOS Home
```
iOS home screen for a finance tracking app. Clean white background,
iOS-style navigation bar at bottom with 4 tabs. Card-based feed.
Deep blue accent color. SF Pro typography. Premium, Apple-like quality.
```

### Android Settings
```
Android settings screen. Material Design 3 style. Dark theme.
Surface colors with elevation. List-based settings with icons.
Green accent for active states. Clean, functional, Google design language.
```

### Cross-platform Onboarding
```
Mobile onboarding flow (3 screens). First screen: welcome illustration
with headline and CTA. Clean, consistent style across screens.
Use Figma-style presentation. Modern, not generic.
```

## DESIGN REQUIREMENTS

### Mobile Considerations
- Touch-friendly tap targets (44pt minimum)
- Readable text on small screens
- Proper hierarchy despite limited space
- Navigation patterns (tab bar, hamburger, etc.)

### Platform Consistency
- iOS: SF typography, safe area, bottom home indicator
- Android: Material Design, system fonts
- Cross-platform: Clean middle-ground

### Cohesion
If generating multiple screens, they should:
- Have consistent color palette
- Use same typography scale
- Share component patterns
- Flow logically together

## USE WITH CODE

1. Generate screen set
2. Analyze for components needed
3. Build matching reference
4. Use image-to-code-skill if desired

## SCREEN TYPES TO GENERATE

- Home/Feed
- Detail/Product
- List/Collection
- Form/Input
- Profile/Settings
- Onboarding
- Empty states
- Error states

## FORBIDDEN

- ❌ Text too small to read
- ❌ Generic Android/iOS templates
- ❌ Inconsistent screens in a set
- ❌ Non-mobile layouts