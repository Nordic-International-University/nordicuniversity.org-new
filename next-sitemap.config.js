// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://journal.nordicuniversity.org",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 7000,
  additionalPaths: async (config) => {
    const response = await fetch('https://journal2.nordicun.uz/article');
    const articles = await response.json();

    return articles.map((article) => ({
      loc: `${config.siteUrl}/article/${article.slug}`,
      lastmod: new Date(article.updatedAt).toISOString(),
      changefreq: 'daily',
      priority: 0.8,
    }));
  },
};
