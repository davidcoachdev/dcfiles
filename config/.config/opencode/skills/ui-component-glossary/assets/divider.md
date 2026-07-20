---
name: Divider vs. Separator vs. Rule
platform: web
slug: divider
tag: <hr>
url: https://namethatui.com/web/divider
source: NameThatUI (namethatui.com)
also_called: separator, rule, horizontal rule, visual divider
---

# Divider vs. Separator vs. Rule

> Demo interactivo: https://namethatui.com/web/divider

**Plataforma:** web · **Tag/API:** `<hr>` · **También llamado:** separator, rule, horizontal rule, visual divider

## Descripción
A horizontal rule marks a change of topic in content, so HTML gives it the semantic <hr> element. A separator divides groups of controls or regions and can use role="separator" when no native semantic element fits. If the line is only visual styling, it is a CSS border and should not be announced as an element. SwiftUI Divider and AppKit separator menu items are the familiar macOS cousins.

## Si lo llamaste…
“between those line breaks”“above that line break”“a vertical line break between those sections”“the line break divider between the actual kind of title and the download button”“maybe add a vertical line divider”“horizontal line thing”
…you meant a divider vs. separator vs. rule.

## Anatomía — cada parte, nombrada
1. Thematic break (horizontal rule)`hr`
“Above that line break” can mean a horizontal rule: an `hr` marking a real change of topic between sections of content.
2. Semantic separatorrole="separator"
“A vertical line break between those sections” is a semantic separator when it divides distinct regions or groups of controls.
3. Decorative CSS borderborder-block-start
“Maybe add a vertical line divider” can be only decoration; use a CSS border with no separator semantics when it conveys no structure.
4. macOS divider and separator itemDivider / NSMenuItem.separator()
In macOS UI, SwiftUI calls the visual line Divider, while a line between menu command groups is an NSMenuItem separator item.

## Prompt para IA (paste-ready)
Choose the correct Divider, Separator, or Rule: use HTML `hr` for a semantic thematic break in content, role="separator" for a structural boundary between groups of controls, and a CSS border such as border-block-start for a purely decorative line. On macOS, use SwiftUI Divider for a visual division or NSMenuItem.separator() between menu-item groups.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my divider (hr, role=separator, border utilities). Rule out: the hairline doubling or vanishing on fractional zoom because 1 px borders round differently; a decorative divider still announced by screen readers — decorative ones need aria-hidden, semantic ones role=separator; a flex parent stretching the divider when a fixed cross-size was intended; margin collapse eating the space around an hr. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| HTML | `hr` |  |
|------|------------------------------------------------------------------------------------------|--|
| ARIA | role="separator" |  |
| CSS | border-block-start | decorative only |
| SwiftUI | Divider |  |
| AppKit | NSMenuItem.separator() |  |

## Ver también
- [Menu Bar](https://namethatui.com/macos/menu-bar) (macOS)
- [Context Menu](https://namethatui.com/macos/context-menu) (macOS)
- [Split View](https://namethatui.com/macos/split-view) (macOS)
- [The Three Dots (Overflow Menu)](https://namethatui.com/web/three-dots) (web)
- [Sign-in Form](https://namethatui.com/web/sign-in-form) (web)
