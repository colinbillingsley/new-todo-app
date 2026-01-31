import express from "express";
import jwt from "jsonwebtoken";
import { createUser } from "../database/queries/userQueries.ts";
import type { InsertUser } from "../database/schema.ts";
import { getUserByUsername } from "../lib/user.ts";
import { verifyPassword } from "../lib/password.ts";

const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { id, name, username, password } = req.body;

		// check if any required fields are missing
		if (!name || !username || !password) {
			return res.status(400).json({ message: "Missing required fields." });
		}

		// create a user pbject of correct data
		const userData: InsertUser = {
			id,
			name,
			username,
			password,
		};

		// attempt to insert user into database
		const insertedUser = await createUser(userData);

		return res
			.status(201)
			.json({ message: "User successfully created!", insertedUser });
	} catch (error: any) {
		return res
			.status(409)
			.json({ message: error.message ?? "Failed to create a user" });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.status(400).json({ message: "Missing required fields." });
		}

		const user = await getUserByUsername(username);

		if (!user) {
			return res.status(401).json({ message: "Invalid username or password." });
		}

		const userIsValid = await verifyPassword(password, user.password);

		if (!userIsValid) {
			return res.status(401).json({ message: "Invalid username or password." });
		}

		const jwtSecret = process.env.JWT_SECRET;

		if (!jwtSecret) {
			throw new Error("JWT_SECRET not defined");
		}

		const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
			expiresIn: "15m",
		});

		const refreshToken = jwt.sign(
			{ userId: user.id },
			process.env.JWT_REFRESH_SECRET!,
			{ expiresIn: "7d" },
		);

		res.cookie("auth_token", accessToken, {
			httpOnly: true,
			sameSite: "lax",
			secure: false,
			maxAge: 15 * 60 * 1000,
		});

		res.cookie("refresh_token", refreshToken, {
			httpOnly: true,
			sameSite: "lax",
			secure: false,
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		return res.status(200).json({
			message: "Login successful",
			tokens: { accessToken, refreshToken },
		});
	} catch (error: any) {
		return res
			.status(500)
			.json({ message: error.message ?? "An error occurred during login." });
	}
});

router.post("/logout", (req, res) => {
	res.clearCookie("auth_token");
	res.clearCookie("refresh_token");
	res.json({ success: true });
});

router.post("/refresh", (req, res) => {
	const refreshToken = req.cookies.refresh_token;
	if (!refreshToken)
		return res.status(401).json({ message: "No refresh token" });

	try {
		const decoded = jwt.verify(
			refreshToken,
			process.env.JWT_REFRESH_SECRET!,
		) as any;

		const newAccessToken = jwt.sign(
			{ userId: decoded.userId },
			process.env.JWT_SECRET!,
			{ expiresIn: "15m" },
		);

		res.cookie("auth_token", newAccessToken, {
			httpOnly: true,
			sameSite: "lax",
			secure: false,
			maxAge: 15 * 60 * 1000,
		});

		res.json({ success: true });
	} catch {
		return res.status(401).json({ message: "Invalid refresh token" });
	}
});

export default router;
