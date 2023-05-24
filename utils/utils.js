const bcrypt = require('bcrypt')

const Flight = require('../models/Flight')
const Reservation = require('../models/Reservation')

// hash provided string using bcrypt
const hashPasswd = (passwd) => {
    rounds = 5
    bcrypt.hash(passwd, rounds, (_, hash) => {
        return hash
    })
}

// check whether provided passwd is valid
const passwdIsValid = (passwd, passwd_hash) => {
    bcrypt.compare(passwd, passwd_hash, (_, result) => {
        return result
    })
}

// generate and return a unique ticket number
const generateTicketNumber = () => {
    const uuid = uuidv4().replace(/-/g, '')
    return uuid.substring(0, 8).toUpperCase()
}

// check whether a flight is full or not
const fullyBooked = (flight_id) => {
    // get max seats for the flight first
    let max_seats
    Flight.findOne({ flight_id:flight_id }, (err, f) => {
        if(err) {
            console.log(err)
        } else {
            max_seats = f.seats
        }
    })

    Reservation.find({ flight_id:flight_id }, (err, f) => {
        if(err) {
            console.log(err)
        } else {
            return f.length == max_seats
        }
    })
}

module.exports = {
    hashPasswd, passwdIsValid, generateTicketNumber, fullyBooked }
