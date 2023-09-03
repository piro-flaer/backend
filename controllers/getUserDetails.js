const logEvents = require("../middleware/logger");
const userDetailsModel = require("../models/userDetailsModel");
const util = require("util");

const getUserDetails = async (req, res) => {
  const userName = req.user;

  logEvents(util.inspect(req, { showHidden: false, depth: null }));

  const userDetails = await userDetailsModel.findOne({ userName }).lean();

  res.status(200).json(userDetails);
};

module.exports = getUserDetails;
