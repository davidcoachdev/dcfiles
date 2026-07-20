---
name: Disclosure Triangle
platform: macos
slug: disclosure-triangle
tag: NSOutlineView
url: https://namethatui.com/macos/disclosure-triangle
source: NameThatUI (namethatui.com)
also_called: disclosure control, outline disclosure button, expand-collapse triangle
---

# Disclosure Triangle

> Demo interactivo: https://namethatui.com/macos/disclosure-triangle

**Plataforma:** macos · **Tag/API:** `NSOutlineView` · **También llamado:** disclosure control, outline disclosure button, expand-collapse triangle

## Descripción
A disclosure triangle is the compact indicator beside an outline row or section label that reveals nested content. It points sideways while collapsed and rotates downward when expanded. NSOutlineView supplies disclosure controls for hierarchical rows, while DisclosureGroup provides the same expand-and-collapse pattern in SwiftUI.

## Si lo llamaste…
“the tiny triangle that opens a folder row”“little arrow that rotates when a section expands”“chevron beside a row with children”“small expand collapse arrow in an outline”“triangle next to a heading that shows more content”
…you meant a disclosure triangle.

## Anatomía — cada parte, nombrada
1. Disclosure indicatorNSButton.BezelStyle.disclosure
“The tiny triangle beside the row” is the disclosure indicator.
2. Collapsed stateDisclosureGroup.isExpanded
“The arrow pointing sideways before it opens” is the collapsed state.
3. Expanded stateDisclosureGroup.isExpanded
“The arrow rotated down after it opens” is the expanded state.

## Prompt para IA (paste-ready)
Use a native Disclosure Triangle for expandable rows: NSOutlineView for an outline hierarchy or SwiftUI DisclosureGroup for a standalone section. The small indicator must rotate between collapsed and expanded states while the row's children appear directly beneath it.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS disclosure triangle (NSButton .disclosure bezel, SwiftUI DisclosureGroup). Rule out: the isExpanded binding not actually driving the revealed content; several groups sharing one binding so they all toggle together; the triangle animating the wrong direction because state and rotation are set separately; baseline misalignment between the triangle and its label. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSOutlineView |  |
|--------|---------------------------------------------------------------------------------------------------|--|
| SwiftUI | DisclosureGroup |  |
| AppKit | NSButton.BezelStyle.disclosure | a standalone disclosure button style |

## Ver también
- [Sidebar (Source List)](https://namethatui.com/macos/sidebar) (macOS)
- [Accordion (Disclosure)](https://namethatui.com/web/accordion) (web)
- [Context Menu](https://namethatui.com/macos/context-menu) (macOS)
