"use client";

import { useState } from "react";
import { Terminal, Shield, Zap, GitCommit, Layers, Code2 } from "lucide-react";
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
    <section id="doctrines" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div className="mx-auto max-w-7xl">
        {/* Section Index Marker */}
        <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800/80 pb-3 mb-12 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-amber-600 dark:text-amber-500 font-bold">05 //</span>
            <span className="tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
              ENGINEERING DOCTRINES &amp; TECHNICAL INVENTORY
            </span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
            PRODUCTION PROTOCOLS
          </span>
        </div>

        {/* Header */}
        <div className="mb-14">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-zinc-950 dark:text-zinc-50 tracking-tight">
            Work Philosophy &amp; Stack.
          </h2>
          <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl">
            A principled approach to building resilient distributed frontend systems.
          </p>
        </div>

        {/* Part 1: Four Core Engineering Doctrines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {doctrines.map((doc) => (
            <div
              key={doc.number}
              className="editorial-card rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#111319] p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-3 text-zinc-400">
                  <span className="font-bold text-amber-600 dark:text-amber-500">
                    DOCTRINE // {doc.number}
                  </span>
                  <span className="border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded text-[10px]">
                    {doc.tag}
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-zinc-950 dark:text-zinc-50 font-normal mb-3">
                  {doc.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                  {doc.summary}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Part 2: Technical Inventory Matrix */}
        <div className="border border-zinc-300 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-[#111319]">
          <div className="flex flex-wrap items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#141720] px-6 py-4">
            <div>
              <p className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Technical Arsenal Ledger
              </p>
              <p className="font-mono text-[11px] text-zinc-500">
                Verified proficiencies deployed across production codebases
              </p>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-1 font-mono text-xs pt-2 sm:pt-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-2.5 py-1 text-[11px] rounded transition-all cursor-pointer ${
                    activeTab === cat
                      ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-semibold"
                      : "text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of skills */}
          <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 font-mono text-xs">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between p-3 rounded border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-[#141722] hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    {skill.name}
                  </p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">{skill.category}</p>
                </div>
                <span className="text-[10px] text-amber-600 dark:text-amber-500 font-semibold ml-2 shrink-0">
                  {skill.level}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
