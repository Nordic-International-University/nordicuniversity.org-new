// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env["NEXT_PUBLIC_API_URL"] || 'http://localhost:3000',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    outDir: './public',
    generateIndexSitemap: true,

    async additionalPaths(config) {
        const articleResponse = await fetch(`${config.siteUrl}/article`);
        const articles = await articleResponse.json();

        const newsResponse = await fetch(`${config.siteUrl}/news/list`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ page: 1, limit: 10, lang: 'uz' }),
        });
        const newsData = await newsResponse.json();

        const articlePaths = articles.map((article) => ({
            loc: `${config.siteUrl}/article/${article.slug}`,
            lastmod: article.updatedAt,
            changefreq: 'daily',
            priority: 0.8,
            filename: 'sitemap-article.xml'
        }));

        const newsPaths = newsData.data.map((news) => ({
            loc: `${config.siteUrl}/news/${news.slug}`,
            lastmod: news.updatedAt,
            changefreq: 'daily',
            priority: 0.7,
            filename: 'sitemap-news.xml'
        }));

        return [...articlePaths, ...newsPaths];
    },
};
