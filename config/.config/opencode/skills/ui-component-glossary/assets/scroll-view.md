---
name: Scroll View (Scroller)
platform: macos
slug: scroll-view
tag: NSScrollView
url: https://namethatui.com/macos/scroll-view
source: NameThatUI (namethatui.com)
also_called: scrolling view, scroll container, scrollbar, NSScroller
---

# Scroll View (Scroller)

> Demo interactivo: https://namethatui.com/macos/scroll-view

**Plataforma:** macos · **Tag/API:** `NSScrollView` · **También llamado:** scrolling view, scroll container, scrollbar, NSScroller

## Descripción
A scroll view is a viewport onto content larger than the visible region. AppKit calls the bar at its edge a scroller: its draggable thumb is the knob and the track behind it is the knob slot. Modern overlay scrollers float above content and fade away, while legacy scrollers reserve permanent layout space.

## Si lo llamaste…
“the area you can scroll inside”“the scrollbar on the side of a mac window”“the little thumb you drag to scroll”“the track behind the scrollbar thumb”“the scrollbar that fades away until you scroll”“the rubber band bounce at the end of a list”
…you meant a scroll view (scroller).

## Anatomía — cada parte, nombrada
1. ScrollerNSScroller
The control most people call a scrollbar is formally a scroller in AppKit.
2. Scroller knob (thumb)NSScroller.knobProportion
“The little thumb you drag” is the scroller knob; its length reflects how much content is visible.
3. Knob slot (track)NSScroller.drawKnobSlot(in:highlight:)
The channel behind the knob is the knob slot, commonly called the scrollbar track.
4. Overlay vs. legacy scrollerNSScroller.Style
An overlay scroller fades over the content; a legacy scroller stays visible and takes up layout space.

## Prompt para IA (paste-ready)
Use a native Scroll View (NSScrollView; SwiftUI: ScrollView). In AppKit, call the edge control an NSScroller, with its draggable knob inside the knob slot; respect NSScroller.Style overlay versus legacy and preserve native scroll elasticity at the content boundaries.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS scroll view (NSScrollView, NSClipView). Rule out: content origin confusion because the document view is not flipped; overlay vs legacy scroller styles changing available width between users; the rubber-band overscroll disabled or doubled by elasticity settings; wheel events swallowed by a nested scroll view; scrollToVisible fighting responsive-scrolling prefetch. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSScrollView |  |
|--------|--------------------------------------------------------------------------------------------------|--|
| AppKit | NSScroller |  |
| SwiftUI | ScrollView |  |
| AppKit | NSClipView |  |

## Ver también
- [Sidebar (Source List)](https://namethatui.com/macos/sidebar) (macOS)
- [Outline View](https://namethatui.com/macos/outline-view) (macOS)
- [Column View (Browser)](https://namethatui.com/macos/column-view) (macOS)
