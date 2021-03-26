const mongoose = require('mongoose')

const operationSchema = new mongoose.Schema({
    concept: String,
    amount: String,
    date: { type: Date, default: Date.now },
    category: String,
    type: String,
    userId: { type: mongoose.Schema.ObjectId, ref: 'user'}
})

const Operation = mongoose.model('operation', operationSchema)

module.exports = Operation