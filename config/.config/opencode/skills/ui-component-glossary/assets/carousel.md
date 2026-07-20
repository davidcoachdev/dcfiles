---
name: Carousel
platform: web
slug: carousel
tag: aria-roledescription="carousel"
url: https://namethatui.com/web/carousel
source: NameThatUI (namethatui.com)
also_called: slider, content slider, slideshow, image slider, swiper
---

# Carousel

> Demo interactivo: https://namethatui.com/web/carousel

**Plataforma:** web · **Tag/API:** `aria-roledescription="carousel"` · **También llamado:** slider, content slider, slideshow, image slider, swiper

## Descripción
“A card slider / carousel slider thing” is a carousel: a strip of slides you page through with arrow buttons or the little dots — the dots are officially the slide picker controls. If the strip scrolls by itself in an endless loop it's a marquee, and if clicking a thumbnail opens the image big over a darkened page that's a lightbox; a carousel stays in place and shows one slide at a time.

## Si lo llamaste…
“a card slider”“carousel slider thing”“the image slider with the little dots”“the banner that cycles through images”“three rotating images you can switch manually”“the slideshow you flick through sideways”
…you meant a carousel.

## Anatomía — cada parte, nombrada
1. Slidearia-roledescription="slide"
“Each of the cards you flick between” is a slide — one panel of the track, a role="group" whose position (“2 of 3”) is announced.
2. Previous / next controlsbutton aria-label="Next slide"
“The arrows on the sides” are the previous/next controls — real buttons that page the track exactly one slide.
3. Slide picker (the dots)role="tablist"
“The little dots under the slideshow” are the slide picker controls — one button per slide, the filled one marking the current slide; W3 C implements them as a tab list.

## Prompt para IA (paste-ready)
Build a carousel (content slider): a horizontal track of slides paged one at a time by previous/next buttons and slide picker dots, using scroll-snap-type: x mandatory or embla-carousel-react (what shadcn/ui's Carousel wraps). Wrap it in role="region" aria-roledescription="carousel"; each slide is a role="group" aria-roledescription="slide" with a position label like "2 of 3". No auto-rotation unless there is a visible pause control.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my carousel (embla-carousel-react / swiper / CSS scroll-snap). Rule out: slides overflowing because the track isn't display:flex with flex: 0 0 100% slides; scroll-snap fighting JS-driven transforms (pick ONE mechanism); the dots out of sync because the selected index listens to the wrong event; auto-rotation still running under prefers-reduced-motion or with no pause control; swipe dead because touch-action or pointer-events is blocked on the track. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| ARIA | aria-roledescription="carousel" | on a role="region" wrapper — the W3 C name for the pattern |
|------|---------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------|
| CSS | scroll-snap-type: x mandatory | the modern no-JS track |
| React | embla-carousel-react | what shadcn/ui's `Carousel` wraps |
| JS | swiper | the long-running library that popularized the pattern |

## Ver también
- [Marquee](https://namethatui.com/web/marquee) (web)
- [Lightbox](https://namethatui.com/web/lightbox) (web)
- [Tabs](https://namethatui.com/web/tabs) (web)
- [Pagination](https://namethatui.com/web/pagination) (web)
