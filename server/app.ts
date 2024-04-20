import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { router } from "./routes/router";
import { corsSettings } from "./config/config";

import bodyParser from "body-parser";

export const app = express();

app.set("trust proxy", true);

// Middleware to log HTTP requests
app.use(morgan("combined"));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to enable CORS
app.use(cors(corsSettings));

// Your routes
app.use("/", router);

export default app;
