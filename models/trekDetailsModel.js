const mongoose = require("mongoose");

const trekDetailsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    season: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { collection: "trekDetails" }
);

module.exports = mongoose.model("trekDetailsModel", trekDetailsSchema);
