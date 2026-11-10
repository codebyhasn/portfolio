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
    <div className="relative min-h-screen bg-[#f3eee3] dark:bg-[#0e0f12] flex items-center justify-center px-4 transition-colors">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm">
        <AdminLoginForm />
      </div>
    </div>
  );
}

