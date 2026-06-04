---
name: ratatui
description: >
  Rust TUI library for building terminal user interfaces.
  Trigger: When building TUI apps, terminal interfaces, or using ratatui in Rust.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Building terminal user interfaces in Rust
- Creating CLI tools with rich UI (like htop, lazygit)
- TUI dashboards, editors, or interactive CLI apps
- Any terminal-based application with mouse/keyboard interaction

## Critical Patterns

### 1. Basic Setup (Hello World)

```rust
use ratatui::{
    prelude::*,
    widgets::*,
    Frame, Terminal,
};
use std::io;

fn main() -> io::Result<()> {
    let terminal = Terminal::new(
        ratatui::backend::CrosstermBackend::new(std::io::stderr())
    )?;

    terminal.apply(|mut f| {
        let area = f.size();
        f.render_widget(Paragraph::new("Hello Ratatui!"), area);
    })?;

    Ok(())
}
```

### 2. Full Application Pattern

```rust
use ratatui::{
    prelude::*,
    widgets::*,
    Frame, Terminal,
};
use std::io;
use std::panic;

fn run() -> io::Result<()> {
    let mut terminal = Terminal::new(
        ratatui::backend::CrosstermBackend::new(std::io::stderr())
    )?;

    terminal.enter_application_mode()?;
    terminal.enable_mouse()?;

    loop {
        terminal.draw(|f| {
            let area = f.size();
            f.render_widget(
                Paragraph::new("Press q to quit")
                    .block(Block::border_set(symbols::box::EMPTY)),
                area,
            );
        })?;

        if let Event::Key(KeyEvent { code: KeyCode::Char('q'), .. }) =
            terminal.poll_event()?
        {
            break;
        }
    }

    terminal.exit_application_mode()?;
    Ok(())
}
```

### 3. Widget Composition

```rust
// Block - container with border
Block::border_set(symbols::box::ROUNDED)
    .title("Title")
    .title_alignment(Alignment::Center)

// Paragraph - text content
Paragraph::new("Text")
    .alignment(Alignment::Center)
    .style(Style::new().red().on_black())

// List - selectable items
List::new(vec![
    "Item 1",
    "Item 2",
])
.highlight_style(Style::new().underlined())

// Table - tabular data
Table::new(
    ["Col1", "Col2"],
    vec![
        Row::new(vec!["data1", "data2"]),
    ],
)
```

### 4. State Management

```rust
use std::sync::Mutex;

// App state wrapped in Mutex for safety
struct App {
    items: Vec<String>,
    selected: usize,
}

fn main() -> std::io::Result<()> {
    let app = Mutex::new(App {
        items: vec!["Item 1".into(), "Item 2".into()],
        selected: 0,
    });

    let mut terminal = Terminal::new(...)?;

    loop {
        terminal.draw(|f| {
            let app = app.lock().unwrap();
            let list = List::new(&app.items)
                .highlight_style(Style::new().reversed());
            f.render_widget(list, f.size());
        })?;
        // handle events updating app.selected
    }
}
```

### 5. Custom Widget

```rust
use ratatui::widgets::Widget;
use ratatui::buffer::Buffer;

struct MyWidget {
    title: String,
}

impl Widget for MyWidget {
    fn render(self, area: Rect, buf: &mut Buffer) {
        let title = Paragraph::new(self.title)
            .block(Block::border_set(symbols::box::ROUNDED));
        title.render(area, buf);
    }
}
```

## Common Imports

```rust
use ratatui::{
    prelude::*,      // Terminal, Frame, KeyEvent, etc.
    backend,         // CrosstermBackend, TermionBackend
    widgets,        // Block, Paragraph, List, Table
    symbols,        // box::*, line::*
    layout,         // Layout, Constraint, Direction
};

use ratatui::style::{Color, Modifier, Style};
use ratatui::text::Line;
```

## Features (Cargo.toml)

```toml
[dependencies]
ratatui = "0.28"

# Or minimal:
ratatui = { version = "0.28", default-features = false, features = [
    "bold",
    "color",
    "cursor",
    "macros",
    "mouse",
    "paragraph",
    "popup",
    "scrollbar",
    "table",
    "tabs",
    "widgets",
] }
```

## Commands

```bash
# Run example
cargo run --example hello-ratatui

# List examples
ls ~/.cargo/registry/src/*/ratatui-*/examples/

# Build
cargo build --release
```

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]