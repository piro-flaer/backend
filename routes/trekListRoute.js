const express = require("express");
const router = express.Router();

const getTrekList = require("../controllers/getTrekList");

router.get("/", getTrekList);

module.exports = router;
