# React Navigation Shared Element Transitions

**Source:** https://reactnavigation.org/docs/shared-element-transitions/ (v7.x)

Shared Element Transitions animate elements between screens in React Navigation's native-stack. Implemented via `react-native-reanimated`.

> ⚠ Experimental — not recommended for production.

**Architecture support:**
- Reanimated 3: supports Old Architecture (Paper)
- Reanimated 4 (4.2.0+): supports New Architecture (Fabric) behind `ENABLE_SHARED_ELEMENT_TRANSITIONS` feature flag

## Prerequisites

- `@react-navigation/native-stack` (JS-based `@react-navigation/stack` NOT supported)
- `react-native-reanimated` v3.0.0+
- Reanimated 4 on New Arch: [enable feature flag](https://docs.swmansion.com/react-native-reanimated/docs/guides/feature-flags#enable_shared_element_transitions)

## Minimal Example

1. Use `Animated` from `react-native-reanimated`
2. Assign same `sharedTransitionTag` to matching elements across screens
3. Navigate — transition starts automatically

```tsx
// Screen A — large image
<Animated.Image
  source={{ uri: 'https://picsum.photos/id/39/200' }}
  style={{ width: 300, height: 300 }}
  sharedTransitionTag="tag"
/>

// Screen B — smaller image, same tag
<Animated.Image
  source={{ uri: 'https://picsum.photos/id/39/200' }}
  style={{ width: 100, height: 100 }}
  sharedTransitionTag="tag"
/>
```

`sharedTransitionTag` is unique per screen, matching across screens (analogous to React `key`).

## Customizing

Set `sharedTransitionStyle` with a `SharedTransition` config on matching elements.

### Reanimated 4 (New Architecture)

Only duration + springify via builder:

```tsx
const customTransition = SharedTransition.duration(550).springify();

<Animated.Image
  sharedTransitionTag="tag"
  sharedTransitionStyle={customTransition}
/>
```

Defaults: animates `width`, `height`, `originX`, `originY`, `transform`, `backgroundColor`, `opacity` with `withTiming` 500ms.

### Reanimated 3 (Old Architecture)

Full custom animation worklets via `SharedTransition.custom()`:

```tsx
const customTransition = SharedTransition.custom((values) => {
  'worklet';
  return {
    height: withSpring(values.targetHeight),
    width: withSpring(values.targetWidth),
    originX: withSpring(values.targetOriginX),
    originY: withSpring(values.targetOriginY),
  };
});

<Animated.Image
  sharedTransitionTag="tag"
  sharedTransitionStyle={customTransition}
/>
```

Defaults: animates `width`, `height`, `originX`, `originY`, `transform` with `withTiming` 500ms.

## Reference

Full API: [React Native Reanimated Shared Element Transitions](https://docs.swmansion.com/react-native-reanimated/docs/shared-element-transitions/overview/)

## Limitations

- Only native-stack navigator supported (no JS stack, drawer, bottom tabs)
- Native modals broken on iOS
- **Reanimated 4 only:** custom animation functions not supported (only duration + springify)
- Reanimated 4: `backgroundColor` unsupported in iOS back gesture (progress-based)
- Reanimated 4: performance bottlenecks with eager transform recalc
- Reanimated 4: iOS vertical positioning issues with header height propagation
