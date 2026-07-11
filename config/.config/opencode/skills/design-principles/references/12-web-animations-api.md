# Web Animations API (WAAPI)

JavaScript API for the browser's animation engine. Declarative-like animations with imperative control. Spec: [Web Animations](https://drafts.csswg.org/web-animations/).

## Core Concept

Two models: **Timing Model** (time tracking) + **Animation Model** (visual change over time). Each document has a master `Document.timeline` from page load to infinity.

```
Timeline (DocumentTimeline) → Animation (player) → KeyframeEffect (DVD)
```

## Key Interfaces

### Animation
```js
const anim = new Animation(keyframeEffect, document.timeline);
// or shortcut:
const anim = element.animate(keyframes, options);
```

| Property | Type | Description |
|----------|------|-------------|
| `currentTime` | number \| null | Current time in ms |
| `playbackRate` | number | Speed (1 = normal, -1 = reverse) |
| `startTime` | number \| null | Scheduled start time |
| `playState` | "idle" \| "running" \| "paused" \| "finished" | Current state |
| `replaceState` | "active" \| "removed" \| "persisted" | Auto-removal status |
| `effect` | AnimationEffect \| null | The KeyframeEffect |
| `timeline` | AnimationTimeline \| null | Associated timeline |
| `finished` | Promise | Resolves on finish |
| `ready` | Promise | Resolves on ready |
| `overallProgress` | number (0–1) | Overall progress ratio |

| Method | Effect |
|--------|--------|
| `play()` | Start/resume |
| `pause()` | Suspend |
| `reverse()` | Play backward |
| `finish()` | Seek to end |
| `cancel()` | Abort and clear effects |
| `commitStyles()` | Write current state to `style` attribute |
| `persist()` | Prevent auto-removal |
| `updatePlaybackRate(rate)` | Smooth speed change |

| Event | Fires when |
|-------|-----------|
| `finish` | Animation completes |
| `cancel` | `cancel()` called or enters "idle" |
| `remove` | Auto-removed by browser |

### KeyframeEffect
```js
new KeyframeEffect(element, keyframes, options);
```

Options: `duration` (ms), `iterations` (number | `Infinity`), `easing`, `direction`, `fill`, `delay`, `endDelay`, `composite`.

### DocumentTimeline / ScrollTimeline / ViewTimeline
```js
document.timeline; // default timeline
new ViewTimeline({ subject: element, axis: "block" });
```

## Keyframe Formats

### Array format (canonical)
```js
element.animate([
  { opacity: 0, color: "white" },                    // offset: 0 (implied)
  { opacity: 0.1, color: "red", offset: 0.7 },        // explicit offset
  { opacity: 1, color: "black" },                     // offset: 1 (implied)
], 2000);
```

- `offset`: 0.0–1.0, ascending order, `null` = evenly spaced
- `easing`: per-keyframe easing to next keyframe
- `composite`: `replace` | `add` | `accumulate` | `auto`

### Object format (property arrays)
```js
element.animate({
  opacity: [0, 1],
  backgroundColor: ["red", "yellow", "green"],     // uneven lengths OK
  offset: [0, 0.8],                                 // applies to corresponding indices
  easing: ["ease-in", "ease-out"],
}, 2000);
```

### Implicit to/from keyframes
```js
// Single keyframe = end state, start inferred from current computed style
logo.animate({ transform: "translateX(300px)" }, 1000);
// Use offset: 0 to make it the start state
logo.animate({ transform: "translateX(300px)", offset: 0 }, 1000);
// Use offset: 0.5 to animate from current → 300px → back to current
logo.animate({ transform: "translateX(300px)", offset: 0.5 }, 1000);
```

## Element & Document Extensions

```js
element.animate(keyframes, options);       // Returns Animation
element.getAnimations();                   // Array of Animation on this element
document.getAnimations();                  // Array of all active animations
document.timeline;                         // DocumentTimeline
```

`animate()` options extras: `id` (string), `timeline` (AnimationTimeline), `rangeStart`, `rangeEnd` (scroll-driven).

## Timing Differences from CSS

| Concept | CSS | WAAPI |
|---------|-----|-------|
| Duration | `3s` | `3000` (ms) |
| Infinite | `infinite` | `Infinity` |
| Default easing | `ease` | `linear` |
| Property names | `background-color` | `backgroundColor` (camelCase) |
| `float` | `float` | `cssFloat` (reserved word) |
| `offset` | `offset` | `cssOffset` (keyframe offset conflict) |

## Auto-Removal of Filling Animations

Browser auto-removes finished animations to prevent memory leaks when ALL are true:
- Animation is filling (`forwards`, `backwards`, or `both`)
- Animation is finished
- Timeline is monotonically increasing
- Not controlled by declarative CSS
- Every styling effect is overridden by another animation

Call `anim.persist()` to prevent removal. `anim.replaceState` shows `"removed"` | `"persisted"` | `"active"`.

## Playback Control Patterns

```js
// Pause immediately after creation
const anim = element.animate(keyframes, 3000);
anim.pause();

// Click to play
element.addEventListener("click", () => anim.play());

// Slow all animations site-wide for accessibility
document.getAnimations().forEach(a => {
  a.updatePlaybackRate(a.playbackRate * 0.5);
});

// Set playhead to midpoint
anim.currentTime = anim.effect.getComputedTiming().duration / 2;

// Link animation durations
const childDuration = parentAnim.effect.getComputedTiming().duration / 2;
```

## Accessibility

Blinking/flashing animation affects ADHD, vestibular disorders, epilepsy, migraine. Always:
- Provide pause/disable mechanism
- Respect `prefers-reduced-motion`
- Use `updatePlaybackRate(0.5)` or `document.getAnimations()` to slow globally

## Sources

- [Web Animations API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [Using the Web Animations API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API)
- [Keyframe Formats - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats)
- [Web Animations API Concepts - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Web_Animations_API_Concepts)
- [WAAPI Tips - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Tips)
- [Element.animate() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate)
- [Animation Interface - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Animation)
