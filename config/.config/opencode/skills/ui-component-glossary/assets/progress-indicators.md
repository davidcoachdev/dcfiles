---
name: Progress Ring vs. Spinner vs. Progress Bar
platform: web
slug: progress-indicators
tag: <progress>
url: https://namethatui.com/web/progress-indicators
source: NameThatUI (namethatui.com)
also_called: circular progress indicator, loading spinner, determinate progress indicator, linear progress indicator
---

# Progress Ring vs. Spinner vs. Progress Bar

> Demo interactivo: https://namethatui.com/web/progress-indicators

**Plataforma:** web · **Tag/API:** `<progress>` · **También llamado:** circular progress indicator, loading spinner, determinate progress indicator, linear progress indicator

## Descripción
A spinner loops without showing how much work remains. A determinate progress ring fills an arc around a circle, while a linear progress bar fills across a track; both represent a known value. A percentage label can make that value exact, but it must agree with the indicator's accessible progress value.

## Si lo llamaste…
“that circle for the countdown, that circle that gets filled up”“the actual circular progress bar”“the menu bar like ring getting filled up”“the ring that fills up”“the spinning circle while it loads”“the bar that shows how far along it is”
…you meant a progress ring vs. spinner vs. progress bar.

## Anatomía — cada parte, nombrada
1. Indeterminate spinnerrole="progressbar"
The spinning circle that keeps looping is an indeterminate spinner: it says work is happening, not how much is left.
2. Determinate progress ringaria-valuenow
“The ring that fills up” is a determinate progress ring: its circular arc represents a known completion value.
3. Linear progress bar
The bar that fills from one side to the other is a linear progress bar; use `progress` when its value is known.
4. Progress track
The unfilled rail behind a progress ring or bar is the track; it shows the indicator's full range.
5. Percentage labelaria-valuenow
The number beside or inside the indicator is the percentage label, a readable statement of the current progress value.

## Prompt para IA (paste-ready)
Use the correct Progress Indicator: an indeterminate spinner when the remaining work is unknown, a determinate progress ring when a compact circular arc should fill toward completion, or an HTML `progress` linear bar when there is room for a readable track. For a custom indicator use role="progressbar" with aria-valuenow, and expose any visible percentage as the same accessible value; SwiftUI's cousin is ProgressView.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my progress indicator (role=progressbar, aria-valuenow, spinner). Rule out: an indeterminate spinner where a determinate bar was possible (or vice versa); the bar width not animating because the transition is on the wrong property; the loading flag stuck true so the spinner never stops; aria-valuenow never updating so assistive tech hears 0 percent forever. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| HTML | `progress` |  |
|------|------------------------------------------------------------------------------------------------|--|
| SwiftUI | ProgressView |  |
| ARIA | role="progressbar" |  |
| ARIA | aria-valuenow |  |

## Ver también
- [Skeleton vs. Spinner](https://namethatui.com/web/skeleton-spinner) (web)
- [Marquee](https://namethatui.com/web/marquee) (web)
