"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import {
  Loader2,
  Upload,
  CheckCircle2,
  User,
  Globe,
  Mail,
  Phone,
  MapPin,
  Link2,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { updateProfileAction, toggleAnimationsAction } from "@/app/admin/actions/crud";
import type { Profile } from "@/lib/types";

interface AdminProfileTabProps {
  profile: Profile | null;
}

export function AdminProfileTab({ profile }: AdminProfileTabProps) {
  const [isPending, startTransition] = useTransition();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile?.avatarUrl ?? null);
  const [showAvatar, setShowAvatar] = useState<boolean>(profile?.showAvatar ?? true);
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(
    profile?.animationsEnabled ?? true
  );
  const [markedForRemoval, setMarkedForRemoval] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      setMarkedForRemoval(false);
    }
  };

  const handleRemovePhoto = () => {
    setAvatarUrl(null);
    setMarkedForRemoval(true);
    toast.info("Avatar marked for deletion. Click 'Save Profile Changes' to commit.");
  };

  const handleAnimationToggle = (enabled: boolean) => {
    setAnimationsEnabled(enabled);
    startTransition(async () => {
      try {
        await toggleAnimationsAction(enabled);
        toast.success(
          enabled
            ? "✨ Scroll and UI animations enabled!"
            : "⚡ Animations disabled — Portfolio is now in static high-performance mode."
        );
      } catch (err: any) {
        toast.error("Failed to update motion preference");
        setAnimationsEnabled(!enabled);
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("removeAvatar", markedForRemoval ? "true" : "false");
    formData.set("showAvatar", showAvatar ? "true" : "false");
    formData.set("animationsEnabled", animationsEnabled ? "true" : "false");

    startTransition(async () => {
      try {
        await updateProfileAction(formData);
        toast.success("Profile updated successfully!");
        setMarkedForRemoval(false);
      } catch (err: any) {
        toast.error(err.message || "Failed to update profile");
      }
    });
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Profile & Experience Settings</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Configure your public profile, motion effects, contact details, and visual presentation.
        </p>
      </div>

      {/* Visual Effects & Animations Card */}
      <div className="bento-card p-6 border-amber-500/30 shadow-2xs">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">
                Visual Effects &amp; Scroll Animations
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl leading-relaxed">
                Controls the reading progress bar, smooth scroll reveals, and staggered card entrances across the public portfolio. Respects visitor system preferences (<code className="text-amber-600 dark:text-amber-400 font-mono">prefers-reduced-motion</code>).
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer select-none flex-shrink-0">
            <input
              type="checkbox"
              checked={animationsEnabled}
              disabled={isPending}
              onChange={(e) => handleAnimationToggle(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-zinc-300 dark:bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
          </label>
        </div>

        <div className="mt-4 pt-3.5 border-t border-zinc-200 dark:border-zinc-800/60 flex items-center gap-2 text-xs">
          <span
            className={`h-2 w-2 rounded-full ${
              animationsEnabled ? "bg-emerald-500 animate-pulse" : "bg-zinc-400 dark:bg-zinc-600"
            }`}
          />
          <span className="text-zinc-600 dark:text-zinc-400">
            Status:{" "}
            <strong className={animationsEnabled ? "text-amber-600 dark:text-amber-400" : "text-zinc-700 dark:text-zinc-400"}>
              {animationsEnabled ? "Fluid Motion Active (60fps)" : "Static Mode (Instant Zero-Delay)"}
            </strong>
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Avatar Block */}
        <div className="bento-card p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-300 uppercase tracking-wider">
              Profile Avatar &amp; Adaptive Hero
            </h3>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                avatarUrl && showAvatar
                  ? "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400"
                  : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
              }`}
            >
              {avatarUrl && showAvatar ? (
                <>
                  <Eye className="h-3 w-3" /> Photo Active on Portfolio
                </>
              ) : (
                <>
                  <EyeOff className="h-3 w-3" /> Adaptive Layout Active (No Photo)
                </>
              )}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative h-28 w-28 overflow-hidden rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 shadow-sm bg-zinc-100 dark:bg-zinc-950 flex-shrink-0">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="Profile Preview"
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 gap-1 bg-zinc-100 dark:bg-zinc-900/50">
                  <User className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
                  <span className="text-[10px] text-zinc-500 font-mono">No Avatar</span>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/80 px-4 py-2 text-sm font-medium text-zinc-800 dark:text-zinc-200 transition-colors hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-300">
                  <Upload className="h-4 w-4" />
                  {avatarUrl ? "Replace Photo" : "Upload Photo"}
                  <input
                    type="file"
                    name="avatarFile"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>

                {avatarUrl && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 transition-colors hover:bg-red-500/20 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove Photo
                  </button>
                )}
              </div>

              {/* Display Toggle Switch */}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between sm:justify-start gap-4">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showAvatar}
                    onChange={(e) => setShowAvatar(e.target.checked)}
                    className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-amber-600 focus:ring-amber-500 focus:ring-offset-zinc-50 dark:focus:ring-offset-zinc-950"
                  />
                  <span className="text-xs text-zinc-800 dark:text-zinc-300 font-medium">
                    Display profile picture on public portfolio
                  </span>
                </label>
              </div>

              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                When disabled or removed, the portfolio Hero automatically adapts to a focused full-width developer layout with key architecture stats and metrics.
              </p>
            </div>
          </div>
        </div>

        {/* General Information */}
        <div className="bento-card p-6 space-y-5 shadow-2xs">
          <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider mb-2">
            Personal Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1.5">Full Name</label>
              <input
                type="text"
                name="name"
                defaultValue={profile?.name || "Muhammad Hassan"}
                required
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1.5">Availability Status</label>
              <select
                name="availableForWork"
                defaultValue={profile?.availableForWork ? "true" : "false"}
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
              >
                <option value="true">🟢 Open to Work / Available</option>
                <option value="false">⚪ Employed / Busy</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1.5">Primary Headline</label>
              <input
                type="text"
                name="headline"
                defaultValue={profile?.headline || "Senior Frontend / Full-Stack Engineer"}
                required
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1.5">Sub-Headline Chips</label>
              <input
                type="text"
                name="subHeadline"
                defaultValue={profile?.subHeadline || "React · Next.js · TypeScript · Laravel · 6+ Years"}
                required
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1.5">Bio / Executive Summary</label>
            <textarea
              name="bio"
              rows={4}
              defaultValue={profile?.bio || ""}
              required
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 resize-y"
            />
          </div>
        </div>

        {/* Contact & Links */}
        <div className="bento-card p-6 space-y-4 shadow-2xs">
          <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider mb-2">
            Contact &amp; Social Coordinates
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" /> Location
              </label>
              <input
                type="text"
                name="location"
                defaultValue={profile?.location || "Islamabad, Pakistan"}
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" /> Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={profile?.email || "codebyhasn@gmail.com"}
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" /> Phone &amp; WhatsApp Direct Line
              </label>
              <input
                type="text"
                name="phone"
                defaultValue={profile?.phone || "+92 (333) 271 3381"}
                placeholder="+92 (333) 271 3381"
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
              />
              <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                Powers direct dialer (<code className="text-zinc-700 dark:text-zinc-300">tel:</code>) and 1-click WhatsApp links across Header, Hero, Dossier, Footer &amp; Contact sections.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" /> GitHub URL
              </label>
              <input
                type="url"
                name="github"
                defaultValue={profile?.github ?? "https://github.com/codebyhasn"}
                placeholder="https://github.com/username"
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <Link2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" /> LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedIn"
                defaultValue={profile?.linkedIn ?? "https://linkedin.com/in/codebyhasn"}
                placeholder="https://linkedin.com/in/username"
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 px-6 py-2.5 text-sm font-semibold shadow-sm transition-all disabled:opacity-50 cursor-pointer"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
}
