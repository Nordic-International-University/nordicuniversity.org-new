import {
  buildUrlsetXml,
  buildHreflangAlternates,
  sitemapResponse,
  formatDate,
  BASE_URL,
  LOCALES,
} from "@/app/helpers/sitemap-utils";

export const revalidate = 86400;

const STATIC_PATHS = [
  { path: "", changefreq: "daily", priority: "1.0" },
  { path: "/admission/admission-process", changefreq: "weekly", priority: "0.8" },
  { path: "/admission/faq", changefreq: "weekly", priority: "0.7" },
  { path: "/admission/tuition-fees", changefreq: "weekly", priority: "0.8" },
  { path: "/education/academic-process", changefreq: "weekly", priority: "0.7" },
  { path: "/education/certificate", changefreq: "monthly", priority: "0.6" },
  { path: "/education/contract-prices", changefreq: "weekly", priority: "0.8" },
  { path: "/education/level", changefreq: "monthly", priority: "0.7" },
  { path: "/education/resources", changefreq: "monthly", priority: "0.6" },
  { path: "/nordic-school/about", changefreq: "monthly", priority: "0.7" },
  { path: "/nordic-school/contacts", changefreq: "monthly", priority: "0.6" },
  { path: "/nordic-school/gallery", changefreq: "monthly", priority: "0.5" },
  { path: "/partners/connections", changefreq: "weekly", priority: "0.7" },
  { path: "/partners/forum-and-projects", changefreq: "weekly", priority: "0.7" },
  { path: "/partners/international-meetings-photos", changefreq: "weekly", priority: "0.6" },
  { path: "/partners/scholarships-and-internships", changefreq: "weekly", priority: "0.7" },
  { path: "/press-service/audio-books", changefreq: "weekly", priority: "0.6" },
  { path: "/press-service/news", changefreq: "daily", priority: "0.9" },
  { path: "/press-service/nordic-and-mass-media", changefreq: "weekly", priority: "0.6" },
  { path: "/press-service/nordic-trend", changefreq: "weekly", priority: "0.6" },
  { path: "/press-service/podcast", changefreq: "weekly", priority: "0.6" },
  { path: "/press-service/releases", changefreq: "weekly", priority: "0.8" },
  { path: "/research/certificates", changefreq: "monthly", priority: "0.6" },
  { path: "/research/doctorate", changefreq: "monthly", priority: "0.7" },
  { path: "/research/patents", changefreq: "monthly", priority: "0.6" },
  { path: "/research/scientific-conferences", changefreq: "weekly", priority: "0.7" },
  { path: "/research/scientific-council", changefreq: "monthly", priority: "0.7" },
  { path: "/research/scientific-ejournal", changefreq: "monthly", priority: "0.6" },
  { path: "/research/scientific-events", changefreq: "weekly", priority: "0.7" },
  { path: "/research/tasimo-olympiad", changefreq: "monthly", priority: "0.6" },
  { path: "/students/albums", changefreq: "monthly", priority: "0.5" },
  { path: "/students/codes-and-manuals", changefreq: "monthly", priority: "0.6" },
  { path: "/students/examination-procedures", changefreq: "monthly", priority: "0.7" },
  { path: "/students/nordic-life-journal", changefreq: "monthly", priority: "0.5" },
  { path: "/students/work-and-travel", changefreq: "monthly", priority: "0.6" },
  { path: "/university/advantages", changefreq: "monthly", priority: "0.7" },
  { path: "/university/contacts", changefreq: "monthly", priority: "0.8" },
  { path: "/university/documents", changefreq: "monthly", priority: "0.6" },
  { path: "/university/nordic-way", changefreq: "monthly", priority: "0.7" },
  { path: "/university/requisites", changefreq: "monthly", priority: "0.6" },
  { path: "/university/structure", changefreq: "weekly", priority: "0.7" },
  { path: "/university/structure-schema", changefreq: "monthly", priority: "0.6" },
  { path: "/university/year-end-review", changefreq: "yearly", priority: "0.5" },
  { path: "/anthem", changefreq: "yearly", priority: "0.4" },
];

export async function GET() {
  const today = formatDate();
  const urls = STATIC_PATHS.flatMap(({ path, changefreq, priority }) =>
    LOCALES.map((locale) => ({
      loc: `${BASE_URL}/${locale}${path}`,
      alternates: buildHreflangAlternates(path),
      lastmod: today,
      changefreq,
      priority,
    })),
  );

  const xml = buildUrlsetXml(urls);
  return sitemapResponse(xml);
}
