const express = require("express");
const router = express.Router();

const getFavorite = require("../controllers/getFavorite");
const addFavorite = require("../controllers/addFavorite");
const removeFavorite = require("../controllers/removeFavorite");

router.route("/").get(getFavorite);

router.route("/add").post(addFavorite);

router.route("/remove").post(removeFavorite);

module.exports = router;
