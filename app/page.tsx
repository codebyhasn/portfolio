import {
  getProfile,
  getExperiences,
  getProjects,
  getSkills,
  getActiveNavSections,
  getCredentials,
} from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { CredentialsSection } from "@/components/sections/credentials-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/footer";
import { AnimationProvider } from "@/components/animation-provider";
import { redirect } from "next/navigation";
import type { NavSection } from "@/lib/types";

export default async function HomePage() {
  const [profile, experiences, projects, skills, navSections, credentials] = await Promise.all([
    getProfile(),
    getExperiences(),
    getProjects(),
    getSkills(),
    getActiveNavSections(),
    getCredentials(),
  ]);

  if (!profile) {
    redirect("/setup");
  }

  const animationsEnabled = profile.animationsEnabled ?? true;

  // Render individual sections dynamically matching navSections order and active state
  const renderSection = (section: NavSection) => {
    switch (section.key) {
      case "architecture":
        return <HeroSection key="architecture" profile={profile} />;
      case "dossier":
        return <AboutSection key="dossier" profile={profile} skills={skills} />;
      case "chronology":
        return <ExperienceSection key="chronology" experiences={experiences} />;
      case "credentials":
        return <CredentialsSection key="credentials" credentials={credentials} />;
      case "works":
        return <ProjectsSection key="works" projects={projects} />;
      case "doctrines":
        return <SkillsSection key="doctrines" skills={skills} />;
      case "dispatch":
        return <ContactSection key="dispatch" profile={profile} />;
      default:
        // Support matching via targetId anchor
        if (section.targetId === "#about") return <AboutSection key={section.id} profile={profile} skills={skills} />;
        if (section.targetId === "#chronology") return <ExperienceSection key={section.id} experiences={experiences} />;
        if (section.targetId === "#credentials") return <CredentialsSection key={section.id} credentials={credentials} />;
        if (section.targetId === "#works") return <ProjectsSection key={section.id} projects={projects} />;
        if (section.targetId === "#doctrines") return <SkillsSection key={section.id} skills={skills} />;
        if (section.targetId === "#dispatch") return <ContactSection key={section.id} profile={profile} />;
        if (section.targetId === "#architecture") return <HeroSection key={section.id} profile={profile} />;
        return null;
    }
  };

  return (
    <AnimationProvider animationsEnabled={animationsEnabled}>
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
        <Navbar profile={profile} navSections={navSections} />
        {navSections.map(renderSection)}
        <Footer profile={profile} />
      </main>
    </AnimationProvider>
  );
}
