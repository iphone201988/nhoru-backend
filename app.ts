import express from "express";
import "dotenv/config";
import morgan from "morgan";
import { errorMiddleware } from "./src/middleware/error.middleware";
import router from "./src/routes/index";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/api/v1", router);

app.use(errorMiddleware);

export default app;

