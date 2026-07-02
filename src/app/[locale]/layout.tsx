import type { Metadata } from "next";
import { LOCALES, type Locale, BASE_URL , langAlternates } from "@/lib/config";
import { TR } from "@/lib/translations";
import "../globals.css";


export async function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const tr = (TR[l] ?? TR.es) as Record<string, string>;
  return {
    title: tr.meta_title,
    description: tr.meta_desc,
    keywords: tr.meta_kw,
    robots: { index:true, follow:true, googleBot:{ index:true, follow:true } },
    alternates: { canonical:`${BASE_URL}/${l}/` },
    openGraph: { title:tr.meta_title, description:tr.meta_desc, url:`${BASE_URL}/${l}/`, siteName:"Only Sweety Agency", locale:l, type:"website", images:[{ url:`${BASE_URL}/og-image.png`, width:1200, height:630, alt:"Only Sweety Agency" }] },
    twitter: { card:"summary_large_image", title:tr.meta_title, description:tr.meta_desc, images:[`${BASE_URL}/og-image.png`] },
    other: { "trustpilot-one-time-domain-verification-id": "bd17ee5f-9e04-42a1-8d72-1b7c35a21004" },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const schema = {
    "@context":"https://schema.org","@type":"Organization","name":"Only Sweety Agency","url":BASE_URL,
    "description":"Professional OnlyFans management agency operating in 15+ countries",
    "contactPoint":{"@type":"ContactPoint","contactType":"customer service","availableLanguage":["Spanish","English","French","German","Italian","Portuguese"]},
    "areaServed":["ES","MX","AR","CO","CL","PE","US","CA","FR","DE","IT","BR"],
  };
  return (
    <html lang={l}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=DM+Sans:wght@400;500;600;700;800&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=DM+Sans:wght@400;500;600;700;800&display=swap" />
        {LOCALES.map(loc => <link key={loc} rel="alternate" hrefLang={loc} href={`${BASE_URL}/${loc}/`} />)}
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/es/`} />
        <link rel="preconnect" href="https://images.unsplash.com"/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Saltar al contenido</a>{children}</body>
    </html>
  );
}
