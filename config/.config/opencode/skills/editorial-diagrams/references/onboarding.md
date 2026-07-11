# Onboarding

Extract brand colors and fonts from a URL and apply to style-guide.md.

## Flow

```
User: "onboard editorial-diagrams to https://yoursite.com"
AI:  → fetch homepage
     → extract palette (body bg, text, links, buttons)
     → extract fonts (h1, body, code)
     → map to semantic roles
     → show proposed diff
     → write to style-guide.md
```

## What Gets Extracted

| From | Becomes |
|---|---|
| `<body>` background | `paper` |
| Primary text color | `ink` |
| Secondary text | `muted` |
| Link/CTA color | `accent` |
| `<h1>` font | `title` |
| `<body>` font | `node-name` |
| `<code>` font | `sublabel` |

## Contrast Check

Before writing tokens, verify:
- `ink` on `paper` = WCAG AA (min 4.5:1)
- If fail → propose adjusted value with explanation

## Manual Override

Edit `style-guide.md` directly if preferred.

## First-Run Gate

On first diagram in new project, check if style-guide differs from defaults. If still default, prompt user as documented in SKILL.md.