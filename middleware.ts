import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n.config";

const intlMiddleware = createMiddleware({
  defaultLocale: "uz",
  locales,
  localeDetection: false,
});

export default function middleware(req: NextRequest) {
  const lang = req.cookies.get("lang")?.value || "uz";
  const url = req.nextUrl.clone();
  const pathname = url.pathname.split("/");

  if (!locales.includes(pathname[1])) {
    pathname.unshift(lang as string);
    url.pathname = pathname.join("/");
    return NextResponse.redirect(url);
  }

  req.headers.set("Accept-Language", lang as string);
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
