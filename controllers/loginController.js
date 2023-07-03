const userIDModel = require("../models/userIDModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  const { userName, password } = req.body;
  const foundUser = await userIDModel.findOne({ userName }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: "User Not Found!" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    return res.status(401).json({ message: "Password Doesn't Match!" });
  }

  const accessToken = jwt.sign(
    {
      UserInfo: {
        userName: foundUser.userName,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  const refreshToken = jwt.sign(
    {
      userName: foundUser.userName,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json(accessToken);
};

module.exports = loginController;
