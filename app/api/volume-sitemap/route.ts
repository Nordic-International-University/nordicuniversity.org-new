import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(request: any) {
  // const allowedIps = [process.env["SERVER_IP"]];
  const apiKey = request.headers.get("x-api-key");
  // const requestIp = request.headers.get("x-forwarded-for") || request.ip;

  if (apiKey !== process.env.X_API_KEY) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  const volumeRes = await fetch(`${backendUrl}/volume`);
  const volumes = await volumeRes.json();

  const volumePaths = volumes
    .map(
      (volume: any) => `
    <url>
      <loc>${siteUrl}/publications/volume/${volume.id}</loc>
      <lastmod>${volume.updatedAt}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.6</priority>
    </url>
  `,
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${volumePaths}
  </urlset>`;

  const filePath = path.join(process.cwd(), "public", "sitemap-volume.xml");
  await fs.writeFile(filePath, sitemap, "utf8");

  return NextResponse.json({ message: "Volume sitemap created successfully" });
}
