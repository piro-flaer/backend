const userFavoritesModel = require("../models/userFavoritesModel");

const logEvents = require("../middleware/logger");

const addFavorite = async (req, res) => {
  const { userName, favoriteItem } = req.body;

  const userFavoritesObject = await userFavoritesModel.findOne({ userName });

  userFavoritesObject.favorites.push(favoriteItem);

  const userFavoritesUpdated = await userFavoritesObject.save();

  if (userFavoritesUpdated) {
    logEvents("Favorite Added");
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
};

module.exports = addFavorite;
