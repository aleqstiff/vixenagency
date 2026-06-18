import type { Metadata } from "next";
import { LOCALES, type Locale, BASE_URL } from "@/lib/config";
import { TR } from "@/lib/translations";
import "../globals.css";

export async function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const tr = (TR[l] ?? TR.es) as Record<string, string>;
  const langs: Record<string,string> = {};
  LOCALES.forEach(loc => { langs[loc] = `${BASE_URL}/${loc}/`; });
  langs["x-default"] = `${BASE_URL}/es/`;
  return {
    title: tr.meta_title,
    description: tr.meta_desc,
    keywords: tr.meta_kw,
    robots: { index:true, follow:true, googleBot:{ index:true, follow:true } },
    alternates: { canonical:`${BASE_URL}/${l}/`, languages:langs },
    openGraph: { title:tr.meta_title, description:tr.meta_desc, url:`${BASE_URL}/${l}/`, siteName:"VixenAgency", locale:l, type:"website" },
    twitter: { card:"summary_large_image", title:tr.meta_title, description:tr.meta_desc },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const schema = {
    "@context":"https://schema.org","@type":"Organization","name":"VixenAgency","url":BASE_URL,
    "description":"Professional OnlyFans management agency operating in 15+ countries",
    "contactPoint":{"@type":"ContactPoint","contactType":"customer service","availableLanguage":["Spanish","English","French","German","Italian","Portuguese"]},
    "areaServed":["ES","MX","AR","CO","CL","PE","US","CA","FR","DE","IT","BR"],
  };
  return (
    <html lang={l}>
      <head>
        {LOCALES.map(loc => <link key={loc} rel="alternate" hrefLang={loc} href={`${BASE_URL}/${loc}/`} />)}
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/es/`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
