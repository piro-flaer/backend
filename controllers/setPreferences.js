const userPreferencesModel = require("../models/userPreferencesModel");

const logEvents = require("../middleware/logger");

const setPreferences = async (req, res) => {
  const { userName, state, season, difficulty } = req.body;

  const userPreferencesObject = { userName, state, season, difficulty };

  const userPreferencesCreated = await userPreferencesModel.create(
    userPreferencesObject
  );

  if (userPreferencesCreated) {
    logEvents(`Preferences created`);
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
};

module.exports = setPreferences;
