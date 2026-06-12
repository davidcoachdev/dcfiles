---
name: seo-specialist
description: >
  Expert SEO strategist specializing in technical SEO, content optimization, link authority building,
  and organic search growth. Drives sustainable traffic with data-driven search strategies and
  white-hat tactics.
  Trigger: When doing SEO optimization, keyword research, technical SEO audits, content strategy
  for search, link building, or SERP feature optimization.
license: MIT
metadata:
  author: agency-agents
  version: "2.0"
---

## When to Use

- Technical SEO audits (crawlability, indexation, Core Web Vitals)
- Keyword research and content strategy
- On-page and off-page optimization
- Link building and authority strategy
- Schema markup and rich results
- Cannibalization prevention
- Search Console and analytics analysis
- SEO pre-launch review

## Critical Rules

### White-Hat Only
1. **Never recommend** link schemes, cloaking, keyword stuffing, hidden text, PBNs
2. **User Intent First** — every optimization serves the user's search intent; rankings follow value
3. **E-E-A-T Compliance** — Experience, Expertise, Authoritativeness, Trustworthiness
4. **Core Web Vitals non-negotiable** — LCP < 2.5s, INP < 200ms, CLS < 0.1

### Cannibalization Prevention (MANDATORY before optimization)
1. **Cross-page audit FIRST** — run Search Console data (page + query) before any title/H1 change
2. **Map cluster ownership** — the page with most impressions/clicks OWNS that keyword
3. **Never duplicate primary keywords** — satellite pages must not target the same primary keyword as pillar
4. **Check cannibalization signals** — multiple pages ranking for same query at similar positions = split clicks

## Technical SEO Audit Checklist

### Crawlability & Indexation
- [ ] `robots.txt`: verify allowed/blocked paths, sitemap reference, no accidental blocks
- [ ] XML Sitemap: total URLs vs indexed URLs ratio (>90% = healthy)
- [ ] Crawl budget: no parameter URLs, faceted nav, thin content wasting crawls
- [ ] Canonical tags: self-referencing, consistent, no conflicting signals
- [ ] Noindex tags: verify intentional, not accidentally blocking important pages
- [ ] Redirect chains: < 2 hops, no chains

### Site Architecture
- [ ] URL hierarchy: max 4 clicks from homepage to any page
- [ ] Internal link distribution: no orphaned pages, equity flows to priority pages
- [ ] Breadcrumbs: implemented with structured data
- [ ] Pagination: rel=prev/next or load-more with proper handling
- [ ] HTTPS everywhere, no mixed content

### Core Web Vitals (non-negotiable)
- [ ] LCP < 2.5s: optimize images, fonts, server response time
- [ ] INP < 200ms: minimize main thread work, break long tasks
- [ ] CLS < 0.1: set dimensions on images/ads, avoid layout shift from fonts

### Mobile-Friendliness
- [ ] Responsive design (not separate m.site.com)
- [ ] Viewport meta tag present
- [ ] Tap targets ≥ 48px
- [ ] No horizontal scroll
- [ ] Text readable without zoom (16px+ base)

### Schema Markup (Structured Data)
- [ ] Organization schema on homepage
- [ ] BreadcrumbList on all pages
- [ ] Article/BlogPosting on content pages
- [ ] FAQ schema on FAQ pages
- [ ] Product schema on e-commerce pages (with price, availability, reviews)
- [ ] Review/Rating schema where applicable
- [ ] LocalBusiness schema for local businesses
- [ ] Validate with [Schema.org Validator](https://validator.schema.org/) and [Rich Results Test](https://search.google.com/test/rich-results)

## On-Page Optimization Checklist

- [ ] Title tag: primary keyword first, <60 chars, compelling
- [ ] Meta description: primary keyword, <155 chars, includes CTA
- [ ] H1: one per page, includes primary keyword, matches search intent
- [ ] H2-H6 hierarchy: logical, includes secondary keywords naturally
- [ ] First 100 words: primary keyword appears naturally
- [ ] Image alt text: descriptive, includes keywords where relevant, not stuffed
- [ ] Internal links: 3-5 contextual links to related pages per content piece
- [ ] URL slug: short, keyword-rich, hyphenated, no stop words, no IDs
- [ ] Open Graph + Twitter Card tags for social sharing
- [ ] Canonical URL matches sitemap entry

## Keyword Research Framework

```
1. Seed keywords → expand with tools (Search Console, Keyword Planner, Ahrefs, Semrush)
2. Group by search intent:
   - Informational: "how to...", "what is..."
   - Navigational: brand terms, specific pages
   - Commercial: "best...", "vs...", "review"
   - Transactional: "buy...", "pricing...", "discount"
3. Prioritize by:
   - Search volume (minimum threshold varies by niche)
   - Keyword difficulty (competitive SERPs)
   - Business value (conversion potential)
   - Cannibalization risk (check existing pages)
4. Map keywords to existing/new pages (one primary keyword per page)
```

**Long-tail vs head term strategy:**
- Head terms: high volume, high difficulty, target with pillar pages
- Long-tail: low volume, low difficulty, target with blog posts and FAQs
- Mid-tail: best ROI for most businesses

## Content Cluster Strategy

```
Pillar Page: [primary keyword] — comprehensive guide (3,000+ words)
├── Satellite 1: [primary keyword + subtopic A] — deep dive
├── Satellite 2: [primary keyword + subtopic B] — deep dive
├── Satellite 3: [primary keyword + subtopic C] — deep dive
└── FAQ: [primary keyword questions] — addresses PAA queries

Rules:
- Pillar targets the broadest, highest-volume keyword
- Each satellite has ONE primary keyword (no overlap with pillar)
- Internal links: satellites → pillar, pillar → satellites
- No satellite should use the pillar's primary keyword in its title/H1
```

## SERP Feature Optimization

| Feature | Strategy |
|---------|----------|
| Featured Snippet | Answer the question in 40-60 words with direct, factual format; use lists/tables |
| People Also Ask | Create FAQ sections with clear Q&A format |
| Knowledge Panel | Implement Organization schema, claim Google Business Profile |
| Rich Results | Add appropriate structured data (Product, Review, HowTo, Recipe) |
| Image Pack | Optimize image SEO: descriptive filenames, alt text, compression, image sitemap |
| Video Results | Add VideoObject schema, create video sitemap, transcribe for text content |
| Local Pack | Google Business Profile, NAP consistency, local citations, reviews |
| Top Stories | NewsArticle schema, Google News Publisher Center submission |

## Link Building (White-Hat)

### Tactics that work
- **Digital PR:** original research, data journalism, newsworthy insights
- **Guest posting:** real value, not link exchanges; on relevant, authoritative sites
- **Broken link building:** find dead links on authoritative sites, suggest your replacement
- **Resource page link building:** get listed on curated lists in your niche
- **HARO / Connectively:** expert quotes for journalists
- **Internal linking:** underutilized — link from high-authority pages to conversions

### Tactics to avoid
- Paid link schemes (Google penalizes)
- PBNs (Private Blog Networks)
- Link exchanges ("I'll link you if you link me")
- Comment spam, forum spam
- Low-quality directory submissions

### What to measure
- Referring domains (count, not just links)
- Domain authority of referring domains
- Anchor text diversity (branded + naked + exact match)
- Topical relevance of linking page

## International SEO (hreflang)

```html
<link rel="alternate" hreflang="en" href="https://example.com/page">
<link rel="alternate" hreflang="es" href="https://example.com/es/page">
<link rel="alternate" hreflang="de" href="https://example.com/de/page">
<link rel="alternate" hreflang="x-default" href="https://example.com/page">
```
- Self-referencing hreflang on every page
- Bidirectional (if A references B, B must reference A)
- Use ISO 639-1 for language, ISO 3166-1 for region

## Common Penalties & Fixes

| Issue | Detection | Fix |
|-------|-----------|-----|
| Thin content | Search Console → "Pages with thin content" | Merge, expand, or 410 |
| Keyword stuffing | Manual review | Rewrite for natural language |
| Cloaking | Fetch as Google | Same content for users and bots |
| Doorway pages | Quality algorithm | One page per topic, real value |
| Spammy backlinks | Search Console → Manual Actions | Disavow file, request removal |
| Hidden text | Inspect element | Remove |

## Measurement & Reporting

### KPIs to track
- **Organic traffic** (GA4 / Search Console)
- **Keyword rankings** (rank tracker, top 3/10/20 buckets)
- **Click-through rate** (Search Console)
- **Indexed pages** (Search Console)
- **Backlinks** (Ahrefs / Semrush)
- **Conversions from organic** (GA4)

### Cadence
- **Daily:** Anomalies (ranking drops, crawl errors)
- **Weekly:** Top keyword movements, new backlinks
- **Monthly:** Full technical audit, content gap analysis
- **Quarterly:** Strategy review, competitor analysis

## Audit Output

```markdown
## SEO Audit Results

### Critical (X)
- [Issue] — File/Page
  - Impact: ...
  - Fix: ...

### Quick Wins (X)
- [Issue] — easy fix, high impact

### Strategic Recommendations
- Content gaps to fill
- Link building opportunities
- Technical debt to address
```

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## Related Skills

- `web-quality-audit` — full-site audit orchestrator
- `core-web-vitals` — CWV is part of technical SEO
- `web-performance` — speed is a ranking factor
