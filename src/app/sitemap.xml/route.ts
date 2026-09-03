import { LOCALES, BASE_URL } from "@/lib/config";
import { buildSitemapIndex } from "@/lib/sitemapXml";

export const dynamic = "force-static";

export async function GET() {
  const buildDate = new Date().toISOString();
  const xml = buildSitemapIndex(
    LOCALES.map(l => ({ loc: `${BASE_URL}/sitemap-${l}.xml`, lastmod: buildDate }))
  );
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
