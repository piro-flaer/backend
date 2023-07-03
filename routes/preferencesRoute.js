const express = require("express");
const router = express.Router();

const setPreferences = require("../controllers/setPreferences");
const getPreferences = require("../controllers/getPreferences");
const updatePreferences = require("../controllers/updatePreferences");

router
  .route("/")
  .get(getPreferences)
  .post(setPreferences)
  .put(updatePreferences);

module.exports = router;
