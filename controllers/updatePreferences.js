const userPreferencesModel = require("../models/userPreferencesModel");

const bcrypt = require("bcryptjs");

const logEvents = require("../middleware/logger");

const updatePreferences = async (req, res) => {
  const userName = req.user;
  const { state, season, difficulty } = req.body;

  const userPreferencesObject = await userPreferencesModel.findOne({
    userName,
  });

  userPreferencesObject.state = state;
  userPreferencesObject.season = season;
  userPreferencesObject.difficulty = difficulty;

  const userPreferencesUpdated = await userPreferencesObject.save();

  if (userPreferencesUpdated) {
    logEvents(`Preferences updated`);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
};

module.exports = updatePreferences;
