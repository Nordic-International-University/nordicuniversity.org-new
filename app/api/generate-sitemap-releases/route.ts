import fs from "fs";
import path from "path";
import { validateApiKey } from "@/app/api/middleware";

// API URL
const backendUrl = process.env.NEXT_PUBLIC_URL_BACKEND;
const languages = ["uz", "ru", "en"];

export async function GET(request: Request, response: Response) {
  const authError = validateApiKey(request);
  if (authError) return authError;
  try {
    const newsFolderPath = path.join(process.cwd(), "public");
    if (!fs.existsSync(newsFolderPath)) {
      fs.mkdirSync(newsFolderPath, { recursive: true });
    }

    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    let allReleases: any[] = [];
    for (const lang of languages) {
      const releases = await fetch(
        `${backendUrl}/api/press/releases?language=${lang}&page=1&limit=100`,
      )
        .then((res) => res.json())
        .then((data) => data.data);

      allReleases = [...allReleases, ...releases];
    }

    allReleases.forEach((release: any) => {
      languages.forEach((lang) => {
        const slug = release.slug;
        const url = `https://nordicuniversity.org/${lang}/press-service/releases/${slug}`;
        sitemapXml += `  <url>\n`;
        sitemapXml += `    <loc>${url}</loc>\n`;
        sitemapXml += `    <lastmod>${release.updatedAt}</lastmod>\n`;
        sitemapXml += `    <priority>0.5</priority>\n`;
        sitemapXml += `  </url>\n`;
      });
    });

    sitemapXml += `</urlset>\n`;

    const sitemapPath = path.join(newsFolderPath, "sitemap-releases.xml");
    fs.writeFileSync(sitemapPath, sitemapXml);

    return new Response(
      JSON.stringify({
        message: "Press releases sitemap generated successfully!",
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error generating press releases sitemap:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate press releases sitemap" }),
      { status: 500 },
    );
  }
}
