import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n.config";
import { cookies } from "next/headers";

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
  if (locales.includes(pathnameParts[1])) {
    const currentLocale = pathnameParts[1];

    if (currentLocale !== lang && !cookieLang) {
      pathnameParts[1] = lang;
      url.pathname = pathnameParts.join("/");
      return NextResponse.redirect(url);
    }
  } else {
    pathnameParts.unshift(lang);
    url.pathname = pathnameParts.join("/");
    return NextResponse.redirect(url);
  }

  req.headers.set("Accept-Language", lang);
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
