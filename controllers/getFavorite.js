const userFavoritesModel = require("../models/userFavoritesModel");
const trekDetailsModel = require("../models/trekDetailsModel");

const getFavorite = async (req, res) => {
  const userName = req.user;
  const userFavorites = await userFavoritesModel.findOne({ userName }).lean();

  const trekList = await trekDetailsModel.find().lean();

  const userFavoritesTreks = trekList.filter((trek) =>
    userFavorites.favorites.includes(trek.name)
  );

  res.status(200).json(userFavoritesTreks);
};

module.exports = getFavorite;
