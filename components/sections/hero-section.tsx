"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  Mail,
  ArrowDown,
  ArrowUpRight,
  Download,
  Terminal,
  FileCode2,
  Check,
  Cpu,
  GitBranch,
  ShieldCheck,
  Phone,
  PhoneCall,
  Eye,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "@/components/icons";
import { ResumeModal } from "@/components/resume-modal";
import { cleanPhoneForTel, getWhatsAppUrl } from "@/lib/utils";
import { useAnimations } from "@/components/animation-provider";
import { SPRING_PUNCH } from "@/lib/animations";
import type { Profile } from "@/lib/types";

interface HeroSectionProps {
  profile: Profile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { animationsEnabled } = useAnimations();
  const hasAvatar = Boolean(profile.avatarUrl && profile.showAvatar);

  return (
    <section
      id="architecture"
      className="relative pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Index Marker */}
        <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800/80 pb-3 mb-10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-amber-600 dark:text-amber-500 font-bold">01 //</span>
            <span className="tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
              ARCHITECTURE &amp; CORE DIRECTIVE
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-zinc-400 dark:text-zinc-500 text-[11px]">
            <span>ENGINEERING DOSSIER</span>
            <span>•</span>
            <span>EDITION 2026</span>
          </div>
        </div>

        {/* Editorial Grid: Split Broadside */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Typography Column */}
          <div className="lg:col-span-7 flex flex-col space-y-7">
            {/* Live Availability Pill */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#111111]/15 dark:border-white/15 bg-[#ebe5d8]/90 dark:bg-[#1a1d24] px-3.5 py-1 text-xs font-mono text-[#111111] dark:text-zinc-200 shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                </span>
                <span className="tracking-wide font-medium">
                  {profile.availableForWork
                    ? "AVAILABLE FOR FULL-TIME & SELECT CONTRACTS"
                    : "CURRENTLY COMMITTED • OPEN TO DISCUSSIONS"}
                </span>
              </span>
            </div>

            {/* Editorial Headline */}
            <div className="space-y-2">
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-[#111111] dark:text-zinc-50">
                Muhammad <br />
                <span className="italic font-light text-[#222222] dark:text-zinc-200">
                  Hassan.
                </span>
              </h1>
              <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#D9541E] dark:text-[#E05D27] pt-2 font-medium">
                {profile.headline || "Senior Frontend & Full-Stack Interface Architect"}
              </p>
            </div>

            {/* Directive Paragraph */}
            <p className="text-base sm:text-lg text-[#555555] dark:text-zinc-300 leading-relaxed max-w-2xl font-sans">
              {profile.bio ||
                "Specialized in the nexus between heavy enterprise infrastructure and surgical UI velocity. 6+ years engineering mission-critical banking portals, resilient state architectures, and robust Laravel microservices."}
            </p>

            {/* Structured Engineering Spec Sheet */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-[#111111]/12 dark:border-white/10 py-5 font-mono text-xs">
              <div>
                <p className="text-[10px] uppercase text-[#555555]/80 dark:text-zinc-400 tracking-wider">Coordinates</p>
                <p className="font-medium text-[#111111] dark:text-zinc-200 mt-1 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-[#D9541E]" />
                  {profile.location || "Islamabad, PK"}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#555555]/80 dark:text-zinc-400 tracking-wider">Experience</p>
                <p className="font-medium text-[#111111] dark:text-zinc-200 mt-1">
                  6+ Years Production
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[#555555]/80 dark:text-zinc-400 tracking-wider">Core Stack</p>
                <p className="font-medium text-[#111111] dark:text-zinc-200 mt-1">
                  React · Next.js · Laravel
                </p>
              </div>
            </div>

            {/* Mechanical Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#dispatch"
                className="inline-flex items-center gap-2 rounded-md bg-[#D9541E] hover:bg-[#bf4615] text-white px-5 py-3 text-xs font-mono font-semibold tracking-wide transition-all shadow-xs cursor-pointer"
              >
                <span>INITIATE CONTACT</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={() => setIsResumeOpen(true)}
                className="inline-flex items-center gap-2 rounded-md border border-[#111111]/15 dark:border-white/15 bg-white dark:bg-[#14161c] text-[#111111] dark:text-zinc-200 px-5 py-3 text-xs font-mono font-medium hover:border-[#D9541E] hover:text-[#D9541E] dark:hover:text-white transition-all cursor-pointer shadow-2xs"
              >
                <Eye className="h-3.5 w-3.5 text-[#D9541E]" />
                <span>VERIFIED DOSSIER [PDF]</span>
              </button>

              {/* Direct channels & social links */}
              <div className="flex items-center gap-1.5 ml-auto sm:ml-2">
                {profile.phone && (
                  <>
                    <a
                      href={`tel:${cleanPhoneForTel(profile.phone)}`}
                      aria-label={`Call ${profile.phone}`}
                      title={`Direct Call: ${profile.phone}`}
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-[#111111]/12 dark:border-white/10 bg-[#ebe5d8]/80 dark:bg-zinc-900/60 text-[#555555] dark:text-zinc-400 hover:text-[#D9541E] dark:hover:text-[#D9541E] hover:border-[#D9541E] dark:hover:border-[#D9541E] transition-colors"
                    >
                      <Phone className="h-4 w-4 text-[#D9541E]" />
                    </a>
                    <a
                      href={getWhatsAppUrl(profile.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Direct WhatsApp Message"
                      title="Direct WhatsApp Message"
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-[#111111]/12 dark:border-white/10 bg-[#ebe5d8]/80 dark:bg-zinc-900/60 text-[#555555] dark:text-zinc-400 hover:text-[#D9541E] dark:hover:text-[#D9541E] hover:border-[#D9541E] dark:hover:border-[#D9541E] transition-colors"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                    </a>
                  </>
                )}
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-[#111111]/12 dark:border-white/10 bg-[#ebe5d8]/80 dark:bg-zinc-900/60 text-[#555555] dark:text-zinc-400 hover:text-[#D9541E] dark:hover:text-[#D9541E] hover:border-[#D9541E] dark:hover:border-[#D9541E] transition-colors"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>
                )}
                {profile.linkedIn && (
                  <a
                    href={profile.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-[#111111]/12 dark:border-white/10 bg-[#ebe5d8]/80 dark:bg-zinc-900/60 text-[#555555] dark:text-zinc-400 hover:text-[#D9541E] dark:hover:text-[#D9541E] hover:border-[#D9541E] dark:hover:border-[#D9541E] transition-colors"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Secondary Column: Real Production Code Pipeline or Framed Portrait */}
          <div className="lg:col-span-5 w-full">
            {hasAvatar ? (
              /* Mode A: Clean Architectural Framed Portrait */
              <div className="relative rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 p-3">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-zinc-200 dark:bg-zinc-950">
                  <Image
                    src={profile.avatarUrl!}
                    alt={profile.name}
                    fill
                    className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 font-mono text-[11px] text-zinc-200 flex justify-between items-end">
                    <div>
                      <p className="font-bold text-white text-sm">{profile.name}</p>
                      <p className="text-zinc-400">SR. INTERFACE ARCHITECT</p>
                    </div>
                    <span className="text-amber-400 text-[10px]">VERIFIED 2026</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Mode B: Real Production Code Breakdown Artifact */
              <div className="rounded-lg border border-zinc-300 dark:border-zinc-800/90 bg-white dark:bg-[#0f1117] shadow-xl overflow-hidden font-mono">
                {/* IDE Window Title Bar */}
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#141720] px-4 py-2.5 text-xs select-none">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300 text-[11px]">
                    <FileCode2 className="h-3.5 w-3.5 text-amber-500" />
                    <span>action-pipeline.ts</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 uppercase">Production</span>
                </div>

                {/* Code Content */}
                <div className="p-4 sm:p-5 text-xs leading-relaxed overflow-x-auto text-zinc-800 dark:text-zinc-200 space-y-2">
                  <p className="text-zinc-400 dark:text-zinc-500 text-[11px]">
                    // ⚡ Real-Time Banking Transaction Stream
                  </p>
                  <p>
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">export async function</span>{" "}
                    <span className="text-sky-600 dark:text-sky-300 font-medium">executeFinancialTransfer</span>
                    (payload: TransferPayload) &#123;
                  </p>
                  <div className="pl-4 border-l border-zinc-200 dark:border-zinc-800/80 space-y-1">
                    <p className="text-zinc-500 text-[11px]">
                      // 1. Enforce strict session &amp; CSRF boundary
                    </p>
                    <p>
                      <span className="text-purple-600 dark:text-purple-400">const</span> session ={" "}
                      <span className="text-amber-600 dark:text-amber-400">await</span>{" "}
                      <span className="text-emerald-600 dark:text-emerald-400">verifySession</span>();
                    </p>
                    <p className="text-zinc-500 text-[11px] pt-1">
                      // 2. High-throughput ledger reconciliation
                    </p>
                    <p>
                      <span className="text-purple-600 dark:text-purple-400">const</span> result ={" "}
                      <span className="text-amber-600 dark:text-amber-400">await</span> laravelBackend.
                      <span className="text-sky-600 dark:text-sky-300">transact</span>(&#123;
                    </p>
                    <p className="pl-4 text-zinc-600 dark:text-zinc-400">
                      account: session.id, amount: payload.sum, mode: &quot;ATOMIC&quot;
                    </p>
                    <p>&#125;);</p>
                    <p className="text-zinc-500 text-[11px] pt-1">
                      // 3. Purge cached ledger queries instantly
                    </p>
                    <p>
                      <span className="text-amber-600 dark:text-amber-400">revalidateTag</span>
                      (<span className="text-emerald-600 dark:text-emerald-300">&quot;balance-ledger&quot;</span>);
                    </p>
                    <p>
                      <span className="text-purple-600 dark:text-purple-400">return</span> &#123; status: 200, latency: &quot;42ms&quot; &#125;;
                    </p>
                  </div>
                  <p>&#125;</p>
                </div>

                {/* Footer spec bar */}
                <div className="border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#12151e] px-4 py-2 flex items-center justify-between text-[10px] text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <GitBranch className="h-3 w-3 text-amber-500" />
                    <span>main / rev: 8f42c1</span>
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                    <ShieldCheck className="h-3 w-3" />
                    Strict Types Validated
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
      />
    </section>
  );
}
