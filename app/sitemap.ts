import { MetadataRoute } from "next";

const BASE_URL = "https://nordicuniversity.org";
const LOCALES = ["uz", "en", "ru"] as const;

const STATIC_PATHS = [
  "",
  "/admission/admission-process",
  "/admission/faq",
  "/admission/tuition-fees",
  "/education/academic-process",
  "/education/certificate",
  "/education/contract-prices",
  "/education/level",
  "/education/resources",
  "/nordic-school/about",
  "/nordic-school/contacts",
  "/nordic-school/gallery",
  "/partners/connections",
  "/partners/forum-and-projects",
  "/partners/international-meetings-photos",
  "/partners/scholarships-and-internships",
  "/press-service/audio-books",
  "/press-service/news",
  "/press-service/nordic-and-mass-media",
  "/press-service/nordic-trend",
  "/press-service/podcast",
  "/press-service/releases",
  "/research/certificates",
  "/research/doctorate",
  "/research/patents",
  "/research/scientific-conferences",
  "/research/scientific-council",
  "/research/scientific-ejournal",
  "/research/scientific-events",
  "/research/tasimo-olympiad",
  "/students/albums",
  "/students/codes-and-manuals",
  "/students/examination-procedures",
  "/students/nordic-life-journal",
  "/students/work-and-travel",
  "/university/advantages",
  "/university/contacts",
  "/university/documents",
  "/university/nordic-way",
  "/university/requisites",
  "/university/structure",
  "/university/structure-schema",
  "/university/year-end-review",
  "/anthem",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    for (const locale of LOCALES) {
      const languages: Record<string, string> = {};
      for (const l of LOCALES) {
        languages[l] = `${BASE_URL}/${l}${path}`;
      }
      languages["x-default"] = `${BASE_URL}/uz${path}`;

      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
