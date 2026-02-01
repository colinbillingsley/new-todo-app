import jwt from "jsonwebtoken";
import type { Request } from "express";

export function getAuthUser(req: Request) {
	// get the token from cookies
	const token = req.cookies?.auth_token;

	// if no token, return null
	if (!token) return null;

	try {
		// verify the token and extract the userId
		const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
			userId: string;
		};

		return payload;
	} catch {
		return null;
	}
}
