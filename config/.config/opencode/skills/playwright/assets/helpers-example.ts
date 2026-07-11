import { Page } from "@playwright/test";

export interface TestUser {
  name: string;
  email: string;
  password: string;
}

export function generateUniqueEmail(): string {
  return `test.${Date.now()}@example.com`;
}

export function generateTestUser(): TestUser {
  return {
    name: "Test User",
    email: generateUniqueEmail(),
    password: "TestPassword123!",
  };
}

export async function createTestUser(
  page: Page,
  user: TestUser
): Promise<void> {
  await page.goto("/signup");
  await page.getByLabel("Email").fill(user.email);
  await page.getByLabel("Password").fill(user.password);
  await page.getByLabel("Confirm Password").fill(user.password);
  await page.getByRole("button", { name: "Create Account" }).click();
  await page.waitForURL("/dashboard");
}

export async function loginUser(
  page: Page,
  email: string,
  password: string
): Promise<void> {
  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("/dashboard");
}

export async function logoutUser(page: Page): Promise<void> {
  await page.getByRole("button", { name: "Sign Out" }).click();
  await page.waitForURL("/login");
}

export async function waitForNotification(
  page: Page,
  message: string
): Promise<void> {
  await page.getByText(message).waitFor({ state: "visible" });
}

export async function expectNotificationToContain(
  page: Page,
  message: string
): Promise<void> {
  const notification = page.locator('[role="status"]');
  await notification.waitFor({ state: "visible" });
  await notification.getByText(message).waitFor({ state: "visible" });
}
