const userPreferencesModel = require("../models/userPreferencesModel");

const getPreferences = async (req, res) => {
  const userName = req.user;
  const userPreferences = await userPreferencesModel
    .findOne({ userName })
    .lean();

  res.status(200).json(userPreferences);
};

module.exports = getPreferences;
