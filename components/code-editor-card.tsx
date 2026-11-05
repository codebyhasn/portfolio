"use client";

import { useState } from "react";
import { Check, Copy, FileCode2 } from "lucide-react";
import { toast } from "sonner";
import type { Profile } from "@/lib/types";

interface CodeEditorCardProps {
  profile: Profile;
}

export function CodeEditorCard({ profile }: CodeEditorCardProps) {
  const [copied, setCopied] = useState(false);

  const rawCode = `// 🚀 Muhammad Hassan — Architecture Philosophy
const engineer: Profile = {
  name: "${profile.name || "Muhammad Hassan"}",
  focus: ["React", "Next.js", "TypeScript", "Laravel"],
  philosophy: "Pixel-perfect UIs + Clean Architecture",

  buildFeature: async (requirements: Requirements) => {
    const design = await translateFigmaToCode(requirements.mockup);
    const api = await buildLaravelEndpoints(requirements.data);
    const ui = await craftReactComponents(design, api);
    return optimize(ui, { a11y: true, perf: true, seo: true });
  },

  currentlyAt: "App in Snap",
  availableForWork: ${profile.availableForWork ? "true" : "false"},
  location: "${profile.location || "Islamabad, Pakistan"}",
};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    toast.success("Code snippet copied to clipboard! 📋");
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = [
    {
      num: 1,
      content: (
        <span className="text-emerald-400/90 italic font-medium">
          // 🚀 Muhammad Hassan — Architecture Philosophy
        </span>
      ),
    },
    {
      num: 2,
      content: (
        <>
          <span className="text-violet-400 font-semibold">const</span>{" "}
          <span className="text-sky-300 font-medium">engineer</span>:{" "}
          <span className="text-amber-400">Profile</span> = &#123;
        </>
      ),
    },
    {
      num: 3,
      content: (
        <>
          {"  "}
          <span className="text-indigo-300">name</span>:{" "}
          <span className="text-amber-300">&quot;{profile.name || "Muhammad Hassan"}&quot;</span>,
        </>
      ),
    },
    {
      num: 4,
      content: (
        <>
          {"  "}
          <span className="text-indigo-300">focus</span>: [
          <span className="text-emerald-300">&quot;React&quot;</span>,{" "}
          <span className="text-emerald-300">&quot;Next.js&quot;</span>,{" "}
          <span className="text-emerald-300">&quot;TypeScript&quot;</span>,{" "}
          <span className="text-emerald-300">&quot;Laravel&quot;</span>],
        </>
      ),
    },
    {
      num: 5,
      content: (
        <>
          {"  "}
          <span className="text-indigo-300">philosophy</span>:{" "}
          <span className="text-amber-300">&quot;Pixel-perfect UIs + Clean Architecture&quot;</span>,
        </>
      ),
    },
    {
      num: 6,
      content: null,
    },
    {
      num: 7,
      content: (
        <>
          {"  "}
          <span className="text-indigo-300">buildFeature</span>:{" "}
          <span className="text-violet-400 font-semibold">async</span> (
          <span className="text-sky-300">requirements</span>:{" "}
          <span className="text-amber-400">Requirements</span>) =&gt; &#123;
        </>
      ),
    },
    {
      num: 8,
      content: (
        <>
          {"    "}
          <span className="text-violet-400 font-semibold">const</span>{" "}
          <span className="text-sky-300">design</span> ={" "}
          <span className="text-violet-400 font-semibold">await</span>{" "}
          <span className="text-blue-400">translateFigmaToCode</span>(
          <span className="text-sky-200">requirements</span>.
          <span className="text-indigo-200">mockup</span>);
        </>
      ),
    },
    {
      num: 9,
      content: (
        <>
          {"    "}
          <span className="text-violet-400 font-semibold">const</span>{" "}
          <span className="text-sky-300">api</span> ={" "}
          <span className="text-violet-400 font-semibold">await</span>{" "}
          <span className="text-blue-400">buildLaravelEndpoints</span>(
          <span className="text-sky-200">requirements</span>.
          <span className="text-indigo-200">data</span>);
        </>
      ),
    },
    {
      num: 10,
      content: (
        <>
          {"    "}
          <span className="text-violet-400 font-semibold">const</span>{" "}
          <span className="text-sky-300">ui</span> ={" "}
          <span className="text-violet-400 font-semibold">await</span>{" "}
          <span className="text-blue-400">craftReactComponents</span>(
          <span className="text-sky-300">design</span>,{" "}
          <span className="text-sky-300">api</span>);
        </>
      ),
    },
    {
      num: 11,
      content: (
        <>
          {"    "}
          <span className="text-violet-400 font-semibold">return</span>{" "}
          <span className="text-blue-400">optimize</span>(
          <span className="text-sky-300">ui</span>, &#123;{" "}
          <span className="text-sky-200">a11y</span>:{" "}
          <span className="text-rose-400 font-semibold">true</span>,{" "}
          <span className="text-sky-200">perf</span>:{" "}
          <span className="text-rose-400 font-semibold">true</span>,{" "}
          <span className="text-sky-200">seo</span>:{" "}
          <span className="text-rose-400 font-semibold">true</span> &#125;);
        </>
      ),
    },
    {
      num: 12,
      content: <>{"  "}&#125;,</>,
    },
    {
      num: 13,
      content: null,
    },
    {
      num: 14,
      content: (
        <>
          {"  "}
          <span className="text-indigo-300">currentlyAt</span>:{" "}
          <span className="text-amber-300">&quot;App in Snap&quot;</span>,
        </>
      ),
    },
    {
      num: 15,
      content: (
        <>
          {"  "}
          <span className="text-indigo-300">availableForWork</span>:{" "}
          <span className="text-rose-400 font-semibold">
            {profile.availableForWork ? "true" : "false"}
          </span>
          ,
        </>
      ),
    },
    {
      num: 16,
      content: (
        <>
          {"  "}
          <span className="text-indigo-300">location</span>:{" "}
          <span className="text-amber-300">&quot;{profile.location || "Islamabad, Pakistan"}&quot;</span>,
        </>
      ),
    },
    {
      num: 17,
      content: <>&#125;;</>,
    },
  ];

  return (
    <div className="relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-[#0c0e14] shadow-md font-mono">
      {/* Editorial hairline along the top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      {/* Editor Title Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-[#12151e] px-4 py-2.5 select-none">
        {/* Traffic Lights */}
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>

        {/* Tab Header */}
        <div className="flex items-center gap-2 rounded bg-[#171b26] border border-zinc-800 px-3 py-1 text-xs">
          <FileCode2 className="h-3.5 w-3.5 text-amber-500" />
          <span className="font-mono text-xs font-medium text-zinc-200">
            architecture.ts
          </span>
          <span className="text-[10px] text-zinc-500 font-mono">TypeScript</span>
        </div>

        {/* Actions (Copy Code) */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded border border-zinc-700/80 bg-zinc-800/60 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:border-zinc-500 hover:bg-zinc-700/50 hover:text-white transition-all cursor-pointer"
          title="Copy code snippet"
          aria-label="Copy snippet"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[11px] text-emerald-300 font-mono">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-[11px] text-zinc-400 hover:text-zinc-200 font-mono">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Editor Body with Gutter */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-zinc-200">
        <div className="min-w-[500px]">
          {lines.map((line) => (
            <div
              key={line.num}
              className="flex items-baseline group hover:bg-zinc-800/30 -mx-4 px-4 py-0.5 rounded transition-colors"
            >
              {/* Line Number Gutter */}
              <span className="w-8 shrink-0 text-right pr-4 text-zinc-600 select-none group-hover:text-zinc-400 font-mono text-[11px]">
                {line.num}
              </span>

              {/* Code Content */}
              <span className="flex-1 whitespace-pre">
                {line.content || "\u00A0"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Status Bar Footer */}
      <div className="flex items-center justify-between border-t border-zinc-800/60 bg-[#0c101a] px-4 py-1.5 text-[10px] font-mono text-zinc-500 select-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            TypeScript 5.x
          </span>
          <span>UTF-8</span>
        </div>
        <div>
          <span>Ln 17, Col 3</span>
        </div>
      </div>
    </div>
  );
}

