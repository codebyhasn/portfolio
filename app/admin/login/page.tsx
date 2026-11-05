import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session.isLoggedIn) {
    redirect("/admin");
  }

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4 transition-colors">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm">
        <AdminLoginForm />
      </div>
    </div>
  );
}

