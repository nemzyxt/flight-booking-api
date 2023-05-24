const mongoose = require('mongoose')

const flightSchema = mongoose.Schema({
    flight_id: {
        type: String,
        required: true,
        unique: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true

    }
})

module.exports = mongoose.model('Flight', flightSchema)
