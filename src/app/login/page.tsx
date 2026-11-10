import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { LoginForm } from "./component/form";

export default async function LoginPage() {
  if (await getSession()) redirect("/dashboard");
  return (
    <main className="flex min-h-svh items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </main>
  );
}
