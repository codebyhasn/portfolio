import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ----- Profile -----
  await prisma.profile.deleteMany();
  await prisma.profile.create({
    data: {
      name: "Muhammad Hassan",
      headline: "Senior Frontend / Full-Stack Engineer",
      subHeadline: "React · Next.js · TypeScript · Laravel · 6+ Years",
      bio: "Senior Frontend / Full-Stack Engineer with 6+ years of experience architecting scalable, high-performance web applications, specializing primarily in React and Next.js, alongside full-cycle development in Laravel (PHP), WordPress and UI-focused modernizations in .NET. Adept across the complete software development lifecycle, translating complex product requirements into robust, pixel-perfect, and accessible user interfaces with optimized render speeds. Actively accelerates delivery velocity, test coverage, and code maintainability by leveraging modern AI-assisted development workflows.",
      location: "Islamabad, Pakistan",
      email: "codebyhasn@gmail.com",
      phone: "+92 (333) 271 3381",
      linkedIn: "https://linkedin.com/in/codebyhasn",
      github: "https://github.com/codebyhasn",
      avatarUrl: "/assets/avatar.jpg",
      availableForWork: true,
      resumeUrl: "/resume.pdf",
    },
  });

  // ----- Experience -----
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: [
      {
        company: "App in Snap",
        role: "Sr. React Developer",
        startDate: "Aug 2023",
        endDate: "Present",
        location: "Islamabad, Pakistan",
        description:
          "Architecting and scaling enterprise-grade banking application interfaces with strict security standards, real-time Java microservices integration, and sub-second render speeds.",
        achievements: JSON.stringify([
          "Architect and scale enterprise-grade fintech banking application interfaces using React.js, Next.js, and JavaScript, ensuring strict security standards, responsiveness, and sub-second render speeds.",
          "Integrate high-security enterprise Java RESTful APIs and microservices, handling complex payload structures, authentication tokens, and real-time transaction processing.",
          "Spearhead end-to-end web features using PHP / Laravel, handling backend business logic, database integrations, and robust RESTful API endpoints.",
          "Modernize legacy .NET MVC banking applications by executing comprehensive UI/UX overhauls, updating Razor views/layouts, and delivering cohesive, polished user interfaces.",
          "Manage state architecture using Redux Toolkit and Context API, streamlining complex data flows across large-scale financial and enterprise modules.",
          "Build reusable, accessible UI component libraries using Bootstrap, PrimeReact, Tailwind CSS, and MUI, accelerating sprint delivery cadence across teams.",
          "Bridge technical execution between QA and backend engineering teams to resolve critical integration bottlenecks, establish clear module contracts, and expedite release cycles.",
          "Utilize modern AI-assisted engineering tools to accelerate code refactoring, generate comprehensive unit tests, and maintain clean architectural standards.",
        ]),
        techStack: JSON.stringify([
          "React.js",
          "Next.js",
          "TypeScript",
          "JavaScript (ES6+)",
          "Redux Toolkit",
          "Context API",
          "PHP / Laravel",
          ".NET MVC",
          "Java REST APIs",
          "Tailwind CSS",
          "Bootstrap",
          "PrimeReact",
          "MUI",
        ]),
        order: 0,
        visible: true,
      },
      {
        company: "CodeJunkie",
        role: "Front-End Engineer",
        startDate: "Sept 2019",
        endDate: "Aug 2023",
        location: "Islamabad, Pakistan",
        description:
          "Engineered dynamic web applications, customer-facing portals, and responsive SPAs for high-growth international businesses across fintech and SaaS domains.",
        achievements: JSON.stringify([
          "Developed dynamic web applications and customer-facing portals for high-growth international businesses across fintech and SaaS domains.",
          "Transitioned the engineering workflow to modern React.js, delivering responsive single-page applications (SPAs) with complex state workflows.",
          "Developed and customized content-driven web portals utilizing Laravel/PHP and WordPress alongside modern frontend layouts.",
          "Integrated RESTful APIs and GraphQL endpoints for efficient dynamic data querying and reduced network overhead.",
          "Converted high-fidelity Figma/UI designs into pixel-perfect, accessible, and cross-browser compatible frontend code.",
          "Prototyped cross-platform mobile features using React Native.",
        ]),
        techStack: JSON.stringify([
          "React.js",
          "JavaScript (ES6+)",
          "PHP / Laravel",
          "WordPress",
          "GraphQL",
          "RESTful APIs",
          "React Native",
          "Figma",
          "Bootstrap",
          "Tailwind CSS",
          "PrimeReact",
          "MUI",
        ]),
        order: 1,
        visible: true,
      },
      {
        company: "QuipSol",
        role: "Front-End Developer",
        startDate: "Apr 2019",
        endDate: "Sept 2019",
        location: "Islamabad, Pakistan",
        description:
          "Developed responsive, cross-browser compliant web templates and transformed design mockups into semantic, mobile-first frontend code adhering to W3C standards.",
        achievements: JSON.stringify([
          "Developed responsive, cross-browser compliant web templates using HTML5, CSS3, JavaScript, and jQuery.",
          "Transformed design mockups into semantic, mobile-first frontend code adhering to W3C standards.",
          "Collaborated with lead developers to debug legacy UI modules and improve interactive elements across landing pages.",
        ]),
        techStack: JSON.stringify([
          "HTML5",
          "CSS3",
          "JavaScript",
          "jQuery",
          "Bootstrap",
          "W3C Standards",
        ]),
        order: 2,
        visible: true,
      },
    ],
  });

  // ----- Projects -----
  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        title: "Enterprise Banking Interface",
        slug: "enterprise-banking-interface",
        description:
          "Architected a high-security, enterprise-grade banking application interface with sub-second render speeds, complex state management via Redux Toolkit, and full accessibility compliance. Built with React.js, Next.js, and integrated with Laravel backend APIs.",
        coverImage: "",
        tags: JSON.stringify([
          "React",
          "Next.js",
          "TypeScript",
          "Redux Toolkit",
          "Laravel",
          "Full-Stack",
        ]),
        liveUrl: "",
        githubUrl: "",
        featured: true,
        visible: true,
        order: 0,
      },
      {
        title: ".NET MVC UI Modernization",
        slug: "dotnet-mvc-ui-modernization",
        description:
          "Led comprehensive UI/UX overhaul of legacy .NET MVC banking applications, updating Razor views and layouts to deliver cohesive, modern, and polished user interfaces while preserving all existing backend functionality.",
        coverImage: "",
        tags: JSON.stringify([".NET", "MVC", "Razor", "UI/UX", "Bootstrap"]),
        liveUrl: "",
        githubUrl: "",
        featured: true,
        visible: true,
        order: 1,
      },
      {
        title: "React SPA Suite for International Clients",
        slug: "react-spa-international-clients",
        description:
          "Engineered full-featured React SPAs for AION Digital, Keyhole, and TryReach — transitioning from legacy CMS stacks to modern React workflows with GraphQL APIs, complex state management, and pixel-perfect Figma implementation.",
        coverImage: "",
        tags: JSON.stringify([
          "React",
          "GraphQL",
          "JavaScript",
          "Laravel",
          "Full-Stack",
        ]),
        liveUrl: "",
        githubUrl: "",
        featured: true,
        visible: true,
        order: 2,
      },
      {
        title: "Component Library System",
        slug: "component-library-system",
        description:
          "Built a reusable, accessible UI component library using Tailwind CSS, PrimeReact, and MUI — accelerating sprint delivery cadence across engineering teams and establishing consistent design language.",
        coverImage: "",
        tags: JSON.stringify([
          "React",
          "Tailwind CSS",
          "PrimeReact",
          "MUI",
          "Design Systems",
        ]),
        liveUrl: "",
        githubUrl: "",
        featured: false,
        visible: true,
        order: 3,
      },
      {
        title: "React Native Mobile Prototypes",
        slug: "react-native-mobile-prototypes",
        description:
          "Prototyped cross-platform mobile features using React Native for client projects, leveraging shared business logic between web and mobile platforms.",
        coverImage: "",
        tags: JSON.stringify(["React Native", "Mobile", "Cross-Platform"]),
        liveUrl: "",
        githubUrl: "",
        featured: false,
        visible: true,
        order: 4,
      },
      {
        title: "WordPress & Laravel Content Portals",
        slug: "wordpress-laravel-content-portals",
        description:
          "Developed and customized content-driven web portals utilizing Laravel/PHP and WordPress, integrating RESTful APIs for dynamic data and implementing modern frontend layouts.",
        coverImage: "",
        tags: JSON.stringify([
          "WordPress",
          "Laravel",
          "PHP",
          "REST API",
          "Full-Stack",
        ]),
        liveUrl: "",
        githubUrl: "",
        featured: false,
        visible: true,
        order: 5,
      },
    ],
  });

  // ----- Skills -----
  await prisma.skill.deleteMany();
  await prisma.skill.createMany({
    data: [
      // Frontend
      { name: "React.js", category: "Frontend", level: 98, order: 0 },
      { name: "Next.js", category: "Frontend", level: 97, order: 1 },
      { name: "TypeScript", category: "Frontend", level: 95, order: 2 },
      { name: "JavaScript (ES6+)", category: "Frontend", level: 98, order: 3 },
      { name: "Redux Toolkit", category: "Frontend", level: 95, order: 4 },
      { name: "Context API", category: "Frontend", level: 95, order: 5 },
      { name: "React Hooks", category: "Frontend", level: 98, order: 6 },
      { name: "HTML5", category: "Frontend", level: 98, order: 7 },
      { name: "CSS3", category: "Frontend", level: 95, order: 8 },
      { name: "Tailwind CSS", category: "Frontend", level: 95, order: 9 },
      { name: "Bootstrap", category: "Frontend", level: 92, order: 10 },
      { name: "MUI", category: "Frontend", level: 88, order: 11 },
      { name: "PrimeReact", category: "Frontend", level: 88, order: 12 },

      // Backend & CMS
      { name: "Laravel (PHP)", category: "Backend & CMS", level: 88, order: 0 },
      { name: ".NET MVC UI Overhauls", category: "Backend & CMS", level: 82, order: 1 },
      { name: "NodeJS (Core concepts)", category: "Backend & CMS", level: 78, order: 2 },
      { name: "WordPress", category: "Backend & CMS", level: 86, order: 3 },
      { name: "OctoberCMS", category: "Backend & CMS", level: 80, order: 4 },
      { name: "RESTful APIs", category: "Backend & CMS", level: 94, order: 5 },
      { name: "GraphQL", category: "Backend & CMS", level: 82, order: 6 },

      // Mobile
      { name: "React Native", category: "Mobile", level: 82, order: 0 },

      // DevOps & Workflows
      { name: "Git", category: "DevOps & Workflows", level: 95, order: 0 },
      { name: "GitHub", category: "DevOps & Workflows", level: 95, order: 1 },
      { name: "Microsoft Azure (CI/CD)", category: "DevOps & Workflows", level: 80, order: 2 },
      { name: "Postman", category: "DevOps & Workflows", level: 92, order: 3 },
      { name: "Chrome DevTools", category: "DevOps & Workflows", level: 94, order: 4 },
      { name: "Vite", category: "DevOps & Workflows", level: 90, order: 5 },
      { name: "npm / yarn", category: "DevOps & Workflows", level: 92, order: 6 },
      { name: "Figma", category: "DevOps & Workflows", level: 88, order: 7 },

      // Methodologies & AI
      { name: "AI-assisted development workflows", category: "Methodologies & AI", level: 95, order: 0 },
      { name: "Agile / Scrum", category: "Methodologies & AI", level: 92, order: 1 },
      { name: "JIRA", category: "Methodologies & AI", level: 90, order: 2 },
      { name: "Asana", category: "Methodologies & AI", level: 88, order: 3 },
      { name: "Linear", category: "Methodologies & AI", level: 88, order: 4 },
      { name: "Cross-Browser Compatibility", category: "Methodologies & AI", level: 95, order: 5 },
      { name: "Core Web Vitals Optimization", category: "Methodologies & AI", level: 94, order: 6 },
    ],
  });

  // ----- Credentials & Education -----
  await prisma.credential.deleteMany();
  await prisma.credential.createMany({
    data: [
      {
        title: "Bachelor of Science in Computer Science",
        issuer: "COMSATS University Islamabad, Wah Campus",
        type: "Education",
        period: "Feb 2015 — Jan 2019",
        description:
          "4-year undergraduate degree focusing on software engineering, data structures, algorithms, distributed computing, and web architecture.",
        url: "",
        order: 0,
        visible: true,
      },
      {
        title: "Meta Front-End Developer Specialization",
        issuer: "Meta (Coursera)",
        type: "Certification",
        period: "Verified Credential",
        description:
          "Specialization in front-end development covering React, JavaScript (ES6+), UI/UX principles, version control, and frontend testing.",
        url: "https://www.coursera.org",
        order: 1,
        visible: true,
      },
      {
        title: "Google Technical Support Fundamentals",
        issuer: "Google (Coursera)",
        type: "Certification",
        period: "Verified Credential",
        description:
          "Fundamentals of technical support covering computer hardware, the Internet, operating systems, networking, system administration, and systematic IT troubleshooting.",
        url: "https://www.coursera.org",
        order: 2,
        visible: true,
      },
    ],
  });

  // ----- Nav Sections -----
  await prisma.navSection.deleteMany();
  await prisma.navSection.createMany({
    data: [
      {
        key: "architecture",
        number: "01",
        label: "Architecture",
        targetId: "#architecture",
        order: 1,
        isActive: true,
      },
      {
        key: "dossier",
        number: "02",
        label: "Dossier",
        targetId: "#about",
        order: 2,
        isActive: true,
      },
      {
        key: "chronology",
        number: "03",
        label: "Chronology",
        targetId: "#chronology",
        order: 3,
        isActive: true,
      },
      {
        key: "credentials",
        number: "04",
        label: "Credentials",
        targetId: "#credentials",
        order: 4,
        isActive: true,
      },
      {
        key: "works",
        number: "05",
        label: "Works",
        targetId: "#works",
        order: 5,
        isActive: true,
      },
      {
        key: "doctrines",
        number: "06",
        label: "Doctrines",
        targetId: "#doctrines",
        order: 6,
        isActive: true,
      },
      {
        key: "dispatch",
        number: "07",
        label: "Dispatch",
        targetId: "#dispatch",
        order: 7,
        isActive: true,
      },
    ],
  });

  console.log("✅ Database seeded successfully!");

  // ----- Generate bcrypt hash for admin password -----
  const hash = await bcrypt.hash("admin123", 12);
  console.log("\n🔐 Admin credentials:");
  console.log("   Username: admin");
  console.log("   Password: admin123");
  console.log(
    "\n📝 Add this to your .env.local:\n   ADMIN_PASSWORD_HASH=" + hash
  );

  // Auto-update .env.local
  const envPath = path.join(process.cwd(), ".env.local");
  let envContent = fs.readFileSync(envPath, "utf-8");
  envContent = envContent.replace(
    /ADMIN_PASSWORD_HASH=.*/,
    `ADMIN_PASSWORD_HASH="${hash}"`
  );
  fs.writeFileSync(envPath, envContent);
  console.log("\n✅ .env.local updated with hashed password!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

