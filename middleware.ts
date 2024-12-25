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

  console.log("Initial path:", url.pathname);
  console.log("Detected language:", lang);

  // if (pathnameParts[1] === "webmail") {
  //   try {
  //     const webmailUrl = new URL("https://web5.webspace.uz/webmail");
  //     console.log("Redirecting to webmail:", webmailUrl.toString());
  //     return NextResponse.redirect(webmailUrl.toString(), 301);
  //   } catch (error) {
  //     console.error("Error during webmail redirection:", error);
  //     return NextResponse.next();
  //   }
  // }

  if (locales.includes(pathnameParts[1])) {
    const currentLocale = pathnameParts[1];
    if (currentLocale !== lang) {
      pathnameParts[1] = lang;
      url.pathname = pathnameParts.join("/");

      if (url.pathname !== req.nextUrl.pathname) {
        console.log("Redirecting to correct locale:", url.pathname);
        return NextResponse.redirect(url, 301);
      }
    }
  } else {
    pathnameParts.unshift(lang);
    url.pathname = pathnameParts.join("/");

    if (url.pathname !== req.nextUrl.pathname) {
      console.log("Redirecting to language-prefixed path:", url.pathname);
      return NextResponse.redirect(url, 301);
    }
  }

  req.headers.set("Accept-Language", lang);
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*|public|webmail).*)"],
};
