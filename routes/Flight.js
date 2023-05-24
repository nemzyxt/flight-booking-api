const { v4:uuidv4 } = require('uuid')
const express = require('express')
const router = express.Router()

const Flight = require('../models/Flight')

// view available flights
router.get('/', (_, res) => {
    Flight.find({}, (err, flights) => {
        if(err) {
            res.send(err)
        } else {
            res.send(flights)
        }
    })
})
