---
name: Skeleton vs. Spinner
platform: web
slug: skeleton-spinner
tag: aria-busy="true"
url: https://namethatui.com/web/skeleton-spinner
source: NameThatUI (namethatui.com)
also_called: skeleton screen, placeholder loader, loading spinner, throbber
---

# Skeleton vs. Spinner

> Demo interactivo: https://namethatui.com/web/skeleton-spinner

**Plataforma:** web · **Tag/API:** `aria-busy="true"` · **También llamado:** skeleton screen, placeholder loader, loading spinner, throbber

## Descripción
A skeleton previews the geometry of content that has not arrived, reducing layout shift and making a predictable page feel faster. A spinner communicates an indeterminate wait when the eventual shape is unknown or the operation is detached from a specific layout. Neither should remain after the result or error state is available.

## Si lo llamaste…
“the grey shapes while content loads”“the pulsing placeholder version of a card”“the spinning circle while waiting”“fake text lines shown before data arrives”“loading animation in an empty area”
…you meant a skeleton vs. spinner.

## Anatomía — cada parte, nombrada
1. Skeleton blockSkeleton
“The grey shape standing in for a card or image” is a skeleton block.
2. Skeleton text lineSkeleton
“The fake grey line where text will appear” is a skeleton text line.
3. Shimmer sweep@keyframes
“The little glow moving across the placeholder” is the shimmer sweep.
4. Spinner track and arcrole="status"
“The faint circle and the darker bit spinning around it” are the spinner track and active arc.

## Prompt para IA (paste-ready)
Mark the loading region aria-busy="true" and use a skeleton when the final card layout is known, preserving its geometry while data arrives. Use a spinner with role="status" when the wait has no meaningful content shape, and replace either indicator when loading completes.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my skeleton/spinner (loading placeholders). Rule out: skeleton flashing for sub-200 ms loads — add an appearance delay; the shimmer looping forever because the error state never replaces it; skeleton shapes not matching real content so the swap causes layout shift; dozens of simultaneously animating placeholders janking scroll. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| ARIA | aria-busy="true" |  |
|------|------------------------------------------------------------------------------------------------------|--|
| shadcn/ui | Skeleton |  |
| ARIA | role="status" |  |

## Ver también
- [Empty State](https://namethatui.com/web/empty-state) (web)
- [Toast (Snackbar)](https://namethatui.com/web/toast) (web)
- [Focus Ring (:focus-visible)](https://namethatui.com/web/focus-ring-web) (web)
- [Text Scramble (Decode Effect)](https://namethatui.com/web/text-scramble) (web)
- [Card](https://namethatui.com/web/card) (web)
