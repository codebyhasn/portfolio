"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  LayoutDashboard,
  User,
  Briefcase,
  FolderOpen,
  Zap,
  MessageSquare,
  LogOut,
  ExternalLink,
  Bell,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { logoutAction } from "@/app/admin/actions/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { AdminProfileTab } from "./tabs/admin-profile-tab";
import { AdminExperienceTab } from "./tabs/admin-experience-tab";
import { AdminProjectsTab } from "./tabs/admin-projects-tab";
import { AdminSkillsTab } from "./tabs/admin-skills-tab";
import { AdminMessagesTab } from "./tabs/admin-messages-tab";
import { AdminOverviewTab } from "./tabs/admin-overview-tab";
import type { Profile, Experience, Project, Skill, ContactMessage } from "@/lib/types";

type Tab =
  | "overview"
  | "profile"
  | "experience"
  | "projects"
  | "skills"
  | "messages";

interface AdminDashboardProps {
  profile: Profile | null;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  messages: ContactMessage[];
}

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
  { id: "profile", label: "Profile & Bio", icon: <User className="h-4 w-4" /> },
  { id: "experience", label: "Experience", icon: <Briefcase className="h-4 w-4" /> },
  { id: "projects", label: "Projects", icon: <FolderOpen className="h-4 w-4" /> },
  { id: "skills", label: "Skills", icon: <Zap className="h-4 w-4" /> },
  { id: "messages", label: "Messages", icon: <MessageSquare className="h-4 w-4" /> },
];

export function AdminDashboard({
  profile,
  experiences,
  projects,
  skills,
  messages,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const unreadCount = messages.filter((m) => !m.read).length;

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return (
          <AdminOverviewTab
            profile={profile}
            experiences={experiences}
            projects={projects}
            skills={skills}
            messages={messages}
            onNavigate={setActiveTab}
          />
        );
      case "profile":
        return <AdminProfileTab profile={profile} />;
      case "experience":
        return <AdminExperienceTab experiences={experiences} />;
      case "projects":
        return <AdminProjectsTab projects={projects} />;
      case "skills":
        return <AdminSkillsTab skills={skills} />;
      case "messages":
        return <AdminMessagesTab messages={messages} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] dark:bg-[#0d0e12] text-zinc-900 dark:text-zinc-100 flex transition-colors">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 flex flex-col border-r border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#111319] transition-all duration-300 md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 px-5">
          <div className="flex items-center gap-2.5">
            <div className="relative h-9 w-9 flex-shrink-0">
              <Image
                src="/brand-logo.png?v=3"
                alt="codebyhasn logo"
                width={80}
                height={80}
                className="h-full w-full object-contain drop-shadow-xs"
                unoptimized
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Admin Panel</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">PORTFOLIO CMS</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 font-mono text-xs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 shadow-2xs font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.id === "messages" && unreadCount > 0 && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-zinc-200 dark:border-zinc-800/80 p-4 space-y-2 font-mono text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View Public Site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 bg-white/90 dark:bg-[#111319]/90 px-4 sm:px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 capitalize">
                {activeTab === "overview" ? "Dashboard Overview" : activeTab}
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Manage your portfolio content</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {unreadCount > 0 && (
              <button
                onClick={() => setActiveTab("messages")}
                className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 bg-white dark:bg-zinc-900/50"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[9px] font-bold text-white">
                  {unreadCount}
                </span>
              </button>
            )}
            <div className="flex h-9 items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 px-3 shadow-2xs">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">admin</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderTab()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

