const userDetailsModel = require("../models/userDetailsModel");
const userIDModel = require("../models/userIDModel");
const userPreferencesModel = require("../models/userPreferencesModel");

const bcrypt = require("bcrypt");

const logEvents = require("../middleware/logger");

const createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    password,
    difficulty,
    state,
    season,
  } = req.body;

  const duplicate = await userIDModel.findOne({ userName }).lean();
  if (duplicate) {
    logEvents(`User not created: Username already exists!`);
    return res.status(409).json({ message: "Username already exists!" });
  }

  const hashedPsswrd = await bcrypt.hash(password, 10);

  const userDetailsObject = { firstName, lastName, userName, email };
  const userIDObject = { userName, password: hashedPsswrd };
  const userPreferencesObject = { userName, difficulty, state, season };

  const userDetailCreated = await userDetailsModel.create(userDetailsObject);
  const userIDCreated = await userIDModel.create(userIDObject);
  const userPreferencesCreated = await userPreferencesModel.create(
    userPreferencesObject
  );

  if (userDetailCreated && userIDCreated && userPreferencesCreated) {
    logEvents(`User created`);
    res.status(201).json({ message: `User created` });
  } else {
    res.status(400).json({ message: "User not created" });
  }
};

module.exports = createUser;
