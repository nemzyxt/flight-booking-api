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

module.exports = {
    hashPasswd, passwdIsValid, generateTicketNumber }
