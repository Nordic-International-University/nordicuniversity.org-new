// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env["NEXT_PUBLIC_SITE_URL"] || "",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: "./public",
  generateIndexSitemap: true,

  async additionalPaths(config) {
    const backend_url = process.env["NEXT_PUBLIC_API_URL"];
    const articleResponse = await fetch(`${backend_url}/article`);
    const articles = await articleResponse.json();

    const newsResponse = await fetch(`${backend_url}/news/list`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: 1, limit: 1000, lang: "uz" }),
    });
    const newsData = await newsResponse.json();

    const articlePaths = articles.map((article) => ({
      loc: `${config.siteUrl}/article/${article.slug}`,
      lastmod: article.updatedAt,
      changefreq: "daily",
      priority: 0.8,
      filename: "sitemap-article.xml",
    }));

    const newsPaths = newsData.data.map((news) => ({
      loc: `${config.siteUrl}/news/${news.slug}`,
      lastmod: news.updatedAt,
      changefreq: "daily",
      priority: 0.7,
      filename: "sitemap-news.xml",
    }));

    return [...articlePaths, ...newsPaths];
  },
};
