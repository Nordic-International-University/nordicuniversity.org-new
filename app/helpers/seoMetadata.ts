import { Metadata } from "next";

const BASE_URL = "https://nordicuniversity.org";

interface BreadcrumbItem {
  name: string;
  url: string; // path without lang prefix, e.g. "/press-service/news"
}

export function buildBreadcrumbJsonLd(
  items: BreadcrumbItem[],
  lang: string,
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Bosh sahifa",
        item: `${BASE_URL}/${lang}`,
      },
      ...items.map((item, index) => {
        const cleanUrl = item.url.startsWith("/") ? item.url : `/${item.url}`;
        return {
          "@type": "ListItem",
          position: index + 2,
          name: item.name,
          item: `${BASE_URL}/${lang}${cleanUrl}`,
        };
      }),
    ],
  });
}
const LOCALES = ["uz", "en", "ru"] as const;
const OG_LOCALE_MAP: Record<string, string> = {
  uz: "uz_UZ",
  en: "en_US",
  ru: "ru_RU",
};

interface SeoOptions {
  title: string;
  description: string;
  lang: string;
  path: string; // without lang prefix, e.g. "/admission/faq"
  keywords?: string[];
  image?: { url: string; alt?: string; width?: number; height?: number };
}

export function buildSeoMetadata({
  title,
  description,
  lang,
  path,
  keywords,
  image,
}: SeoOptions): Metadata {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${BASE_URL}/${lang}${cleanPath}`;

  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale] = `${BASE_URL}/${locale}${cleanPath}`;
  }
  languages["x-default"] = `${BASE_URL}/uz${cleanPath}`;

  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Nordic International University",
      locale: OG_LOCALE_MAP[lang] || "uz_UZ",
      type: "website",
      ...(image && {
        images: [
          {
            url: image.url,
            alt: image.alt || title,
            width: image.width || 1200,
            height: image.height || 630,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image.url] }),
    },
  };
}
