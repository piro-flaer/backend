const userDetailsModel = require('../models/userDetailsModel')
const userIDModel = require('../models/userIDModel')
const userPreferencesModel = require('../models/userPreferencesModel')

const bcrypt = require('bcrypt')

const logEvents = require('../middleware/logger')


const updateUser = async (req,res) => {
    const { id, firstName, lastName, userName, email, password, difficulty, state, season } = req.body;

    const duplicate = await userDetailsModel.find({userName}).lean()
    if (duplicate.length > 0 && duplicate.some(user => user._id.toString() !== id)) {
        logEvents(`User not updated: Username already exists!`);
        return res.status(409).json({ message: 'Username already exists!' })
    }

    const userDetailsObject = await userDetailsModel.findOne({userName})
    const userIDObject = await userIDModel.findOne({userName})
    const userPreferencesObject = await userPreferencesModel.findOne({userName})

    userDetailsObject.firstName = firstName
    userDetailsObject.lastName = lastName
    userDetailsObject.userName = userName
    userDetailsObject.email = email
    userPreferencesObject.userName = userName
    userPreferencesObject.difficulty = difficulty
    userPreferencesObject.state = state
    userPreferencesObject.season = season
    userIDObject.userName = userName
    if(password){
        userIDObject.password = await bcrypt.hash(password, 10)
    }
    
    const userDetailUpdated = await userDetailsObject.save()
    const userIDUpdated = await userIDObject.save()
    const userPreferencesUpdated = await userPreferencesObject.save()

    if (userDetailUpdated && userIDUpdated && userPreferencesUpdated) { 
        logEvents(`User updated`);
        res.status(200).json({ message: `User updated` })
    } else {
        res.status(400).json({ message: 'User not updated' })
    }
}

module.exports = updateUser