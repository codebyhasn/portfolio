import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0e12" },
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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Muhammad Hassan — Senior Frontend / Full-Stack Engineer",
  description:
    "Senior Frontend / Full-Stack Engineer with 6+ years of experience specializing in React, Next.js, TypeScript, and Laravel. Based in Islamabad, Pakistan.",
  keywords: [
    "Muhammad Hassan",
    "Senior Frontend Engineer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Full-Stack",
    "Islamabad",
    "codebyhasn",
  ],
  authors: [{ name: "Muhammad Hassan" }],
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon-16x16.png?v=2", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png?v=2",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png?v=2",
      },
    ],
  },
  manifest: "/site.webmanifest?v=2",
  openGraph: {
    title: "Muhammad Hassan — Senior Frontend / Full-Stack Engineer",
    description:
      "6+ years architecting scalable, high-performance web applications with React, Next.js and Laravel.",
    type: "website",
    images: [
      {
        url: "/brand-logo.png?v=2",
        width: 512,
        height: 512,
        alt: "codebyhasn logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
        <link rel="manifest" href="/site.webmanifest?v=2" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${newsreader.variable} font-sans antialiased relative`}
      >
        {/* Subtle noise grain texture overlay to remove sterile digital sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] grain-overlay"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              classNames: {
                toast:
                  "bg-zinc-900 border border-zinc-800 text-zinc-100 shadow-xl",
                title: "text-zinc-100 font-medium",
                description: "text-zinc-400",
                actionButton: "bg-violet-600 text-white",
                cancelButton: "bg-zinc-800 text-zinc-400",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
