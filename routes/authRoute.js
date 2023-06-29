const express = require("express");
const router = express.Router();

const loginLimiter = require("../middleware/loginLimiter");

const loginController = require("../controllers/loginController");
const refreshController = require("../controllers/refreshController");
const logoutController = require("../controllers/logoutController");

router.route("/").post(loginLimiter, loginController);

router.route("/refresh").get(refreshController);

router.route("/logout").post(logoutController);

module.exports = router;
