import { prisma } from "./prisma";
import type { Experience, Project, Skill } from "./types";

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

// ---- Contact ----
export async function getContactMessages() {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
}

