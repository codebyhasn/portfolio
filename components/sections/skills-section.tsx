"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, Zap, GitCommit, Layers, Code2 } from "lucide-react";
import { useAnimations } from "@/components/animation-provider";
import type { Skill } from "@/lib/types";

interface SkillsSectionProps {
  skills: Skill[];
}

const doctrines = [
  {
    number: "01",
    title: "Server vs. Client Boundary Discipline",
    tag: "SSR / STREAMING",
    summary:
      "Compute on the server by default. Ship minimal JavaScript across the network wire. Use React Server Components and Next.js App Router to fetch data close to the source, hydrating only the truly interactive leaves of the DOM tree.",
  },
  {
    number: "02",
    title: "State Colocation & Strict Normalization",
    tag: "STATE ARCHITECTURE",
    summary:
      "Never store in global state what belongs in the URL query params or local component scope. In high-throughput banking dashboards, normalize entities via Redux Toolkit adapters to eliminate redundant selector recalculations.",
  },
  {
    number: "03",
    title: "Zero Layout Shift (CLS) & Hard Bundle Budgets",
    tag: "PERFORMANCE",
    summary:
      "Cumulative Layout Shift is unacceptable in production. Every image, skeleton frame, and asynchronous component must strictly reserve its bounding box. Profile bundle chunks aggressively to prevent runtime bloat.",
  },
  {
    number: "04",
    title: "Defensive API Contracts & Type Invariants",
    tag: "TYPE SAFETY",
    summary:
      "Treat all network payloads as untrusted until verified. Pair TypeScript with strict schema validation. Bridge Laravel REST endpoints and Next.js server actions with deterministic typed DTOs.",
  },
];

export function SkillsSection({ skills }: SkillsSectionProps) {
  const { animationsEnabled } = useAnimations();
  const [activeTab, setActiveTab] = useState<string>("ALL");

  const categories = [
    "ALL",
    ...Array.from(new Set(skills.map((s) => s.category))),
  ];

  const filteredSkills =
    activeTab === "ALL"
      ? skills
      : skills.filter((s) => s.category === activeTab);

  return (
    <section id="doctrines" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#111111]/12 dark:border-zinc-800/80">
      <div className="mx-auto max-w-7xl">
        {/* Section Index Marker */}
        <div className="flex items-center justify-between border-b border-[#111111]/12 dark:border-zinc-800/80 pb-3 mb-12 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#D9541E] dark:text-[#E05D27] font-bold">05 //</span>
            <span className="tracking-widest uppercase text-[#555555] dark:text-zinc-400">
              ENGINEERING DOCTRINES &amp; TECHNICAL INVENTORY
            </span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-[#555555]/70 dark:text-zinc-500">
            PRODUCTION PROTOCOLS
          </span>
        </div>

        {/* Header */}
        <div className="mb-14">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#111111] dark:text-zinc-50 tracking-tight">
            Work Philosophy &amp; Stack.
          </h2>
          <p className="font-mono text-xs text-[#555555] dark:text-zinc-400 mt-2 max-w-xl">
            A principled approach to building resilient distributed frontend systems.
          </p>
        </div>

        {/* Part 1: Four Core Engineering Doctrines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {doctrines.map((doc) => (
            <div
              key={doc.number}
              className="editorial-card rounded-lg border border-[#111111]/12 dark:border-zinc-800 bg-white dark:bg-[#111319] p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-3 text-[#555555] dark:text-zinc-400">
                  <span className="font-bold text-[#D9541E] dark:text-[#E05D27]">
                    DOCTRINE // {doc.number}
                  </span>
                  <span className="border border-[#111111]/10 dark:border-zinc-800 px-2 py-0.5 rounded text-[10px]">
                    {doc.tag}
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#111111] dark:text-zinc-50 font-normal mb-3">
                  {doc.title}
                </h3>
                <p className="text-sm text-[#555555] dark:text-zinc-300 leading-relaxed font-sans">
                  {doc.summary}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Part 2: Technical Inventory Matrix */}
        <div className="border border-[#111111]/12 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-[#111319]">
          <div className="flex flex-wrap items-center justify-between border-b border-[#111111]/10 dark:border-zinc-800 bg-[#ebe5d8]/60 dark:bg-[#141720] px-6 py-4 gap-3">
            <div>
              <p className="font-mono text-xs font-bold text-[#111111] dark:text-zinc-100 uppercase tracking-wider">
                Technical Arsenal Ledger
              </p>
              <p className="font-mono text-[11px] text-[#555555] dark:text-zinc-400">
                Verified proficiencies deployed across production codebases
              </p>
            </div>

            {/* Category tabs with shared layout sliding pill */}
            <div className="flex flex-wrap gap-1 font-mono text-xs p-1 rounded-md bg-[#faf8f4] dark:bg-[#0f1117] border border-[#111111]/10 dark:border-zinc-800">
              {categories.map((cat) => {
                const isActive = activeTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`relative px-3 py-1 text-[11px] font-mono rounded transition-colors cursor-pointer select-none ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-[#555555] hover:text-[#111111] dark:text-zinc-400 dark:hover:text-zinc-100"
                    }`}
                  >
                    <span className="relative z-10">{cat}</span>
                    {isActive && (
                      animationsEnabled ? (
                        <motion.span
                          layoutId="activeArsenalPill"
                          className="absolute inset-0 rounded bg-[#D9541E] shadow-xs"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      ) : (
                        <span className="absolute inset-0 rounded bg-[#D9541E] shadow-xs" />
                      )
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid of skills */}
          <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 font-mono text-xs">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.id}
                  layout={animationsEnabled}
                  initial={animationsEnabled ? { opacity: 0, scale: 0.95 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={animationsEnabled ? { opacity: 0, scale: 0.95 } : undefined}
                  transition={{ duration: 0.18 }}
                  className="flex items-center justify-between p-3 rounded border border-[#111111]/10 dark:border-zinc-800/80 bg-[#faf8f4] dark:bg-[#141722] hover:border-[#D9541E]/50 dark:hover:border-zinc-600 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-[#111111] dark:text-zinc-100 truncate">
                      {skill.name}
                    </p>
                    <p className="text-[10px] text-[#555555] dark:text-zinc-400 mt-0.5">{skill.category}</p>
                  </div>
                  <span className="text-[10px] text-[#D9541E] dark:text-[#E05D27] font-semibold ml-2 shrink-0">
                    {skill.level}%
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
