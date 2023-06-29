const userIDModel = require("../models/userIDModel");

const jwt = require("jsonwebtoken");

const logoutController = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    same: "None",
  });

  res.json({ message: "Cookie Cleared!" });
};

module.exports = logoutController;
