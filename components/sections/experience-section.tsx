"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar, MapPin, Building, ArrowUpRight } from "lucide-react";
import { useAnimations } from "@/components/animation-provider";
import type { Experience } from "@/lib/types";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const [expanded, setExpanded] = useState<number | null>(0);
  const { animationsEnabled } = useAnimations();

  return (
    <section id="chronology" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div className="mx-auto max-w-7xl">
        {/* Section Index Marker */}
        <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800/80 pb-3 mb-12 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-amber-600 dark:text-amber-500 font-bold">04 //</span>
            <span className="tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
              CHRONOLOGY &amp; EMPLOYMENT DOSSIER
            </span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
            6+ YEARS SENIOR TRACK RECORD
          </span>
        </div>

        {/* Header Title */}
        <div className="mb-14">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-zinc-950 dark:text-zinc-50 tracking-tight">
            Work History.
          </h2>
          <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl">
            Verified production tenures, enterprise ownership, and engineering team leadership.
          </p>
        </div>

        {/* Architectural Timeline Spread: Left dates, right dossier */}
        <div className="space-y-8">
          {experiences.map((exp, index) => {
            const isCurrent = exp.endDate === "Present" || exp.endDate.toLowerCase().includes("present");
            const isOpen = expanded === index;

            return (
              <div
                key={exp.id}
                className="editorial-card rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#111319] overflow-hidden"
              >
                {/* Header Strip - Clickable */}
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : index)}
                  className="w-full text-left p-6 sm:p-8 cursor-pointer focus:outline-none focus-visible:bg-zinc-50 dark:focus-visible:bg-zinc-900/50"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    {/* Date Period column */}
                    <div className="md:col-span-3 font-mono text-xs space-y-1">
                      <div className="flex items-center gap-2">
                        {isCurrent ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            CURRENT ROLE
                          </span>
                        ) : (
                          <span className="text-zinc-400 text-[10px] font-semibold">RECORD 0{index + 1}</span>
                        )}
                      </div>
                      <p className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                        {exp.startDate} — {exp.endDate}
                      </p>
                      <p className="text-zinc-500 text-[11px] flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {exp.location}
                      </p>
                    </div>

                    {/* Role & Company column */}
                    <div className="md:col-span-8 space-y-1">
                      <h3 className="font-serif text-xl sm:text-2xl text-zinc-950 dark:text-zinc-50 font-normal">
                        {exp.role}
                      </h3>
                      <p className="font-mono text-xs font-semibold text-amber-600 dark:text-amber-500 flex items-center gap-1.5">
                        <Building className="h-3 w-3" />
                        {exp.company}
                      </p>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-sans pt-1 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Stack preview */}
                      <div className="flex flex-wrap gap-1.5 pt-3">
                        {exp.techStack.map((tech) => (
                          <span key={tech} className="tech-chip text-[11px]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Toggle Chevron */}
                    <div className="md:col-span-1 flex justify-end">
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-zinc-400 dark:text-zinc-500 mt-1"
                      >
                        <ChevronDown className="h-5 w-5" />
                      </motion.div>
                    </div>
                  </div>
                </button>

                {/* Expandable Key Architectural Achievements */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={animationsEnabled ? { height: 0, opacity: 0 } : false}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={animationsEnabled ? { height: 0, opacity: 0 } : undefined}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-[#151822]"
                    >
                      <div className="p-6 sm:p-8 space-y-3">
                        <p className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-2">
                          [ ARCHITECTURAL CONTRIBUTIONS &amp; CORE IMPACT ]
                        </p>
                        <ul className="space-y-3 font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                          {exp.achievements.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="font-mono text-xs text-amber-600 dark:text-amber-500 mt-1 shrink-0">
                                0{i + 1}.
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
