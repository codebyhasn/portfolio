import type { Profile } from "@/lib/types";

interface JsonLdProps {
  profile?: Profile | null;
}

export function JsonLd({ profile }: JsonLdProps = {}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codebyhasn.com";
  const name = profile?.name || "Muhammad Hassan";
  const email = profile?.email || "codebyhasn@gmail.com";
  const headline = profile?.headline || "Senior Frontend / Full-Stack Engineer";
  const location = profile?.location || "Islamabad, Pakistan";
  const github = profile?.github || "https://github.com/codebyhasn";
  const linkedIn = profile?.linkedIn || "https://linkedin.com/in/codebyhasn";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: name,
    alternateName: "codebyhasn",
    jobTitle: headline,
    url: siteUrl,
    image: `${siteUrl}/assets/avatar.jpg`,
    email: email,
    telephone: profile?.phone || "+92 (333) 271 3381",
    address: {
      "@type": "PostalAddress",
      addressLocality: location.split(",")[0]?.trim() || "Islamabad",
      addressCountry: "PK",
    },
    sameAs: [github, linkedIn].filter(Boolean),
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "COMSATS University Islamabad, Wah Campus",
      sameAs: "https://www.comsats.edu.pk/",
    },
    knowsAbout: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Redux Toolkit",
      "Context API",
      "Laravel",
      "PHP",
      ".NET MVC",
      "WordPress",
      "RESTful APIs",
      "GraphQL",
      "React Native",
      "Tailwind CSS",
      "Bootstrap",
      "PrimeReact",
      "MUI",
      "Core Web Vitals",
      "Enterprise Web Architecture",
      "AI-assisted development workflows",
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Muhammad Hassan Portfolio — codebyhasn",
    alternateName: "codebyhasn",
    url: siteUrl,
    description:
      profile?.seoDescription ||
      profile?.bio ||
      "Senior Frontend & Full-Stack Engineer with 6+ years of experience architecting scalable, sub-second web applications in React.js, Next.js, TypeScript, Laravel, and .NET modernizations.",
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
    </>
  );
}

export default JsonLd;
