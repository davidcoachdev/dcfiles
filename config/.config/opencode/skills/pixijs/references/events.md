# Events — PixiJS v8 (federated event system)

PixiJS mirrors DOM events on the scene graph. Set `eventMode`, then listen with `.on()`, `addEventListener()`, or the `onEventName` property.

## eventMode

| Value | Meaning |
|---|---|
| `none` | No interaction; interactive children also ignored |
| `passive` | Default. Self not interactive; interactive children still work |
| `auto` | Hit tested only when a parent is interactive |
| `static` | Standard interaction (buttons, UI, drag targets) |
| `dynamic` | Like `static`, plus synthetic events when the pointer is stationary over a moving object |

```ts
sprite.eventMode = 'static';
sprite.isInteractive(); // true
```

## Event types

- **Pointer (recommended, cross-device):** `pointerdown`, `pointerup`, `pointerupoutside`, `pointermove`, `pointerover`, `pointerout`, `pointerenter`, `pointerleave`, `pointertap`, `pointercancel`.
- **Mouse:** `mousedown`, `mouseup`, `mouseupoutside`, `mousemove`, `click`, `rightdown`, `rightup`, `rightclick`, `wheel`.
- **Touch:** `touchstart`, `touchend`, `touchendoutside`, `touchmove`, `touchcancel`, `tap`.

Move events fire only while the pointer is over the object. For dragging, use `globalpointermove` (fires regardless of hover).

## The event object

```ts
button.on('pointertap', (e) => {
  e.global;        // { x, y } in screen space
  e.getLocalPosition(button); // position relative to button
  e.target;        // the display object
  e.nativeEvent;   // underlying DOM event
});
```

## Cursor & hitArea

```ts
button.cursor = 'pointer';
button.cursorStyles = { pointer: 'grab' }; // override style per mode
button.hitArea = new Rectangle(0, 0, 100, 50); // constrain clickable region
container.interactiveChildren = false;          // skip children hit-testing (perf)
```

## Drag pattern

```ts
let dragging = false;
button.on('pointerdown', (e) => {
  dragging = true;
  button.on('globalpointermove', onMove);
});
function onMove(e) {
  button.parent.toLocal(e.global, undefined, button.position);
}
button.on('pointerup', endDrag);
button.on('pointerupoutside', endDrag);
function endDrag() {
  dragging = false;
  button.off('globalpointermove', onMove);
}
```

## Propagation

Events bubble (capture → target → bubble). Use `e.stopPropagation()` to halt bubbling. Attach capture-phase listeners with `button.on('pointerdowncapture', ...)`.

## Reduce event cost

Toggle `eventFeatures` at `app.init()` to disable unused subsystems (e.g. turn off `moveEventsWhenInside` if you only need taps). Fewer active event types = less per-frame work.
