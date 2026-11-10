import { expect, test } from "@playwright/test";
import { createTestUser, loginViaUi } from "./helpers";

test.describe("autentikasi", () => {
  test("user tanpa sesi diarahkan dari /dashboard ke /login", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(new RegExp("/login$"));
    await expect(page.getByRole("button", { name: "Masuk" })).toBeVisible();
  });

  test("validasi sisi klien menolak email tidak valid", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("bukan-email");
    await page.getByLabel("Password").fill("password123");
    await page.getByRole("button", { name: "Masuk" }).click();
    await expect(page.getByTestId("form-error")).toHaveText("Email tidak valid");
  });

  test("kredensial salah menampilkan error dan tetap di /login", async ({ page, request }) => {
    const user = await createTestUser(request);
    await loginViaUi(page, { email: user.email, password: "password-salah-123" });
    await expect(page.getByTestId("form-error")).toBeVisible();
    await expect(page).toHaveURL(new RegExp("/login$"));
  });

  test("login berhasil menampilkan dashboard dengan sidebar", async ({ page, request }) => {
    const user = await createTestUser(request);
    await loginViaUi(page, { email: user.email, password: "Password123!" });
    await expect(page).toHaveURL(new RegExp("/dashboard$"));
    await expect(page.getByRole("link", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByText(`Selamat datang, ${user.name}`)).toBeVisible();
  });

  test("keluar mengakhiri sesi", async ({ page, request }) => {
    const user = await createTestUser(request);
    await loginViaUi(page, { email: user.email, password: "Password123!" });
    await expect(page).toHaveURL(new RegExp("/dashboard$"));
    await page.getByRole("button", { name: "Keluar" }).click();
    await expect(page).toHaveURL(new RegExp("/login$"));
    await page.goto("/dashboard");
    await expect(page).toHaveURL(new RegExp("/login$"));
  });
});
