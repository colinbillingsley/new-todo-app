import express from "express";
import jwt from "jsonwebtoken";
import { createUser } from "../database/queries/userQueries.ts";
import type { InsertUser } from "../database/schema.ts";

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
      .json({ message: "User successfully created!", userData });
  } catch (error: any) {
    return res
      .status(409)
      .json({ message: error.message ?? "Failed to create a user" });
  }
});

router.get("/login", (req, res) => {});

export default router;
