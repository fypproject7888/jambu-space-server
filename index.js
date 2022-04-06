const express = require("express");
const app = express();
const path = require("path");
const compression = require("compression");
const { PORT, NODE_ENV } = require("./config");

const isProduction = NODE_ENV === "production";

if (!isProduction) {
  require("dotenv").config();
}

app.use(compression()); // gzip compress responses
require("./startup/logging")(); // logging to files
require("./startup/db")(); // database connection
require("./startup/session")(app); // Initialized session for authentication
require("./startup/securityHeaders")(app); // Setting security headers with helmet module
require("./startup/routes")(app); // Initializing all api routes

if (isProduction) {
  app.use(express.static("client/build"));

  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`> 🚀 Server is running on port ${PORT}...`);
});
