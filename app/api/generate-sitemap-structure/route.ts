import fs from "fs";
import path from "path";

// API URL
const backendUrl = process.env.NEXT_PUBLIC_URL_BACKEND;
const languages = ["uz", "ru", "en"];

// Funksiya: Sana bo'yicha yil va oyni olish
const getYearMonthFromDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return { year, month };
};

// Sitemap XML yaratish
const generateSitemapXml = (orgStructure: any[]) => {
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  orgStructure.forEach((structure: any) => {
    languages.forEach((lang) => {
      const slug = structure[`slug_${lang}`];
      const url = `https://nordicuniversity.org/${lang}/university/structure/${slug}`;
      sitemapXml += `  <url>\n`;
      sitemapXml += `    <loc>${url}</loc>\n`;
      sitemapXml += `    <lastmod>${structure.updatedAt}</lastmod>\n`;
      sitemapXml += `    <priority>0.5</priority>\n`;
      sitemapXml += `  </url>\n`;
    });
  });

  sitemapXml += `</urlset>\n`;
  return sitemapXml;
};

export async function GET() {
  try {
    const orgStructures = await fetch(
      `${backendUrl}/api/university/org-structures/admin?page=1&limit=100`,
      {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlY2ZlNTllLTVhMWUtNDQ0My1hZGQ3LWZjYTczOTA5YzY3ZiIsInVzZXJuYW1lIjoiam9obmRvZSIsImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSIsImlzU3VwZXJBZG1pbiI6ZmFsc2UsImlhdCI6MTczMDEzMTQ0M30.2JvYEj2RcjA0cTPvyfVH_vsFkveQPurIzII7PqL8gxk",
        },
      },
    )
      .then((res) => res.json())
      .then((data) => data.data);

    const newsFolderPath = path.join(process.cwd(), "public", "org-structures");
    if (!fs.existsSync(newsFolderPath)) {
      fs.mkdirSync(newsFolderPath, { recursive: true });
    }
    const sitemapXml = generateSitemapXml(orgStructures);

    // Yig'ilgan sitemapni faylga yozish
    const sitemapPath = path.join(newsFolderPath, "sitemap-structure.xml");
    fs.writeFileSync(sitemapPath, sitemapXml);

    return new Response(
      JSON.stringify({ message: "Sitemap generated successfully!" }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate sitemap" }),
      { status: 500 },
    );
  }
}
