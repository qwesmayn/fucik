
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { pageConfig } from "@/shared/config/page.config";

const protectedPaths = [pageConfig.admin];

const notFoundPaths = [
  "/wp-login.php",
  "/wp-admin",
  "/config",
  "/vendor",
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;


  if (notFoundPaths.some((notFoundPath) => path.startsWith(notFoundPath))) {
    return NextResponse.redirect(new URL(`/not-found`, request.url));
  }

  const token = request.cookies.get("access_token")?.value;
  let isTokenValid = false;

  if (token) {
    try {
      const jwtSecret = process.env.JWT_SECRET;
      
      if (!jwtSecret) {
        console.error("JWT_SECRET не найден в переменных окружения");
        isTokenValid = false;
      } else {
        const secret = new TextEncoder().encode(jwtSecret);
        await jose.jwtVerify(token, secret);
        isTokenValid = true;
      }
    } catch (error) {
      console.error("Ошибка верификации JWT токена:", error);
      isTokenValid = false;
    }
  }

  const isAuthPage = path.startsWith(pageConfig.login);
  const isProtectedRoute = protectedPaths.some((route) =>
    path.startsWith(route)
  );

  if (isTokenValid && isAuthPage) {
    return NextResponse.redirect(new URL(pageConfig.home, request.url));
  }

  if (!isTokenValid && isProtectedRoute) {
    return NextResponse.redirect(new URL(pageConfig.login, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|_vercel|.*\\..*).*)",
    "/wp-login.php",
    "/wp-admin", 
    "/config",
    "/vendor",
  ],
};
