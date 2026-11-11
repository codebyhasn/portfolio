"use client";

import Image from "next/image";
import { ArrowUp, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "@/components/icons";
import { cleanPhoneForTel, getWhatsAppUrl } from "@/lib/utils";
import type { Profile } from "@/lib/types";

interface FooterProps {
  profile: Profile;
}

export function Footer({ profile }: FooterProps) {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#111111]/12 dark:border-zinc-800/80 bg-[#ebe5d8]/60 dark:bg-[#0a0b0e] py-16 px-4 sm:px-6 lg:px-8 font-mono text-xs">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-[#111111]/10 dark:border-zinc-800/80 pb-12">
          {/* Brand & Author */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/brand-logo.png?v=4"
                  alt="codebyhasn"
                  width={64}
                  height={64}
                  className="h-full w-full object-contain"
                  unoptimized
                />
              </div>
              <span className="font-bold tracking-wider uppercase text-[#111111] dark:text-zinc-100">
                {profile.name}
              </span>
            </div>
            <p className="text-[11px] text-[#555555] dark:text-zinc-400 font-sans leading-relaxed max-w-xs">
              Senior Frontend &amp; Full-Stack Engineer specializing in high-throughput enterprise applications and resilient web architecture.
            </p>
            {Boolean(profile.phone && profile.phone.trim()) && (
              <div className="flex items-center gap-2 pt-1 font-mono text-[11px] flex-wrap">
                <span className="text-[#555555]">Mobile:</span>
                <a
                  href={`tel:${cleanPhoneForTel(profile.phone)}`}
                  className="text-[#111111] dark:text-zinc-300 hover:text-[#D9541E] dark:hover:text-[#E05D27] underline underline-offset-2 font-medium transition-colors"
                  title={`Call ${profile.phone}`}
                >
                  {profile.phone}
                </a>
                <a
                  href={getWhatsAppUrl(profile.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] text-[#111111] dark:text-zinc-300 bg-[#ebe5d8] dark:bg-zinc-800/80 hover:bg-[#ded7c8] dark:hover:bg-zinc-700 px-1.5 py-0.5 rounded border border-[#111111]/12 dark:border-zinc-700/80 transition-colors font-medium"
                  title="Direct WhatsApp Message"
                >
                  <WhatsAppIcon className="h-3 w-3" />
                  <span>WhatsApp</span>
                </a>
              </div>
            )}
          </div>

          {/* Colophon */}
          <div className="md:col-span-5 space-y-2">
            <p className="text-[10px] uppercase tracking-wider text-[#D9541E] dark:text-[#E05D27] font-semibold">
              COLOPHON // PRODUCTION ARCHITECTURE
            </p>
            <p className="text-[11px] text-[#555555] dark:text-zinc-400 font-sans leading-relaxed">
              Constructed with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. Typography set in Newsreader (Display Serif) and JetBrains Mono (Technical Spec). Deployed from Islamabad, Pakistan.
            </p>
          </div>

          {/* Navigation & Back to Top */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end space-y-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 rounded border border-[#111111]/15 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 px-3 py-1.5 text-xs text-[#111111] dark:text-zinc-300 hover:text-[#D9541E] dark:hover:text-white hover:border-[#D9541E] transition-all cursor-pointer shadow-2xs"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="h-3 w-3" />
            </button>

            <div className="flex items-center gap-2">
              {profile.phone && (
                <>
                  <a
                    href={`tel:${cleanPhoneForTel(profile.phone)}`}
                    className="p-1.5 rounded border border-[#111111]/12 dark:border-zinc-800 text-[#555555] hover:text-[#D9541E] dark:hover:text-[#D9541E] hover:border-[#D9541E] dark:hover:border-[#D9541E] transition-colors"
                    aria-label={`Call ${profile.phone}`}
                    title={`Call ${profile.phone}`}
                  >
                    <Phone className="h-3.5 w-3.5 text-[#D9541E]" />
                  </a>
                  <a
                    href={getWhatsAppUrl(profile.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-[#D9541E] dark:hover:text-[#D9541E] hover:border-[#D9541E] dark:hover:border-[#D9541E] transition-colors"
                    aria-label="Direct WhatsApp Message"
                    title="Direct WhatsApp Message"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                  </a>
                </>
              )}
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-[#D9541E] dark:hover:text-[#D9541E] hover:border-[#D9541E] dark:hover:border-[#D9541E] transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                </a>
              )}
              {profile.linkedIn && (
                <a
                  href={profile.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-[#D9541E] dark:hover:text-[#D9541E] hover:border-[#D9541E] dark:hover:border-[#D9541E] transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400 dark:text-zinc-500">
          <p>© {year} Muhammad Hassan. All engineering rights reserved.</p>
          <p>STRICT ARCHITECTURAL DISCIPLINE • ZERO FLUFF</p>
        </div>
      </div>
    </footer>
  );
}
