const express = require("express");
const router = express.Router();
const DemoController = require("../controllers/demo.controller");

router.get("/", DemoController.getAllDemos);

module.exports = router;
