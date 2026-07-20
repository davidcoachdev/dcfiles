---
name: Card
platform: web
slug: card
tag: <Card>
url: https://namethatui.com/web/card
source: NameThatUI (namethatui.com)
also_called: tile, card component, content card, status card
---

# Card

> Demo interactivo: https://namethatui.com/web/card

**Plataforma:** web · **Tag/API:** `<Card>` · **También llamado:** tile, card component, content card, status card

## Descripción
“Those boxes on the dashboard” are cards, and every region of one has a name: the media on top, the header with the title, the body, the metadata row, and the footer with the actions. “Those cards have a massive chin” describes dead space above the footer — not a part, a sizing bug: when a grid stretches cards to equal height, an unpinned footer lets the gap collect there (margin-top: auto fixes it). Not the popup preview that appears over a link — that's a hover card.

## Si lo llamaste…
“status cards”“score card”“task card structure”“those cards have a massive chin”“the box with an image on top and text below”“the tiles on the dashboard”
…you meant a card.

## Anatomía — cada parte, nombrada
1. Card mediausa-card__media
“The picture that fills the top of the card” is the card media — an image slot that bleeds to the card's edges and shares its top corner radius.
2. Card headerCardHeader / CardTitle
“The bold heading inside the box” is the card header — the title, often with a small eyebrow label above it.
3. Card bodyCardContent
“The description text under the title” is the card body — the main content slot between the header and the footer.
4. Metadata row`time` + CardDescription
“The little gray text with the date and author” is the metadata row — the muted details line, usually with an avatar, date, or read time.
5. Card footerCardFooter
“The button area at the bottom” is the card footer — the actions row. Dead space collecting above it in equal-height grids is the “chin”; pin the footer with margin-top: auto.

## Prompt para IA (paste-ready)
Build a card component: an  (or shadcn/ui `Card`) with an opaque background, one border radius, and stacked slots — media image, header with title, body text, a metadata row, and a footer with the actions. Make the card display:flex column with margin-top:auto on the footer so equal-height cards in a grid never grow a gap of dead space above the footer.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my card component (shadcn/ui Card / .card / ). Rule out: the 'massive chin' — dead space above the footer because grid/flex stretches cards to equal height while the footer isn't pinned with margin-top:auto in a flex-column card; the media corner poking out because the image ignores the card's border-radius (overflow:hidden or matching radius on the image); the whole card wrapped in  with more links nested inside (invalid HTML); text touching the media because padding lives on the wrong slot. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| shadcn/ui | `Card` | with CardHeader / CardContent / CardFooter slots |
|-----------|--------------------------------------------------------------------------------------------|--------------------------------------------------|
| HTML |  | the semantic wrapper when the card stands alone |
| CSS | margin-top: auto | on the footer — THE fix for uneven card heights |
| Bootstrap | .card |  |

## Ver también
- [Bento Grid](https://namethatui.com/web/bento-grid) (web)
- [Masonry Layout (Pinterest Grid)](https://namethatui.com/web/masonry) (web)
- [Hover Card](https://namethatui.com/web/hover-card) (web)
- [Skeleton vs. Spinner](https://namethatui.com/web/skeleton-spinner) (web)
