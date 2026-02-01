import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "../src/routes/authRoutes.ts";
import todoRoutes from "../src/routes/todoRoutes.ts";
import cookieParser from "cookie-parser";
import listRoutes from "./routes/listRoutes.ts";

const app = express();
const port = process.env.PORT || 4001;

const corsOptions = {
	origin: ["http://localhost:3000"],
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	optionsSuccessStatus: 200,
	credentials: true,
	secure: process.env.NODE_ENV === "production",
};

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// routes
app.use("/api/user", authRoutes);
app.use("/api/todo", todoRoutes);
app.use("/api/list", listRoutes);

app.listen(port, (req) => {
	console.log(`Example app listening on port ${port}`);
});
