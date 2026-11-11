import { prisma } from "./prisma";
import type { Experience, Project, Skill, NavSection, Credential } from "./types";

export const DEFAULT_NAV_SECTIONS = [
  {
    key: "architecture",
    number: "01",
    label: "Architecture",
    targetId: "#architecture",
    order: 1,
    isActive: true,
  },
  {
    key: "dossier",
    number: "02",
    label: "Dossier",
    targetId: "#about",
    order: 2,
    isActive: true,
  },
  {
    key: "chronology",
    number: "03",
    label: "Chronology",
    targetId: "#chronology",
    order: 3,
    isActive: true,
  },
  {
    key: "credentials",
    number: "04",
    label: "Credentials",
    targetId: "#credentials",
    order: 4,
    isActive: true,
  },
  {
    key: "works",
    number: "05",
    label: "Works",
    targetId: "#works",
    order: 5,
    isActive: true,
  },
  {
    key: "doctrines",
    number: "06",
    label: "Doctrines",
    targetId: "#doctrines",
    order: 6,
    isActive: true,
  },
  {
    key: "dispatch",
    number: "07",
    label: "Dispatch",
    targetId: "#dispatch",
    order: 7,
    isActive: true,
  },
];

async function ensureNavSectionsSeeded() {
  try {
    const count = await prisma.navSection.count();
    if (count === 0) {
      await prisma.navSection.createMany({
        data: DEFAULT_NAV_SECTIONS,
      });
    } else {
      // Check if credentials section exists, if not add it
      const hasCreds = await prisma.navSection.findUnique({
        where: { key: "credentials" },
      });
      if (!hasCreds) {
        await prisma.navSection.create({
          data: {
            key: "credentials",
            number: "04",
            label: "Credentials",
            targetId: "#credentials",
            order: 4,
            isActive: true,
          },
        });
        await prisma.navSection.updateMany({
          where: { key: "works" },
          data: { number: "05", order: 5 },
        });
        await prisma.navSection.updateMany({
          where: { key: "doctrines" },
          data: { number: "06", order: 6 },
        });
        await prisma.navSection.updateMany({
          where: { key: "dispatch" },
          data: { number: "07", order: 7 },
        });
      }
    }
  } catch (error) {
    console.error("Error ensuring nav sections seeded:", error);
  }
}

// ---- Nav Sections ----
export async function getActiveNavSections(): Promise<NavSection[]> {
  await ensureNavSectionsSeeded();
  return prisma.navSection.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
}

export async function getAllNavSections(): Promise<NavSection[]> {
  await ensureNavSectionsSeeded();
  return prisma.navSection.findMany({
    orderBy: { order: "asc" },
  });
}

// ---- Profile ----
export async function getProfile() {
  return prisma.profile.findFirst();
}

// ---- Experience ----
export async function getExperiences(): Promise<Experience[]> {
  const records = await prisma.experience.findMany({
    where: { visible: true },
    orderBy: { order: "asc" },
  });
  return records.map((r) => ({
    ...r,
    achievements: JSON.parse(r.achievements) as string[],
    techStack: JSON.parse(r.techStack) as string[],
  }));
}

export async function getAllExperiences(): Promise<Experience[]> {
  const records = await prisma.experience.findMany({
    orderBy: { order: "asc" },
  });
  return records.map((r) => ({
    ...r,
    achievements: JSON.parse(r.achievements) as string[],
    techStack: JSON.parse(r.techStack) as string[],
  }));
}

// ---- Projects ----
export async function getProjects(): Promise<Project[]> {
  const records = await prisma.project.findMany({
    where: { visible: true },
    orderBy: { order: "asc" },
  });
  return records.map((r) => ({
    ...r,
    tags: JSON.parse(r.tags) as string[],
  }));
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const records = await prisma.project.findMany({
    where: { visible: true, featured: true },
    orderBy: { order: "asc" },
  });
  return records.map((r) => ({
    ...r,
    tags: JSON.parse(r.tags) as string[],
  }));
}

export async function getAllProjects(): Promise<Project[]> {
  const records = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });
  return records.map((r) => ({
    ...r,
    tags: JSON.parse(r.tags) as string[],
  }));
}

// ---- Skills ----
export async function getSkills(): Promise<Skill[]> {
  const records = await prisma.skill.findMany({
    where: { visible: true },
    orderBy: { order: "asc" },
  });
  return records.map((r) => ({ ...r }));
}

export async function getAllSkills(): Promise<Skill[]> {
  return prisma.skill.findMany({ orderBy: { order: "asc" } });
}

// ---- Credentials & Education ----
export async function getCredentials(): Promise<Credential[]> {
  return prisma.credential.findMany({
    where: { visible: true },
    orderBy: { order: "asc" },
  });
}

export async function getAllCredentials(): Promise<Credential[]> {
  return prisma.credential.findMany({
    orderBy: { order: "asc" },
  });
}

// ---- Contact ----
export async function getContactMessages() {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
}

