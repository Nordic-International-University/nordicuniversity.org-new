import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(request: any) {
  // const allowedIps = [process.env["SERVER_IP"]];
  const apiKey = request.headers.get("x-api-key");
  // const requestIp = request.headers.get("x-forwarded-for") || request.ip;

  if (apiKey !== process.env["X_API_KEY"]) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  const articleResponse = await fetch(`${backendUrl}/article`);
  const articles = await articleResponse.json();

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

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${articlePaths}
  </urlset>`;

  const filePath = path.join(process.cwd(), "public", "article-sitemap.xml");
  await fs.writeFile(filePath, sitemap, "utf8");

  return NextResponse.json({ message: "Article sitemap created successfully" });
}
