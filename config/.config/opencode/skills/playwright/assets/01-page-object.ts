import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async fillEmail(email: string) {
    await this.page.fill('[data-testid="email"]', email);
  }

  async fillPassword(password: string) {
    await this.page.fill('[data-testid="password"]', password);
  }

  async clickLogin() {
    await this.page.click('[data-testid="login-button"]');
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async expectErrorMessage(message: string) {
    await expect(this.page.locator('[data-testid="error"]')).toContainText(message);
  }
}

// Usage in test
import { test } from '@playwright/test';

test('login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');
  await expect(page).toHaveURL('/dashboard');
});
