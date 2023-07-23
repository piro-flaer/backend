const userDetailsModel = require("../models/userDetailsModel");

const getUserDetails = async (req, res) => {
  const userName = req.user;

  const userDetails = await userDetailsModel.findOne({ userName }).lean();

  res.status(200).json(userDetails);
};

module.exports = getUserDetails;
