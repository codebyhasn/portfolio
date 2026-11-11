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
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
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
  | "Backend & CMS"
  | "Mobile"
  | "DevOps & Workflows"
  | "Methodologies & AI"
  | string;

export type Credential = {
  id: number;
  title: string;
  issuer: string;
  type: string; // "Education" | "Certification"
  period: string;
  description: string;
  url: string;
  order: number;
  visible: boolean;
  createdAt: Date;
};

export type NavItem = {
  label: string;
  href: string;
};

export type NavSection = {
  id: string;
  key: string;
  number: string;
  label: string;
  targetId: string;
  order: number;
  isActive: boolean;
  updatedAt: Date;
};

export type SocialLink = {
  platform: string;
  url: string;
  icon: string;
};

