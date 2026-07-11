# CSS Animations

Consolidated reference from [CSS Animations Module Level 1](https://drafts.csswg.org/css-animations/). Author-defined keyframe animations for UI motion.

## @keyframes Rule

```
@keyframes = @keyframes <keyframes-name> { <qualified-rule-list> }
<keyframes-name> = <custom-ident> | <string>
<keyframe-block> = <keyframe-selector># { <declaration-list> }
<keyframe-selector> = from | to | <percentage [0,100]>
```

- `from` = `0%`, `to` = `100%`; values outside `[0%, 100%]` invalid
- Missing `0%/from` → UA uses computed values; same for `100%/to`
- Duplicate name → last in document order wins; preceding ignored
- Names are case-sensitive (`foo` ≠ `FOO`)
- `<custom-ident>` excludes `none`; use `<string>` for reserved names like `"none"`, `"initial"`
- `!important` inside keyframes is invalid and ignored
- No percentage unit → invalid (`0` invalid, must be `0%`)

## Animation Model

- Animations add a specified value to the CSS cascade at the animations level
- Override all normal rules, overridden by `!important`
- Multiple animations on same property → last name in `animation-name` wins
- Applied animation with `forwards`/`both` fill acts as if `will-change` includes all animated properties
- Start time = when style applying animation AND matching `@keyframes` rule are both resolved
- `display: none` terminates running animation on element and descendants; restoring `display` restarts

## Animation Properties

All properties form a **coordinating list property group** with `animation-name` as the coordinating list base (analogous to `background-image` for `background-*`).

| Property | Values | Default |
|----------|--------|---------|
| `animation-name` | `none` \| `<keyframes-name>`# | `none` |
| `animation-duration` | `<time [0s,∞]>`# | `0s` |
| `animation-timing-function` | `<easing-function>`# | `ease` |
| `animation-iteration-count` | `infinite` \| `<number [0,∞]>`# | `1` |
| `animation-direction` | `normal` \| `reverse` \| `alternate` \| `alternate-reverse`# | `normal` |
| `animation-play-state` | `running` \| `paused`# | `running` |
| `animation-delay` | `<time>`# | `0s` |
| `animation-fill-mode` | `none` \| `forwards` \| `backwards` \| `both`# | `none` |

## Shorthand

```
animation: <duration> || <easing> || <delay> || <count> || <direction> || <fill-mode> || <play-state> || <name>
```

First `<time>` = duration, second `<time>` = delay. Order matters for disambiguation — keywords valid for other properties bind there first.

## fill-mode Behavior

| Mode | During delay | After end |
|------|-------------|-----------|
| `none` | No effect | No effect |
| `forwards` | — | Holds end values of last completed iteration |
| `backwards` | First keyframe value (per direction) | — |
| `both` | First keyframe | End values |

## direction Behavior

| Value | Odd iterations | Even iterations |
|-------|---------------|----------------|
| `normal` | Forward | Forward |
| `reverse` | Reverse | Reverse |
| `alternate` | Forward | Reverse |
| `alternate-reverse` | Reverse | Forward |

Iterations start counting from 1. Timing functions are reversed when direction is reversed.

## Zero-Duration Edge Cases

`animation-duration: 0s` + `animation-iteration-count: infinite` → treated as if finite, runs a 0s second. Events still fire. Fill-mode still applies.

## Events

| Event | Fires when | `elapsedTime` |
|-------|-----------|---------------|
| `animationstart` | Start of animation (after delay) | `min(max(-delay, 0), active duration)` with negative delay |
| `animationend` | Animation finishes | Active duration |
| `animationiteration` | Each iteration end (except last) | `current iteration × duration` |
| `animationcancel` | Stopped unexpectedly (display:none, name removed) | Seconds elapsed since start |

All events bubble, not cancelable. Context: `animationName`, `elapsedTime`, `pseudoElement`.

Event handlers: `onanimationstart`, `onanimationiteration`, `onanimationend`, `onanimationcancel` on elements, Document, and Window.

## Timing Functions per Keyframe

Set `animation-timing-function` inside a keyframe to control easing to the *next* keyframe in sorted order. Timing on `to`/`100%` is ignored.

## DOM Interfaces

```webidl
partial interface CSSRule {
    const unsigned short KEYFRAMES_RULE = 7;
    const unsigned short KEYFRAME_RULE = 8;
};

interface CSSKeyframeRule : CSSRule {
  attribute CSSOMString keyText;
  [SameObject, PutForwards=cssText] readonly attribute CSSStyleProperties style;
};

interface CSSKeyframesRule : CSSRule {
  attribute CSSOMString name;
  readonly attribute CSSRuleList cssRules;
  readonly attribute unsigned long length;
  getter CSSKeyframeRule (unsigned long index);
  undefined appendRule(CSSOMString rule);
  undefined deleteRule(CSSOMString select);
  CSSKeyframeRule? findRule(CSSOMString select);
};

interface AnimationEvent : Event {
  constructor(CSSOMString type, optional AnimationEventInit animationEventInitDict = {});
  readonly attribute CSSOMString animationName;
  readonly attribute double elapsedTime;
  readonly attribute CSSOMString pseudoElement;
};
```

- `appendRule` always appends, even if key already exists
- `deleteRule` deletes *last* declared match; no-op if not found
- `findRule` returns *last* declared match; selector must match exactly in count and order
- `findRule('from')` matches `0%`; `findRule('to')` matches `100%`

## Accessibility

WCAG 2.3 — Seizures: Do not design content that is known to cause seizures. Animations can create dynamically changing content that may trigger seizures in some users. Respect `prefers-reduced-motion`.

## Privacy & Security

No privacy or security concerns reported for this specification.

## Examples from Spec

### 1. Basic diagonal slide
```css
div {
  animation-name: diagonal-slide;
  animation-duration: 5s;
  animation-iteration-count: 10;
}
@keyframes diagonal-slide {
  from { left: 0; top: 0; }
  to   { left: 100px; top: 100px; }
}
```
Element moves from (0,0) to (100px,100px) over 5s, repeats 9 more times (10 total).

### 2. Keyframe cascade with duplicates
```css
@keyframes slide-right {
  from { margin-left: 0px; }
  50%  { margin-left: 110px; opacity: 1; }
  50%  { opacity: 0.9; }     /* second 50%, cascades with first */
  to   { margin-left: 200px; }
}
```
Equivalent combined: `50% { margin-left: 110px; opacity: 0.9; }`

### 3. Multi-keyframe wobble
```css
@keyframes wobble {
  0%   { left: 100px; }
  40%  { left: 150px; }
  60%  { left: 75px; }
  100% { left: 100px; }
}
```
Properties not specified in a keyframe → animation proceeds as if that keyframe didn't exist for that property (per-property keyframe sets).

### 4. Per-keyframe timing functions
```css
@keyframes bounce {
  from { top: 100px; animation-timing-function: ease-out; }
  25%  { top: 50px;  animation-timing-function: ease-in; }
  50%  { top: 100px; animation-timing-function: ease-out; }
  75%  { top: 75px;  animation-timing-function: ease-in; }
  to   { top: 100px; }
}
```

### 5. DOM manipulation
```css
@keyframes colorful-diagonal-slide {
  from { left: 0; top: 0; }
  10%  { background-color: blue; }
  10%  { background-color: green; }
  25%, 75% { background-color: red; }
  100% { left: 100px; top: 100px; }
}
```
```js
anim.deleteRule('10%');        // deletes LAST 10% rule (green)
var tenPercent = anim.findRule('10%'); // finds remaining (blue)
var red = anim.findRule('25%,75%');    // must use full selector
var from = anim.findRule('0%');        // matches `from`
var to   = anim.findRule('to');        // matches `100%`
```

## Design Notes

- Zero-duration (`0s`) still fires events and applies fill-mode
- `display: none` terminates animations on element and descendants
- Multiple animation names animate independently; last name wins for same property
- Negative delay starts animation mid-way; positive delay creates pause
- Active duration = `duration × iteration-count`
- Changing animation properties mid-run applies as if set from the beginning
- Printing: implementations may ignore animations on non-interactive media
- Use `animation: 3s none backwards` — note `none` binds to `animation-fill-mode` first, then `backwards` becomes the name

## Sources

- [CSS Animations Module Level 1](https://drafts.csswg.org/css-animations/) — Editor's Draft, January 2026
- [WCAG 2.0 Guideline 2.3 Seizures](https://www.w3.org/WAI/WCAG21/quickref/#seizures-and-physical-reactions)
- [CSS Easing Functions Level 1](https://drafts.csswg.org/css-easing-1/)
- [CSS Will Change](https://drafts.csswg.org/css-will-change-1/)
