const mongoose = require('mongoose')

const reservationSchema = mongoose.Schema({
    reservation_id: {
        type: String,
        required: true,
        unique: true
    },
    flight_id: {
        type: String,
        required: true,
    },
    customer_id: {
        type: String,
        required: true
    },
    ticket_number: {
        type: String,
        required: true,
        unique: true
    },
})

module.exports = mongoose.model('Reservation', reservationSchema)
