const BASE_URL = "https://nordicuniversity.org";
const LOCALES = ["uz", "en", "ru"] as const;

export function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return new Date().toISOString().split("T")[0];
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return new Date().toISOString().split("T")[0];
  return d.toISOString().split("T")[0];
}

export function buildHreflangAlternates(path: string): string {
  let xml = "";
  for (const locale of LOCALES) {
    xml += `    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(`${BASE_URL}/${locale}${path}`)}"/>\n`;
  }
  xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${BASE_URL}/uz${path}`)}"/>\n`;
  return xml;
}

export function buildLocaleSlugAlternates(
  basePath: string,
  slugUz: string,
  slugRu: string,
  slugEn: string,
): string {
  const slugMap: Record<string, string> = {
    uz: slugUz,
    en: slugEn,
    ru: slugRu,
  };
  let xml = "";
  for (const locale of LOCALES) {
    xml += `    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(`${BASE_URL}/${locale}${basePath}/${slugMap[locale]}`)}"/>\n`;
  }
  xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${BASE_URL}/uz${basePath}/${slugUz}`)}"/>\n`;
  return xml;
}

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
  alternates?: string;
}

export function buildUrlsetXml(urls: SitemapUrl[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const url of urls) {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(url.loc)}</loc>\n`;
    if (url.alternates) xml += url.alternates;
    if (url.lastmod) xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    if (url.changefreq)
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    if (url.priority) xml += `    <priority>${url.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

export function buildSitemapIndexXml(sitemapUrls: string[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const url of sitemapUrls) {
    xml += `  <sitemap>\n`;
    xml += `    <loc>${escapeXml(url)}</loc>\n`;
    xml += `  </sitemap>\n`;
  }

  xml += `</sitemapindex>\n`;
  return xml;
}

export function sitemapResponse(xml: string): Response {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

export { BASE_URL, LOCALES };
