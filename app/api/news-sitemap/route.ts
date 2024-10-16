import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(request: any) {
  const allowedIps = [process.env.SERVER_IP];
  const apiKey = request.headers.get("x-api-key");
  const requestIp = request.headers.get("x-forwarded-for") || request.ip;

  console.log(allowedIps);
  console.log(process.env.SITEMAP_API_KEY);
  console.log(request);
  if (!allowedIps.includes(requestIp) || apiKey !== process.env["X_API_KEY"]) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  const newsResponse = await fetch(`${backendUrl}/news/list`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ page: 1, limit: 1000, lang: "uz" }),
  });
  const newsData = await newsResponse.json();

  const newsPaths = newsData.data
    .map(
      (news: any) => `
    <url>
      <loc>${siteUrl}/news/${news.slug}</loc>
      <lastmod>${news.updatedAt}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>
  `,
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${newsPaths}
  </urlset>`;

  const filePath = path.join(process.cwd(), "public", "sitemap-news.xml");
  await fs.writeFile(filePath, sitemap, "utf8");

  return NextResponse.json({
    message: "Yangiliklar sayt xaritasi muvaffaqiyatli yaratildi!",
  });
}
