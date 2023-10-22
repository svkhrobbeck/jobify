import "express-async-errors";
import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "cloudinary";
// config
import connectDB from "./config/db.js";
import cloudConfig from "./config/cloudinary.js";
// routers
import { authRouter, jobRouter, userRouter } from "./routers/index.js";
// middlewares
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";

const app = express();
const { PORT, NODE_ENV } = process.env;

cloudinary.config(cloudConfig);
if (NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// endpoints
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);
app.use("*", (req, res) => res.status(404).json({ msg: "endpoint not found" }));

app.use(errorHandlerMiddleware);

// listen handlers
connectDB();
app.listen(PORT || 3000, console.log(`Server running on PORT: ${PORT}...`));
