<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/sm:sitemapindex">
<html>
<head>
<meta charset="UTF-8"/>
<title>Sitemap Index — Only Sweety Agency</title>
<style>
  body{font-family:-apple-system,'Segoe UI',Roboto,sans-serif;background:#fdf5f8;color:#1a1018;margin:0;padding:32px;}
  h1{font-size:20px;margin:0 0 4px;}
  p.sub{color:rgba(26,16,24,0.55);font-size:13px;margin:0 0 24px;}
  table{width:100%;max-width:640px;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(26,16,24,0.08);}
  th{text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:rgba(26,16,24,0.45);padding:12px 16px;border-bottom:1px solid rgba(26,16,24,0.08);}
  td{padding:14px 16px;border-bottom:1px solid rgba(26,16,24,0.06);font-size:14px;}
  tr:last-child td{border-bottom:none;}
  a{color:#0d9488;text-decoration:none;font-weight:600;}
  a:hover{text-decoration:underline;}
  .meta{color:rgba(26,16,24,0.45);font-size:12px;}
</style>
</head>
<body>
  <h1>🗺️ Sitemap Index</h1>
  <p class="sub"><xsl:value-of select="count(sm:sitemap)"/> sitemaps por idioma · Only Sweety Agency</p>
  <table>
    <tr><th>Sitemap</th><th>Última modificación</th></tr>
    <xsl:for-each select="sm:sitemap">
    <tr>
      <td><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
      <td class="meta"><xsl:value-of select="substring(sm:lastmod,1,10)"/></td>
    </tr>
    </xsl:for-each>
  </table>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
