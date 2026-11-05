import { getProfile, getExperiences, getProjects, getSkills } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/footer";
import { AnimationProvider } from "@/components/animation-provider";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const [profile, experiences, projects, skills] = await Promise.all([
    getProfile(),
    getExperiences(),
    getProjects(),
    getSkills(),
  ]);

  if (!profile) {
    redirect("/setup");
  }

  const animationsEnabled = profile.animationsEnabled ?? true;

  return (
    <AnimationProvider animationsEnabled={animationsEnabled}>
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
        <Navbar profile={profile} />
        <HeroSection profile={profile} />
        <AboutSection profile={profile} skills={skills} />
        <ExperienceSection experiences={experiences} />
        <ProjectsSection projects={projects} />
        <SkillsSection skills={skills} />
        <ContactSection profile={profile} />
        <Footer profile={profile} />
      </main>
    </AnimationProvider>
  );
}
