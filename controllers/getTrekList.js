const trekDetailsModel = require("../models/trekDetailsModel");

const getTrekList = async (req, res) => {
  const { state, season, difficulty } = req.query;
  var trekResList = await trekDetailsModel.find().lean();

  if (state) {
    trekResList = trekResList.filter((trek) => trek.state === state);
  }

  if (season) {
    trekResList = trekResList.filter((trek) => trek.season === season);
  }

  if (difficulty) {
    trekResList = trekResList.filter((trek) => trek.difficulty === difficulty);
  }

  res.status(200).json(trekResList);
};

module.exports = getTrekList;
