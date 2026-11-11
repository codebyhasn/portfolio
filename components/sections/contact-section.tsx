"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  CheckCircle,
  Loader2,
  Copy,
  Check,
  ArrowUpRight,
  MapPin,
  Clock,
  Phone,
  PhoneCall,
} from "lucide-react";
import { toast } from "sonner";
import { WhatsAppIcon } from "@/components/icons";
import { cleanPhoneForTel, getWhatsAppUrl } from "@/lib/utils";
import { useAnimations } from "@/components/animation-provider";
import { SPRING_PUNCH } from "@/lib/animations";
import type { Profile } from "@/lib/types";

interface ContactSectionProps {
  profile: Profile;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const { animationsEnabled } = useAnimations();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Dispatch received. I will respond within 24 hours.");
    } catch {
      setStatus("error");
      toast.error("Transmission failed. Please use direct email.");
      setStatus("idle");
    }
  };

  return (
    <section id="dispatch" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div id="contact" className="absolute -top-24 pointer-events-none" aria-hidden="true" />
      <div className="mx-auto max-w-7xl">
        {/* Section Index Marker */}
        <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800/80 pb-3 mb-12 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-amber-600 dark:text-amber-500 font-bold">06 //</span>
            <span className="tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
              DISPATCH &amp; INITIATE CONTACT
            </span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
            ENCRYPTED DIRECT CHANNEL
          </span>
        </div>

        {/* Section Title */}
        <div className="mb-14">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-zinc-950 dark:text-zinc-50 tracking-tight">
            Initiate Contact.
          </h2>
          <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl">
            Currently accepting select full-time leadership inquiries and high-impact advisory contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-4">
            {Boolean(profile.email && profile.email.trim()) && (
              <CopyableContactCard
                label="Direct Email"
                value={profile.email}
                description="Primary channel for technical opportunities"
              />
            )}

            {Boolean(profile.phone && profile.phone.trim()) && (
              <PhoneContactCard
                label="Direct Line / WhatsApp"
                value={profile.phone}
                description="Direct dialer & encrypted messaging • PKT Timezone"
              />
            )}

            {Boolean(profile.linkedIn && profile.linkedIn.trim()) && (
              <ExternalLinkContactCard
                label="LinkedIn Profile"
                href={profile.linkedIn}
                description="Professional network &amp; recommendations"
              />
            )}

            {Boolean(profile.github && profile.github.trim()) && (
              <ExternalLinkContactCard
                label="GitHub Repositories"
                href={profile.github}
                description="Open source and production code archives"
              />
            )}

            {/* Office Coordinates */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-[#111319] p-5 font-mono text-xs space-y-2 mt-6">
              <div className="flex items-center justify-between text-zinc-400 text-[11px]">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">STATION COORDINATES</span>
                <span className="text-emerald-500 font-bold">ONLINE</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-300 font-sans text-xs">
                Based in Islamabad, Pakistan (UTC+5). Available for global asynchronous collaboration across UK, US, and EU business hours.
              </p>
            </div>
          </div>

          {/* Right Column: Clean Architectural Form */}
          <div className="lg:col-span-7">
            <div className="editorial-card rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#111319] p-6 sm:p-8">
              {status === "success" ? (
                <div className="py-12 text-center space-y-3 font-mono">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-zinc-900 dark:text-zinc-100 font-normal">
                    Transmission Dispatched.
                  </h3>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    Your inquiry has been delivered directly to my inbox. I will review and reply within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-semibold underline underline-offset-4 cursor-pointer"
                  >
                    Send another dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-zinc-700 dark:text-zinc-300 mb-1 font-semibold uppercase text-[11px]">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="e.g. Elena Rostova"
                        className="w-full rounded border border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#141720] px-3.5 py-2.5 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-zinc-900 dark:focus:border-zinc-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-zinc-700 dark:text-zinc-300 mb-1 font-semibold uppercase text-[11px]">
                        Corporate / Personal Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="elena@company.com"
                        className="w-full rounded border border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#141720] px-3.5 py-2.5 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-zinc-900 dark:focus:border-zinc-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-zinc-700 dark:text-zinc-300 mb-1 font-semibold uppercase text-[11px]">
                      Subject / Engagement Type *
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      placeholder="e.g. Senior Frontend Role / Engineering Advisory"
                      className="w-full rounded border border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#141720] px-3.5 py-2.5 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-zinc-900 dark:focus:border-zinc-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-zinc-700 dark:text-zinc-300 mb-1 font-semibold uppercase text-[11px]">
                      Project Scope &amp; Engineering Requirements *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Outline your timeline, current architecture bottlenecks, and engagement goals..."
                      className="w-full rounded border border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#141720] px-3.5 py-2.5 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-zinc-900 dark:focus:border-zinc-400 transition-colors resize-none font-sans text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 rounded bg-[#D9541E] hover:bg-[#bf4615] text-white py-3 font-mono font-bold tracking-wider transition-all disabled:opacity-50 cursor-pointer text-xs shadow-xs"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>DISPATCHING ENCRYPTED PAYLOAD...</span>
                      </>
                    ) : (
                      <>
                        <span>TRANSMIT INQUIRY</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneContactCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  const [copied, setCopied] = useState(false);
  const telHref = `tel:${cleanPhoneForTel(value)}`;
  const waHref = getWhatsAppUrl(value);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Phone number copied to clipboard.");
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="editorial-card relative rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#111319] hover:border-zinc-400 dark:hover:border-zinc-600 transition-all p-4 group">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
        {/* Left: Primary Click to Call */}
        <a
          href={telHref}
          className="flex-1 focus:outline-none group/link"
          title={`Call ${value} directly`}
        >
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 uppercase tracking-wider">
            <Phone className="h-3 w-3 text-amber-500" />
            <span>{label}</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="text-amber-600/80 dark:text-amber-500/80 font-medium">DIRECT CALL</span>
          </div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mt-0.5 group-hover/link:text-amber-600 dark:group-hover/link:text-amber-400 transition-colors">
            {value}
          </p>
          <p className="text-[11px] text-zinc-500 font-sans mt-0.5">{description}</p>
        </a>

        {/* Right: Action Buttons (Direct Call, WhatsApp & Copy) */}
        <div className="flex items-center gap-1.5 self-start sm:self-center shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800/60 w-full sm:w-auto justify-end">
          {/* Call button */}
          <a
            href={telHref}
            title="Direct Phone Call"
            className="inline-flex items-center gap-1 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-[#D9541E] dark:hover:border-[#D9541E] px-2.5 py-1.5 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 hover:text-[#D9541E] dark:hover:text-[#D9541E] transition-colors"
          >
            <PhoneCall className="h-3 w-3 text-amber-500" />
            <span>Call</span>
          </a>

          {/* WhatsApp Direct Link */}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            title="Direct WhatsApp Message"
            className="inline-flex items-center gap-1.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-[#D9541E] dark:hover:border-[#D9541E] px-2.5 py-1.5 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 hover:text-[#D9541E] dark:hover:text-[#D9541E] transition-colors"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            <span>WhatsApp</span>
          </a>

          {/* Quick Copy */}
          <button
            type="button"
            onClick={handleCopy}
            title="Copy phone number"
            className="p-1.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-[#D9541E] dark:hover:border-[#D9541E] bg-zinc-50 dark:bg-zinc-900/60 transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function CopyableContactCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success(`${label} copied to clipboard.`);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="editorial-card w-full text-left p-4 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#111319] hover:border-zinc-400 dark:hover:border-zinc-600 transition-all cursor-pointer block group focus:outline-none"
      title="Click to copy to clipboard"
    >
      <div className="flex items-center justify-between font-mono text-xs">
        <div>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider">{label}</p>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mt-0.5">
            {value}
          </p>
          <p className="text-[11px] text-zinc-500 font-sans mt-0.5">{description}</p>
        </div>

        <div className="shrink-0 pl-3">
          {copied ? (
            <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              <Check className="h-3 w-3" />
              <span>COPIED</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
              <span className="hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity">
                COPY
              </span>
              <Copy className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function ExternalLinkContactCard({
  label,
  href,
  description,
}: {
  label: string;
  href: string;
  description: string;
}) {
  const cleanDisplay = href
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/\/$/, "");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="editorial-card block w-full p-4 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#111319] hover:border-zinc-400 dark:hover:border-zinc-600 transition-all cursor-pointer group focus:outline-none"
      title={`Open ${label} in new tab`}
    >
      <div className="flex items-center justify-between font-mono text-xs">
        <div>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider">{label}</p>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mt-0.5">
            {cleanDisplay}
          </p>
          <p className="text-[11px] text-zinc-500 font-sans mt-0.5">{description}</p>
        </div>

        <div className="shrink-0 pl-3 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors flex items-center gap-1 text-[11px]">
          <span className="hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity">
            VISIT
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </a>
  );
}
