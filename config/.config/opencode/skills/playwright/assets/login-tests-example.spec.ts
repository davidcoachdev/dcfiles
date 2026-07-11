import { test, expect } from "@playwright/test";
import { LoginPage } from "./login-page";
import { HomePage } from "../home/home-page";
import { generateUniqueEmail, generateTestUser } from "../helpers";

test.describe("Login", () => {
  test(
    "User can login successfully",
    { tag: ["@critical", "@e2e", "@login", "@LOGIN-E2E-001"] },
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      const homePage = new HomePage(page);

      await loginPage.goto();
      await loginPage.login({
        email: "user@test.com",
        password: "TestPassword123!",
      });

      await expect(page).toHaveURL("/dashboard");
      await homePage.verifyPageLoaded();
    }
  );

  test(
    "User sees error with invalid credentials",
    { tag: ["@high", "@e2e", "@login", "@LOGIN-E2E-002"] },
    async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login({
        email: "invalid@test.com",
        password: "WrongPassword123!",
      });

      await expect(page.getByText("Invalid credentials")).toBeVisible();
      await expect(page).toHaveURL("/login");
    }
  );

  test(
    "User sees validation error for empty email",
    { tag: ["@medium", "@e2e", "@login", "@LOGIN-E2E-003"] },
    async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.passwordInput.fill("TestPassword123!");
      await loginPage.submitButton.click();

      await expect(page.getByText("Email is required")).toBeVisible();
    }
  );

  test(
    "User can reset password",
    { tag: ["@high", "@e2e", "@login", "@LOGIN-E2E-004"] },
    async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.forgotPasswordLink.click();

      await expect(page).toHaveURL("/forgot-password");
      await page.getByLabel("Email").fill("user@test.com");
      await page.getByRole("button", { name: "Send Reset Link" }).click();

      await expect(
        page.getByText("Check your email for reset instructions")
      ).toBeVisible();
    }
  );
});

test.describe("Login - Multi-step Flow", () => {
  test(
    "User can signup and login in same session",
    { tag: ["@critical", "@e2e", "@signup", "@SIGNUP-E2E-001"] },
    async ({ page }) => {
      const testUser = generateTestUser();

      // Sign up
      await page.goto("/signup");
      await page.getByLabel("Email").fill(testUser.email);
      await page.getByLabel("Password").fill(testUser.password);
      await page.getByLabel("Confirm Password").fill(testUser.password);
      await page.getByRole("button", { name: "Create Account" }).click();

      await expect(page).toHaveURL("/dashboard");

      // Sign out
      await page.getByRole("button", { name: "Sign Out" }).click();
      await expect(page).toHaveURL("/login");

      // Login with new account
      await page.getByLabel("Email").fill(testUser.email);
      await page.getByLabel("Password").fill(testUser.password);
      await page.getByRole("button", { name: "Sign in" }).click();

      await expect(page).toHaveURL("/dashboard");
    }
  );
});
