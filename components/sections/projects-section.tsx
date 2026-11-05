"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Lock,
  ArrowUpRight,
  Terminal,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { useAnimations } from "@/components/animation-provider";
import { SPRING_PUNCH } from "@/lib/animations";
import Image from "next/image";
import type { Project } from "@/lib/types";

interface ProjectsSectionProps {
  projects: Project[];
}

const ALL_FILTER = "ALL";

// Case study technical breakdown heuristics based on project profiles
function getCaseStudySpecs(project: Project) {
  const titleLower = project.title.toLowerCase();

  if (titleLower.includes("banking") || titleLower.includes("financial")) {
    return {
      code: "FIN-CORE-01",
      bottleneck: "Legacy financial modules suffered from render latency >2.8s and fragmented state across critical balance tables.",
      approach: "Engineered a Next.js + React SPA with Redux Toolkit normalized entity adapters and atomic cache invalidation.",
      keyDecisions: "Strict TypeScript API contracts, zero-CLS SSR hydration, and audited WCAG 2.1 AA accessibility standards.",
      perfWin: "Sub-second render speeds (280ms P99), 100% zero-regression test coverage, and banking-grade security.",
    };
  }

  if (titleLower.includes(".net") || titleLower.includes("mvc")) {
    return {
      code: "LEGACY-MIGR-02",
      bottleneck: "Outdated Razor layouts caused significant UX friction and slow client-side DOM reconciliation across branch portals.",
      approach: "Executed a non-breaking UI overhaul of .NET MVC Razor views while preserving 100% of underlying controllers.",
      keyDecisions: "Modular component architecture, modern responsive CSS grids, and progressive enhancement techniques.",
      perfWin: "100% backend controller preservation, 40% reduction in customer support tickets, and cohesive modern UI.",
    };
  }

  if (titleLower.includes("international") || titleLower.includes("spa")) {
    return {
      code: "SPA-DIST-03",
      bottleneck: "Traditional monolithic CMS setups caused high payload sizes (>4.2MB) and slow initial client-side paint times.",
      approach: "Migrated international client portals to React SPAs fed by decoupled GraphQL and Laravel REST endpoints.",
      keyDecisions: "GraphQL query batching, dynamic code splitting per route, and exact pixel-perfect Figma translations.",
      perfWin: "65% payload reduction, instantaneous route transitions, and multi-tenant internationalization.",
    };
  }

  if (titleLower.includes("component") || titleLower.includes("library")) {
    return {
      code: "DESIGN-SYS-04",
      bottleneck: "Inconsistent UI patterns across team repositories resulting in duplicate styling and delayed sprint cycles.",
      approach: "Engineered a cross-team reusable component library using Tailwind CSS, PrimeReact, and strict a11y primitives.",
      keyDecisions: "Tokenized design system, automated Storybook documentation, and zero-runtime overhead.",
      perfWin: "3x accelerated sprint delivery cadence and established unified visual language company-wide.",
    };
  }

  return {
    code: `PROD-${project.id.toString().padStart(2, "0")}`,
    bottleneck: "Disjointed data fetching and unoptimized frontend pipelines causing layout shifts on dynamic load.",
    approach: "Modernized frontend architecture with modular React components and scalable Laravel backend integrations.",
    keyDecisions: "RESTful API query caching, strict type inference, and semantic HTML structure.",
    perfWin: "Fast time-to-interactive (<500ms) and predictable client-side state transitions.",
  };
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { animationsEnabled } = useAnimations();

  const allTags = [
    ALL_FILTER,
    ...Array.from(new Set(projects.flatMap((p) => p.tags))).sort(),
  ];
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);

  const filtered =
    activeFilter === ALL_FILTER
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="works" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div className="mx-auto max-w-7xl">
        {/* Section Index Marker */}
        <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800/80 pb-3 mb-10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-amber-600 dark:text-amber-500 font-bold">03 //</span>
            <span className="tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
              INDEXED CASE STUDIES &amp; SYSTEMS ARCHITECTURE
            </span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
            [{projects.length} VERIFIED PRODUCTION SHIPS]
          </span>
        </div>

        {/* Section Heading Spread */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-zinc-950 dark:text-zinc-50 tracking-tight">
              Selected Case Studies.
            </h2>
            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl">
              Concrete architectural decisions, technical bottlenecks, and measurable production outcomes.
            </p>
          </div>

          {/* Filter Bar styled like an architectural punch card */}
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            {allTags.slice(0, 6).map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-3 py-1 rounded border text-[11px] transition-all cursor-pointer ${
                  activeFilter === tag
                    ? "border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 font-bold"
                    : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600"
                }`}
              >
                {tag === ALL_FILTER ? "ALL [INDEX]" : tag}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Vertical Dossier */}
        <div className="space-y-16">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => {
              const spec = getCaseStudySpecs(project);
              const caseIndex = (idx + 1).toString().padStart(2, "0");

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={animationsEnabled ? { opacity: 0, y: 24 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={animationsEnabled ? { opacity: 0, scale: 0.98 } : undefined}
                  transition={SPRING_PUNCH}
                  className="editorial-card rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#111319] overflow-hidden"
                >
                  {/* Case Study Masthead Header */}
                  <div className="flex flex-wrap items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-[#151822] px-5 sm:px-8 py-3.5 text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-amber-600 dark:text-amber-500">
                        CASE_{caseIndex}
                      </span>
                      <span className="text-zinc-300 dark:text-zinc-700">/</span>
                      <span className="text-zinc-500 dark:text-zinc-400">{spec.code}</span>
                      {project.featured && (
                        <span className="ml-2 inline-flex items-center gap-1 rounded bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] text-amber-700 dark:text-amber-400 font-semibold">
                          PRIMARY ARCHITECTURE
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-[11px] text-zinc-500 pt-1 sm:pt-0">
                      <span>STATUS: DEPLOYED</span>
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-zinc-900 dark:text-zinc-200 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors"
                        >
                          <span>LIVE DEMO</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="flex items-center gap-1 text-zinc-400">
                          <Lock className="h-3 w-3" />
                          <span>ENTERPRISE NDA</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Case Content Grid: Split Screen Viewport + Technical Breakdown */}
                  <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Project Description & Case Breakdown */}
                    <div className="lg:col-span-7 flex flex-col space-y-6">
                      <div>
                        <h3 className="font-serif text-2xl sm:text-3xl text-zinc-950 dark:text-zinc-50 tracking-tight">
                          {project.title}
                        </h3>
                        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                          {project.description}
                        </p>
                      </div>

                      {/* Technical Breakdown Matrix */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-zinc-200/80 dark:border-zinc-800/80 pt-5 font-mono text-xs">
                        <div className="p-3.5 rounded border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-[#141720]">
                          <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-semibold mb-1 text-[11px]">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            <span>THE BOTTLENECK</span>
                          </div>
                          <p className="text-[12px] text-zinc-600 dark:text-zinc-400 font-sans leading-normal">
                            {spec.bottleneck}
                          </p>
                        </div>

                        <div className="p-3.5 rounded border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-[#141720]">
                          <div className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 font-semibold mb-1 text-[11px]">
                            <Terminal className="h-3.5 w-3.5" />
                            <span>TECHNICAL APPROACH</span>
                          </div>
                          <p className="text-[12px] text-zinc-600 dark:text-zinc-400 font-sans leading-normal">
                            {spec.approach}
                          </p>
                        </div>

                        <div className="p-3.5 rounded border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-[#141720]">
                          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold mb-1 text-[11px]">
                            <Zap className="h-3.5 w-3.5" />
                            <span>KEY STACK DECISIONS</span>
                          </div>
                          <p className="text-[12px] text-zinc-600 dark:text-zinc-400 font-sans leading-normal">
                            {spec.keyDecisions}
                          </p>
                        </div>

                        <div className="p-3.5 rounded border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-[#141720]">
                          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold mb-1 text-[11px]">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>PERFORMANCE WIN</span>
                          </div>
                          <p className="text-[12px] text-zinc-600 dark:text-zinc-400 font-sans leading-normal">
                            {spec.perfWin}
                          </p>
                        </div>
                      </div>

                      {/* Stack Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.map((tag) => (
                          <span key={tag} className="tech-chip">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Real Browser Viewport Mockup */}
                    <div className="lg:col-span-5 w-full">
                      <div className="rounded border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-[#161922] overflow-hidden shadow-sm">
                        {/* Browser Top Chrome */}
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-3 py-2 bg-zinc-50 dark:bg-[#13151e] text-[10px] font-mono text-zinc-400 select-none">
                          <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                            <span className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                            <span className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                          </div>
                          <div className="rounded bg-white dark:bg-[#0c0d12] border border-zinc-200 dark:border-zinc-800 px-3 py-0.5 text-zinc-500 dark:text-zinc-400 truncate max-w-[200px]">
                            https://system.internal/{project.slug}
                          </div>
                          <span className="text-[9px] uppercase text-emerald-500 font-medium">SSL 256</span>
                        </div>

                        {/* Viewport Canvas */}
                        <div className="relative aspect-[16/10] w-full bg-zinc-950 flex flex-col justify-center items-center overflow-hidden p-6 text-center">
                          {project.coverImage ? (
                            <Image
                              src={project.coverImage}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="space-y-3 font-mono">
                              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-amber-400">
                                <Activity className="h-6 w-6" />
                              </div>
                              <div>
                                <p className="text-white text-xs font-semibold">{project.title}</p>
                                <p className="text-zinc-500 text-[11px] mt-0.5">Architecture Mockup • Verified</p>
                              </div>
                              <span className="inline-block text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                                P99 Latency: 280ms
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* External Action Links */}
                      <div className="flex items-center justify-between pt-3 font-mono text-xs">
                        {project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100"
                          >
                            <GithubIcon className="h-3.5 w-3.5" />
                            <span>Repository [Inspect Code]</span>
                          </a>
                        ) : (
                          <span className="text-zinc-400 dark:text-zinc-500 text-[11px]">
                            // Internal Proprietary IP
                          </span>
                        )}

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline"
                          >
                            <span>Open Deployment</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
