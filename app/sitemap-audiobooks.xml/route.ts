import {
  buildUrlsetXml,
  sitemapResponse,
  formatDate,
  BASE_URL,
  LOCALES,
  buildLocaleSlugAlternates,
} from "@/app/helpers/sitemap-utils";

export const revalidate = 3600;

const backendUrl = process.env.NEXT_PUBLIC_URL_BACKEND;

interface AudioBookGroup {
  slug_uz: string;
  slug_en: string;
  slug_ru: string;
  updatedAt?: string;
}

export async function GET() {
  try {
    const itemsMap = new Map<string, AudioBookGroup>();

    for (const lang of LOCALES) {
      const res = await fetch(
        `${backendUrl}/api/science/audio-book/type?language=${lang}`,
        { next: { revalidate: 3600 } },
      );
      if (!res.ok) continue;
      const json = await res.json();
      const items = Array.isArray(json) ? json : json?.data || [];

      for (const item of items) {
        const existing = itemsMap.get(item.id) || {
          slug_uz: "",
          slug_en: "",
          slug_ru: "",
          updatedAt: item.updatedAt,
        };
        existing[`slug_${lang}` as keyof AudioBookGroup] = item.slug;
        itemsMap.set(item.id, existing);
      }
    }

    const urls = Array.from(itemsMap.values()).flatMap((item) =>
      LOCALES.map((locale) => ({
        loc: `${BASE_URL}/${locale}/press-service/audio-books/${item[`slug_${locale}` as keyof AudioBookGroup]}`,
        alternates: buildLocaleSlugAlternates(
          "/press-service/audio-books",
          item.slug_uz,
          item.slug_ru,
          item.slug_en,
        ),
        lastmod: formatDate(item.updatedAt),
        priority: "0.5",
      })),
    );

    const xml = buildUrlsetXml(urls);
    return sitemapResponse(xml);
  } catch (error) {
    console.error("Error generating audiobooks sitemap:", error);
    return sitemapResponse(buildUrlsetXml([]));
  }
}
