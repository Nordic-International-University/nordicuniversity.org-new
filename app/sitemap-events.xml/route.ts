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
    const allItems: any[] = [];

    for (const lang of LOCALES) {
      const res = await fetch(
        `${backendUrl}/api/science/meeting/admin?type=EVENTS&page=1&limit=100&language=${lang}`,
        {
          headers: { Authorization: token || "" },
          next: { revalidate: 3600 },
        },
      );
      if (!res.ok) continue;
      const data = await res.json();
      for (const item of data.data || []) {
        if (!allItems.find((i) => i.slug_uz === item.slug_uz)) {
          allItems.push(item);
        }
      }
    }

    const urls = allItems.flatMap((item) =>
      LOCALES.map((locale) => ({
        loc: `${BASE_URL}/${locale}/research/scientific-events/${item[`slug_${locale}`]}`,
        alternates: buildLocaleSlugAlternates(
          "/research/scientific-events",
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
    console.error("Error generating events sitemap:", error);
    return sitemapResponse(buildUrlsetXml([]));
  }
}
