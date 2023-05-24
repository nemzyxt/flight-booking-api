const crypto = require('crypto')
const { v4:uuidv4 } = require('uuid')

const Flight = require('../models/Flight')
const Reservation = require('../models/Reservation')

// hash provided string using bcrypt
const hashPasswd = (passwd) => {
    const hash = crypto.createHash("sha256")
    hash.update(passwd)
    return hash.digest('hex')
}

// check whether provided passwd is valid
const passwdIsValid = (passwd, passwd_hash) => {
    return hashPasswd(passwd) == passwd_hash
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
