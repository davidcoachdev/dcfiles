---
name: design-system-picker
description: >
  Integrates awesome-design-md repository to apply professional design systems to projects.
  Trigger: When starting UI work, creating components, or needing consistent design patterns.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Starting a new project that needs professional UI
- Creating components or pages with consistent styling
- User asks for specific brand aesthetics (Stripe, Linear, Notion, etc.)
- Need to establish a design system for AI-generated UI
- Want pixel-perfect recreation of popular website styles

## Critical Patterns

### 1. Always Fetch DESIGN.md First
Before generating any UI components, download the appropriate DESIGN.md file:

```bash
# Download specific design system
curl -o DESIGN.md https://getdesign.md/{brand}/design-md

# Examples:
curl -o DESIGN.md https://getdesign.md/stripe/design-md
curl -o DESIGN.md https://getdesign.md/linear.app/design-md
curl -o DESIGN.md https://getdesign.md/notion/design-md
```

### 2. Reference DESIGN.md in All UI Generation
Always tell the AI to use the DESIGN.md file:
- "Generate a pricing page following the DESIGN.md specifications"
- "Create components that match the design system in DESIGN.md"
- "Use the color palette and typography defined in DESIGN.md"

### 3. Popular Design Systems by Use Case

| Use Case | Recommended System | Characteristics |
|----------|-------------------|-----------------|
| SaaS Dashboard | Linear, Notion | Minimal, clean, developer-focused |
| Landing Page | Stripe, Framer | Premium, gradient-rich, marketing |
| E-commerce | Shopify, Airbnb | Product-focused, photography-driven |
| Developer Tools | Vercel, Cursor | Dark themes, code-centric |
| Fintech | Stripe, Revolut | Trust-focused, precise, professional |
| Creative/Agency | Clay, Figma | Playful, colorful, artistic |

## Code Examples

### Downloading and Using a Design System

```bash
# 1. Choose and download design system
curl -o DESIGN.md https://getdesign.md/stripe/design-md

# 2. Verify it's downloaded
ls -la DESIGN.md

# 3. Generate UI with reference
# Tell AI: "Create a pricing component using the Stripe design system in DESIGN.md"
```

### Integration with Project Structure

```
project/
├── DESIGN.md           # Design system specification
├── src/
│   ├── components/     # Generated components following DESIGN.md
│   └── pages/         # Pages using the design system
└── README.md
```

## Commands

```bash
# Popular design systems - copy one of these:

# Minimal & Clean
curl -o DESIGN.md https://getdesign.md/linear.app/design-md
curl -o DESIGN.md https://getdesign.md/notion/design-md

# Premium & Marketing
curl -o DESIGN.md https://getdesign.md/stripe/design-md
curl -o DESIGN.md https://getdesign.md/framer/design-md

# Developer Tools
curl -o DESIGN.md https://getdesign.md/vercel/design-md
curl -o DESIGN.md https://getdesign.md/cursor/design-md

# E-commerce
curl -o DESIGN.md https://getdesign.md/shopify/design-md
curl -o DESIGN.md https://getdesign.md/airbnb/design-md

# Creative & Playful
curl -o DESIGN.md https://getdesign.md/figma/design-md
curl -o DESIGN.md https://getdesign.md/clay/design-md

# View available systems
curl -s https://api.github.com/repos/VoltAgent/awesome-design-md/contents/design-md | grep '"name"'
```

## Workflow

1. **Identify Project Type**: Determine what kind of UI you're building
2. **Choose Design System**: Pick from the table above based on use case
3. **Download DESIGN.md**: Use curl command to fetch the file
4. **Generate Components**: Reference DESIGN.md in all AI prompts
5. **Maintain Consistency**: Keep using the same DESIGN.md throughout the project

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]