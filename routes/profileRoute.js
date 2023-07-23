const express = require("express");
const router = express.Router();

const getUserDetails = require("../controllers/getUserDetails");
const updateUserDetails = require("../controllers/updateUserDetails");

router.route("/").get(getUserDetails).put(updateUserDetails);

module.exports = router;
