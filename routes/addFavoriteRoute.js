const express = require("express");
const router = express.Router();

const addFavorite = require("../controllers/addFavorite");

router.route("/").post(addFavorite);

module.exports = router;
