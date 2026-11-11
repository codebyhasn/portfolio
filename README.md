# codebyhasn — Senior Frontend & Full-Stack Portfolio

An editorial, high-performance developer portfolio and integrated Content Management System (CMS) engineered by **Muhammad Hassan**. Built on modern web architectural standards, strict TypeScript interfaces, dynamic Framer Motion spring physics, and an SQLite-backed administrative panel.

---

## 🎨 Architectural Identity & Palette

- **Canvas Background:** `#f3eee3` (Warm tactile parchment)
- **Primary Ink:** `#111111` (High-contrast deep carbon)
- **Interactive Accent:** `#D9541E` (Terracotta burnt orange)
- **Typography:** Editorial Serif / Display paired with Technical Monospace (`Geist Sans`, `Geist Mono`, `JetBrains Mono`)

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15+ (App Router, Server Actions, Server Components)
- **Language:** TypeScript 5.x (Strict mode)
- **Styling:** Tailwind CSS v4, Lucide React Icons
- **Animation Engine:** Framer Motion (Adaptive bi-directional scroll reveals & contextual magnetic cursor)
- **Database / CMS:** SQLite via Prisma ORM / Local persistent store
- **SEO & Discovery:** JSON-LD Schema (Person & WebSite entities), Dynamic Edge Open Graph generation, automated XML Sitemaps, and robots configuration.

---

## 📂 Project Structure

```
├── app/
│   ├── layout.tsx            # Global metadata, font definitions, and root providers
│   ├── page.tsx              # Adaptive public landing page (Dynamic sections)
│   ├── opengraph-image.tsx   # Dynamic edge-generated social sharing banner
│   ├── robots.ts             # Crawler routing rules
│   ├── sitemap.ts            # Dynamic sitemap indexer
│   ├── (admin)/
│   │   └── admin/            # Authenticated CMS for content, navigation, & settings
│   └── api/                  # Server endpoints & database action handlers
├── components/
│   ├── cursor/
│   │   └── CustomCursor.tsx  # Contextual magnetic pointer with fine-pointer detection
│   ├── navigation/
│   │   └── Navbar.tsx        # Dynamic navigation backed by admin visibility toggles
│   ├── sections/             # Architecture, Dossier, Chronology, Works, Doctrines, Dispatch
│   └── seo/
│       └── JsonLd.tsx        # Linked data schema script injector
├── prisma/
│   ├── schema.prisma         # Models for Profile, Projects, Chronology, and NavSections
│   └── seed.ts               # Pre-populated data extracted directly from resume
└── public/
    ├── site.webmanifest      # Progressive Web App configuration
    └── assets/                # Vector brandmarks and favicon assets
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites

- Node.js 18.18+ or 20+
- npm, yarn, or pnpm

### 2. Installation

```bash
git clone https://github.com/codebyhasn/portfolio.git
cd portfolio
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Application Base URL (No trailing slash)
NEXT_PUBLIC_SITE_URL=https://codebyhasn.site

# Admin Authentication
ADMIN_SECRET_KEY=your_secure_random_hash_here
ADMIN_PASSWORD_HASH=$2b$10$...

# Database Connection
DATABASE_URL="file:./dev.db"
```

### 4. Database Initialization & Seeding

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to inspect the public portfolio, or navigate to [http://localhost:3000/admin](http://localhost:3000/admin) to manage content.

---

## 🔒 Administrative Controls (`/admin`)

The integrated administrative system supports direct mutation without code redeployment:

- **Navigation & Sections:** Rename tab indices or deactivate sections. Inactivating any item removes its navbar anchor and removes its section from DOM rendering cleanly.
- **Projects & Works:** Add case studies, upload imagery, flag featured highlights, and update live deployment links.
- **Visuals & Motion:** Toggle site-wide animations for low-power devices and toggle avatar display states.

---

## 🚢 Deployment

Optimized for instant deployment to Vercel, Railway, or VPS environments:

```bash
npm run build
npm run start
```
