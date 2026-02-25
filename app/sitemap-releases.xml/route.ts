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

interface ReleaseGroup {
  slug_uz: string;
  slug_en: string;
  slug_ru: string;
  updatedAt?: string;
}

export async function GET() {
  try {
    const releasesMap = new Map<string, ReleaseGroup>();

    for (const lang of LOCALES) {
      const res = await fetch(
        `${backendUrl}/api/press/releases?language=${lang}&page=1&limit=100`,
        { next: { revalidate: 3600 } },
      );
      if (!res.ok) continue;
      const data = await res.json();

      for (const item of data.data || []) {
        const existing = releasesMap.get(item.id) || {
          slug_uz: "",
          slug_en: "",
          slug_ru: "",
          updatedAt: item.updatedAt,
        };
        existing[`slug_${lang}` as keyof ReleaseGroup] = item.slug;
        releasesMap.set(item.id, existing);
      }
    }

    const urls = Array.from(releasesMap.values()).flatMap((item) =>
      LOCALES.map((locale) => ({
        loc: `${BASE_URL}/${locale}/press-service/releases/${item[`slug_${locale}` as keyof ReleaseGroup]}`,
        alternates: buildLocaleSlugAlternates(
          "/press-service/releases",
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
    console.error("Error generating releases sitemap:", error);
    return sitemapResponse(buildUrlsetXml([]));
  }
}
