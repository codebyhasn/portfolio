import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import {
  getProfile,
  getAllExperiences,
  getAllProjects,
  getAllSkills,
  getContactMessages,
} from "@/lib/data";

export default async function AdminPage() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/admin/login");
  }

  const [profile, experiences, projects, skills, messages] = await Promise.all([
    getProfile(),
    getAllExperiences(),
    getAllProjects(),
    getAllSkills(),
    getContactMessages(),
  ]);

  return (
    <AdminDashboard
      profile={profile}
      experiences={experiences}
      projects={projects}
      skills={skills}
      messages={messages}
    />
  );
}

