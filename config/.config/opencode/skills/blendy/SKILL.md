---
name: blendy
description: "Trigger: blendy, element transition, morph animation, modal animation, expand animation, smooth transition, FLIP animation. Framework-agnostic tool that smoothly transitions one element into another (expanding/collapsing). Supports React, Vue, Svelte, vanilla JS."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
  library_version: "1.0.0"
  repo: "https://github.com/TahaSh/blendy"
  docs: "https://blendy.tahazsh.com"
---

## Installation

```bash
pnpm install blendy
```

CDN:
```html
<script src="https://unpkg.com/blendy/dist/blendy.min.js"></script>
```

## Core Concept: From → To Transitions via Data Attributes

Blendy morphs a **source element** into a **target element** using FLIP animations. Think button → modal, thumbnail → full image, list item → detail view.

```html
<!-- Source: the element you click to start the transition -->
<button data-blendy-from="my-id">
  <!-- ⚠️ MUST have a single child wrapper (div, span, etc.) -->
  <span>Open Modal</span>
</button>

<!-- Target: the element you transition to (can be anywhere in DOM) -->
<div class="modal" data-blendy-to="my-id">
  <!-- ⚠️ MUST have a single child wrapper -->
  <div>
    <h2>Modal Title</h2>
    <p>Modal content here...</p>
  </div>
</div>
```

- `data-blendy-from="uniqueId"` — source element
- `data-blendy-to="uniqueId"` — target element
- Same `id` connects the pair
- **Both MUST have exactly one child wrapper** — this is critical for proper scaling

## API

```typescript
import { createBlendy } from 'blendy'

// Create instance (can have multiple — one per page or per component)
const blendy = createBlendy({
  animation: 'dynamic'  // 'dynamic' | 'spring' (default: 'dynamic')
})

// OPEN / expand: morphs source → target
blendy.toggle('my-id')

// CLOSE / collapse: morphs target → source
// onDone fires AFTER animation completes — use to remove target from DOM
blendy.untoggle('my-id', () => {
  // Safe to hide/remove the target element here
  setShowModal(false)
})

// Re-scan DOM for new [data-blendy-from] elements (dynamic content)
blendy.update()
```

## Animation Types

| Value | Easing | Duration | Feel |
|-------|--------|----------|------|
| `dynamic` (default) | easeOutCubic | 450ms | Smooth, natural |
| `spring` | easeOutBack | 400ms | Bouncy overshoot |

## How It Works (FLIP)

1. Captures `from` element position/size
2. Captures `to` element position/size  
3. Inverts: sets `to` element to match `from` dimensions
4. Plays: animates both toward their natural positions simultaneously

The source element fades out while scaling/translating into the target's position.
The target element starts at source size and scales up.

## Framework Integration

### React (modal example)

```typescript
import { createBlendy } from 'blendy'
import { createPortal } from 'react-dom'

function App() {
  const blendyRef = useRef(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    blendyRef.current = createBlendy({ animation: 'dynamic' })
  }, [])

  return (
    <>
      {showModal && createPortal(
        <div data-blendy-to="modal">
          <div>
            <h2>Modal</h2>
            <button onClick={() => {
              blendyRef.current?.untoggle('modal', () => setShowModal(false))
            }}>Close</button>
          </div>
        </div>,
        document.body
      )}
      <button
        data-blendy-from="modal"
        onClick={() => {
          setShowModal(true)
          blendyRef.current?.toggle('modal')
        }}
      >
        <span>Open</span>
      </button>
    </>
  )
}
```

### Vue (modal example)

```vue
<script setup>
import { createBlendy } from 'blendy'
import { ref, onMounted } from 'vue'

const blendy = ref(null)
const showModal = ref(false)

onMounted(() => { blendy.value = createBlendy() })
</script>

<template>
  <Teleport to="body">
    <div v-if="showModal" data-blendy-to="modal">
      <div>
        <h2>Modal</h2>
        <button @click="blendy?.untoggle('modal', () => showModal = false)">
          Close
        </button>
      </div>
    </div>
  </Teleport>
  <button data-blendy-from="modal"
    @click="showModal = true; blendy?.toggle('modal')">
    <span>Open</span>
  </button>
</template>
```

### Svelte (modal example)

```svelte
<script>
  import { createBlendy } from 'blendy'
  import { onMount } from 'svelte'

  let blendy = null
  let showModal = false

  onMount(() => { blendy = createBlendy() })
</script>

{#if showModal}
  <div data-blendy-to="modal">
    <div>
      <h2>Modal</h2>
      <button on:click={() => blendy?.untoggle('modal', () => showModal = false)}>
        Close
      </button>
    </div>
  </div>
{/if}
<button data-blendy-from="modal"
  on:click={() => { showModal = true; blendy?.toggle('modal') }}>
  <span>Open</span>
</button>
```

## Common Patterns

### Pattern: Dynamic content (elements added after page load)

```typescript
// After inserting new [data-blendy-from] elements into DOM
blendy.update()
```

### Pattern: Multiple instances

```typescript
// One instance per isolated component
const pageBlendy = createBlendy()
const sidebarBlendy = createBlendy({ animation: 'spring' })
```

### Pattern: CSS preparation

```css
/* Target element should start hidden */
[data-blendy-to] {
  opacity: 0;
}
```

## Critical Rules

- ⚠️ **Both source and target MUST have exactly one child wrapper element** (a single div, span, etc.)
- Target must be in the DOM before calling `toggle()` — toggle won't insert it
- Use `untoggle` callback to safely remove target from DOM after animation
- `createBlendy()` is async internally (`requestAnimationFrame`) — safe to call toggle immediately after if you need to

## License

**MIT** — free for both open source and commercial use.
