import express from "express";
import "dotenv/config";
import morgan from "morgan";
import connectDB from "./config/db.js";
// routers
import jobRouter from "./routers/jobRouter.js";

const app = express();
const { PORT, NODE_ENV } = process.env;

app.use(express.json());
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// endpoints
app.use("/api/v1/jobs", jobRouter);


// listen handlers
connectDB();
app.listen(PORT || 3000, console.log(`Server running on PORT: ${PORT}...`));
