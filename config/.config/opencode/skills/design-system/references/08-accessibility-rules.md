# Accessibility-First Design Rules

## Core Rules

### 1. Color Contrast

- **Normal text**: Minimum **4.5:1** contrast ratio
- **Large text** (≥24px regular or ≥18px bold): Minimum **3:1** contrast ratio
- WCAG 2.1 Level AA requirement

### 2. Touch Targets

- **Minimum 44x44px** for all interactive elements
- Applies to buttons, links, form controls, icons

### 3. Focus Indicators

- **Visible focus ring** on ALL interactive elements
- Never use `outline: none` without providing an alternative
- Use `:focus-visible` for keyboard-only focus styles

### 4. Motion

- Respect `prefers-reduced-motion` — disable animations for users who opt out
- Provide non-animated alternatives for critical information

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 5. Keyboard Navigation

- ALL interactive elements reachable via **Tab**
- ALL interactive elements activatable via **Enter** or **Space**
- Logical tab order follows visual order
- No keyboard traps

## Additional Guidelines

- Don't rely on color alone as an indicator (8% of men have color blindness)
- Use additional cues: underlines for links, icons, text labels
- If color is removed, interface must still be understandable
- Use semantic HTML elements (button, nav, main, etc.)
- Provide alt text on all images
- Use ARIA labels when semantic HTML is insufficient

## Sources

- [UX Architect — Accessibility Rules](https://github.com/gentleman-programming/opencode-skills)
- [WCAG 2.1 Level AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
