---
name: Truncation (Ellipsis & Line Clamp)
platform: web
slug: truncation
tag: text-overflow: ellipsis
url: https://namethatui.com/web/truncation
source: NameThatUI (namethatui.com)
also_called: ellipsis, text overflow, line clamp, clamped text, truncated text
---

# Truncation (Ellipsis & Line Clamp)

> Demo interactivo: https://namethatui.com/web/truncation

**Plataforma:** web · **Tag/API:** `text-overflow: ellipsis` · **También llamado:** ellipsis, text overflow, line clamp, clamped text, truncated text

## Descripción
“The text that gets cut off with three dots” is truncation, and the dots are an ellipsis (…, one character — not three periods). End-of-line truncation is text-overflow: ellipsis; cutting after N lines is a line clamp; dots in the middle of a long filename are middle truncation — native on macOS, JS on the web. Don't confuse it with the ⋯ overflow menu button: same dots, completely different job.

## Si lo llamaste…
“the text gets cut off with three dots”“show only two lines then dot dot dot”“long file name with dots in the middle”“cut the title after one line instead of wrapping”“text fades out at the edge instead of dots”“title too long for the box”
…you meant a truncation (ellipsis & line clamp).

## Anatomía — cada parte, nombrada
1. End ellipsistext-overflow: ellipsis
“Dot dot dot at the end of the line” — only kicks in alongside overflow: hidden and white-space: nowrap.
2. Line clamp-webkit-line-clamp
“Show two lines then cut it off” is a line clamp — the ellipsis lands at the end of the last allowed line.
3. Middle truncationNSLineBreakMode.byTruncatingMiddle
“The dots in the middle of a long file name” keep both ends readable — native on macOS (.byTruncatingMiddle); on the web it takes JS.
4. Fade-out (soft truncation)mask-image
“The text fades out at the edge instead of dots” — a soft truncation done with a transparency mask, common in cards and code previews.

## Prompt para IA (paste-ready)
Truncate the text with CSS. Single line: overflow: hidden; white-space: nowrap; text-overflow: ellipsis. Multi-line: display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden (unprefixed line-clamp isn't safe in all browsers yet). Middle truncation that preserves the file extension needs JS on the web — on macOS it's lineBreakMode = .byTruncatingMiddle. For a soft fade-out instead of dots, use mask-image: linear-gradient(to right, black 70%, transparent).

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my text truncation (text-overflow ellipsis, line-clamp). Rule out: ellipsis needing all three of overflow hidden, white-space nowrap, and a real width constraint — in flex rows add min-width:0 to the shrinking child, that is the classic; multi-line needing -webkit-line-clamp with -webkit-box; middle truncation (file names) needing JS, CSS cannot do it; the full text unavailable because no title/tooltip reveals it. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| CSS | text-overflow: ellipsis |  |
|-----|-------------------------------------------------------------------------------------------------------------|--|
| CSS | -webkit-line-clamp |  |
| CSS | white-space: nowrap | required for single-line ellipsis |
| AppKit | NSLineBreakMode.byTruncatingMiddle | middle truncation is native on macOS |
| CSS | mask-image | the fade-out alternative |

## Ver también
- [The Three Dots (Overflow Menu)](https://namethatui.com/web/three-dots) (web)
- [Breadcrumbs](https://namethatui.com/web/breadcrumbs) (web)
- [Marquee](https://namethatui.com/web/marquee) (web)
- [Pagination](https://namethatui.com/web/pagination) (web)
