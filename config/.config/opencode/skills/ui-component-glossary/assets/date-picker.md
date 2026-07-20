---
name: Date Picker
platform: web
slug: date-picker
tag: <input type="date">
url: https://namethatui.com/web/date-picker
source: NameThatUI (namethatui.com)
also_called: calendar picker, calendar popup, calendar dropdown, date range picker, month view
---

# Date Picker

> Demo interactivo: https://namethatui.com/web/date-picker

**Plataforma:** web · **Tag/API:** `<input type="date">` · **También llamado:** calendar picker, calendar popup, calendar dropdown, date range picker, month view

## Descripción
“The little calendar that pops up” on a date field is a date picker — the field is the trigger, the floating month is the calendar popover, and the grid of days is a role="grid" whose chosen day carries aria-selected. Pick two ends and it's a date-range picker: the first and last days are the range start and end (range_start / range_end in react-day-picker) and the tinted stripe between them is the in-range span (range_middle). A month grid standing alone is just a calendar; the picker is the one wired to a field.

## Si lo llamaste…
“calendar”“calendario”“date range filter calendar”“the little calendar that pops up”“pick a start and end date”“textbox with a calendar dropdown”
…you meant a date picker.

## Anatomía — cada parte, nombrada
1. Previous / next month buttonsbutton_previous / button_next
“The little arrows at the top of the calendar” are the previous/next month buttons — the icon inside each is officially the chevron.
2. Range start / endrange_start / range_end
“The first and last day you clicked” are the range endpoints — solid-filled cells marking where the selected range begins and ends.
3. In-range spanrange_middle
“The highlighted stripe between the two dates” is the in-range span — every day between the endpoints gets the range_middle modifier and the pale tint.
4. Today indicatortoday
“The outlined day that isn't selected” is the today indicator — it marks the current date independently of any selection.

## Prompt para IA (paste-ready)
Build a date picker: a date field that opens a calendar popover — the shadcn/ui pattern is Popover + Calendar, where Calendar wraps react-day-picker's DayPicker. For a date range use mode="range": the endpoints get the range_start / range_end modifiers and the tinted days between them are range_middle. Treat dates as civil dates (yyyy-mm-dd strings), never Date-parsed-as-UTC (the classic off-by-one-day bug); start the week per the locale; keep the grid keyboard model (arrows move by day and week, PageUp/PageDown by month).

### Debug prompt (cuando falla)
Paste this, then describe what you’re seeing — it hands your agent the classic failure modes to rule out first.
Debug my date picker (react-day-picker / `input` / range mode). Rule out: the selected day rendering one day off because a date-only string was parsed as UTC and displayed in local time; the wrong month because JavaScript Date months are 0-based; range endpoints silently swapped or end-before-start allowed after a typed edit; the week starting on the wrong day for the locale; the calendar popover clipped by an overflow container, transform ancestor, or viewport edge; arrow keys dead because the grid lost its roving tabindex. The symptom:

## En el código (codebase)
The exact names this thing goes by in code — each row is one framework’s word for it. Use the row that matches your project (or paste it into your prompt).
| HTML | `input` | the native control — its value is always yyyy-mm-dd |
|------|---------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| React | `DayPicker` | react-day-picker — what shadcn/ui's `Calendar` wraps |
| Web API | input.showPicker() | opens the native picker programmatically (needs a user gesture) |
| ARIA | role="grid" | the calendar grid; the chosen day carries aria-selected="true" |
| SwiftUI | .datePickerStyle(.graphical) | SwiftUI DatePicker's inline calendar style |

## Ver también
- [Form Field](https://namethatui.com/web/form-field) (web)
- [Popover vs. Dropdown Menu vs. Tooltip](https://namethatui.com/web/popover-dropdown-tooltip) (web)
- [Combobox (Autocomplete / Typeahead)](https://namethatui.com/web/combobox) (web)
