import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(request: any) {
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== process.env["X_API_KEY"]) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  const volumeResponse = await fetch(`${backendUrl}/volume`);
  const volumeData = await volumeResponse.json();

  if (!volumeResponse.ok) {
    return NextResponse.json(
      { error: "Failed to fetch volume data" },
      { status: 500 },
    );
  }

  console.log(volumeData);

  // Loop through each volume to generate a separate sitemap
  for (const volume of volumeData) {
    console.log(volume);
    const volumeTitle = volume.title.replace(/[^a-z0-9]/gi, "_").toLowerCase(); // Convert title to file-friendly format
    const articles = volume.Articles || [];

    const articlePaths = articles
      .map(
        (article: any) => `
      <url>
        <loc>${siteUrl}/article/${article.slug}</loc>
        <lastmod>${article.updatedAt}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
    `,
      )
      .join("");

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${articlePaths}
    </urlset>`;

    const filePath = path.join(
      process.cwd(),
      "public",
      `sitemap-${volumeTitle}.xml`,
    );
    await fs.writeFile(filePath, sitemapContent, "utf8");
  }

  // Generate the main sitemap index file
  const sitemapFiles = [
    "sitemap-0.xml",
    "sitemap-category.xml",
    "sitemap-volume.xml",
    "sitemap-news.xml",
    ...volumeData.map(
      (volume: any) =>
        `sitemap-${volume.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.xml`,
    ),
  ];

  const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemapFiles
      .map(
        (file) => `
      <sitemap><loc>${siteUrl}/${file}</loc></sitemap>
    `,
      )
      .join("\n")}
  </sitemapindex>`;

  const indexPath = path.join(process.cwd(), "public", "sitemap.xml");
  await fs.writeFile(indexPath, sitemapIndexContent, "utf8");

  return NextResponse.json({
    message: "Sitemap and index created successfully",
  });
}
