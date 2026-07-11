# Playwright MCP Workflow

## Overview

If you have Playwright MCP tools available, use them BEFORE creating any test. This ensures accurate selectors and real flow validation.

## MCP Workflow Steps

### 1. Navigate to Target Page

```
Use MCP: playwright.navigate(url)
```

Navigate to the page you want to test.

### 2. Take Snapshot

```
Use MCP: playwright.snapshot()
```

Get the page structure and identify elements. This shows:
- DOM hierarchy
- Available elements
- Element attributes
- Current page state

### 3. Interact with Elements

```
Use MCP: playwright.click(selector)
Use MCP: playwright.fill(selector, text)
Use MCP: playwright.select(selector, value)
```

Verify exact user flow and interactions.

### 4. Take Screenshots

```
Use MCP: playwright.screenshot()
```

Document expected states at each step:
- Initial state
- After form fill
- After submission
- Success/error states

### 5. Verify Page Transitions

```
Use MCP: playwright.waitForNavigation()
Use MCP: playwright.waitForSelector(selector)
```

Verify the complete flow:
- Loading states
- Success states
- Error states
- Redirects

### 6. Document Actual Selectors

From snapshots, identify:
- Real element roles (button, link, etc.)
- Associated labels
- Test IDs if present
- Accessible names

### 7. Create Test Code

Only after exploring, create test code with verified selectors:

```typescript
import { test, expect } from "@playwright/test";
import { LoginPage } from "./login-page";

test("User can login successfully", async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  await loginPage.login("user@test.com", "password123");
  
  await expect(page).toHaveURL("/dashboard");
});
```

## Why This Matters

- ✅ **Precise tests** - Exact steps needed, no assumptions
- ✅ **Accurate selectors** - Real DOM structure, not imagined
- ✅ **Real flow validation** - Verify journey actually works
- ✅ **Avoid over-engineering** - Minimal tests for what exists
- ✅ **Prevent flaky tests** - Real exploration = stable tests
- ❌ **Never assume** how UI "should" work

## When MCP NOT Available

If Playwright MCP tools are not available:
1. Proceed with test creation based on docs and code analysis
2. Use browser DevTools to inspect elements
3. Run tests in debug mode: `npx playwright test --debug`
4. Use codegen to generate selectors: `npx playwright codegen`

## References

- [Playwright Inspector](https://playwright.dev/docs/inspector)
- [Playwright Codegen](https://playwright.dev/docs/codegen)
- [Debugging Tests](https://playwright.dev/docs/debug)
