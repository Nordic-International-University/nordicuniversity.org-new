// helpers/generateSitemap.ts
import fs from "fs";
import path from "path";

interface NewsItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  time: string;
}

export const generateSitemap = async (newsData: NewsItem[]) => {
  // Sitemap-ni yaratish uchun yangiliklar ro'yxatini ishlatish
  const sitemap = newsData
    .map((news) => {
      return `<url>
      <loc>https://yourdomain.com/uz/press-service/news/${news.slug}</loc>
      <lastmod>${news.time}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>`;
    })
    .join("\n");

  // Sitemap-ni XML formatida qo'shish
  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemap}
  </urlset>`;

  // public papkasida sitemap-news.xml faylini yaratish
  const sitemapPath = path.join(process.cwd(), "public", "sitemap-news.xml");
  fs.writeFileSync(sitemapPath, sitemapXML, "utf-8");
  console.log("Sitemap created at public/sitemap-news.xml");
};
