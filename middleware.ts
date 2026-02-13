import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n.config";

const intlMiddleware = createMiddleware({
  defaultLocale: "uz",
  locales,
  localeDetection: false,
  localePrefix: "always",
});

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Clean double slashes: /uz//university → /uz/university (308)
  if (pathname !== "/" && pathname.includes("//")) {
    const cleaned = pathname.replace(/\/\/+/g, "/");
    const url = req.nextUrl.clone();
    url.pathname = cleaned;
    return NextResponse.redirect(url, 308);
  }

  const pathSegments = pathname.split("/");
  const firstSegment = pathSegments[1];

  // If URL already has a valid locale prefix — serve as-is, no redirect
  if (locales.includes(firstSegment)) {
    return intlMiddleware(req);
  }

  // No locale prefix → redirect to user's preferred language (cookie) or default uz
  const cookieLang = req.cookies.get("lang")?.value;
  const lang = cookieLang && locales.includes(cookieLang) ? cookieLang : "uz";
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*|public|webmail).*)"],
};
