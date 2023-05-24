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

    },
    seats: {
        type: Number,
        required: true
    },
    ticket_cost: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: [
            'available', 'ready',
            'cancelled', 'airborne']
    }
})

module.exports = mongoose.model('Flight', flightSchema)
