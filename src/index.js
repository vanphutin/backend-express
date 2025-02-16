require("dotenv").config({ path: "./src/.env" });
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const database = require("./config/database.conf");
const api_router_v1 = require("./apis/v1/routers/index.router");
const app = express();

// - start: CORS configuration
var whitelist = ["http://localhost:3000", "http://localhost:4000"];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
// -end: CORS configuration

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// check server
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Routes
api_router_v1(app);

// Start server
database.getConnection((error, connection) => {
  if (error) {
    console.error("Error connecting to database:", error);
    return process.exit(1); // Exit if there's a connection error
  }

  console.log(
    `Connected to MySQL database || Host: ${database.config.connectionConfig.host}, Port: ${database.config.connectionConfig.port}`
  );

  connection.release();

  // Start the server
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
