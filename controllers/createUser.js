const userDetailsModel = require("../models/userDetailsModel");
const userIDModel = require("../models/userIDModel");
const userFavoritesModel = require("../models/userFavoritesModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const logEvents = require("../middleware/logger");

const createUser = async (req, res) => {
  const { firstName, lastName, userName, email, password, profile } = req.body;

  const duplicateUserName = await userIDModel.findOne({ userName }).lean();
  if (duplicateUserName) {
    logEvents(`User not created: Username already exists!`);
    return res.status(409).json({ message: "UserName Already Exists!" });
  }
  const duplicateMail = await userIDModel.findOne({ email }).lean();
  if (duplicateMail) {
    logEvents(`User not created: EMail already exists!`);
    return res.status(409).json({ message: "E Mail Already Exists!" });
  }

  const hashedPsswrd = await bcrypt.hash(password, 10);

  const userDetailsObject = { firstName, lastName, userName, email, profile };
  const userIDObject = { userName, password: hashedPsswrd };
  const userFavoritesObject = { userName, favorites: [] };

  const userDetailCreated = await userDetailsModel.create(userDetailsObject);
  const userIDCreated = await userIDModel.create(userIDObject);
  const userFavoritesCreated = await userFavoritesModel.create(
    userFavoritesObject
  );

  if (userDetailCreated && userIDCreated && userFavoritesCreated) {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          userName: userName,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      {
        userName: userName,
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

    logEvents(`User created`);
    res.status(201).json({ accessToken });
  } else {
    res.sendStatus(400);
  }
};

module.exports = createUser;
