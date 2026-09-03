import type { Locale } from "@/lib/config";
import { buildUrlset } from "@/lib/sitemapXml";
import { localeSitemapEntries } from "@/lib/sitemapData";

// Factory para los 6 route handlers sitemap-<locale>.xml/route.ts — cada uno
// solo pasa su locale, toda la lógica vive aquí.
export function makeLocaleSitemapGET(locale: Locale) {
  return async function GET() {
    const buildDate = new Date().toISOString();
    const xml = buildUrlset(localeSitemapEntries(locale, buildDate));
    return new Response(xml, { headers: { "Content-Type": "application/xml" } });
  };
}
