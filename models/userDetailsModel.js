const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
  },
  { collection: "userDetails" }
);

module.exports = mongoose.model("userDetailsModel", userDetailsSchema);
