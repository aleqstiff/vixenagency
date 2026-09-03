<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/sm:urlset">
<html>
<head>
<meta charset="UTF-8"/>
<title>Sitemap — Only Sweety Agency</title>
<style>
  body{font-family:-apple-system,'Segoe UI',Roboto,sans-serif;background:#fdf5f8;color:#1a1018;margin:0;padding:32px;}
  h1{font-size:20px;margin:0 0 4px;}
  p.sub{color:rgba(26,16,24,0.55);font-size:13px;margin:0 0 24px;}
  a.back{display:inline-block;margin-bottom:16px;font-size:13px;color:#0d9488;text-decoration:none;}
  table{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(26,16,24,0.08);}
  th{text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:rgba(26,16,24,0.45);padding:12px 16px;border-bottom:1px solid rgba(26,16,24,0.08);}
  td{padding:12px 16px;border-bottom:1px solid rgba(26,16,24,0.06);font-size:13px;vertical-align:top;word-break:break-all;}
  tr:last-child td{border-bottom:none;}
  a{color:#0d9488;text-decoration:none;}
  a:hover{text-decoration:underline;}
  .alt{display:inline-block;margin:0 4px 4px 0;font-size:10px;font-family:monospace;text-transform:uppercase;background:rgba(13,148,136,0.08);color:#0d9488;padding:2px 6px;border-radius:4px;white-space:nowrap;}
  .meta{color:rgba(26,16,24,0.45);font-size:12px;white-space:nowrap;}
</style>
</head>
<body>
  <a class="back" href="/sitemap.xml">&#8592; Volver al índice de sitemaps</a>
  <h1>🗺️ Sitemap</h1>
  <p class="sub"><xsl:value-of select="count(sm:url)"/> URLs · Only Sweety Agency</p>
  <table>
    <tr>
      <th>URL</th>
      <th>Idiomas</th>
      <th>Última modificación</th>
      <th>Prioridad</th>
    </tr>
    <xsl:for-each select="sm:url">
    <tr>
      <td><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
      <td>
        <xsl:for-each select="xhtml:link">
          <a class="alt" href="{@href}"><xsl:value-of select="@hreflang"/></a>
        </xsl:for-each>
      </td>
      <td class="meta"><xsl:value-of select="substring(sm:lastmod,1,10)"/></td>
      <td class="meta"><xsl:value-of select="sm:priority"/></td>
    </tr>
    </xsl:for-each>
  </table>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
