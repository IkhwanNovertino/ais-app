import { beforeAll, describe, expect, it } from "vitest";
import { signToken, verifyToken } from "./jwt";

beforeAll(() => {
  Object.assign(process.env, {
    DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/ais_dev",
    BETTER_AUTH_SECRET: "a".repeat(32),
    BETTER_AUTH_URL: "http://localhost:3000",
    JWT_SECRET: "b".repeat(32),
  });
});

describe("jwt", () => {
  it("sign lalu verify mengembalikan payload", async () => {
    const token = await signToken({ sub: "user-1" });
    expect((await verifyToken(token)).sub).toBe("user-1");
  });

  it("menolak token yang dirusak", async () => {
    const token = await signToken({ sub: "user-1" });
    const tampered = token.slice(0, -2) + (token.endsWith("aa") ? "bb" : "aa");
    await expect(verifyToken(tampered)).rejects.toThrow();
  });

  it("menolak token kedaluwarsa", async () => {
    const expired = await signToken({ sub: "user-1" }, Math.floor(Date.now() / 1000) - 10);
    await expect(verifyToken(expired)).rejects.toThrow();
  });
});
