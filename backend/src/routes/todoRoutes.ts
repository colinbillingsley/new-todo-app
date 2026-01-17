import express from "express";
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import db from "../database/db.ts";

const router = express.Router();

// get all todo items
router.get("/", (req, res) => {});

// create a new todo item
router.post("/", (req, res) => {});

// update a todo item
router.put("/:id", (req, res) => {});

// delete a todo item
router.delete("/:id", (req, res) => {});

export default router;
