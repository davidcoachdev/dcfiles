---
name: accessibility-auditor
description: >
  Accessibility expert for WCAG 2.2 compliance, screen reader testing, keyboard navigation,
  ARIA patterns, color contrast, and inclusive design auditing. Covers all four WCAG principles:
  Perceivable, Operable, Understandable, Robust.
  Trigger: When auditing accessibility, WCAG compliance, running a11y reviews, testing with
  screen readers, fixing keyboard navigation, or reviewing inclusive design.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "2.0"
---

## When to Use

- WCAG 2.1/2.2 compliance audits
- Screen reader testing (NVDA, VoiceOver, JAWS)
- Keyboard navigation testing
- ARIA pattern review
- Color contrast analysis
- Inclusive design reviews
- Pre-launch a11y sign-off

## WCAG 2.2 — Four Principles

| Principle | Meaning | Key categories |
|-----------|---------|----------------|
| **Perceivable** | Users can perceive the info | Text alternatives, time-based media, adaptable, distinguishable |
| **Operable** | Users can interact | Keyboard, time, seizures, navigation, input modalities |
| **Understandable** | Users can understand | Readable, predictable, input assistance |
| **Robust** | Works with assistive tech | Compatible |

Target: **WCAG 2.2 AA** (industry baseline). AAA is aspirational and not always feasible.

## Perceivable

### Text alternatives
- **Every `<img>` has `alt`** — descriptive for content, `alt=""` for decorative
- **Icon buttons** need `aria-label` or visually-hidden text
- **Complex images** (charts, diagrams) need long description

```html
<!-- Content image -->
<img src="chart.png" alt="Q3 revenue grew 23% YoY">

<!-- Decorative -->
<img src="ornament.png" alt="">

<!-- Icon button -->
<button aria-label="Close menu"><svg>...</svg></button>
```

### Color contrast (WCAG AA)
- **Normal text:** 4.5:1 minimum
- **Large text (18pt / 14pt bold):** 3:1 minimum
- **UI components & graphics:** 3:1
- Use WebAIM Contrast Checker or axe DevTools

### Don't rely on color alone
- Add icons, patterns, or text alongside color indicators
- Required for: errors, required fields, chart legends, status

### Time-based media
- **Video:** captions (open or closed)
- **Audio:** transcripts
- **Live video:** captions in real time

## Operable

### Keyboard
- **All functionality via keyboard.** No mouse-only interactions.
- **Logical tab order** matches visual order.
- **No keyboard traps** (focus can always escape).
- **Skip links** for repetitive content: `<a href="#main">Skip to main content</a>`

```css
/* Visible focus on all interactive elements */
:focus-visible {
  outline: 2px solid #4A90E2;
  outline-offset: 2px;
}
/* Never outline:none without replacement */
```

### Focus management
- **Modal opens → focus first interactive element** in modal
- **Modal closes → focus returns to trigger**
- **Dynamic content (route change) → focus new heading**
- **Single `tabindex="0"` per page** (in main content)

### Touch & pointer
- **Tap targets ≥ 44×44px** (WCAG 2.5.5 / 2.5.8)
- **Spacing:** at least 24px between targets when feasible
- **Pointer cancellation:** down-event doesn't trigger action, up-event does

### Motion & seizures
- **No flashing > 3 times/second**
- **Respect `prefers-reduced-motion`** for animations

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Time limits
- Users can extend/disable time limits
- No auto-advancing carousels without pause button
- Warning before timeout with option to extend

## Understandable

### Language
- **`<html lang="en">`** (or relevant language)
- **`<html lang="ar" dir="rtl">`** for RTL
- **`<span lang="es">hola</span>`** for inline foreign-language phrases

### Predictable
- **Consistent navigation** across pages
- **Consistent component behavior** (modal always Esc-closes, etc.)
- **No surprise context changes** on focus or input

### Form errors
- **Identify the field** with the error
- **Describe the error** in text (not just red color)
- **Suggest a fix** when possible
- **Associate with `aria-describedby`**

```html
<label for="email">Email</label>
<input id="email" type="email" 
       aria-describedby="email-error"
       aria-invalid="true">
<p id="email-error" role="alert">
  Please enter a valid email address (e.g., you@example.com)
</p>
```

### Labels & instructions
- **Every input has a label** (visible, not just placeholder)
- **Required fields marked** with `aria-required="true"` and visual indicator
- **Help text** linked via `aria-describedby`

## Robust

### Valid HTML
- **No duplicate IDs** in the document
- **Proper nesting** (no `<p>` inside `<button>`, etc.)
- **Closed elements** and quoted attributes

### ARIA — last resort, not first
- **Prefer native elements:** `<button>` over `<div role="button">`
- **ARIA roles match behavior** — `role="button"` must respond to Enter/Space
- **Name, role, value** — every interactive element has all three

```html
<!-- Bad -->
<div class="button" onclick="submit()">Submit</div>

<!-- Good -->
<button type="submit">Submit</button>
```

### Live regions
- **Status messages** (non-urgent): `aria-live="polite"`
- **Errors/alerts** (urgent): `role="alert"` or `aria-live="assertive"`
- **Loading states:** announce when complete

## Common Patterns

### Modal dialog
```html
<dialog id="confirm" aria-labelledby="title" aria-describedby="desc">
  <h2 id="title">Delete account?</h2>
  <p id="desc">This cannot be undone.</p>
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="confirm">Delete</button>
  </form>
</dialog>
```
- Focus trap inside
- Esc closes
- Focus returns to trigger on close
- `::backdrop` styled for visual dim

### Disclosure (show/hide)
```html
<button aria-expanded="false" aria-controls="menu">Menu</button>
<ul id="menu" hidden>
  <li><a href="/profile">Profile</a></li>
</ul>
```

### Tabs
Use ARIA Authoring Practices pattern — `role="tablist"`, `role="tab"`, `role="tabpanel"`, with arrow-key navigation.

## Testing Tools

| Tool | Purpose |
|------|---------|
| **axe DevTools** | Automated a11y audit (browser extension) |
| **Lighthouse a11y** | Quick automated check |
| **WAVE** | Visual overlay of issues |
| **NVDA + Firefox** | Screen reader (Windows, free) |
| **VoiceOver + Safari** | Screen reader (macOS/iOS, built-in) |
| **Color contrast analyzers** | WebAIM, Stark, TPGi |
| **Keyboard-only test** | Unplug mouse, navigate |

## Severity Levels

| Level | Examples |
|-------|----------|
| **Critical** | Form unusable, no keyboard access, missing form labels |
| **High** | Contrast failure, missing alt, no focus visible, ARIA misuse |
| **Medium** | Skip link missing, heading order skip, target too small |
| **Low** | Redundant title, lang missing on minor element |

## Audit Output

```markdown
## A11y Audit Results

### Critical (X)
- Form fields without labels — `path/form.jsx:42`
  - Impact: Screen reader users can't identify fields
  - Fix: Add `<label for="email">` with matching `id`

### High (X)
- Color contrast 2.8:1 (needs 4.5:1) — `path/button.css`
  - Impact: Low-vision users can't read
  - Fix: Change text color to #1F2937

### Summary
- Perceivable: 3 issues
- Operable: 2 issues
- Understandable: 0 issues
- Robust: 1 issue
```

## Related Skills

- `web-quality-audit` — full audit orchestrator
- `web-quality-best-practices` — UX patterns that include a11y
