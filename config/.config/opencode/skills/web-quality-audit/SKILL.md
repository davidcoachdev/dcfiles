---
name: web-quality-audit
description: >
  Orchestrator skill for comprehensive web quality audits across performance, accessibility, SEO,
  and best practices. Activates the right specialist skill based on the audit type requested.
  Trigger: When doing web quality audits, lighthouse audits, full-site quality reviews, or
  multi-dimensional web assessments.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Full-site quality audits
- Pre-launch reviews
- Lighthouse-equivalent assessments
- Multi-dimensional web quality reports (perf + a11y + SEO + best practices)
- Orchestrating multiple specialist skills in sequence

## Routing

This is an **orchestrator** skill. When activated, identify the scope and load the relevant specialist skills:

| Audit scope | Load these skills |
|-------------|-------------------|
| Performance only | `web-performance`, `core-web-vitals` |
| Accessibility only | `accessibility-auditor` |
| SEO only | `seo-specialist` |
| Best practices only | `web-quality-best-practices` |
| Full audit | All 5 of the above |

Always load `core-web-vitals` when performance is in scope — LCP/INP/CLS are the bottom line.

## Audit Categories (4 dimensions)

### 1. Performance (40% of typical findings)
- **Core Web Vitals:** LCP < 2.5s, INP < 200ms, CLS < 0.1
- **Resource Optimization:** images, JS, CSS, fonts
- **Loading Strategy:** preconnect, preload, lazy load, caching
- Delegates to: `web-performance` + `core-web-vitals`

### 2. Accessibility (30% of typical findings)
- **Perceivable:** alt text, contrast, captions, color independence
- **Operable:** keyboard, focus, timing, navigation
- **Understandable:** language, consistency, error ID, labels
- **Robust:** valid HTML, correct ARIA, name/role/value
- Delegates to: `accessibility-auditor`

### 3. SEO (15% of typical findings)
- **Crawlability:** robots.txt, sitemap, canonical, noindex
- **On-page:** titles, metas, headings, link text
- **Technical:** mobile, HTTPS, structured data, speed
- Delegates to: `seo-specialist`

### 4. Best Practices (15% of typical findings)
- **Security:** HTTPS, HSTS, CSP, no exposed source maps
- **Modern Standards:** no deprecated APIs, valid doctype, charset
- **UX Patterns:** no intrusive interstitials, clear permissions
- Delegates to: `web-quality-best-practices`

## Severity Levels

| Level | Description | Action |
|-------|-------------|--------|
| **Critical** | Security vulnerabilities, complete failures | Fix immediately |
| **High** | Core Web Vitals failures, major a11y barriers | Fix before launch |
| **Medium** | Performance opportunities, SEO improvements | Fix within sprint |
| **Low** | Minor optimizations, code quality | Fix when convenient |

## Audit Output Format

Structure findings as:

```markdown
## Audit Results

### Critical (X)
- [Category] Issue — File: `path:line`
  - Impact: ...
  - Fix: ...

### High (X)
...

### Summary
- Performance: X issues (Y critical)
- Accessibility: X issues (Y critical)
- SEO: X issues
- Best Practices: X issues

### Priority Order
1. ...
2. ...
```

## Pre/Post Deploy Checklist

**Before deploy:**
- [ ] LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] No a11y errors (axe/Lighthouse)
- [ ] No console errors
- [ ] HTTPS working
- [ ] Meta tags present

**Weekly:** Search Console review, CWV trends, dependency updates, screen reader test.
**Monthly:** Full Lighthouse run, perf profiling, real-user a11y, keyword review.

## Thresholds Reference

- **CWV Good:** LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1
- **Perf Budget:** Total < 1.5MB, JS < 300KB, CSS < 100KB, Fonts < 100KB
- **Lighthouse Targets:** Perf ≥ 90, A11y = 100, BP ≥ 95, SEO ≥ 95
