const mongoose = require('mongoose')

const userPreferencesSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    season: {
        type: String,
        required: true
    }
},
  { collection: 'userPreferences' })

module.exports = mongoose.model('userPreferencesModel', userPreferencesSchema)