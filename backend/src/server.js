import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import {connectDB} from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
	cors({
		origin: "http://localhost:5173",
	})
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log("Server started on PORT:", PORT);
	});
});
