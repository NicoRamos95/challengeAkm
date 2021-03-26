const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: String,
    email: String,
    urlPic: String,
    password: String,
})

const User = mongoose.model('user', userSchema)

module.exports = User