"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Phone, PhoneCall, Mail, ExternalLink, FileText } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { cleanPhoneForTel, getWhatsAppUrl } from "@/lib/utils";
import type { Profile } from "@/lib/types";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

export function ResumeModal({ isOpen, onClose, profile }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const resumeHref = profile.resumeUrl || "/resume.pdf";
  const telHref = profile.phone ? `tel:${cleanPhoneForTel(profile.phone)}` : "";
  const waHref = profile.phone ? getWhatsAppUrl(profile.phone) : "";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0e1015] shadow-2xl overflow-hidden font-mono text-xs"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 bg-zinc-50 dark:bg-[#12141a]">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-amber-500" />
                <span className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-xs">
                  {profile.name} — Verified Technical Dossier
                </span>
                <span className="hidden sm:inline text-zinc-400 text-[10px]">
                  [PDF PREVIEW]
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Action Contact Bar */}
            <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0e1015] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                {profile.phone && (
                  <>
                    <a
                      href={telHref}
                      className="inline-flex items-center gap-1.5 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-2.5 py-1 text-zinc-800 dark:text-zinc-200 hover:border-zinc-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      title="Direct Phone Call"
                    >
                      <PhoneCall className="h-3 w-3 text-amber-500" />
                      <span>{profile.phone}</span>
                    </a>

                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-2.5 py-1 text-zinc-800 dark:text-zinc-200 hover:border-zinc-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      title="Direct WhatsApp Chat"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                      <span>Chat WhatsApp</span>
                    </a>
                  </>
                )}

                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-1.5 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-2.5 py-1 text-zinc-800 dark:text-zinc-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  >
                    <Mail className="h-3 w-3 text-zinc-400" />
                    <span>{profile.email}</span>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={resumeHref}
                  download
                  className="inline-flex items-center gap-1.5 rounded bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 px-3 py-1 font-semibold hover:bg-zinc-800 dark:hover:bg-white transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download PDF</span>
                </a>
                <a
                  href={resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="flex-1 min-h-[50vh] sm:min-h-[68vh] bg-zinc-100 dark:bg-zinc-950 p-2 sm:p-4 overflow-hidden">
              <iframe
                src={`${resumeHref}#toolbar=0&navpanes=0`}
                className="w-full h-full min-h-[50vh] sm:min-h-[65vh] rounded border border-zinc-300 dark:border-zinc-800 bg-white"
                title={`${profile.name} Resume`}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

