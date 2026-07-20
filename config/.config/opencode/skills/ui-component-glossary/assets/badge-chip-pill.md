---
name: Badge vs. Chip vs. Pill vs. Tag
platform: web
slug: badge-chip-pill
tag: Badge
url: https://namethatui.com/web/badge-chip-pill
source: NameThatUI (namethatui.com)
also_called: token, lozenge, capsule
---

# Badge vs. Chip vs. Pill vs. Tag

> Demo interactivo: https://namethatui.com/web/badge-chip-pill

**Plataforma:** web · **Tag/API:** `Badge` · **También llamado:** token, lozenge, capsule

## Descripción
A badge is a tiny count or status marker attached to another object. A chip is a compact interactive token that can be selected, edited, or removed; a pill describes the capsule shape rather than a strict behavior. A tag is usually non-interactive category metadata, so choose the term from its job rather than from rounded corners alone.

## Si lo llamaste…
“the little number bubble on an icon”“the rounded label with an x”“the capsule shaped status label”“the small category label on a card”“the removable filter bubble”“the little red dot on an icon”
…you meant a badge vs. chip vs. pill vs. tag.

## Anatomía — cada parte, nombrada
1. Badge anchorBadge
“The icon the little number bubble sits on” is the badge anchor.
2. Badge countBadge
“The tiny number inside the red bubble” is the badge count.
3. Chip remove button
“The little x inside the filter pill” is the chip's remove button.
4. Selected chip statearia-pressed
“The filter pill that stays filled after I click it” is the selected chip state.

## Prompt para IA (paste-ready)
Use a Badge for the compact unread count, a dismissible Chip for the active filter, a fully rounded Pill for short status text, and a Tag for category metadata. Use shadcn/ui Badge for the non-interactive labels and give any icon-only remove button an aria-label.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my badge/chip/pill. Rule out: unbounded counts blowing the layout instead of capping at 99+; the pill wrapping mid-label without white-space nowrap; a chip delete target far smaller than 24 px so taps miss; low-contrast fills failing in dark mode because the colors were not themed as a pair. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| shadcn/ui | Badge |  |
|-----------|-------------------------------------------------------------------------------------------|--|
| HTML |  | for a removable or selectable chip |
| ARIA | aria-label |  |

## Ver también
- [Dock Badge](https://namethatui.com/macos/dock-badge) (macOS)
- [Toggle Group (Segmented Control)](https://namethatui.com/web/toggle-group) (web)
- [Switch vs. Checkbox vs. Radio](https://namethatui.com/web/switch-checkbox-radio) (web)
