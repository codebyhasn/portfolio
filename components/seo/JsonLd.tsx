import React from 'react';

interface JsonLdProps {
  profile?: {
    name?: string | null;
    title?: string | null;
    bio?: string | null;
    email?: string | null;
    phone?: string | null;
    avatarUrl?: string | null;
    githubUrl?: string | null;
    linkedinUrl?: string | null;
  } | null;
}

export function JsonLd({ profile }: JsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codebyhasn.site';

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile?.name || 'Muhammad Hassan',
    alternateName: 'codebyhasn',
    jobTitle: profile?.title || 'Senior Frontend / Full-Stack Engineer',
    url: siteUrl,
    image: profile?.avatarUrl || `${siteUrl}/logo.png`,
    email: profile?.email || 'codebyhasn@gmail.com',
    telephone: profile?.phone || '+923332713381',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressCountry: 'PK',
    },
    sameAs: [
      profile?.githubUrl || 'https://github.com/codebyhasn',
      profile?.linkedinUrl || 'https://linkedin.com/in/codebyhasn',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'COMSATS University Islamabad, Wah Campus',
      sameAs: 'https://www.comsats.edu.pk/',
    },
    knowsAbout: [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript (ES6+)',
      'Laravel (PHP)',
      '.NET MVC UI Modernization',
      'Tailwind CSS',
      'Redux Toolkit',
      'Context API',
      'RESTful APIs',
      'GraphQL',
      'React Native',
      'UI/UX Engineering',
      'Bootstrap',
      'MUI',
      'PrimeReact',
      'WordPress',
      'Core Web Vitals Optimization',
      'Enterprise Web Architecture',
      'AI-assisted development workflows',
    ],
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Muhammad Hassan Portfolio — codebyhasn',
    url: siteUrl,
    author: {
      '@type': 'Person',
      name: 'Muhammad Hassan',
    },
    description:
      profile?.bio ||
      'Official portfolio and technical showcase of Senior Frontend Engineer Muhammad Hassan.',
    inLanguage: 'en-US',
  };

  // Safe serialization preventing script-injection breakage
  const safeJsonStringify = (data: object) =>
    JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonStringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonStringify(webSiteSchema) }}
      />
    </>
  );
}

export default JsonLd;