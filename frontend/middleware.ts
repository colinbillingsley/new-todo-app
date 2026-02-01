import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	const token = req.cookies.get("auth_token")?.value;

	// paths to protect
	const protectedPaths = ["/dashboard", "/lists"];

	// if no token and current path is protected
	if (
		!token &&
		protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))
	) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	// otherwise continue
	return NextResponse.next();
}

// paths where this middleware runs
export const config = {
	matcher: ["/dashboard/:path*", "/lists/:path*"],
};
