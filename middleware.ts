import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin/* — hanya admin
  if (pathname.startsWith("/admin")) {
    const session = await auth();

    // Belum login → redirect ke /login
    if (!session?.user) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Login tapi bukan admin → redirect ke homepage
    if ((session.user as { role?: string }).role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Protect /dashboard/* — harus login (customer atau admin)
  if (pathname.startsWith("/dashboard")) {
    const session = await auth();

    if (!session?.user) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};