import type { MetadataRoute } from "next";
import { LOCALES, LOCALE_COUNTRIES, SERVICES, BASE_URL, langAlternates, serviceAlternates } from "@/lib/config";
import { POSTS } from "@/lib/blog";

export const dynamic = "force-static";

// Sitemap generado en build a partir de las mismas fuentes que usan las páginas
// (config.ts / blog.ts), para que nunca se desincronice de las rutas reales.
export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();
  const entries: MetadataRoute.Sitemap = [];

  entries.push({
    url: `${BASE_URL}/`,
    lastModified: buildDate,
    changeFrequency: "weekly",
    priority: 1.0,
  });

  LOCALES.forEach(l => {
    entries.push({
      url: `${BASE_URL}/${l}/`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: langAlternates(loc => `/${loc}/`) },
    });

    entries.push({
      url: `${BASE_URL}/${l}/blog/`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: langAlternates(loc => `/${loc}/blog/`) },
    });

    entries.push({
      url: `${BASE_URL}/${l}/privacidad/`,
      lastModified: buildDate,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: langAlternates(loc => `/${loc}/privacidad/`) },
    });

    (LOCALE_COUNTRIES[l] ?? []).forEach(country => {
      entries.push({
        url: `${BASE_URL}/${l}/${country}/`,
        lastModified: buildDate,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });

    (SERVICES[l] ?? []).forEach(s => {
      entries.push({
        url: `${BASE_URL}/${l}/servicios/${s.slug}/`,
        lastModified: buildDate,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: serviceAlternates(l, s.slug) },
      });
    });
  });

  POSTS.forEach(p => {
    entries.push({
      url: `${BASE_URL}/${p.locale}/blog/${p.slug}/`,
      lastModified: p.date,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  return entries;
}
