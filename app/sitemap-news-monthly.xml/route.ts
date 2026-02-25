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

interface NewsGroup {
  slug_uz: string;
  slug_en: string;
  slug_ru: string;
  time: string;
  updatedAt?: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  if (!year || !month) {
    return sitemapResponse(buildUrlsetXml([]));
  }

  try {
    const newsMap = new Map<string, NewsGroup>();

    for (const lang of LOCALES) {
      const res = await fetch(
        `${backendUrl}/api/press/news?language=${lang}&page=1&limit=1000`,
        { next: { revalidate: 3600 } },
      );
      if (!res.ok) continue;
      const data = await res.json();

      for (const item of data.data || []) {
        const d = new Date(item.time);
        if (isNaN(d.getTime())) continue;
        const itemYear = d.getFullYear().toString();
        const itemMonth = (d.getMonth() + 1).toString().padStart(2, "0");
        if (itemYear !== year || itemMonth !== month) continue;

        const existing = newsMap.get(item.id) || {
          slug_uz: "",
          slug_en: "",
          slug_ru: "",
          time: item.time,
          updatedAt: item.updatedAt,
        };
        existing[`slug_${lang}` as keyof NewsGroup] = item.slug;
        newsMap.set(item.id, existing);
      }
    }

    const urls = Array.from(newsMap.values()).flatMap((item) =>
      LOCALES.map((locale) => ({
        loc: `${BASE_URL}/${locale}/press-service/news/${item[`slug_${locale}` as keyof NewsGroup]}`,
        alternates: buildLocaleSlugAlternates(
          "/press-service/news",
          item.slug_uz,
          item.slug_ru,
          item.slug_en,
        ),
        lastmod: formatDate(item.updatedAt || item.time),
        priority: "0.6",
      })),
    );

    const xml = buildUrlsetXml(urls);
    return sitemapResponse(xml);
  } catch (error) {
    console.error(`Error generating news sitemap for ${year}-${month}:`, error);
    return sitemapResponse(buildUrlsetXml([]));
  }
}
