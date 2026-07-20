---
name: Tabs
platform: web
slug: tabs
tag: role="tablist"
url: https://namethatui.com/web/tabs
source: NameThatUI (namethatui.com)
also_called: tabbed interface, tab list, tab bar
---

# Tabs

> Demo interactivo: https://namethatui.com/web/tabs

**Plataforma:** web · **Tag/API:** `role="tablist"` · **También llamado:** tabbed interface, tab list, tab bar

## Descripción
Tabs organize peer views into one shared region, with exactly one tab and panel active at a time. The selected label is visually persistent, often with an underline, and keyboard users move across the tab list with arrow keys. Use them for closely related views, not for a sequential workflow.

## Si lo llamaste…
“the row of labels that switches the panel below”“sections with an underline under the active one”“clickable headings for changing views”“the horizontal switcher above content”“browser tab style navigation inside a page”
…you meant a tabs.

## Anatomía — cada parte, nombrada
1. Tab listrole="tablist"
“The whole row of view-switching labels” is the tab list.
2. Active-tab indicatoraria-selected="true"
“The line that moves under the selected label” is the active-tab indicator.
3. Tab panelrole="tabpanel"
“The shared content area that changes below the labels” is the tab panel.

## Prompt para IA (paste-ready)
Build accessible Tabs with a role="tablist", one role="tab" marked aria-selected="true", and a matching role="tabpanel" connected with aria-controls and aria-labelledby. Keep only the active tab at tabindex="0", move between tabs with Left and Right Arrow, and switch the shared panel without navigating away.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my tabs (role=tablist/tab/tabpanel, roving tabindex). Rule out: every tab in the Tab order instead of one roving tabindex with arrow-key movement; panels missing aria-labelledby back-references; the active indicator not moving on resize because its position was measured once; panel state lost on switch because inactive panels unmount when they should hide. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| ARIA | role="tablist" |  |
|------|----------------------------------------------------------------------------------------------------|--|
| ARIA | role="tab" |  |
| ARIA | role="tabpanel" |  |
| Radix | Tabs |  |

## Ver también
- [Accordion (Disclosure)](https://namethatui.com/web/accordion) (web)
- [Toggle Group (Segmented Control)](https://namethatui.com/web/toggle-group) (web)
- [Segmented Control](https://namethatui.com/macos/segmented-control) (macOS)
- [Carousel](https://namethatui.com/web/carousel) (web)
- [Pagination](https://namethatui.com/web/pagination) (web)
