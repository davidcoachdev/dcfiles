---
name: opentui
description: >
  Terminal UI library written in Zig with TypeScript bindings.
  Trigger: When building TUIs, terminal interfaces, or using OpenTUI with React/Solid.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Building terminal user interfaces (TUIs) in TypeScript
- Creating CLI tools with rich UI (like htop, lazygit)
- TUI dashboards, editors, or interactive terminal apps
- Using React or SolidJS for terminal UIs
- Any terminal-based application with mouse/keyboard interaction

## Installation

```bash
# TypeScript/JavaScript
bun install @opentui/core

# Or with npm
npm install @opentui/core
```

## Quick Start

```typescript
import { createCliRenderer, Text } from "@opentui/core"

const renderer = await createCliRenderer()

renderer.root.add(
  Text({
    content: "Hello, OpenTUI!",
    fg: "#00FF00",
  })
)
```

## Core Components

### Text

```typescript
import { Text } from "@opentui/core"

Text({
  content: "Hello World",
  fg: "#00FF00",         // foreground color
  bg: "#000000",         // background color
  bold: true,           // bold text
  italic: true,         // italic text
  underline: true,       // underline
})
```

### Box (Container)

```typescript
import { Box, Text } from "@opentui/core"

Box({
  width: 100,           // or "100%", "auto"
  height: "100%",
  flexDirection: "row", // "column" | "row"
  gap: 2,               // gap between children
  padding: 4,
  margin: 2,
  backgroundColor: "#1a1b26",
  borderStyle: "round",  // "round" | "single" | "double"
}, 
Text({ content: "Content" })
)
```

### Input

```typescript
import { Input } from "@opentui/core"

const input = Input({
  placeholder: "Type something...",
  width: 30,
  value: "",
  onChange: (value) => console.log(value),
})

input.focus()
```

### Select

```typescript
import { Select } from "@opentui/core"

Select({
  options: [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
  ],
  defaultValue: "1",
  onChange: (value) => console.log(value),
})
```

### ScrollBox

```typescript
import { ScrollBox, Text } from "@opentui/core"

ScrollBox({
  width: 50,
  height: 20,
  showScrollbar: true,
}, 
Text({ content: "Long content..." })
)
```

### Code (with syntax highlighting)

```typescript
import { Code } from "@opentui/core"

Code({
  code: `function hello() {
  console.log("Hello");
}`,
  language: "typescript",  // or "javascript", "rust", "python", etc.
  width: "100%",
  height: "100%",
})
```

### Diff

```typescript
import { Diff } from "@opentui/core"

Diff({
  oldCode: "const a = 1;",
  newCode: "const a = 2;",
  language: "typescript",
})
```

## Layout System (Flexbox)

```typescript
import { Box } from "@opentui/core"

// Row layout with sidebar
Box(
  { 
    width: "100%", 
    height: "100%", 
    flexDirection: "row", 
    gap: 2 
  },
  Box(
    { flexGrow: 1, backgroundColor: "#1a1b26" },
    Text({ content: "Sidebar" })
  ),
  Box(
    { flexGrow: 3, backgroundColor: "#24283b" }, 
    Text({ content: "Main" })
  )
)

// Center content
Box({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}, Text({ content: "Centered" }))
```

## Keyboard Handling

```typescript
import { Box, Input } from "@opentui/core"

// Global keyboard handler
Box({
  width: "100%",
  height: "100%",
  onKeyDown: (key) => {
    if (key === "q") {
      // Quit
    }
    if (key === "ctrl-c") {
      // Handle Ctrl+C
    }
  },
})
```

## Focus Management

```typescript
import { Input, Button } from "@opentui/core"

// Tab navigation between elements
const input = Input({ placeholder: "Name" })
const button = Button({ label: "Submit" })

// Focus next on Enter
input.onKeyDown = (key) => {
  if (key === "Enter") {
    button.focus()
  }
}
```

## React Integration

```typescript
import { createRenderer } from "@opentui/react"

function App() {
  return (
    <Box width="100%" height="100%">
      <Text>Hello React!</Text>
    </Box>
  )
}

const renderer = createRenderer(<App />)
renderer.mount()
```

## SolidJS Integration

```typescript
import { createRenderer } from "@opentui/solid"

function App() {
  return (
    <Box width="100%" height="100%">
      <Text>Hello Solid!</Text>
    </Box>
  )
}

const renderer = createRenderer(<App />)
renderer.mount()
```

## Animations

```typescript
import { Timeline, Text } from "@opentui/core"

const timeline = new Timeline()

timeline.add(
  Text({ content: "Fade in" }),
  { opacity: { from: 0, to: 1 }, duration: 300 }
)

timeline.play()
```

## CLI Commands

```bash
# Create new TUI app
bun create tui

# Run examples
cd packages/core
bun run src/examples/index.ts

# Install system dependencies (Linux/macOS)
curl -fsSL https://raw.githubusercontent.com/anomalyco/opentui/main/packages/core/src/examples/install.sh | sh
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENTUI_LOG` | Log level | `info` |
| `OPENTUI_THEME` | Color theme | `default` |
| `OPENTUI_FONT` | Font family | `monospace` |

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]

## Packages

| Package | Description |
|---------|-------------|
| `@opentui/core` | TypeScript bindings, imperative API |
| `@opentui/react` | React reconciler |
| `@opentui/solid` | SolidJS reconciler |

## Comparison: OpenTUI vs Ratatui

| Feature | OpenTUI | Ratatui |
|---------|---------|---------|
| Language | Zig (native) | Rust |
| TS Bindings | ✅ First-class | ❌ No |
| React/Solid | ✅ Built-in | ❌ No |
| Flexbox Layout | ✅ Yoga | ❌ Manual |
| Tree-sitter | ✅ Built-in | ❌ No |
| Animation API | ✅ Timeline | ❌ Basic |
| Learning Curve | Lower | Higher |