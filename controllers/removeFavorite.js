const userFavoritesModel = require("../models/userFavoritesModel");

const logEvents = require("../middleware/logger");

const removeFavorite = async (req, res) => {
  const { userName, favoriteItem } = req.body;

  const userFavoritesObject = await userFavoritesModel.findOne({ userName });

  const favoriteList = userFavoritesObject.favorites;
  const index = favoriteList.indexOf(favoriteItem);
  favoriteList.splice(index, 1);
  userFavoritesObject.favorites = favoriteList;

  const userFavoritesUpdated = await userFavoritesObject.save();

  if (userFavoritesUpdated) {
    logEvents("Favorite Removed");
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
};

module.exports = removeFavorite;
