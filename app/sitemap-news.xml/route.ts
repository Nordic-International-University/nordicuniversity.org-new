import {
  buildSitemapIndexXml,
  sitemapResponse,
  BASE_URL,
  LOCALES,
} from "@/app/helpers/sitemap-utils";

export const revalidate = 3600;

const backendUrl = process.env.NEXT_PUBLIC_URL_BACKEND;

export async function GET() {
  try {
    const yearMonthSet = new Set<string>();

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
        const year = d.getFullYear().toString();
        const month = (d.getMonth() + 1).toString().padStart(2, "0");
        yearMonthSet.add(`${year}-${month}`);
      }
      break;
    }

    const sorted = Array.from(yearMonthSet).sort().reverse();

    const sitemapUrls = sorted.map(
      (ym) => {
        const [y, m] = ym.split("-");
        return `${BASE_URL}/sitemap-news-monthly.xml?year=${y}&month=${m}`;
      },
    );

    const xml = buildSitemapIndexXml(sitemapUrls);
    return sitemapResponse(xml);
  } catch (error) {
    console.error("Error generating news sitemap index:", error);
    return sitemapResponse(buildSitemapIndexXml([]));
  }
}
