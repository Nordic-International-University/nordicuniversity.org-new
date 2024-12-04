import fs from "fs";
import path from "path";
import { NewsItem } from "@/types/templates/newsSlider.type";
import { validateApiKey } from "@/app/api/middleware";

const languages = ["uz", "ru", "en"];
const backendUrl = process.env.NEXT_PUBLIC_URL_BACKEND;

const getYearMonthFromDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return { year, month };
};

const generateSitemapXml = (lang: string, news: NewsItem[]) => {
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n`;

  news.forEach((article: NewsItem) => {
    const slug = article.slug;
    const time = article.time;
    const title = article.title;

    languages.forEach((lang) => {
      const url = `https://nordicuniversity.org/${lang}/press-service/news/${slug}`;

      sitemapXml += `  <url>\n`;
      sitemapXml += `    <loc>${url}</loc>\n`;
      sitemapXml += `    <news:news>\n`;
      sitemapXml += `      <news:publication>\n`;
      sitemapXml += `        <news:name>Noric International University</news:name>\n`;
      sitemapXml += `        <news:language>${lang}</news:language>\n`;
      sitemapXml += `      </news:publication>\n`;
      sitemapXml += `      <news:publication_date>${time}</news:publication_date>\n`;
      sitemapXml += `      <news:title>${title}</news:title>\n`;
      sitemapXml += `    </news:news>\n`;
      sitemapXml += `  </url>\n`;
    });
  });

  sitemapXml += `</urlset>\n`;

  return sitemapXml;
};

const generateYearlySitemapXml = (year: string, allNews: NewsItem[][]) => {
  let yearlySitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  yearlySitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  languages.forEach((lang) => {
    for (let month = 1; month <= 12; month++) {
      const monthStr = month.toString().padStart(2, "0");

      const hasNewsForMonth = allNews.some((news) => {
        return news.some((article) => {
          const { year: articleYear, month: articleMonth } =
            getYearMonthFromDate(article.time);
          return articleYear === year && articleMonth === monthStr;
        });
      });

      if (hasNewsForMonth) {
        const url = `https://nordicuniversity.org/news/${year}/${monthStr}/news-sitemap-${monthStr}-${lang}.xml`;
        yearlySitemapXml += `  <url>\n`;
        yearlySitemapXml += `    <loc>${url}</loc>\n`;
        yearlySitemapXml += `  </url>\n`;
      }
    }
  });

  yearlySitemapXml += `</urlset>\n`;

  return yearlySitemapXml;
};

export async function GET(request: Request) {
  const authError = validateApiKey(request);
  if (authError) return authError;

  try {
    const allNews = await Promise.all(
      languages.map(async (lang) => {
        const NewsResponse = await fetch(
          `${backendUrl}/api/press/news?language=${lang}&page=1&limit=1000`,
        );
        const NewsData = await NewsResponse.json();
        return NewsData.data;
      }),
    );

    const newsFolderPath = path.join(process.cwd(), "public", "news");
    if (!fs.existsSync(newsFolderPath)) {
      fs.mkdirSync(newsFolderPath, { recursive: true });
    }

    let mainSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    mainSitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const years = [
      ...new Set(
        allNews.flatMap((news) =>
          news.map(
            (article: NewsItem) => getYearMonthFromDate(article.time).year,
          ),
        ),
      ),
    ];

    years.forEach((year) => {
      const yearlySitemapXml = generateYearlySitemapXml(year, allNews);

      const yearlySitemapPath = path.join(
        newsFolderPath,
        `sitemap-${year}.xml`,
      );
      fs.writeFileSync(yearlySitemapPath, yearlySitemapXml);

      mainSitemapXml += `  <url>\n`;
      mainSitemapXml += `    <loc>https://nordicuniversity.org/news/sitemap-${year}.xml</loc>\n`;
      mainSitemapXml += `  </url>\n`;

      const yearFolderPath = path.join(newsFolderPath, year);
      if (!fs.existsSync(yearFolderPath)) {
        fs.mkdirSync(yearFolderPath);
      }

      languages.forEach((lang) => {
        for (let month = 1; month <= 12; month++) {
          const monthStr = month.toString().padStart(2, "0");
          const monthFolderPath = path.join(yearFolderPath, monthStr);

          const newsForMonth = allNews[languages.indexOf(lang)].filter(
            (article: NewsItem) => {
              const { year: articleYear, month: articleMonth } =
                getYearMonthFromDate(article.time);
              return articleYear === year && articleMonth === monthStr;
            },
          );

          if (newsForMonth.length > 0) {
            if (!fs.existsSync(monthFolderPath)) {
              fs.mkdirSync(monthFolderPath);
            }
            const sitemapXml = generateSitemapXml(lang, newsForMonth);

            const monthlySitemapPath = path.join(
              monthFolderPath,
              `news-sitemap-${monthStr}-${lang}.xml`,
            );
            fs.writeFileSync(monthlySitemapPath, sitemapXml);
          }
        }
      });
    });

    mainSitemapXml += `</urlset>\n`;

    const mainSitemapPath = path.join(newsFolderPath, "sitemap-news.xml");
    fs.writeFileSync(mainSitemapPath, mainSitemapXml);

    return new Response(
      JSON.stringify({ message: "Sitemaps generated successfully!" }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error generating sitemaps:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate sitemaps" }),
      { status: 500 },
    );
  }
}
