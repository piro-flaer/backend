const userDetailsModel = require('../models/userDetailsModel')
const userPreferencesModel = require('../models/userPreferencesModel')

const getUserDetails = async (req,res) => {
    const userName = req.params.userName;

    const userDetails = await userDetailsModel.findOne({ userName }).lean();
    const userPreferences = await userPreferencesModel.findOne({ userName }).lean();

    res.status(200).json({userDetails,userPreferences});
}

module.exports = getUserDetails