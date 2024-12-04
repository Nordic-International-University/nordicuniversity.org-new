import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { validateApiKey } from "@/app/api/middleware";

const backendUrl = process.env.NEXT_PUBLIC_URL_BACKEND;
const EnumScienceMeetings = ["CONFERENCES", "EVENTS"];
const languages = ["uz", "ru", "en"];

export async function GET(request: Request) {
  const authError = validateApiKey(request);
  if (authError) return authError;
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (!type || !EnumScienceMeetings.includes(type)) {
      return NextResponse.json(
        { error: "Invalid or missing 'type' parameter" },
        { status: 400 },
      );
    }

    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    for (const lang of languages) {
      const apiUrl = `${backendUrl}/api/science/meeting/admin?type=${type}&page=1&limit=100&language=${lang}`;
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlY2ZlNTllLTVhMWUtNDQ0My1hZGQ3LWZjYTczOTA5YzY3ZiIsInVzZXJuYW1lIjoiam9obmRvZSIsImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSIsImlzU3VwZXJBZG1pbiI6ZmFsc2UsImlhdCI6MTczMDEzMTQ0M30.2JvYEj2RcjA0cTPvyfVH_vsFkveQPurIzII7PqL8gxk`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data for type=${type} and lang=${lang}`,
        );
      }

      const data = await response.json();
      const releases = data.data;

      releases.forEach((release: any) => {
        languages.forEach((slugLang) => {
          const slug = release[`slug_${slugLang}`];
          const scientificType =
            type === "CONFERENCES"
              ? "scientific-conferences"
              : "scientific-events";
          const url = `https://nordicuniversity.org/${lang}/research/${scientificType}/${slug}`;
          sitemapXml += `  <url>\n`;
          sitemapXml += `    <loc>${url}</loc>\n`;
          sitemapXml += `    <lastmod>${release.updatedAt}</lastmod>\n`;
          sitemapXml += `    <priority>0.5</priority>\n`;
          sitemapXml += `  </url>\n`;
        });
      });
    }

    sitemapXml += `</urlset>\n`;

    const sitemapFileName = `sitemap-${type.toLowerCase()}.xml`;
    const sitemapPath = path.join(process.cwd(), "public", sitemapFileName);

    fs.writeFileSync(sitemapPath, sitemapXml);

    return NextResponse.json(
      { message: `Sitemap created: ${sitemapFileName}` },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error generating sitemap:", error);
    return NextResponse.json(
      { error: "Failed to generate sitemap", details: error.message },
      { status: 500 },
    );
  }
}
