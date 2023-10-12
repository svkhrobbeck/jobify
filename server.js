import express from "express";
import "dotenv/config";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.listen(PORT, console.log(`Server running on PORT: ${PORT}...`));
