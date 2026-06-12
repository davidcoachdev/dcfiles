---
name: web-quality-best-practices
description: >
  Modern web development standards: security (HTTPS, HSTS, CSP), modern APIs, browser
  compatibility, error handling, console cleanliness, and UX patterns. Based on Lighthouse
  Best Practices category.
  Trigger: When applying best practices, running security audit, modernizing legacy web code,
  checking browser compatibility, or reviewing code quality.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Pre-launch code quality review
- Security audit (frontend-side)
- Modernizing legacy code (deprecated APIs)
- Browser compatibility checks
- Console error / warning cleanup
- Reviewing UX patterns (interstitials, permissions, etc.)

## Security

### HTTPS & HSTS
- **HTTPS everywhere.** No mixed content (http resources on https page).
- **HSTS header:** `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- **Redirect HTTP → HTTPS** at edge, 301 permanent.
- **No insecure cookies:** all cookies `Secure` + `HttpOnly` + `SameSite=Lax/Strict`.

### Content Security Policy (CSP)
Start strict, expand as needed:
```
Content-Security-Policy: default-src 'self'; 
  script-src 'self' 'nonce-{random}'; 
  style-src 'self' 'nonce-{random}'; 
  img-src 'self' data: https:; 
  font-src 'self'; 
  connect-src 'self'; 
  frame-ancestors 'none'; 
  base-uri 'self'; 
  form-action 'self';
```
- **No `unsafe-inline`** in script-src unless using nonces
- **No `unsafe-eval`** ever
- **Submit CSP report** initially: `Content-Security-Policy-Report-Only: ...`

### Other headers
- `X-Content-Type-Options: nosniff` — prevent MIME sniffing
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()` — disable unused
- `X-Frame-Options: DENY` or rely on `frame-ancestors` in CSP

### Source maps & secrets
- **No source maps in production** (`.map` files leak source)
- **No exposed secrets** in client bundle — env vars belong on server
- **No debug endpoints** in production builds

## Modern Standards

### No deprecated APIs
| Deprecated | Use instead |
|------------|-------------|
| `document.write` | `appendChild`, `insertAdjacentHTML` |
| Synchronous XHR | `fetch` with `await` |
| `var` | `const` / `let` |
| `new Date()` for parsing | `Temporal` (or `Date` carefully) |
| `alert` / `confirm` / `prompt` | Custom modal UI |
| `Application Cache` | Service Workers |
| `User-Agent` sniffing | Feature detection |
| `<frame>`, `<frameset>` | `<iframe>` (or none) |

### Document basics
- **Valid doctype:** `<!DOCTYPE html>` (always first line)
- **Charset first in head:** `<meta charset="UTF-8">`
- **Viewport:** `<meta name="viewport" content="width=device-width, initial-scale=1">`
- **Title:** unique, descriptive, 50-60 chars
- **Lang attribute:** `<html lang="en">` (or relevant locale)

### Modern APIs to prefer
- `fetch` over XHR
- `localStorage` / `IndexedDB` / `Cache API` (not cookies for app state)
- `IntersectionObserver` over scroll listeners
- `ResizeObserver` for responsive components
- `requestAnimationFrame` for animations (not setInterval)
- `URL` / `URLSearchParams` for URL parsing (not regex)
- `structuredClone` for deep copy (not JSON.parse(JSON.stringify(x)))
- `AbortController` for cancellable fetches

## Error Handling

### Global handlers (with reporting)
```javascript
window.addEventListener('error', e => report(e));
window.addEventListener('unhandledrejection', e => report(e.reason));
```
- Log to real endpoint, not `console.error` only
- Include stack, user-agent, route, but **no PII**

### Async errors
```javascript
// Bad: silent
fetch(url).then(r => r.json());

// Good: handled
try {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return await r.json();
} catch (e) {
  report(e);
  throw e;  // let caller decide
}
```

### User-facing
- **Show, don't just log.** "Couldn't load — try again" beats blank screen.
- **Don't expose internals** to users (stack traces, error codes).
- **Preserve user input** on failure.

## Console Cleanliness

- **No `console.log` in production builds** — use logger with levels
- **No `console.error` from third-party** — wrap or filter
- **No warnings** from deprecated APIs (fix the code)
- **Use `console.warn` and `console.error`** sparingly and intentionally

## UX Patterns

### Permissions
- **Don't ask upfront.** Wait for the user action that needs it.
- **Provide context** before the browser prompt.
- **Handle denial gracefully** — feature should still work degraded.
- **Never `Notification.requestPermission()`** on page load.

### Interstitials
- **No full-screen popups** especially on mobile (Google penalizes).
- **No deceptive patterns** — buttons that look like content.
- **Easy to dismiss** with one click or ESC.

### Forms
- **Labels always visible** (not just placeholders).
- **Errors inline** next to the field, with `aria-describedby`.
- **Don't block paste** in password fields.
- **Confirm destructive actions** with undo, not just OK.

### Loading states
- **Skeleton > spinner > nothing** for content loads.
- **Optimistic UI** for mutations when safe.
- **Disable button while submitting** — no double-submits.

## Browser Compatibility

- **Use caniuse.com** before shipping new APIs
- **Baseline 2024+** is the safe target for greenfield projects
- **Progressive enhancement:** feature detection, fallbacks for critical paths
- **Avoid user-agent sniffing** entirely

## Quick Audit Checklist

```markdown
### Security
- [ ] HTTPS only, HSTS, no mixed content
- [ ] CSP header present, no unsafe-inline
- [ ] Cookies: Secure, HttpOnly, SameSite
- [ ] No secrets in client bundle
- [ ] No source maps in prod

### Modern Standards
- [ ] No deprecated APIs (document.write, sync XHR, var)
- [ ] DOCTYPE, charset, viewport correct
- [ ] Lang attribute set

### Code Quality
- [ ] No console errors or warnings
- [ ] Global error handlers report to backend
- [ ] No try/catch that swallows

### UX
- [ ] Permissions requested on action, not on load
- [ ] No intrusive interstitials on mobile
- [ ] Forms have visible labels, inline errors
```

## Related Skills

- `web-quality-audit` — full-site audit orchestrator
- `web-performance` — performance-specific best practices
- `accessibility-auditor` — a11y-specific patterns
