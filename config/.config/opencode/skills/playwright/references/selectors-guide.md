# Playwright Selectors Guide

## Selector Priority (REQUIRED)

### 1. getByRole - BEST for interactive elements

```typescript
// Buttons
this.submitButton = page.getByRole("button", { name: "Submit" });
this.cancelButton = page.getByRole("button", { name: "Cancel" });

// Links
this.navLink = page.getByRole("link", { name: "Dashboard" });

// Checkboxes
this.agreeCheckbox = page.getByRole("checkbox", { name: "I agree" });

// Radio buttons
this.optionRadio = page.getByRole("radio", { name: "Option 1" });
```

### 2. getByLabel - BEST for form controls

```typescript
this.emailInput = page.getByLabel("Email");
this.passwordInput = page.getByLabel("Password");
this.phoneInput = page.getByLabel("Phone Number");
```

### 3. getByText - For static content only

```typescript
this.errorMessage = page.getByText("Invalid credentials");
this.pageTitle = page.getByText("Welcome");
this.successMessage = page.getByText("Account created successfully");
```

### 4. getByTestId - Last resort

```typescript
this.customWidget = page.getByTestId("date-picker");
this.complexComponent = page.getByTestId("custom-select");
```

## Avoid These (Fragile)

```typescript
// ❌ CSS selectors - brittle, break with styling changes
this.button = page.locator(".btn-primary");

// ❌ ID selectors - often change
this.input = page.locator("#email");

// ❌ XPath - hard to maintain
this.element = page.locator("//div[@class='container']//button");

// ❌ Complex selectors - unmaintainable
this.nested = page.locator("div > span > button.active");
```

## Why This Matters

- **getByRole/getByLabel** - Accessible by default, matches user perspective
- **getByText** - Resilient to styling changes
- **getByTestId** - Explicit, but use only when necessary
- **CSS/XPath** - Break when UI changes, hard to debug

## Testing Selectors

```bash
# Interactive mode to test selectors
npx playwright codegen https://example.com

# Debug mode to inspect elements
npx playwright test --debug
```

## References

- [Playwright Locators](https://playwright.dev/docs/locators)
- [Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
