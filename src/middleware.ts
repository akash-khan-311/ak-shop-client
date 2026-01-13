// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./utils";

type Role = "user" | "admin" | "vendor";

const ROLE_DASHBOARD: Record<Role, string> = {
  user: "/user/dashboard",
  admin: "/admin/dashboard",
  vendor: "/vendor/dashboard",
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;
  const isAuthPage = pathname === "/signin" || pathname === "/signup";

  const isDashboardRoute =
    pathname.startsWith("/user") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/vendor");

  const publicRoutes = ["/signin", "/signup"];
  const protectedRoutes = ["/user", "/admin", "/vendor", "/dashboard"];

  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!token && isDashboardRoute) {
    return NextResponse.redirect(
      new URL(`/signin?redirect=${pathname}`, req.url)
    );
  }

  let user = null;
  if (token) {
    try {
      user = verifyToken(token);
      const correctDashboard = ROLE_DASHBOARD[user.role];
      if (isAuthPage) {
        return NextResponse.redirect(new URL(correctDashboard, req.url));
      }
      if (
        pathname.startsWith("/user") ||
        pathname.startsWith("/admin") ||
        pathname.startsWith("/vendor")
      ) {
        if (!pathname.startsWith(`/${user.role}`)) {
          return NextResponse.redirect(new URL(correctDashboard, req.url));
        }
      }
    } catch (err) {
      const response = NextResponse.redirect(
        new URL(`/signin?redirect=${pathname}`, req.url)
      );
      response.cookies.delete("accessToken");
      return response;
    }
  }

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(
      new URL(`/signin?redirect=${pathname}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user/:path*",
    "/admin/:path*",
    "/vendor/:path*",
    "/dashboard/:path*",
    "/orders/:path*",
    "/signin",
    "/signup",
  ],
};
