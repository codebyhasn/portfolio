"use client";

import { FileCode2, GitBranch, ShieldCheck } from "lucide-react";
import type { Profile } from "@/lib/types";

interface CodeEditorCardProps {
  profile: Profile;
}

export function CodeEditorCard({ profile }: CodeEditorCardProps) {
  return (
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
          <span>architecture.ts</span>
        </div>
        <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">Production</span>
      </div>

      {/* Code Content */}
      <div className="p-4 sm:p-5 text-xs leading-relaxed overflow-x-auto text-zinc-800 dark:text-zinc-200 space-y-2">
        <p className="text-zinc-400 dark:text-zinc-500 text-[11px]">
          // 🚀 Muhammad Hassan — Architecture Philosophy
        </p>
        <p>
          <span className="text-purple-600 dark:text-purple-400 font-semibold">const</span>{" "}
          <span className="text-sky-600 dark:text-sky-300 font-medium">engineer</span>:{" "}
          <span className="text-amber-600 dark:text-amber-400 font-medium">Profile</span> = &#123;
        </p>
        <div className="pl-4 border-l border-zinc-200 dark:border-zinc-800/80 space-y-1">
          <p>
            <span className="text-zinc-600 dark:text-zinc-400">name</span>:{" "}
            <span className="text-emerald-600 dark:text-emerald-400">&quot;{profile.name || "Muhammad Hassan"}&quot;</span>,
          </p>
          <p>
            <span className="text-zinc-600 dark:text-zinc-400">focus</span>: [
            <span className="text-emerald-600 dark:text-emerald-400">&quot;React&quot;</span>,{" "}
            <span className="text-emerald-600 dark:text-emerald-400">&quot;Next.js&quot;</span>,{" "}
            <span className="text-emerald-600 dark:text-emerald-400">&quot;TypeScript&quot;</span>,{" "}
            <span className="text-emerald-600 dark:text-emerald-400">&quot;Laravel&quot;</span>],
          </p>
          <p>
            <span className="text-zinc-600 dark:text-zinc-400">philosophy</span>:{" "}
            <span className="text-emerald-600 dark:text-emerald-400">&quot;Pixel-perfect UIs + Clean Architecture&quot;</span>,
          </p>
          <p className="text-zinc-400 dark:text-zinc-500 text-[11px] pt-1">
            // Full-stack pipeline &amp; compilation
          </p>
          <p>
            <span className="text-sky-600 dark:text-sky-300 font-medium">buildFeature</span>:{" "}
            <span className="text-amber-600 dark:text-amber-400 font-semibold">async</span> (requirements:{" "}
            <span className="text-amber-600 dark:text-amber-400 font-medium">Requirements</span>) =&gt; &#123;
          </p>
          <div className="pl-4 border-l border-zinc-200 dark:border-zinc-800/80 space-y-1">
            <p>
              <span className="text-purple-600 dark:text-purple-400">const</span> design ={" "}
              <span className="text-amber-600 dark:text-amber-400">await</span>{" "}
              <span className="text-sky-600 dark:text-sky-300">translateFigmaToCode</span>(requirements.mockup);
            </p>
            <p>
              <span className="text-purple-600 dark:text-purple-400">const</span> api ={" "}
              <span className="text-amber-600 dark:text-amber-400">await</span>{" "}
              <span className="text-sky-600 dark:text-sky-300">buildLaravelEndpoints</span>(requirements.data);
            </p>
            <p>
              <span className="text-purple-600 dark:text-purple-400">const</span> ui ={" "}
              <span className="text-amber-600 dark:text-amber-400">await</span>{" "}
              <span className="text-sky-600 dark:text-sky-300">craftReactComponents</span>(design, api);
            </p>
            <p>
              <span className="text-purple-600 dark:text-purple-400">return</span>{" "}
              <span className="text-sky-600 dark:text-sky-300">optimize</span>(ui, &#123; a11y:{" "}
              <span className="text-amber-600 dark:text-amber-400 font-semibold">true</span>, perf:{" "}
              <span className="text-amber-600 dark:text-amber-400 font-semibold">true</span>, seo:{" "}
              <span className="text-amber-600 dark:text-amber-400 font-semibold">true</span> &#125;);
            </p>
          </div>
          <p>&#125;,</p>
          <p className="text-zinc-400 dark:text-zinc-500 text-[11px] pt-1">
            // Availability &amp; coordinates
          </p>
          <p>
            <span className="text-zinc-600 dark:text-zinc-400">currentlyAt</span>:{" "}
            <span className="text-emerald-600 dark:text-emerald-400">&quot;App in Snap&quot;</span>,
          </p>
          <p>
            <span className="text-zinc-600 dark:text-zinc-400">availableForWork</span>:{" "}
            <span
              className={
                profile.availableForWork
                  ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                  : "text-amber-600 dark:text-amber-400 font-semibold"
              }
            >
              {profile.availableForWork ? "true" : "false"}
            </span>
            ,
          </p>
          <p>
            <span className="text-zinc-600 dark:text-zinc-400">location</span>:{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              &quot;{profile.location || "Islamabad, Pakistan"}&quot;
            </span>
            ,
          </p>
        </div>
        <p>&#125;;</p>
      </div>

      {/* Footer spec bar */}
      <div className="border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#12151e] px-4 py-2 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
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
  );
}
