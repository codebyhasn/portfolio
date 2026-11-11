"use client";

import { motion } from "framer-motion";
import {
  User,
  Briefcase,
  FolderOpen,
  Zap,
  MessageSquare,
  TrendingUp,
  Eye,
  Star,
} from "lucide-react";
import type { Profile, Experience, Project, Skill, ContactMessage } from "@/lib/types";

interface AdminOverviewTabProps {
  profile: Profile | null;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  messages: ContactMessage[];
  onNavigate: (tab: "overview" | "profile" | "experience" | "credentials" | "projects" | "skills" | "sections" | "messages") => void;
}

export function AdminOverviewTab({
  profile,
  experiences,
  projects,
  skills,
  messages,
  onNavigate,
}: AdminOverviewTabProps) {
  const unread = messages.filter((m) => !m.read).length;
  const featured = projects.filter((p) => p.featured).length;

  const stats = [
    {
      label: "Experience Entries",
      value: experiences.length,
      icon: <Briefcase className="h-5 w-5" />,
      color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
      tab: "experience" as const,
    },
    {
      label: "Projects",
      value: projects.length,
      icon: <FolderOpen className="h-5 w-5" />,
      color: "text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
      tab: "projects" as const,
    },
    {
      label: "Skills",
      value: skills.length,
      icon: <Zap className="h-5 w-5" />,
      color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
      tab: "skills" as const,
    },
    {
      label: "Messages",
      value: messages.length,
      icon: <MessageSquare className="h-5 w-5" />,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      tab: "messages" as const,
      badge: unread,
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Welcome */}
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Welcome back, {profile?.name?.split(" ")[0] || "Admin"}
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Executive portfolio controls &amp; content management ledger.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.button
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onNavigate(stat.tab)}
            className="relative bento-card p-5 text-left hover:border-amber-500/40 cursor-pointer shadow-2xs"
          >
            <div className={`inline-flex items-center justify-center rounded-lg border p-2 mb-3 ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stat.value}</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-300 font-medium mt-0.5">{stat.label}</div>
            {stat.badge && stat.badge > 0 ? (
              <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white">
                {stat.badge}
              </span>
            ) : null}
          </motion.button>
        ))}
      </div>

      {/* Quick info row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Profile status */}
        <div className="bento-card p-5 shadow-2xs">
          <div className="flex items-center gap-3 mb-3">
            <User className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-300">Profile Status</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Availability</span>
              <span className={profile?.availableForWork ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-amber-600 dark:text-amber-400 font-medium"}>
                {profile?.availableForWork ? "Available for Work" : "Committed"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Location</span>
              <span className="text-zinc-800 dark:text-zinc-200">{profile?.location}</span>
            </div>
          </div>
          <button
            onClick={() => onNavigate("profile")}
            className="mt-4 text-xs font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors cursor-pointer"
          >
            Edit Profile →
          </button>
        </div>

        {/* Featured projects */}
        <div className="bento-card p-5 shadow-2xs">
          <div className="flex items-center gap-3 mb-3">
            <Star className="h-4 w-4 text-amber-500 dark:text-amber-400" />
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-300">Featured Projects</span>
          </div>
          <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{featured}</div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">of {projects.length} total projects</p>
          <button
            onClick={() => onNavigate("projects")}
            className="mt-4 text-xs font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors cursor-pointer"
          >
            Manage Projects →
          </button>
        </div>

        {/* Unread messages */}
        <div className="bento-card p-5 shadow-2xs">
          <div className="flex items-center gap-3 mb-3">
            <Eye className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-300">Unread Messages</span>
          </div>
          <div className={`text-3xl font-bold ${unread > 0 ? "text-amber-600 dark:text-amber-400" : "text-zinc-600 dark:text-zinc-400"}`}>
            {unread}
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">of {messages.length} total messages</p>
          <button
            onClick={() => onNavigate("messages")}
            className="mt-4 text-xs font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors cursor-pointer"
          >
            View Messages →
          </button>
        </div>
      </div>

      {/* Recent messages */}
      {messages.length > 0 && (
        <div className="bento-card overflow-hidden shadow-2xs">
          <div className="border-b border-zinc-200 dark:border-zinc-800/50 px-5 py-4 flex items-center justify-between">
            <h3 className="font-medium text-zinc-900 dark:text-zinc-200">Recent Inquiries</h3>
            <button
              onClick={() => onNavigate("messages")}
              className="text-xs font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 cursor-pointer"
            >
              View all →
            </button>
          </div>
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800/50">
            {messages.slice(0, 3).map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 px-5 py-4">
                <div className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${msg.read ? "bg-zinc-400 dark:bg-zinc-600" : "bg-amber-500 animate-pulse"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100">{msg.name}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{msg.email}</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-0.5 truncate">{msg.subject}</p>
                </div>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 flex-shrink-0">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
