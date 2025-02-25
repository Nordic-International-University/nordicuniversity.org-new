import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n.config";

const intlMiddleware = createMiddleware({
  defaultLocale: "en",
  locales,
  localeDetection: false,
});

async function fetchDefaultLanguage(): Promise<string> {
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
    return "uz";
  }
}

export default async function middleware(req: NextRequest) {
  const cookieLang = req.cookies.get("lang")?.value as string | null;
  const defaultLang = await fetchDefaultLanguage();
  const lang = cookieLang || defaultLang;

  const url = req.nextUrl.clone();
  const pathnameParts = url.pathname.split("/");

  if (locales.includes(pathnameParts[1])) {
    const currentLocale = pathnameParts[1];

    if (currentLocale !== lang) {
      pathnameParts[1] = lang;
      url.pathname = pathnameParts.join("/");
      return NextResponse.redirect(url, 307);
    }
  } else {
    // ✅ Til yo‘q bo‘lsa, uni qo‘shamiz
    url.pathname = `/${lang}${url.pathname}`;
    return NextResponse.redirect(url, 307);
  }

  req.headers.set("Accept-Language", lang);
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*|public|webmail).*)"],
};
