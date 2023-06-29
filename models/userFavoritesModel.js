const mongoose = require("mongoose");

const userFavoritesSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    favorites: {
      type: [String],
    },
  },
  { collection: "userFavorites" }
);

module.exports = mongoose.model("userFavoritesModel", userFavoritesSchema);
