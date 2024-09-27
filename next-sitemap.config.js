// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://newjournal-next-js.vercel.app",
    generateRobotsTxt: true,
    changefreq: "daily",
    priority: 0.7,
    sitemapSize: 7000,
    additionalPaths: async (config) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article`);
        const articles = await response.json();

        return articles?.map((article) => ({
            loc: `${config.siteUrl}/article/${article.slug}`,
            lastmod: new Date(article.updatedAt).toISOString(),
            changefreq: 'daily',
            priority: 0.8,
        }));
    },
};
