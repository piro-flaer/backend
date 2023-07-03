const userDetailsModel = require("../models/userDetailsModel");
const userIDModel = require("../models/userIDModel");

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

  const userDetailCreated = await userDetailsModel.create(userDetailsObject);
  const userIDCreated = await userIDModel.create(userIDObject);

  if (userDetailCreated && userIDCreated) {
    logEvents(`User created`);
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
};

module.exports = createUser;
