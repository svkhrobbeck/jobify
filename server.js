import "express-async-errors";
import express from "express";
import "dotenv/config";
import morgan from "morgan";
import connectDB from "./config/db.js";
// routers
import jobRouter from "./routers/jobRouter.js";
import userRouter from "./routers/userRouter.js";
// middlewares
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";

const app = express();
const { PORT, NODE_ENV } = process.env;

app.use(express.json());
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// endpoints
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/users", userRouter);
app.use("*", (req, res) => res.status(404).json({ msg: "endpoint not found" }));

app.use(errorHandlerMiddleware);

// listen handlers
connectDB();
app.listen(PORT || 3000, console.log(`Server running on PORT: ${PORT}...`));
