import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import {
  getProfile,
  getAllExperiences,
  getAllProjects,
  getAllSkills,
  getContactMessages,
  getAllNavSections,
  getAllCredentials,
} from "@/lib/data";

export default async function AdminPage() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/admin/login");
  }

  const [profile, experiences, projects, skills, messages, navSections, credentials] = await Promise.all([
    getProfile(),
    getAllExperiences(),
    getAllProjects(),
    getAllSkills(),
    getContactMessages(),
    getAllNavSections(),
    getAllCredentials(),
  ]);

  return (
    <AdminDashboard
      profile={profile}
      experiences={experiences}
      credentials={credentials}
      projects={projects}
      skills={skills}
      messages={messages}
      navSections={navSections}
    />
  );
}

