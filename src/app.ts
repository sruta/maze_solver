import express, { Router } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import initializeContainer from "./container";
import newMazeRouter from "./routes/maze.routes";

dotenv.config();

const container = initializeContainer();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

const router = Router();
app.use(newMazeRouter(router, container));

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at https://localhost:${port}`);
});
