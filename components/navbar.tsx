"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { WhatsAppIcon } from "@/components/icons";
import { cleanPhoneForTel, getWhatsAppUrl } from "@/lib/utils";
import { useAnimations } from "@/components/animation-provider";
import type { Profile } from "@/lib/types";

const navItems = [
  { index: "01", label: "Architecture", href: "#architecture" },
  { index: "02", label: "Dossier", href: "#about" },
  { index: "03", label: "Chronology", href: "#chronology" },
  { index: "04", label: "Works", href: "#works" },
  { index: "05", label: "Doctrines", href: "#doctrines" },
  { index: "06", label: "Dispatch", href: "#dispatch" },
];

export function Navbar({ profile }: { profile?: Profile } = {}) {
  const { animationsEnabled } = useAnimations();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [localTime, setLocalTime] = useState("");
  const [activeSection, setActiveSection] = useState<string>("architecture");

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
    const sectionIds = navItems.map((item) => item.href.slice(1));
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
  }, []);

  // Smooth scroll handler with fixed header compensation
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMobileOpen(false);

    if (href.startsWith("#")) {
      const targetId = href.slice(1);
      const element = document.getElementById(targetId);
      if (element) {
        // Calculate offset position accounting for the fixed masthead and ticker
        const headerOffset = 88;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth",
        });

        if (window.history.pushState) {
          window.history.pushState(null, "", href);
        }
      }
    } else {
      window.location.href = href;
    }
  };

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
          href="#architecture"
          onClick={(e) => handleNavClick(e, "#architecture")}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 transition-transform duration-200 group-hover:scale-105 flex items-center justify-center">
            <Image
              src="/brand-logo.png?v=3"
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
          {navItems.map((item) => {
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
            href="#dispatch"
            onClick={(e) => handleNavClick(e, "#dispatch")}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-[#D9541E] hover:bg-[#bf4615] text-white px-3 py-1.5 text-xs font-mono font-medium transition-all shadow-xs cursor-pointer"
          >
            <span>Dispatch</span>
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
            transition={{ duration: 0.2 }}
            className="border-b border-[#111111]/12 dark:border-zinc-800 bg-[#f3eee3] dark:bg-[#0e0f12] px-4 py-4 md:hidden font-mono"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between py-2 text-xs border-b border-[#111111]/8 dark:border-zinc-800/50 cursor-pointer ${
                      isActive
                        ? "text-[#111111] dark:text-zinc-100 font-bold"
                        : "text-[#555555] dark:text-zinc-300"
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
                <div className="pt-2 flex items-center justify-between border-t border-[#111111]/10 dark:border-zinc-800/60 text-xs">
                  <a
                    href={`tel:${cleanPhoneForTel(profile.phone)}`}
                    className="flex items-center gap-1.5 text-[#555555] dark:text-zinc-300 hover:text-[#D9541E] dark:hover:text-[#E05D27]"
                    title={`Call ${profile.phone}`}
                  >
                    <Phone className="h-3.5 w-3.5 text-[#D9541E]" />
                    <span>{profile.phone}</span>
                  </a>
                  <a
                    href={getWhatsAppUrl(profile.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#111111] dark:text-zinc-300 bg-[#ebe5d8] dark:bg-zinc-800/80 hover:bg-[#ded7c8] dark:hover:bg-zinc-700 px-2.5 py-1 rounded border border-[#111111]/12 dark:border-zinc-700/80 transition-colors font-medium"
                    title="Direct WhatsApp Message"
                  >
                    <WhatsAppIcon className="h-3 w-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              )}
              <div className="pt-2">
                <a
                  href="#dispatch"
                  onClick={(e) => handleNavClick(e, "#dispatch")}
                  className="w-full flex items-center justify-center gap-2 rounded-md bg-[#D9541E] hover:bg-[#bf4615] text-white py-2 text-xs font-mono font-medium cursor-pointer"
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
