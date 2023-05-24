const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email_addr: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Customer', customerSchema)
