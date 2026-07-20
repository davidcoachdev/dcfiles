---
name: Level Indicator
platform: macos
slug: level-indicator
tag: NSLevelIndicator
url: https://namethatui.com/macos/level-indicator
source: NameThatUI (namethatui.com)
also_called: level meter, capacity indicator, rating indicator, relevancy indicator
---

# Level Indicator

> Demo interactivo: https://namethatui.com/macos/level-indicator

**Plataforma:** macos · **Tag/API:** `NSLevelIndicator` · **También llamado:** level meter, capacity indicator, rating indicator, relevancy indicator

## Descripción
A level indicator shows a value inside a known range rather than the progress of an ongoing task. Its native styles cover continuous or segmented capacity bars, symbol-based ratings such as stars, and compact relevance meters. Warning and critical thresholds can change the capacity indicator's color as the value crosses them.

## Si lo llamaste…
“the row of stars for a rating”“the segmented bar showing disk capacity”“the little meter showing how strong a match is”“the bar that changes color at warning and critical levels”“mac gauge with tick marks and colored ranges”
…you meant a level indicator.

## Anatomía — cada parte, nombrada
1. Filled levelNSLevelIndicator.doubleValue
“The colored amount inside the little meter” is the filled level.
2. Warning thresholdNSLevelIndicator.warningValue
“The point where the meter changes to a warning color” is the warning threshold.
3. Critical thresholdNSLevelIndicator.criticalValue
“The point where the bar turns critical” is the critical threshold.
4. Rating symbolNSLevelIndicator.Style.rating
“Each star in the rating row” is a rating symbol in the level indicator.

## Prompt para IA (paste-ready)
Use an NSLevelIndicator with the style that matches the meaning: .continuousCapacity or .discreteCapacity for a bounded level, .rating for stars, or .relevancy for match strength. Configure warningValue and criticalValue for native threshold coloring; SwiftUI's nearest general equivalent is Gauge.

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my macOS level indicator (NSLevelIndicator). Rule out: the wrong style — continuous capacity vs discrete ticks vs rating stars are one class with different levelIndicatorStyle values; warning and critical thresholds recoloring the fill unexpectedly; isEditable letting clicks change the value when it should be display-only; value changes not animating because the cell redraws instantly. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| AppKit | NSLevelIndicator |  |
|--------|------------------------------------------------------------------------------------------------------|--|
| AppKit | NSLevelIndicator.Style |  |
| SwiftUI | Gauge |  |

## Ver también
- [Segmented Control](https://namethatui.com/macos/segmented-control) (macOS)
- [Focus Ring](https://namethatui.com/macos/focus-ring) (macOS)
- [Badge vs. Chip vs. Pill vs. Tag](https://namethatui.com/web/badge-chip-pill) (web)
