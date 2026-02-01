import express from "express";
import { v4 as uuidv4 } from "uuid";
import { getAuthUser } from "../middleware/authMiddleware.ts";
import { createList, getUserLists } from "../lib/lists.ts";

const router = express.Router();

// get all lists from user
router.get("/", async (req, res) => {
	try {
		// get the user id from cookies
		const user = getAuthUser(req);

		// if no user, return 401 message
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		// get all lists from the user
		const userLists = await getUserLists(user.userId);

		console.log(userLists);

		res.status(200).json({ lists: userLists });
	} catch (error) {
		res.status(500).json({ message: "Error fetching lists", error });
	}
});

// create a new list item
router.post("/", async (req, res) => {
	try {
		// get the user id from cookies
		const user = getAuthUser(req);

		// if no user, return 401 message
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		// get name of the list from the body
		const { title } = req.body;

		// create a new list id
		const id = uuidv4();

		// create the new list
		const newList = await createList(id, user.userId, title);

		res
			.status(201)
			.json({ message: "List created successfully", list: newList });
	} catch (error) {
		res.status(500).json({ message: "Error creating list", error });
	}
});

// update a list item
router.put("/:id", (req, res) => {});

// delete a list item
router.delete("/:id", (req, res) => {});

export default router;
