import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { JsonLd } from "@/components/seo/JsonLd";
import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3eee3" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0f12" },
  ],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

// React cache prevents duplicate Prisma queries between generateMetadata and RootLayout
const getProfile = cache(async () => {
  try {
    return await prisma.profile.findFirst();
  } catch {
    return null;
  }
});

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codebyhasn.site";
  const profile = await getProfile();

  let title = "Muhammad Hassan — Senior Frontend & Full-Stack Engineer | React & Next.js Architect";
  let description =
    "Senior Frontend & Full-Stack Engineer with 6+ years of experience architecting scalable, sub-second web applications in React.js, Next.js, TypeScript, Laravel, and .NET modernizations. Available for senior engineering roles and technical consulting.";
  let keywords = [
    "Muhammad Hassan",
    "codebyhasn",
    "Senior Frontend Engineer",
    "Senior React Developer",
    "Next.js Architect",
    "Full Stack Engineer Pakistan",
    "React Developer Islamabad",
    "TypeScript Developer",
    "Laravel Full Stack Developer",
    "Fintech Web Engineer",
    "UI UX Engineering",
    "Modern Web Architecture",
    "Enterprise Banking Web Apps",
  ];

  if (profile?.seoTitle && profile.seoTitle.trim()) {
    title = profile.seoTitle.trim();
  }
  if (profile?.seoDescription && profile.seoDescription.trim()) {
    description = profile.seoDescription.trim();
  }
  if (profile?.seoKeywords && profile.seoKeywords.trim()) {
    const extra = profile.seoKeywords
      .split(",")
      .map((k: string) => k.trim())
      .filter(Boolean);
    keywords = Array.from(new Set([...keywords, ...extra]));
  }

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: "%s | Muhammad Hassan — codebyhasn",
    },
    description,
    keywords,
    authors: [{ name: "Muhammad Hassan (codebyhasn)", url: baseUrl }],
    creator: "Muhammad Hassan (codebyhasn)",
    publisher: "Muhammad Hassan",
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: [
        { url: "/favicon.ico?v=4", sizes: "any" },
        { url: "/favicon-16x16.png?v=4", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png?v=4", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png?v=4", sizes: "180x180", type: "image/png" },
      ],
      other: [
        {
          rel: "android-chrome-192x192",
          url: "/android-chrome-192x192.png?v=4",
        },
        {
          rel: "android-chrome-512x512",
          url: "/android-chrome-512x512.png?v=4",
        },
      ],
    },
    manifest: "/site.webmanifest?v=4",
    openGraph: {
      type: "profile",
      locale: "en_US",
      url: baseUrl,
      title: "Muhammad Hassan — Senior Frontend & Full-Stack Engineer",
      description:
        "Building high-performance, accessible enterprise web apps and modern digital experiences in React, Next.js, and TypeScript.",
      siteName: "Muhammad Hassan Portfolio — codebyhasn",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Muhammad Hassan — codebyhasn Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Muhammad Hassan — Senior Frontend & Full-Stack Engineer",
      description:
        "Explore technical case studies, enterprise fintech solutions, and architecture doctrines by Muhammad Hassan.",
      creator: "@codebyhasn",
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getProfile();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico?v=4" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=4" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=4" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=4" />
        <link rel="manifest" href="/site.webmanifest?v=4" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${newsreader.variable} font-sans antialiased relative`}
      >
        <JsonLd profile={profile} />
        {/* Subtle noise grain texture overlay to remove sterile digital sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-30 opacity-[0.035] grain-overlay"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              classNames: {
                toast:
                  "bg-white dark:bg-[#14161c] border border-[#111111]/12 dark:border-white/10 text-[#111111] dark:text-zinc-100 shadow-md font-mono text-xs",
                title: "text-[#111111] dark:text-zinc-100 font-semibold",
                description: "text-[#555555] dark:text-zinc-400",
                actionButton: "bg-[#D9541E] hover:bg-[#bf4615] text-white",
                cancelButton: "bg-[#ebe5d8] text-[#555555] dark:bg-zinc-800 dark:text-zinc-400",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}