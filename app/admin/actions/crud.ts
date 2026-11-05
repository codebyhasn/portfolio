"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

async function requireAuth() {
  const session = await getSession();
  if (!session.isLoggedIn) throw new Error("Unauthorized");
}

// ---- Profile ----
export async function updateProfileAction(formData: FormData) {
  await requireAuth();

  const removeAvatar = formData.get("removeAvatar") === "true";
  const avatarFile = formData.get("avatarFile") as File | null;
  let avatarUrl: string | null | undefined = undefined;

  if (removeAvatar) {
    avatarUrl = null;
  } else if (avatarFile && avatarFile.size > 0) {
    const bytes = await avatarFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    const fileName = `avatar-${Date.now()}${path.extname(avatarFile.name)}`;
    await writeFile(path.join(uploadsDir, fileName), buffer);
    avatarUrl = `/uploads/${fileName}`;
  }

  const data: Record<string, string | boolean | null> = {
    name: formData.get("name") as string,
    headline: formData.get("headline") as string,
    subHeadline: formData.get("subHeadline") as string,
    bio: formData.get("bio") as string,
    location: formData.get("location") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    linkedIn: formData.get("linkedIn") as string,
    github: formData.get("github") as string,
    showAvatar: formData.get("showAvatar") === "true",
    animationsEnabled: formData.get("animationsEnabled") === "true",
    availableForWork: formData.get("availableForWork") === "true",
  };

  if (avatarUrl !== undefined) {
    data.avatarUrl = avatarUrl;
  }

  const existing = await prisma.profile.findFirst();
  if (existing) {
    await prisma.profile.update({ where: { id: existing.id }, data });
  } else {
    await prisma.profile.create({
      data: { ...data, avatarUrl: avatarUrl ?? "/assets/avatar.jpg" } as Parameters<typeof prisma.profile.create>[0]["data"],
    });
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

// ---- Toggle Animations Directly ----
export async function toggleAnimationsAction(enabled: boolean) {
  await requireAuth();
  const existing = await prisma.profile.findFirst();
  if (existing) {
    await prisma.profile.update({
      where: { id: existing.id },
      data: { animationsEnabled: enabled },
    });
  }
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

// ---- Experience ----
export async function createExperienceAction(formData: FormData) {
  await requireAuth();
  const achievements = (formData.get("achievements") as string)
    .split("\n")
    .filter(Boolean);
  const techStack = (formData.get("techStack") as string)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  await prisma.experience.create({
    data: {
      company: formData.get("company") as string,
      role: formData.get("role") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      location: formData.get("location") as string,
      description: formData.get("description") as string,
      achievements: JSON.stringify(achievements),
      techStack: JSON.stringify(techStack),
      order: parseInt(formData.get("order") as string) || 0,
      visible: formData.get("visible") === "true",
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateExperienceAction(id: number, formData: FormData) {
  await requireAuth();
  const achievements = (formData.get("achievements") as string)
    .split("\n")
    .filter(Boolean);
  const techStack = (formData.get("techStack") as string)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  await prisma.experience.update({
    where: { id },
    data: {
      company: formData.get("company") as string,
      role: formData.get("role") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      location: formData.get("location") as string,
      description: formData.get("description") as string,
      achievements: JSON.stringify(achievements),
      techStack: JSON.stringify(techStack),
      order: parseInt(formData.get("order") as string) || 0,
      visible: formData.get("visible") === "true",
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteExperienceAction(id: number) {
  await requireAuth();
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

// ---- Projects ----
export async function createProjectAction(formData: FormData) {
  await requireAuth();

  const coverFile = formData.get("coverFile") as File | null;
  let coverImage = "";

  if (coverFile && coverFile.size > 0) {
    const bytes = await coverFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    const fileName = `project-${Date.now()}${path.extname(coverFile.name)}`;
    await writeFile(path.join(uploadsDir, fileName), buffer);
    coverImage = `/uploads/${fileName}`;
  }

  const tags = (formData.get("tags") as string)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  await prisma.project.create({
    data: {
      title: formData.get("title") as string,
      slug:
        (formData.get("slug") as string) ||
        (formData.get("title") as string)
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      description: formData.get("description") as string,
      coverImage,
      tags: JSON.stringify(tags),
      liveUrl: (formData.get("liveUrl") as string) || "",
      githubUrl: (formData.get("githubUrl") as string) || "",
      featured: formData.get("featured") === "true",
      visible: formData.get("visible") === "true",
      order: parseInt(formData.get("order") as string) || 0,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateProjectAction(id: number, formData: FormData) {
  await requireAuth();

  const coverFile = formData.get("coverFile") as File | null;
  let coverImage: string | undefined;

  if (coverFile && coverFile.size > 0) {
    const bytes = await coverFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    const fileName = `project-${Date.now()}${path.extname(coverFile.name)}`;
    await writeFile(path.join(uploadsDir, fileName), buffer);
    coverImage = `/uploads/${fileName}`;
  }

  const tags = (formData.get("tags") as string)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const updateData: Record<string, unknown> = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    tags: JSON.stringify(tags),
    liveUrl: (formData.get("liveUrl") as string) || "",
    githubUrl: (formData.get("githubUrl") as string) || "",
    featured: formData.get("featured") === "true",
    visible: formData.get("visible") === "true",
    order: parseInt(formData.get("order") as string) || 0,
  };

  if (coverImage) updateData.coverImage = coverImage;

  await prisma.project.update({ where: { id }, data: updateData });

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteProjectAction(id: number) {
  await requireAuth();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

// ---- Skills ----
export async function createSkillAction(formData: FormData) {
  await requireAuth();
  await prisma.skill.create({
    data: {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      level: parseInt(formData.get("level") as string) || 80,
      order: parseInt(formData.get("order") as string) || 0,
      visible: formData.get("visible") === "true",
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateSkillAction(id: number, formData: FormData) {
  await requireAuth();
  await prisma.skill.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      level: parseInt(formData.get("level") as string) || 80,
      order: parseInt(formData.get("order") as string) || 0,
      visible: formData.get("visible") === "true",
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteSkillAction(id: number) {
  await requireAuth();
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

// ---- Messages ----
export async function markMessageReadAction(id: number) {
  await requireAuth();
  await prisma.contactMessage.update({
    where: { id },
    data: { read: true },
  });
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteMessageAction(id: number) {
  await requireAuth();
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin");
  return { success: true };
}

