import jwt from "jsonwebtoken";

export function requireAuth(
	req: { cookies: { auth_token: any }; user: string | jwt.JwtPayload },
	res: {
		status: (arg0: number) => {
			(): any;
			new (): any;
			json: { (arg0: { message: string }): any; new (): any };
		};
	},
	next: () => void,
) {
	const token = req.cookies.auth_token;

	if (!token) {
		return res.status(401).json({ message: "Not authenticated" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!);
		req.user = decoded;
		next();
	} catch {
		return res.status(401).json({ message: "Invalid or expired token" });
	}
}
