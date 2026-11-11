"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Mail, Phone, ArrowUpRight, Terminal, CheckCircle2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { cleanPhoneForTel, getWhatsAppUrl } from "@/lib/utils";
import { CodeEditorCard } from "@/components/code-editor-card";
import type { Profile, Skill } from "@/lib/types";

interface AboutSectionProps {
  profile: Profile;
  skills: Skill[];
}

const engineeringMetrics = [
  { label: "Production Tenure", value: "6+ Years", note: "Continuous shipping in financial & enterprise web" },
  { label: "Systems & Portals", value: "50+ Releases", note: "Full lifecycle architecture from Figma to API release" },
  { label: "Primary Architecture", value: "Next.js + Laravel", note: "Server actions, optimized SSR hydration, robust REST/GraphQL" },
  { label: "Accessibility Target", value: "WCAG 2.1 AA", note: "Semantic HTML, strict keyboard navigation, zero-CLS renders" },
];

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-[#111111]/12 dark:border-zinc-800/80">
      <div id="dossier" className="absolute -top-24 pointer-events-none" aria-hidden="true" />
      <div className="mx-auto max-w-7xl">
        {/* Section Index Marker */}
        <div className="flex items-center justify-between border-b border-[#111111]/12 dark:border-zinc-800/80 pb-3 mb-12 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#D9541E] dark:text-[#E05D27] font-bold">02 //</span>
            <span className="tracking-widest uppercase text-[#555555] dark:text-zinc-400">
              ARCHITECTURAL DOSSIER &amp; CORE PRINCIPLES
            </span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-[#555555]/70 dark:text-zinc-500">
            SPECIFICATION SHEET
          </span>
        </div>

        {/* Editorial Spread: 2-Column Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Manifesto & Metrics Ledger */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div className="space-y-3">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#111111] dark:text-zinc-50 leading-[1.08]">
                Software designed to outlast the sprint cycle.
              </h2>
              <p className="text-sm text-[#555555] dark:text-zinc-300 leading-relaxed font-sans pt-2">
                {profile.bio || "Senior Frontend / Full-Stack Engineer with 6+ years of experience architecting scalable, high-performance web applications, specializing primarily in React and Next.js, alongside full-cycle development in Laravel (PHP), WordPress and UI-focused modernizations in .NET. Adept across the complete software development lifecycle, translating complex product requirements into robust, pixel-perfect, and accessible user interfaces with optimized render speeds. Actively accelerates delivery velocity, test coverage, and code maintainability by leveraging modern AI-assisted development workflows."}
              </p>
            </div>

            {/* Engineering Metrics Ledger */}
            <div className="border-t border-[#111111]/12 dark:border-zinc-800/80 pt-6 space-y-4">
              <p className="font-mono text-xs uppercase tracking-wider text-[#D9541E] dark:text-[#E05D27] font-semibold">
                [ PRODUCTION VERIFICATIONS ]
              </p>
              <div className="space-y-4">
                {engineeringMetrics.map((metric, i) => (
                  <div
                    key={metric.label}
                    className="flex flex-col py-2 border-b border-[#111111]/10 dark:border-zinc-800/50"
                  >
                    <div className="flex items-baseline justify-between font-mono text-xs">
                      <span className="text-[#555555] dark:text-zinc-400">0{i + 1} / {metric.label}</span>
                      <span className="font-bold text-[#111111] dark:text-zinc-100">{metric.value}</span>
                    </div>
                    <p className="text-[11px] text-[#555555] dark:text-zinc-400 font-sans mt-0.5">
                      {metric.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Coordinates */}
            <div className="pt-2 font-mono text-xs text-[#555555] dark:text-zinc-400 space-y-2.5 border-t border-[#111111]/12 dark:border-zinc-800/80">
              <p className="flex items-center gap-2">
                <span className="text-[#555555]/70 uppercase text-[10px]">Location:</span>
                <span className="text-[#111111] dark:text-zinc-200 font-medium">{profile.location}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#555555]/70 uppercase text-[10px]">Direct:</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-[#111111] dark:text-zinc-200 hover:text-[#D9541E] dark:hover:text-[#E05D27] transition-colors font-medium underline underline-offset-4"
                >
                  {profile.email}
                </a>
              </p>
              {Boolean(profile.phone && profile.phone.trim()) && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[#555555]/70 uppercase text-[10px]">Mobile:</span>
                  <a
                    href={`tel:${cleanPhoneForTel(profile.phone)}`}
                    className="text-[#111111] dark:text-zinc-200 hover:text-[#D9541E] dark:hover:text-[#E05D27] transition-colors font-medium underline underline-offset-4"
                    title={`Direct Call: ${profile.phone}`}
                  >
                    {profile.phone}
                  </a>
                  <a
                    href={getWhatsAppUrl(profile.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] text-[#111111] dark:text-zinc-300 bg-[#ebe5d8]/70 dark:bg-zinc-800/80 hover:bg-[#ebe5d8] dark:hover:bg-zinc-700 hover:text-zinc-950 dark:hover:text-zinc-100 hover:border-[#D9541E] dark:hover:border-[#D9541E] px-2 py-0.5 rounded border border-[#111111]/10 dark:border-zinc-700/80 transition-colors font-medium"
                    title="Direct WhatsApp Message"
                  >
                    <WhatsAppIcon className="h-3 w-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Authentic Code Specification Artifact */}
          <div className="lg:col-span-7 w-full">
            <CodeEditorCard profile={profile} />
          </div>
        </div>
      </div>
    </section>
  );
}
