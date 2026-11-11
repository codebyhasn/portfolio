"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { WhatsAppIcon } from "@/components/icons";
import { cleanPhoneForTel, getWhatsAppUrl } from "@/lib/utils";
import { useAnimations } from "@/components/animation-provider";
import type { Profile, NavSection } from "@/lib/types";

const defaultNavItems = [
  { key: "architecture", number: "01", label: "Architecture", targetId: "#architecture" },
  { key: "dossier", number: "02", label: "Dossier", targetId: "#about" },
  { key: "chronology", number: "03", label: "Chronology", targetId: "#chronology" },
  { key: "credentials", number: "04", label: "Credentials", targetId: "#credentials" },
  { key: "works", number: "05", label: "Works", targetId: "#works" },
  { key: "doctrines", number: "06", label: "Doctrines", targetId: "#doctrines" },
  { key: "dispatch", number: "07", label: "Dispatch", targetId: "#dispatch" },
];

export function Navbar({
  profile,
  navSections,
}: {
  profile?: Profile;
  navSections?: NavSection[];
} = {}) {
  const { animationsEnabled } = useAnimations();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [localTime, setLocalTime] = useState("");

  const activeNavItems = useMemo(() => {
    return (navSections && navSections.length > 0 ? navSections : defaultNavItems).map(
      (item, idx) => ({
        key: item.key,
        index: item.number || (idx + 1).toString().padStart(2, "0"),
        label: item.label,
        href: item.targetId.startsWith("#") ? item.targetId : `#${item.targetId}`,
      })
    );
  }, [navSections]);

  const [activeSection, setActiveSection] = useState<string>(
    activeNavItems[0]?.href.slice(1) || "architecture"
  );

  // Real-time Islamabad clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Karachi",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      });
      setLocalTime(timeStr);
    };

    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section as user scrolls
  useEffect(() => {
    const sectionIds = activeNavItems.map((item) => item.href.slice(1));
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 140;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [activeNavItems]);

  // Helper to locate target section element by anchor id or known aliases
  const findTargetElement = useCallback((targetId: string): HTMLElement | null => {
    if (!targetId) return null;
    const cleanId = targetId.startsWith("#") ? targetId.slice(1) : targetId;
    return (
      document.getElementById(cleanId) ||
      (cleanId === "dossier" ? document.getElementById("about") : null) ||
      (cleanId === "about" ? document.getElementById("dossier") : null) ||
      (cleanId === "chronology" ? document.getElementById("experience") : null) ||
      (cleanId === "experience" ? document.getElementById("chronology") : null) ||
      (cleanId === "credentials" ? document.getElementById("education") : null) ||
      (cleanId === "education" ? document.getElementById("credentials") : null) ||
      (cleanId === "works" ? document.getElementById("projects") : null) ||
      (cleanId === "projects" ? document.getElementById("works") : null) ||
      (cleanId === "doctrines" ? document.getElementById("skills") : null) ||
      (cleanId === "skills" ? document.getElementById("doctrines") : null) ||
      (cleanId === "dispatch" ? document.getElementById("contact") : null) ||
      (cleanId === "contact" ? document.getElementById("dispatch") : null) ||
      (cleanId === "architecture" ? document.getElementById("hero") : null) ||
      (cleanId === "hero" ? document.getElementById("architecture") : null)
    );
  }, []);

  // Smooth scroll handler with robust mobile compatibility and drawer exit handling
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMobileOpen(false);

      if (href.startsWith("#")) {
        const targetId = href.slice(1);
        const element = findTargetElement(targetId);

        if (element) {
          const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
          // Responsive header compensation (mobile header is 56px, desktop with ticker is 88px)
          const headerOffset = isMobile ? 64 : 88;
          const elementTop = element.getBoundingClientRect().top;
          const targetY = Math.max(0, elementTop + (window.pageYOffset || window.scrollY) - headerOffset);

          if (window.history.pushState) {
            window.history.pushState(null, "", href);
          }

          const performScroll = (behavior: ScrollBehavior = "smooth") => {
            window.scrollTo({
              top: targetY,
              behavior,
            });
          };

          // 1. Initial scroll trigger
          performScroll("smooth");

          // 2. On mobile, drawer height collapse can cancel in-flight smooth scroll in Safari/WebKit.
          // Re-trigger scroll after animation start and finish to guarantee landing.
          if (isMobile) {
            setTimeout(() => {
              if (Math.abs((window.pageYOffset || window.scrollY) - targetY) > 40) {
                performScroll("smooth");
              }
            }, 100);

            setTimeout(() => {
              if (Math.abs((window.pageYOffset || window.scrollY) - targetY) > 40) {
                performScroll("auto");
              }
            }, 250);
          }
        } else {
          window.location.hash = href;
        }
      } else {
        window.location.href = href;
      }
    },
    [findTargetElement]
  );

  const homeHref = activeNavItems[0]?.href || "#architecture";
  const dispatchSection =
    activeNavItems.find((it) => it.key === "dispatch") ||
    activeNavItems[activeNavItems.length - 1];
  const dispatchHref = dispatchSection?.href || "#dispatch";
  const dispatchLabel = dispatchSection?.label || "Dispatch";

  return (
    <motion.header
      initial={animationsEnabled ? { y: -70, opacity: 0 } : false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`fixed top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "border-b border-[#111111]/12 dark:border-zinc-800/80 bg-[#f3eee3]/95 dark:bg-[#0e0f12]/95 backdrop-blur-md"
          : "bg-[#f3eee3]/85 dark:bg-[#0e0f12]/85 backdrop-blur-xs border-b border-[#111111]/8 dark:border-zinc-800/40"
      }`}
    >
      {/* Top Editorial Ticker Strip */}
      <div className="hidden sm:flex h-7 items-center justify-between border-b border-[#111111]/10 dark:border-zinc-800/60 px-4 sm:px-6 lg:px-8 text-[11px] font-mono text-[#555555] dark:text-zinc-400 select-none bg-[#ebe5d8]/70 dark:bg-[#0a0b0e]/70">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-[#111111] dark:text-zinc-300">ISLAMABAD, PK</span>
          </span>
          <span className="text-[#111111]/20 dark:text-zinc-700">/</span>
          <span>{localTime ? `${localTime} PKT` : "UTC+5"}</span>
        </div>
        <div className="flex items-center gap-4">
          {profile?.phone && (
            <div className="hidden lg:flex items-center gap-2 text-[10px]">
              <a
                href={`tel:${cleanPhoneForTel(profile.phone)}`}
                className="flex items-center gap-1 text-[#555555] dark:text-zinc-400 hover:text-[#D9541E] dark:hover:text-[#E05D27] transition-colors"
                title={`Call ${profile.phone}`}
              >
                <Phone className="h-3 w-3 text-[#D9541E]" />
                <span>{profile.phone}</span>
              </a>
              <span className="text-[#111111]/20 dark:text-zinc-700">|</span>
              <a
                href={getWhatsAppUrl(profile.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#555555] dark:text-zinc-400 hover:text-[#D9541E] dark:hover:text-[#E05D27] transition-colors"
                title="Direct WhatsApp Message"
              >
                <WhatsAppIcon className="h-3 w-3" />
                <span>WhatsApp</span>
              </a>
              <span className="text-[#111111]/20 dark:text-zinc-700">/</span>
            </div>
          )}
          <span className="hidden md:inline">
            SYSTEM STATUS:{" "}
            <span
              className={
                profile?.availableForWork !== false
                  ? "text-emerald-700 dark:text-emerald-400 font-medium"
                  : "text-[#D9541E] dark:text-[#E05D27] font-medium"
              }
            >
              ONLINE • {profile?.availableForWork !== false ? "AVAILABLE FOR WORK" : "COMMITTED • ADVISORY ONLY"}
            </span>
          </span>
          <span className="text-[#111111]/20 dark:text-zinc-700 hidden md:inline">/</span>
          <span className="text-[#111111] dark:text-zinc-300 font-medium">SENIOR FRONTEND &amp; FULL-STACK</span>
        </div>
      </div>

      {/* Main Masthead Bar */}
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Neutral Monochrome Brand Vector */}
        <a
          href={homeHref}
          onClick={(e) => handleNavClick(e, homeHref)}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 transition-transform duration-200 group-hover:scale-105 flex items-center justify-center">
            <Image
              src="/brand-logo.png?v=4"
              alt="codebyhasn"
              width={72}
              height={72}
              className="h-full w-full object-contain"
              priority
              unoptimized
            />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold tracking-wider uppercase text-[#111111] dark:text-zinc-100">
              Muhammad Hassan
            </span>
            <span className="text-[10px] font-mono text-[#555555] dark:text-zinc-400 tracking-tight">
              Interface Architect
            </span>
          </div>
        </a>

        {/* Structured Desktop Navigation with Index Prefixes */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 font-mono text-xs">
          {activeNavItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`group flex items-center gap-1.5 py-1 transition-colors cursor-pointer ${
                  isActive
                    ? "text-[#111111] dark:text-zinc-100 font-bold"
                    : "text-[#555555] dark:text-zinc-400 hover:text-[#111111] dark:hover:text-zinc-100"
                }`}
              >
                <span
                  className={`text-[10px] transition-colors ${
                    isActive
                      ? "text-[#D9541E] dark:text-[#E05D27] font-bold"
                      : "text-[#D9541E]/70 dark:text-[#E05D27]/60 group-hover:text-[#D9541E] dark:group-hover:text-[#E05D27]"
                  }`}
                >
                  {item.index}
                </span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <a
            href={dispatchHref}
            onClick={(e) => handleNavClick(e, dispatchHref)}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-[#D9541E] hover:bg-[#bf4615] text-white px-3 py-1.5 text-xs font-mono font-medium transition-all shadow-xs cursor-pointer"
          >
            <span>{dispatchLabel}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-md border border-[#111111]/15 dark:border-zinc-800 bg-[#ebe5d8] dark:bg-zinc-900 text-[#111111] dark:text-zinc-300"
            aria-label="Toggle Navigation"
          >
            {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="border-b border-[#111111]/12 dark:border-zinc-800 bg-[#f3eee3] dark:bg-[#0e0f12] px-4 py-4 md:hidden font-mono max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain shadow-xl"
          >
            <div className="flex flex-col space-y-1">
              {activeNavItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between py-3 px-2 text-xs sm:text-sm border-b border-[#111111]/8 dark:border-zinc-800/50 cursor-pointer select-none touch-manipulation transition-colors rounded-sm active:bg-[#111111]/5 dark:active:bg-white/5 ${
                      isActive
                        ? "text-[#111111] dark:text-zinc-100 font-bold bg-[#ebe5d8]/40 dark:bg-zinc-800/30"
                        : "text-[#555555] dark:text-zinc-300 hover:text-[#111111] dark:hover:text-zinc-100"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`text-[10px] ${
                        isActive
                          ? "text-[#D9541E] dark:text-[#E05D27] font-bold"
                          : "text-[#D9541E] dark:text-[#E05D27]"
                      }`}
                    >
                      {item.index}
                    </span>
                  </a>
                );
              })}
              {profile?.phone && (
                <div className="pt-3 pb-1 flex items-center justify-between border-t border-[#111111]/10 dark:border-zinc-800/60 text-xs">
                  <a
                    href={`tel:${cleanPhoneForTel(profile.phone)}`}
                    className="flex items-center gap-1.5 text-[#555555] dark:text-zinc-300 hover:text-[#D9541E] dark:hover:text-[#E05D27] py-1.5 touch-manipulation"
                    title={`Call ${profile.phone}`}
                  >
                    <Phone className="h-3.5 w-3.5 text-[#D9541E]" />
                    <span>{profile.phone}</span>
                  </a>
                  <a
                    href={getWhatsAppUrl(profile.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#111111] dark:text-zinc-300 bg-[#ebe5d8] dark:bg-zinc-800/80 hover:bg-[#ded7c8] dark:hover:bg-zinc-700 px-2.5 py-1.5 rounded border border-[#111111]/12 dark:border-zinc-700/80 transition-colors font-medium touch-manipulation"
                    title="Direct WhatsApp Message"
                  >
                    <WhatsAppIcon className="h-3 w-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              )}
              <div className="pt-2">
                <a
                  href={dispatchHref}
                  onClick={(e) => handleNavClick(e, dispatchHref)}
                  className="w-full flex items-center justify-center gap-2 rounded-md bg-[#D9541E] hover:bg-[#bf4615] text-white py-2.5 text-xs font-mono font-medium cursor-pointer touch-manipulation shadow-sm"
                >
                  <span>Initiate Contact</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
