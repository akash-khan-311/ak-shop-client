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
  const { pathname, search } = req.nextUrl;

  const isAuthPage = pathname === "/signin" || pathname === "/signup";

  const isAdminRoute = pathname.startsWith("/admin");
  const isVendorRoute = pathname.startsWith("/vendor");
  const isUserRoute = pathname.startsWith("/user");

  const isDashboardAlias =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  const isProtectedRoute =
    isAdminRoute || isVendorRoute || isUserRoute || isDashboardAlias;

  const signinRedirect = () =>
    NextResponse.redirect(
      new URL(`/signin?redirect=${pathname}${search || ""}`, req.url)
    );

  const forceLogout = () => {
    const res = signinRedirect();
    res.cookies.delete("accessToken");
    return res;
  };

  // no token -> protected deny
  if (!token && isProtectedRoute) return signinRedirect();

  let user: any = null;

  if (token) {
    try {
      user = verifyToken(token); // must contain role
    } catch (e) {
      return forceLogout(); // invalid/expired token
    }
  }

  // logged-in user can't stay in auth pages
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL(ROLE_DASHBOARD[user.role], req.url));
  }

  // /dashboard -> role dashboard
  if (user && isDashboardAlias) {
    return NextResponse.redirect(new URL(ROLE_DASHBOARD[user.role], req.url));
  }

  // role-based strict protection
  if (user) {
    if (isAdminRoute && user.role !== "admin")
      return NextResponse.redirect(new URL(ROLE_DASHBOARD[user.role], req.url));

    if (isVendorRoute && user.role !== "vendor")
      return NextResponse.redirect(new URL(ROLE_DASHBOARD[user.role], req.url));

    if (isUserRoute && user.role !== "user")
      return NextResponse.redirect(new URL(ROLE_DASHBOARD[user.role], req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user/:path*",
    "/admin/:path*",
    "/vendor/:path*",
    "/dashboard/:path*",
    "/dashboard",
    "/signin",
    "/signup",
  ],
};
