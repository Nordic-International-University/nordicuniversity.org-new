import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n.config";

const intlMiddleware = createMiddleware({
  defaultLocale: "en",
  locales,
  localeDetection: false,
});

async function fetchDefaultLanguage() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/language`,
    );
    const data = await res.json();
    return data.language || "uz";
  } catch (error) {
    console.error("Failed to fetch default language:", error);
    return "uz";
  }
}

export default async function middleware(req: NextRequest) {
  const cookieLang = req.cookies.get("lang")?.value;
  const defaultLang = await fetchDefaultLanguage();
  const lang = cookieLang || defaultLang;

  const url = req.nextUrl.clone();
  const pathnameParts = url.pathname.split("/");

  // Agar URL '.html' bilan tugasa, uni yangi saytga yo'naltiring
  if (url.pathname.endsWith(".html")) {
    console.log("Old URL detected, redirecting to:", url.toString());
    url.hostname = "nordicuniversity.org";
    url.protocol = "https";
    url.pathname = url.pathname.replace(".html", ""); // .html ni olib tashlash
    console.log("Redirecting to:", url.toString());
    return NextResponse.redirect(url);
  }

  // `webmail` yo'nalishiga yo'naltirish
  if (pathnameParts[1] === "webmail") {
    console.log("Before redirect:", url.toString());
    url.hostname = "web5.webspace.uz";
    url.protocol = "https";
    url.pathname = "/webmail"; // Correcting this part
    console.log("Redirecting to:", url.toString());
    return NextResponse.redirect(url);
  }

  // Lokalizatsiya yo'nalishlarini tekshirish
  if (locales.includes(pathnameParts[1])) {
    const currentLocale = pathnameParts[1];

    if (currentLocale !== lang) {
      pathnameParts[1] = lang; // Yangi tilni o'rnatish
      url.pathname = pathnameParts.join("/");
      return NextResponse.redirect(url);
    }
  } else {
    pathnameParts.unshift(lang); // Tilda yo'nalish qo'shish
    url.pathname = pathnameParts.join("/");
    return NextResponse.redirect(url);
  }

  req.headers.set("Accept-Language", lang);
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*|public|webmail).*)"],
};
