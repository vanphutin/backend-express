const express = require("express");
const router = express.Router();

const demoRoutes = require("./demo.router");

router.use("/demo", demoRoutes);

module.exports = (app) => {
  app.use("/api/v1", router);
};
