import { buildSitemapIndexXml, sitemapResponse, BASE_URL } from "@/app/helpers/sitemap-utils";

export const revalidate = 3600;

export async function GET() {
  const sitemaps = [
    `${BASE_URL}/sitemap-static.xml`,
    `${BASE_URL}/sitemap-news.xml`,
    `${BASE_URL}/sitemap-releases.xml`,
    `${BASE_URL}/sitemap-conferences.xml`,
    `${BASE_URL}/sitemap-events.xml`,
    `${BASE_URL}/sitemap-connections.xml`,
    `${BASE_URL}/sitemap-scholarships.xml`,
    `${BASE_URL}/sitemap-forum.xml`,
    `${BASE_URL}/sitemap-structure.xml`,
    `${BASE_URL}/sitemap-audiobooks.xml`,
    `${BASE_URL}/sitemap-academic.xml`,
    `${BASE_URL}/sitemap-photos.xml`,
    `${BASE_URL}/sitemap-subpages.xml`,
  ];

  const xml = buildSitemapIndexXml(sitemaps);
  return sitemapResponse(xml);
}
