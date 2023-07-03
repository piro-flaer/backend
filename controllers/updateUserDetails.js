const userDetailsModel = require("../models/userDetailsModel");
const userIDModel = require("../models/userIDModel");

const bcrypt = require("bcryptjs");

const logEvents = require("../middleware/logger");

const updateUser = async (req, res) => {
  const { id, firstName, lastName, userName, email, password, profile } =
    req.body;

  const duplicateUserName = await userDetailsModel.find({ userName }).lean();
  if (
    duplicateUserName.length > 0 &&
    duplicateUserName.some((user) => user._id.toString() !== id)
  ) {
    logEvents(`User not updated: Username already exists!`);
    return res
      .status(409)
      .json({ message: "Username Already Exists! Please Choose Another" });
  }

  const duplicateEmail = await userDetailsModel.find({ email }).lean();
  if (
    duplicateEmail.length > 0 &&
    duplicateEmail.some((user) => user._id.toString() !== id)
  ) {
    logEvents(`User not updated: Username already exists!`);
    return res
      .status(409)
      .json({ message: "EMail Already Exists! Please Choose Another" });
  }

  const userDetailsObject = await userDetailsModel.findOne({ userName });
  const userIDObject = await userIDModel.findOne({ userName });

  userDetailsObject.firstName = firstName;
  userDetailsObject.lastName = lastName;
  userDetailsObject.userName = userName;
  userDetailsObject.email = email;
  userDetailsObject.profile = profile;
  userIDObject.userName = userName;
  if (password) {
    userIDObject.password = await bcrypt.hash(password, 10);
  }

  const userDetailUpdated = await userDetailsObject.save();
  const userIDUpdated = await userIDObject.save();

  if (userDetailUpdated && userIDUpdated) {
    logEvents(`User updated`);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
};

module.exports = updateUser;
