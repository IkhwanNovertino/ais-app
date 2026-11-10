import { describe, expect, it } from "vitest";
import { loginSchema } from "./auth";

describe("loginSchema", () => {
  it("menerima input valid", () => {
    expect(loginSchema.safeParse({ email: "a@b.co", password: "password123" }).success).toBe(true);
  });

  it("menolak email tidak valid", () => {
    const result = loginSchema.safeParse({ email: "bukan-email", password: "password123" });
    expect(result.success).toBe(false);
  });

  it("menolak password pendek", () => {
    expect(loginSchema.safeParse({ email: "a@b.co", password: "123" }).success).toBe(false);
  });
});
