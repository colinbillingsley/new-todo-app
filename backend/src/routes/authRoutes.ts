import express from "express";
import jwt from "jsonwebtoken";
import { createUser } from "../database/queries/userQueries.ts";
import type { InsertUser } from "../database/schema.ts";

const router = express.Router();

router.post("/register", async (req, res) => {
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

  // if successful, send success message
  if (insertedUser) {
    return res
      .status(200)
      .json({ message: "User successfully created!", userData });
  }
});

router.get("/login", (req, res) => {});

export default router;
