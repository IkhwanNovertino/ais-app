import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";

export const getSession = cache(async () => auth.api.getSession({ headers: await headers() }));

export async function requireSession() {
  const session = await getSession();
  if (!session) {
    logger.warn("Akses halaman terproteksi tanpa sesi valid");
    redirect("/login");
  }
  return session;
}
