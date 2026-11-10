import { getEnv } from "./env";

export function getTrustedOrigins(): string[] {
  const env = getEnv();

  return [
    ...new Set([
      env.BETTER_AUTH_URL,
      ...env.BETTER_AUTH_TRUSTED_ORIGINS
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
    ]),
  ];
}