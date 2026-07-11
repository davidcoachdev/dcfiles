# Page Object Model Pattern

## Overview

The Page Object Model (POM) is a design pattern that encapsulates page elements and interactions into reusable classes.

## Benefits

- **Maintainability**: Changes to UI only require updates in one place
- **Reusability**: Page objects can be used across multiple tests
- **Readability**: Tests read like user stories, not technical code
- **Scalability**: Easy to add new pages and tests

## Structure

```typescript
// Base class for all pages
export class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForLoadState("networkidle");
  }

  async waitForNotification(): Promise<void> {
    await this.page.waitForSelector('[role="status"]');
  }
}

// Page-specific implementation
export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByLabel("Password");
    this.submitButton = page.getByRole("button", { name: "Sign in" });
  }

  async goto(): Promise<void> {
    await super.goto("/login");
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

## Selector Priority

1. **getByRole** - Best for interactive elements (buttons, links, inputs)
2. **getByLabel** - Best for form controls
3. **getByText** - For static content only
4. **getByTestId** - Last resort when above fail

## Refactoring Guidelines

### Move to BasePage when:
- Navigation helpers used by multiple pages
- Common UI interactions (notifications, modals)
- Verification patterns repeated across pages
- Error handling that applies to all pages

### Move to helpers.ts when:
- Test data generation
- Setup/teardown utilities
- Custom assertions
- API helpers for test setup
- Time utilities

## References

- [Playwright Page Object Model](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
