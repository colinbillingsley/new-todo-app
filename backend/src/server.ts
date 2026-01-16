import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4001;

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};

//middleware
app.use(express.json());
app.use(cors(corsOptions));

// routes
// app.use("/api/user", userRoutes);
// app.use("/api/recipes", recipeRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
