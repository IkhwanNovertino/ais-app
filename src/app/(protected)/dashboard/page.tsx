import { requireSession } from "@/lib/session";

export default async function DashboardPage() {
  const { user } = await requireSession();
  return <p>Selamat datang, {user.name}</p>;
}
