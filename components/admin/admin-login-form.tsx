"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Lock, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { loginAction } from "@/app/admin/actions/auth";

export function AdminLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await loginAction(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Brand & Masthead */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 relative h-16 w-16 transition-transform hover:scale-105 flex items-center justify-center">
          <Image
            src="/brand-logo.png?v=4"
            alt="codebyhasn logo"
            width={120}
            height={120}
            className="h-full w-full object-contain"
            priority
            unoptimized
          />
        </div>
        <h1 className="font-serif text-3xl font-normal tracking-tight text-[#111111] dark:text-zinc-100">
          Admin Access
        </h1>
        <p className="mt-1 font-mono text-xs uppercase tracking-wider text-[#555555] dark:text-zinc-400">
          Portfolio Infrastructure Control
        </p>
      </div>

      {/* Editorial Form Card */}
      <div className="rounded-2xl border border-[#111111]/12 dark:border-white/10 bg-white dark:bg-[#14161c] p-7 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block font-mono text-[11px] uppercase tracking-wider text-[#555555] dark:text-zinc-400 mb-1.5 font-medium">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              className="w-full rounded-xl border border-[#111111]/15 dark:border-white/15 bg-[#faf8f4] dark:bg-[#1a1d24] px-4 py-3 text-sm text-[#111111] dark:text-zinc-100 placeholder-[#555555]/40 outline-none transition-all focus:border-[#D9541E] focus:ring-2 focus:ring-[#D9541E]/15 font-mono"
              placeholder="admin"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-mono text-[11px] uppercase tracking-wider text-[#555555] dark:text-zinc-400 mb-1.5 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-[#111111]/15 dark:border-white/15 bg-[#faf8f4] dark:bg-[#1a1d24] px-4 py-3 pr-12 text-sm text-[#111111] dark:text-zinc-100 placeholder-[#555555]/40 outline-none transition-all focus:border-[#D9541E] focus:ring-2 focus:ring-[#D9541E]/15 font-mono"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555555] hover:text-[#111111] dark:text-zinc-500 dark:hover:text-zinc-300"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-xs font-mono text-red-600 dark:text-red-400"
            >
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#D9541E] hover:bg-[#bf4615] text-white py-3 text-xs font-mono font-medium tracking-wide uppercase shadow-xs transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99]"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-xs font-mono text-[#555555] dark:text-zinc-500">
        Protected admin area · Unauthorized access prohibited
      </p>
    </motion.div>
  );
}

