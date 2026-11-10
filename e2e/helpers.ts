import { expect, type APIRequestContext, type Page } from "@playwright/test";

export type TestUser = { name: string; email: string; password: string };

export async function createTestUser(request: APIRequestContext): Promise<TestUser> {
  const user: TestUser = {
    name: "E2E User",
    email: `e2e-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`,
    password: "Password123!",
  };
  const res = await request.post("/api/auth/sign-up/email", { data: user });
  expect(res.ok(), await res.text()).toBeTruthy();
  return user;
}

export async function loginViaUi(page: Page, user: Pick<TestUser, "email" | "password">) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(user.email);
  await page.getByLabel("Password").fill(user.password);
  await page.getByRole("button", { name: "Masuk" }).click();
}
