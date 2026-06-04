---
name: swapy
description: "Trigger: swapy, drag-to-swap, reorder layout, drag swap, rearrange items. Framework-agnostic drag-to-swap library. Converts any layout into a drag-to-swap one. Supports React, Vue, Svelte, vanilla JS."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
  library_version: "1.0.5"
  repo: "https://github.com/TahaSh/swapy"
  docs: "https://swapy.tahazsh.com"
---

## Installation

```bash
pnpm install swapy
```

CDN:
```html
<script src="https://unpkg.com/swapy/dist/swapy.min.js"></script>
```

## Core Concept: Slots + Items via Data Attributes

```html
<div class="container">
  <div data-swapy-slot="foo">
    <div data-swapy-item="a">Content A</div>
  </div>
  <div data-swapy-slot="bar">
    <div data-swapy-item="b">
      Content B
      <div data-swapy-handle></div>  <!-- optional drag handle -->
    </div>
  </div>
</div>
```

- `data-swapy-slot="uniqueName"` — container that holds ONE item
- `data-swapy-item="uniqueName"` — draggable item inside a slot
- `data-swapy-handle` — optional child element: drag only from this handle
- `data-swapy-no-drag` — optional child element: dragging disabled from this

## createSwapy API

```typescript
import { createSwapy } from 'swapy'

const swapy = createSwapy(containerElement, {
  animation: 'dynamic',       // 'dynamic' | 'spring' | 'none'
  enabled: true,             // start enabled
  swapMode: 'hover',         // 'hover' | 'drop'
  dragOnHold: false,         // require click+hold before drag
  dragAxis: 'both',          // 'both' | 'x' | 'y'
  autoScrollOnDrag: false,   // scroll while dragging near edges
  manualSwap: false,         // framework dynamic use (React/Vue/Svelte)
})
```

## Events

```typescript
// Fires on every swap (on hover or drop, depending on swapMode)
swapy.onSwap((event) => {
  event.newSlotItemMap.asArray   // [{ slot, item }, ...]
  event.newSlotItemMap.asObject  // { slot: item, ... }
  event.newSlotItemMap.asMap     // Map { slot => item }
  event.oldSlotItemMap         // same formats
  event.fromSlot               // source slot id
  event.toSlot                 // target slot id
  event.draggingItem           // item being dragged
  event.swappedWithItem        // item it swapped with
})

// Fires ONCE when drag starts
swapy.onSwapStart((event) => {
  event.slotItemMap  // current map (asArray/asObject/asMap)
  event.fromSlot
  event.draggingItem
})

// Fires when drag session ends (drop)
swapy.onSwapEnd((event) => {
  event.slotItemMap   // final state
  event.hasChanged    // boolean: true if order changed
})

// Return true to allow swap, false to prevent
swapy.onBeforeSwap((event) => {
  event.fromSlot, event.toSlot, event.draggingItem, event.swapWithItem
  return event.toSlot !== 'locked-slot'  // example: prevent swap to specific slot
})
```

## Methods

```typescript
swapy.enable(false)     // disable dragging
swapy.enable(true)      // re-enable
swapy.update()          // re-instantiate after DOM changes (add/remove slots)
swapy.destroy()         // full cleanup
swapy.slotItemMap()     // get current SlotItemMap
```

## Styling

```css
[data-swapy-highlighted] {
  /* slot currently hovered by dragged item */
  background: rgba(255,255,255,0.2);
}

[data-swapy-dragging] {
  /* item currently being dragged */
  opacity: 0.6;
}
```

## Framework Integration

### React (static slots)

```typescript
import { createSwapy } from 'swapy'

function App() {
  const swapyRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      swapyRef.current = createSwapy(containerRef.current, {
        animation: 'dynamic'
      })
      swapyRef.current.onSwap(({ newSlotItemMap }) => {
        console.log(newSlotItemMap.asObject)
      })
    }
    return () => swapyRef.current?.destroy()
  }, [])

  return (
    <div ref={containerRef}>
      <div data-swapy-slot="a">
        <div data-swapy-item="a"><div>A</div></div>
      </div>
      <div data-swapy-slot="b">
        <div data-swapy-item="b"><div>B</div></div>
      </div>
    </div>
  )
}
```

### React (dynamic - items added/removed)

```typescript
import { createSwapy, utils } from 'swapy'

function App() {
  const [users, setUsers] = useState([...])
  const swapyRef = useRef(null)
  const containerRef = useRef(null)
  const [slotItemMap, setSlotItemMap] = useState(
    () => utils.initSlotItemMap(users, 'userId')
  )
  const slottedItems = useMemo(
    () => utils.toSlottedItems(users, 'userId', slotItemMap),
    [users, slotItemMap]
  )

  useEffect(() => {
    swapyRef.current = createSwapy(containerRef.current, { manualSwap: true })
    swapyRef.current.onSwap(({ newSlotItemMap }) => {
      setSlotItemMap(newSlotItemMap.asArray)
    })
    return () => swapyRef.current?.destroy()
  }, [])

  useEffect(() => {
    utils.dynamicSwapy(swapyRef.current, users, 'userId', slotItemMap, setSlotItemMap)
  }, [users])

  return (
    <div ref={containerRef}>
      {slottedItems.map(({ slotId, itemId, item: user }) => (
        <div key={slotId} data-swapy-slot={slotId}>
          <div key={itemId} data-swapy-item={itemId}>
            {user?.name}
          </div>
        </div>
      ))}
    </div>
  )
}
```

### Vue

```vue
<script setup>
import { createSwapy } from 'swapy'
import { ref, onMounted, onUnmounted } from 'vue'

const swapy = ref(null)
const container = ref(null)

onMounted(() => {
  swapy.value = createSwapy(container.value)
  swapy.value.onSwap(console.log)
})
onUnmounted(() => swapy.value?.destroy())
</script>
```

### Svelte

```svelte
<script>
import { createSwapy } from 'swapy'
import { onMount, onDestroy } from 'svelte'

let container, swapy

onMount(() => {
  swapy = createSwapy(container)
  swapy.onSwap(console.log)
})
onDestroy(() => swapy?.destroy())
</script>
```

## Utils (for dynamic/manualSwap)

```typescript
import { utils } from 'swapy'

// Initialize SlotItemMap from data array
utils.initSlotItemMap(items, idField)          // → SlotItemMapArray

// Convert SlotItemMap to slotted items for rendering
utils.toSlottedItems(items, idField, slotItemMap)  // → SlottedItems<Item>

// Handle add/remove in dynamic mode (call in useEffect/watch)
utils.dynamicSwapy(swapy, items, idField, slotItemMap, setSlotItemMap)
// 5th param removeItemOnly (boolean, default false): if true, clear item
// but keep slot on remove
```

## Animation Types

| Value | Effect |
|-------|--------|
| `dynamic` (default) | Smooth cubic easing, 300ms |
| `spring` | Bouncy back easing, 350ms |
| `none` | Instant, no animation |

## License

- Open source: **GPLv3**
- Commercial use (proprietary code): purchase commercial license at [swapy.tahazsh.com/license](https://swapy.tahazsh.com/license)
