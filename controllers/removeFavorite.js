const userFavoritesModel = require("../models/userFavoritesModel");

const logEvents = require("../middleware/logger");

const removeFavorites = async (req, res) => {
  const { userName, favoriteItem } = req.body;

  const userFavoritesObject = await userFavoritesModel.findOne({ userName });

  const index = userFavoritesObject.favorites.indexof(favoriteItem);
  userFavoritesObject.favorites.splice(index, 1);

  const userFavoritesUpdated = await userFavoritesObject.save();

  if (userFavoritesUpdated) {
    logEvents("Favorite Removed");
    res.status(200).json({ message: "Favorite Removed" });
  } else {
    res.status(400).json({ message: "Favorite not Removed" });
  }
};

module.exports = removeFavorites;
