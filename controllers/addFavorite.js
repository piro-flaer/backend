const userFavoritesModel = require("../models/userFavoritesModel");

const logEvents = require("../middleware/logger");

const addFavorite = async (req, res) => {
  const { userName, favoriteItem } = req.body;

  const userFavoritesObject = await userFavoritesModel.findOne({ userName });

  userFavoritesObject.favorites.append(favoriteItem);

  const userFavoritesUpdated = await userFavoritesObject.save();

  if (userFavoritesUpdated) {
    logEvents("Favorite Added");
    res.status(200).json({ message: "Favorite Added" });
  } else {
    res.status(400).json({ message: "Favorite not Added" });
  }
};

module.exports = addFavorite;
