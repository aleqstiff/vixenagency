import { LOCALE_COUNTRIES, SERVICES, BASE_URL, langAlternates, serviceAlternates, type Locale } from "@/lib/config";
import { POSTS } from "@/lib/blog";
import type { SitemapUrlEntry } from "./sitemapXml";

// Todas las URLs de un idioma para su sitemap-<locale>.xml, a partir de las
// mismas fuentes que usan las páginas — nunca se desincroniza de las rutas reales.
export function localeSitemapEntries(locale: Locale, buildDate: string): SitemapUrlEntry[] {
  const entries: SitemapUrlEntry[] = [];

  if (locale === "es") {
    entries.push({ loc: `${BASE_URL}/`, lastmod: buildDate, changefreq: "weekly", priority: 1.0 });
  }

  entries.push({
    loc: `${BASE_URL}/${locale}/`,
    lastmod: buildDate, changefreq: "weekly", priority: 0.9,
    alternates: langAlternates(loc => `/${loc}/`),
  });
  entries.push({
    loc: `${BASE_URL}/${locale}/blog/`,
    lastmod: buildDate, changefreq: "weekly", priority: 0.8,
    alternates: langAlternates(loc => `/${loc}/blog/`),
  });
  entries.push({
    loc: `${BASE_URL}/${locale}/privacidad/`,
    lastmod: buildDate, changefreq: "yearly", priority: 0.3,
    alternates: langAlternates(loc => `/${loc}/privacidad/`),
  });

  (LOCALE_COUNTRIES[locale] ?? []).forEach(country => {
    entries.push({
      loc: `${BASE_URL}/${locale}/${country}/`,
      lastmod: buildDate, changefreq: "monthly", priority: 0.8,
    });
  });

  (SERVICES[locale] ?? []).forEach(s => {
    entries.push({
      loc: `${BASE_URL}/${locale}/servicios/${s.slug}/`,
      lastmod: buildDate, changefreq: "monthly", priority: 0.7,
      alternates: serviceAlternates(locale, s.slug),
    });
  });

  POSTS.filter(p => p.locale === locale).forEach(p => {
    entries.push({
      loc: `${BASE_URL}/${locale}/blog/${p.slug}/`,
      lastmod: p.date, changefreq: "monthly", priority: 0.6,
    });
  });

  return entries;
}
