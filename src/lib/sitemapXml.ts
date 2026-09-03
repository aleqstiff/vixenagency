// Construcción manual del XML de los sitemaps (en vez de la convención
// sitemap.ts de Next) para poder generar:
//  - Un índice real (<sitemapindex>) con un sitemap por idioma.
//  - XML con indentación legible + <?xml-stylesheet?> apuntando a un XSL,
//    para que abrir la URL en el navegador se vea como una tabla, no como
//    texto plano.

export interface SitemapUrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
  alternates?: Record<string, string>;
}

export interface SitemapIndexEntry {
  loc: string;
  lastmod?: string;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildUrlset(entries: SitemapUrlEntry[]): string {
  const urls = entries
    .map(e => {
      const lines = ["  <url>", `    <loc>${escapeXml(e.loc)}</loc>`];
      if (e.alternates) {
        Object.entries(e.alternates).forEach(([hreflang, href]) => {
          lines.push(`    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(href)}"/>`);
        });
      }
      if (e.lastmod) lines.push(`    <lastmod>${e.lastmod}</lastmod>`);
      if (e.changefreq) lines.push(`    <changefreq>${e.changefreq}</changefreq>`);
      if (e.priority !== undefined) lines.push(`    <priority>${e.priority}</priority>`);
      lines.push("  </url>");
      return lines.join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

export function buildSitemapIndex(entries: SitemapIndexEntry[]): string {
  const sitemaps = entries
    .map(e => {
      const lines = ["  <sitemap>", `    <loc>${escapeXml(e.loc)}</loc>`];
      if (e.lastmod) lines.push(`    <lastmod>${e.lastmod}</lastmod>`);
      lines.push("  </sitemap>");
      return lines.join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-index.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>
`;
}
