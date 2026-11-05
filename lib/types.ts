export type Profile = {
  id: number;
  name: string;
  headline: string;
  subHeadline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  linkedIn: string;
  github: string;
  avatarUrl: string | null;
  showAvatar: boolean;
  animationsEnabled: boolean;
  availableForWork: boolean;
  resumeUrl: string;
};

export type Experience = {
  id: number;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
  order: number;
  visible: boolean;
  createdAt: Date;
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  visible: boolean;
  order: number;
  createdAt: Date;
};

export type Skill = {
  id: number;
  name: string;
  category: string;
  level: number;
  icon: string;
  order: number;
  visible: boolean;
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
};

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "DevOps"
  | "Mobile"
  | "Architecture"
  | "State Management";

export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  platform: string;
  url: string;
  icon: string;
};

