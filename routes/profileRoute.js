const express = require("express");
const router = express.Router();

const getUserDetails = require("../controllers/getUserDetails");
const createUser = require("../controllers/createUser");
const updateUserDetails = require("../controllers/updateUserDetails");

router
  .route("/:userName?")
  .get(getUserDetails)
  .post(createUser)
  .patch(updateUserDetails);

module.exports = router;
