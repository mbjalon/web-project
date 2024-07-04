import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { env } from "process";
import session from "express-session";
import passport from "passport";
import shelfRouter from "./shelf/routes";
import fs from "fs";
import yaml from "yaml";
import swaggerUi from "swagger-ui-express";
import statsRouter from "./stats/routes";
import itemRouter from "./item/routes";
import goodRouter from "./good/routes";
import { authRouter } from "./auth/router";
import { passportStrategy } from "./auth/passportStrategy";
import categoryRouter from "./category/routes";

config();

const app = express();
const port = env.PORT ?? 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const sessionSecret = env.SESSION_SECRET ?? "mystery";

passport.use(passportStrategy());
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/shelves", shelfRouter);
app.use("/stats", statsRouter);
app.use("/items", itemRouter);
app.use("/goods", goodRouter);
app.use("/auth", authRouter);
app.use("/categories", categoryRouter);

const documentationFile = fs.readFileSync(
  "./api-documentation/swagger.yaml",
  "utf8",
);
const swaggerDocument = yaml.parse(documentationFile);

/* Add the api-documentation endpoint */
app.use(
  "/api-documentation",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);

// No route was taken - 404 - Resource (API endpoint) not found.
// Default route returning 404
app.use((_req, res) => {
  res.status(404).send("Not found");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
