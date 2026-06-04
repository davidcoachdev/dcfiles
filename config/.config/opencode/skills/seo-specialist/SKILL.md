---
name: seo-specialist
description: >
  Expert SEO strategist specializing in technical SEO, content optimization, link authority building,
  and organic search growth. Drives sustainable traffic through data-driven search strategies.
  Trigger: When doing SEO optimization, keyword research, technical SEO audits, content strategy
  for search, link building, or SERP feature optimization.
license: MIT
metadata:
  author: agency-agents
  version: "1.0"
---

## When to Use

- Technical SEO audits (crawlability, indexation, Core Web Vitals)
- Keyword research and content strategy
- On-page and off-page optimization
- Link building and authority strategy
- Schema markup and rich results
- Cannibalization prevention
- Search Console and analytics analysis

## Critical Rules

### White-Hat Only
1. **Never recommend** link schemes, cloaking, keyword stuffing, hidden text
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
- [ ] `robots.txt`: verify allowed/blocked paths, sitemap reference
- [ ] XML Sitemap: total URLs vs indexed URLs ratio (>90% = healthy)
- [ ] Craw budget: no parameter URLs, faceted nav, thin content wasting crawls
- [ ] Canonical tags: self-referencing, consistent, no conflicting signals
- [ ] Noindex tags: verify intentional, not accidentally blocking important pages

### Site Architecture
- [ ] URL hierarchy: max 4 clicks from homepage to any page
- [ ] Internal link distribution: no orphaned pages, equity flows to priority pages
- [ ] Breadcrumbs: implemented with structured data
- [ ] Pagination: rel=prev/next or load-more with proper handling

### Core Web Vitals
- [ ] LCP < 2.5s: optimize images, fonts, server response time
- [ ] INP < 200ms: minimize main thread work, break long tasks
- [ ] CLS < 0.1: set dimensions on images/ads, avoid layout shift from fonts

### Schema Markup (Structured Data)
- [ ] Organization schema on homepage
- [ ] BreadcrumbList on all pages
- [ ] Article/BlogPosting on content pages
- [ ] FAQ schema on FAQ pages
- [ ] Product schema on e-commerce pages
- [ ] Review/Rating schema where applicable

### Security & Trust
- [ ] HTTPS everywhere (no mixed content)
- [ ] HSTS header configured
- [ ] No redirect chains (>2 hops)
- [ ] Clean 404 page with navigation

## Keyword Research Framework

```
1. Seed keywords → expand with tools (Search Console, Keyword Planner, Ahrefs)
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

## On-Page Optimization Checklist

- [ ] Title tag: primary keyword first, <60 chars, compelling
- [ ] Meta description: primary keyword, <155 chars, includes CTA
- [ ] H1: one per page, includes primary keyword, matches search intent
- [ ] H2-H6 hierarchy: logical, includes secondary keywords naturally
- [ ] First 100 words: primary keyword appears naturally
- [ ] Image alt text: descriptive, includes keywords where relevant
- [ ] Internal links: 3-5 contextual links to related pages
- [ ] URL slug: short, keyword-rich, hyphenated, no stop words

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
| Featured Snippet | Answer the question in 40-60 words with direct, factual format |
| People Also Ask | Create FAQ sections with clear Q&A format |
| Knowledge Panel | Implement Organization schema, claim Google Business |
| Rich Results | Add appropriate structured data (Product, Review, HowTo) |
| Image Pack | Optimize image SEO: descriptive filenames, alt text, compression |
| Video Results | Add VideoObject schema, create video sitemap |

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]