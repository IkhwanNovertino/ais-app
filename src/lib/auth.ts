import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "./prisma";
import { getEnv } from "./env";
import { getTrustedOrigins } from "./trusted-origins";

const env = getEnv();

export const auth = betterAuth({
  appName: "ais-app",
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,

  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true },
  trustedOrigins: getTrustedOrigins(),
  plugins: [nextCookies()],
});
