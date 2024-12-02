// app/api/sitemap-news/route.ts
import { NextResponse } from "next/server";
import fetch from "node-fetch";
import { generateSitemap } from "@/app/helpers/generate-sitemap"; // API so'rovini yuborish uchun

// API GET request handler
export async function GET() {
  try {
    // API'dan yangiliklarni olish
    const response = await fetch(
      "https://yourdomain.com/api/press/news?language=uz&page=1&limit=100",
    );
    const newsData = await response.json();

    if (newsData && Array.isArray(newsData)) {
      await generateSitemap(newsData); // generateSitemap funksiyasini chaqirish
    }

    return NextResponse.json({ message: "Sitemap generated successfully" });
  } catch (error) {
    console.error("Failed to fetch news or generate sitemap:", error);
    return NextResponse.json(
      { error: "Failed to generate sitemap" },
      { status: 500 },
    );
  }
}
