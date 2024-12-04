import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

// API URL va enumlar
const backendUrl = process.env.NEXT_PUBLIC_URL_BACKEND;
const EnumCooperationMeetings = [
  "CONNECTIONS",
  "SCHOLARSHIPS_AND_INTERNSHIPS",
  "FORUM-AND-PROJECTS",
]; // Ruxsat etilgan turlar
const languages = ["uz", "ru", "en"]; // Tillar

export async function GET(request: Request) {
  try {
    // URL query parametrlarini olish
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    // `type`ni tekshirish
    if (!type || !EnumCooperationMeetings.includes(type)) {
      return NextResponse.json(
        { error: "Invalid or missing 'type' parameter" },
        { status: 400 },
      );
    }

    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Har bir til uchun ma'lumotlarni olish
    for (const lang of languages) {
      const apiUrl = `${backendUrl}/api/cooperation/meeting/admin?type=${type}&page=1&limit=100&language=${lang}`;
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

      // Har bir release uchun URL yaratish va sitemapga qo'shish
      releases.forEach((release: any) => {
        // Har bir sayt tili va slug tili kombinatsiyasi uchun URL yaratish
        languages.forEach((slugLang) => {
          const slug = release[`slug_${slugLang}`];
          const typePath =
            type === "CONNECTIONS"
              ? "connections"
              : type === "SCHOLARSHIPS_INTERNSHIPS"
                ? "scholarships-internships"
                : "forum-and-projects";
          const url = `https://nordicuniversity.org/${lang}/partners/${typePath}/${slug}`;
          sitemapXml += `  <url>\n`;
          sitemapXml += `    <loc>${url}</loc>\n`;
          sitemapXml += `    <lastmod>${release.updatedAt}</lastmod>\n`;
          sitemapXml += `    <priority>0.7</priority>\n`;
          sitemapXml += `  </url>\n`;
        });
      });
    }

    sitemapXml += `</urlset>\n`;

    // Sitemap faylni `public` papkaga yozish
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
