"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Award, ArrowUpRight, CheckCircle2, BookOpen } from "lucide-react";
import { useAnimations } from "@/components/animation-provider";
import type { Credential } from "@/lib/types";

interface CredentialsSectionProps {
  credentials: Credential[];
}

export function CredentialsSection({ credentials }: CredentialsSectionProps) {
  const { animationsEnabled } = useAnimations();
  const [activeTab, setActiveTab] = useState<string>("ALL");

  const categories = [
    "ALL",
    ...Array.from(new Set(credentials.map((c) => c.type).filter(Boolean))),
  ];

  const filteredCredentials =
    activeTab === "ALL"
      ? credentials
      : credentials.filter((c) => c.type === activeTab);

  return (
    <section
      id="credentials"
      className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-[#111111]/12 dark:border-zinc-800/80"
    >
      <div id="education" className="absolute -top-24 pointer-events-none" aria-hidden="true" />
      <div className="mx-auto max-w-7xl">
        {/* Section Index Marker */}
        <div className="flex items-center justify-between border-b border-[#111111]/12 dark:border-zinc-800/80 pb-3 mb-12 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#D9541E] dark:text-[#E05D27] font-bold">04 //</span>
            <span className="tracking-widest uppercase text-[#555555] dark:text-zinc-400">
              ACADEMIC FOUNDATIONS &amp; CREDENTIALS
            </span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-[#555555]/70 dark:text-zinc-500">
            VERIFIED ACCREDITATION
          </span>
        </div>

        {/* Header Strip with Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#111111] dark:text-zinc-50 tracking-tight">
              Education &amp; Certifications.
            </h2>
            <p className="font-mono text-xs text-[#555555] dark:text-zinc-400 mt-2 max-w-xl">
              Accredited university foundations, continuous professional specializations, and verified technical credentials.
            </p>
          </div>

          {/* Category Filter Tabs with Sliding Pill Animation */}
          {categories.length > 2 && (
            <div className="flex flex-wrap gap-1 font-mono text-xs p-1 rounded-md bg-[#ebe5d8]/70 dark:bg-[#141720] border border-[#111111]/10 dark:border-zinc-800 self-start md:self-auto">
              {categories.map((cat) => {
                const isActive = activeTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`relative px-3.5 py-1.5 text-xs font-mono rounded transition-colors cursor-pointer select-none ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-[#555555] hover:text-[#111111] dark:text-zinc-400 dark:hover:text-zinc-100"
                    }`}
                  >
                    <span className="relative z-10">{cat}</span>
                    {isActive && (
                      animationsEnabled ? (
                        <motion.span
                          layoutId="activeCredentialPill"
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
          )}
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCredentials.map((cred, index) => (
              <motion.div
                key={cred.id}
                layout={animationsEnabled}
                initial={animationsEnabled ? { opacity: 0, y: 15 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={animationsEnabled ? { opacity: 0, scale: 0.96 } : undefined}
                transition={{ duration: 0.22, delay: index * 0.05 }}
                className="editorial-card rounded-lg border border-[#111111]/12 dark:border-zinc-800 bg-white dark:bg-[#111319] p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  {/* Top metadata strip */}
                  <div className="flex items-center justify-between font-mono text-xs mb-3 text-[#555555] dark:text-zinc-400">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#ebe5d8]/80 dark:bg-zinc-800 text-[#111111] dark:text-zinc-200">
                      {cred.type === "Education" ? (
                        <GraduationCap className="h-3 w-3 text-[#D9541E]" />
                      ) : (
                        <Award className="h-3 w-3 text-[#D9541E]" />
                      )}
                      {cred.type}
                    </span>
                    <span className="text-[11px] font-mono text-[#555555] dark:text-zinc-400">
                      {cred.period}
                    </span>
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="font-serif text-xl sm:text-2xl text-[#111111] dark:text-zinc-50 font-normal leading-snug">
                    {cred.title}
                  </h3>
                  <p className="font-mono text-xs font-semibold text-[#D9541E] dark:text-[#E05D27] mt-2 flex items-center gap-1.5">
                    <span>{cred.issuer}</span>
                  </p>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-[#555555] dark:text-zinc-300 mt-3 leading-relaxed">
                    {cred.description}
                  </p>
                </div>

                {/* Footer strip: Verify link or credential badge */}
                <div className="pt-4 mt-6 border-t border-[#111111]/10 dark:border-zinc-800/80 flex items-center justify-between font-mono text-xs">
                  {cred.url ? (
                    <a
                      href={cred.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#D9541E] hover:text-[#bf4615] transition-colors"
                    >
                      <span>[ Verify Credential ]</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#555555] dark:text-zinc-400">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      <span>Degree Conferred</span>
                    </span>
                  )}
                  <span className="text-[10px] text-[#555555]/60 dark:text-zinc-500 uppercase">
                    ID #{cred.id}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

