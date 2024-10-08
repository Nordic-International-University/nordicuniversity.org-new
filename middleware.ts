import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token");
  const fromHome = request.nextUrl.searchParams.get("fromhome") === "true";

  if (token && request.nextUrl.pathname === "/register") {
    const url = request.nextUrl.clone();
    url.pathname = fromHome ? "/createarticle" : "/profile";
    return NextResponse.redirect(url);
  }

  if (
    !token &&
    ["/dashboard", "/profile", "/createarticle"].includes(
      request.nextUrl.pathname,
    )
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/register";
    if (fromHome) url.searchParams.set("fromhome", "true");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/register",
    "/dashboard/:path*",
    "/profile/:path*",
    "/createarticle/:path*",
  ],
};
