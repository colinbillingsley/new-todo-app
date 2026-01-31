import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	const token = req.cookies.get("auth_token")?.value; // <- .value is required
	console.log("Req.cookies: " + req.cookies);
	console.log("Middleware - auth_token:", token);

	// If token is missing, redirect to login
	if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	// If token exists or not accessing protected path, continue
	return NextResponse.next();
}
