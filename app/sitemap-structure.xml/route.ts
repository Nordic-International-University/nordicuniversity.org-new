import {
  buildUrlsetXml,
  buildLocaleSlugAlternates,
  sitemapResponse,
  formatDate,
  BASE_URL,
  LOCALES,
} from "@/app/helpers/sitemap-utils";

export const revalidate = 3600;

const backendUrl = process.env.NEXT_PUBLIC_URL_BACKEND;
const token = process.env.SITEMAP_API_TOKEN;

export async function GET() {
  try {
    const res = await fetch(
      `${backendUrl}/api/university/org-structures/admin?page=1&limit=100`,
      {
        headers: { Authorization: token || "" },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      console.error("Failed to fetch org structures:", res.status);
      return sitemapResponse(buildUrlsetXml([]));
    }

    const data = await res.json();
    const structures = data.data || [];

    const urls = structures.flatMap((item: any) =>
      LOCALES.map((locale) => ({
        loc: `${BASE_URL}/${locale}/university/structure/${item[`slug_${locale}`]}`,
        alternates: buildLocaleSlugAlternates(
          "/university/structure",
          item.slug_uz,
          item.slug_ru,
          item.slug_en,
        ),
        lastmod: formatDate(item.updatedAt),
        priority: "0.6",
      })),
    );

    const xml = buildUrlsetXml(urls);
    return sitemapResponse(xml);
  } catch (error) {
    console.error("Error generating structure sitemap:", error);
    return sitemapResponse(buildUrlsetXml([]));
  }
}
