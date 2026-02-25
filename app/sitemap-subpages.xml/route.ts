import {
  buildUrlsetXml,
  buildHreflangAlternates,
  sitemapResponse,
  BASE_URL,
  LOCALES,
} from "@/app/helpers/sitemap-utils";

export const revalidate = 3600;

const backendUrl = process.env.NEXT_PUBLIC_URL_BACKEND;

const SECTION_MAP: Record<string, string> = {
  "admission": "/admission/dynamic",
  "education": "/education/dynamic",
  "research": "/research/dynamic",
  "student": "/students/dynamic",
  "press-service": "/press-service/dynamic",
  "partners": "/partners/dynamic",
  "university.document": "/university/dynamic",
};

export async function GET() {
  try {
    const allUrls: Array<{
      loc: string;
      alternates: string;
      priority: string;
    }> = [];

    for (const [pageKey, basePath] of Object.entries(SECTION_MAP)) {
      const slugs = new Set<string>();

      for (const lang of LOCALES) {
        try {
          const res = await fetch(
            `${backendUrl}/api/core/subpages/${pageKey}?language=${lang}`,
            { next: { revalidate: 3600 } },
          );
          if (!res.ok) continue;
          const items = await res.json();
          for (const item of items || []) {
            if (item.slug) slugs.add(item.slug);
          }
        } catch {
          continue;
        }
      }

      for (const slug of slugs) {
        const path = `${basePath}/${slug}`;
        for (const locale of LOCALES) {
          allUrls.push({
            loc: `${BASE_URL}/${locale}${path}`,
            alternates: buildHreflangAlternates(path),
            priority: "0.5",
          });
        }
      }
    }

    const xml = buildUrlsetXml(allUrls);
    return sitemapResponse(xml);
  } catch (error) {
    console.error("Error generating subpages sitemap:", error);
    return sitemapResponse(buildUrlsetXml([]));
  }
}
