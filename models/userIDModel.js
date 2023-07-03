const mongoose = require('mongoose')

const userIDSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
  { collection: 'userIDs' })

module.exports = mongoose.model('userIDModel', userIDSchema)
