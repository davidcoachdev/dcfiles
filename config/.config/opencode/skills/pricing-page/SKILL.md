---
name: pricing-page
description: >
  Design and build high-converting SaaS pricing pages.
  Covers plan structure, copywriting, layout patterns, anchoring strategies,
  FAQ objection handling, SEO/AEO, and experiments. Trigger: When designing,
  building, or rewriting a pricing page, or when the user asks for a pricing
  table or plans section.
license: Apache-2.0
metadata:
  author: gentleman-programming (inspired by MengTo/Skills)
  version: "1.0"
---

## When to Use

- Building or redesigning a pricing page for a SaaS product
- User says "make a pricing page" without specifics
- Need to structure plans, tiers, and feature comparisons
- Handling objections like "too expensive" or "what plan do I need"

## Core Concept

Your job is NOT to "show prices."
Your job is to **reduce uncertainty** and help visitors **choose and feel good about it**.

## Before You Start — Gather These

### Offer + Audience
- What are you selling? (category)
- Who's the ICP + primary use case?
- What's the main value metric? (seat, usage, project, revenue, etc.)

### Plans
- Plan names + prices (monthly/annual)
- Limits per plan (the 3–6 that matter)
- What's the upgrade trigger? (what causes people to move up?)

### Objections + Risk
- Top 3 reasons people don't buy today
- Security/compliance needs? (SOC2, GDPR)
- Can you offer: free trial, free plan, money-back, demo?

### Proof
- Testimonials, logos, results, case studies, metrics

### Traffic Context
- Where are visitors coming from? (homepage, feature pages, ads, comparison)
- What do they already know?

## Core Structure

### Above the Fold (mandatory)
- **Clear value headline** — what outcome, for who
- **Monthly/Annual toggle** — with annual savings callout
- **3‑plan pricing table** (most common) or 2‑plan (simple product)
- **Primary CTA per plan** — consistent verbs

### Below the Fold (high leverage)
- **Plan comparison** — feature matrix or "what you get" bullets
- **FAQ** — objection handling
- **Social proof** — near decision points
- **Security / compliance / procurement** section (if B2B)
- **Final CTA** + contact sales

## Layout Types — Pick One

| Type | Best When | Rules |
|------|-----------|-------|
| **A) Classic 3‑card** | 3 natural tiers, simple pricing | 1 plan labeled Recommended |
| **B) Value metric slider** | Pricing scales with usage (seats, events) | Keep math obvious, safe default |
| **C) Pick your path** | Different audiences (Individuals vs Teams) | Separate by persona FIRST, then price |
| **D) Enterprise last mile** | Self-serve + sales-led | Enterprise reads like procurement reassurance |

## Conversion Strategies

### 1. Make the Decision Easy
- 3 plans max (unless you have a strong reason)
- One recommended plan
- Bullets describe OUTCOMES, not internal features

### 2. Anchor Value (without being shady)
- Annual toggle with "Save X%"
- Show "Starting at" only if pricing is truly variable
- Avoid surprise fees

### 3. Reduce Risk
Choose at least one: free trial, free plan, money-back guarantee, "Talk to sales" with clear promise.

### 4. Handle Objections Before They Bounce
Most effective FAQ topics:
- "Can I cancel anytime?"
- "What happens if I hit limits?"
- "Do you offer discounts?"
- "Is this for freelancers/teams?"
- "Security / data / compliance"

### 5. Provide a Readable Comparison
- Avoid huge spreadsheets
- Group by: Core, Collaboration, Admin/Security, Support
- Highlight what changes at each tier

## Copywriting Templates

### Headlines
- `"{Outcome} for {audience} — without {pain}"`
- `"Plans that scale from {small} to {big}"`
- `"Start small. Upgrade when {trigger}."`

### Plan Descriptions (2 lines max)
- Who it's for
- What it unlocks
- Example: **Pro** — For designers shipping weekly. Better components, faster iteration.

### CTA Buttons
- Verbs that match the motion: "Start free trial", "Buy Pro", "Contact sales"
- Keep CTAs consistent across plans (don't mix "Get started" / "Try now")

### Feature Bullets (write like outcomes)
- ❌ "Unlimited projects"
- ✅ "Ship unlimited client sites without extra fees"

## Pricing Table UI Checklist
- Visible monthly/annual toggle
- "Save X%" callout on annual
- Recommended plan styling (subtle, not screaming)
- Key limits visible (3–6 max)
- Included items visible (3–6 max)
- Clear next step under each plan (trial/buy/contact)
- Link: "Compare plans" (scrolls to matrix)
- Mobile: stacked cards, NOT horizontal scroll nightmare

## SEO + AEO

### SEO Basics
- Title: "Pricing — {Product}" + outcome keyword
- Meta description: 1 sentence on value + 1 on starting price
- Clean URL: `/pricing`
- Internal links from: homepage CTA, feature pages, comparison pages

### AEO (Answer Engines)
- FAQ section answering: refund policy, trial length, cancellation, what counts as a seat, enterprise procurement
- Write FAQs in plain Q&A format
- Optional: FAQ schema if stack supports it

## Common Pitfalls
- Too many plans (analysis paralysis)
- Features listed with no context (why it matters)
- Pricing hidden behind "Contact sales" for everything
- Switching value metric mid-page (confusing)
- Over-designed table that harms readability
- Forgetting mobile (horizontal scroll is death on pricing)

## Output Format

When generating a pricing page, return:
1. **Page outline** — sections + order
2. **Pricing table spec** — plans, bullets, limits, CTA
3. **FAQ list** — 6–12 Q&A
4. **SEO/AEO** — title + meta + FAQ schema suggestion
5. **Layout recommendation** — A/B/C/D + why

## Quick Questions

If user gives only "make a pricing page":
- Free plan or trial?
- Monthly/annual pricing numbers?
- Value metric?
- Recommended plan (which one and why)?
- Top 3 objections?
