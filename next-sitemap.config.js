// // next-sitemap.config.js
// /** @type {import('next-sitemap').IConfig} */
// module.exports = {
//   siteUrl: process.env["NEXT_PUBLIC_SITE_URL"] || "",
//   generateRobotsTxt: true,
//   sitemapSize: 5000,
//   priority: "1.0",
//   outDir: "./public",
//   generateIndexSitemap: true,
//   sitemapFilename: "sitemap-dynamic.xml",
//   additionalSitemaps: [
//     `${process.env["NEXT_PUBLIC_SITE_URL"]}/sitemap-category.xml`,
//     `${process.env["NEXT_PUBLIC_SITE_URL"]}/sitemap-volume.xml`,
//     `${process.env["NEXT_PUBLIC_SITE_URL"]}/sitemap-article.xml`,
//     `${process.env["NEXT_PUBLIC_SITE_URL"]}/sitemap-news.xml`,
//   ],
//   async additionalPaths(config) {
//     const backend_url = process.env["NEXT_PUBLIC_API_URL"];
//     const articleResponse = await fetch(`${backend_url}/article`);
//     const articles = await articleResponse.json();
//
//     const newsResponse = await fetch(`${backend_url}/news/list`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ page: 1, limit: 1000, lang: "uz" }),
//     });
//     const newsData = await newsResponse.json();
//
//     const categoryRes = await fetch(`${backend_url}/category`);
//     const categories = await categoryRes.json();
//
//     const volumeRes = await fetch(`${backend_url}/volume`);
//     const volumes = await volumeRes.json();
//
//     const articlePaths = articles.map((article) => ({
//       loc: `${config.siteUrl}/article/${article.slug}`,
//       lastmod: article.updatedAt,
//       changefreq: "daily",
//       priority: 0.8,
//     }));
//
//     const newsPaths = newsData.data.map((news) => ({
//       loc: `${config.siteUrl}/news/${news.slug}`,
//       lastmod: news.updatedAt,
//       changefreq: "daily",
//       priority: 0.7,
//     }));
//
//     const categoryPaths = categories.map((category) => ({
//       loc: `${config.siteUrl}/publications/category/${category.id}`,
//       lastmod: category.updatedAt,
//       changefreq: "daily",
//       priority: 0.7,
//     }));
//
//     const volumePaths = volumes.map((volume) => ({
//       loc: `${config.siteUrl}/publications/volume/${volume.id}`,
//       lastmod: volume.updatedAt,
//       changefreq: "daily",
//       priority: 0.6,
//     }));
//
//     const manualPaths = [
//       {
//         loc: `${config.siteUrl}/articles`,
//         changefreq: "monthly",
//         priority: 0.8,
//       },
//     ];
//   },
// };
