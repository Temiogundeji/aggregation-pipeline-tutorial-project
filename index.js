const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });
const express = require("express");
const cors = require("cors");
const { expressLogger, logger } = require("./src/utils/logger");
const routes = require("./src/routes/auth/auth");

const app = express();
app.use(expressLogger);

app.use("/simple-blog/api/v1", routes);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 
app.all("/*", (req, res, next) => {
  next(new Error("Resource unavailable"));
});

process.on("unhandledRejection", (err) => {
  logger.warn("unhandled", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  logger.warn("uncaught", err);
  process.exit(1);
});

module.exports = app;
