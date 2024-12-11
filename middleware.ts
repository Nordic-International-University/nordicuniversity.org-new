import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n.config";

const intlMiddleware = createMiddleware({
  defaultLocale: "en",
  locales,
  localeDetection: false,
});

// Tilni olish funksiyasi
async function fetchDefaultLanguage() {
  try {
    console.log("Fetching default language...");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/language`,
    );
    const data = await res.json();
    console.log("Default language fetched:", data.language);
    return data.language || "uz";
  } catch (error) {
    console.error("Failed to fetch default language:", error);
    return "uz"; // Default fallback
  }
}

export default async function middleware(req: NextRequest) {
  // Tilni cookie yoki serverdan olish
  const cookieLang = req.cookies.get("lang")?.value || null;
  const defaultLang = await fetchDefaultLanguage();
  const lang = cookieLang || defaultLang;

  // URL va path'ni ajratib olish
  const url = req.nextUrl.clone();
  const pathnameParts = url.pathname.split("/");

  console.log("Initial path:", url.pathname);
  console.log("Detected language:", lang);

  // Webmail uchun yo'naltirish
  if (pathnameParts[1] === "webmail") {
    try {
      console.log("Redirecting to webmail...");
      const webmailUrl = new URL("https://web5.webspace.uz/webmail");
      return NextResponse.redirect(webmailUrl.toString());
    } catch (error) {
      console.error("Error during webmail redirection:", error);
      return NextResponse.next();
    }
  }

  // Agar path allaqachon kerakli tilga mos bo'lsa, yo'naltirishni oldini olish
  if (locales.includes(pathnameParts[1])) {
    const currentLocale = pathnameParts[1];
    if (currentLocale !== lang) {
      pathnameParts[1] = lang;
      url.pathname = pathnameParts.join("/");

      console.log("Redirecting to correct locale:", url.pathname);
      return NextResponse.redirect(url);
    }
  } else {
    // Agar til path'da yo'q bo'lsa, uni qo'shish
    pathnameParts.unshift(lang);
    url.pathname = pathnameParts.join("/");

    // Cheksiz yo'naltirishdan qochish
    if (url.pathname !== req.nextUrl.pathname) {
      console.log("Redirecting to language-prefixed path:", url.pathname);
      return NextResponse.redirect(url);
    }
  }

  // So'rovga "Accept-Language" sarlavhasini qo'shish
  req.headers.set("Accept-Language", lang);

  // Default intlMiddleware bilan davom etish
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*|public|webmail).*)"],
};
