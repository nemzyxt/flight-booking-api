const express = require('express')
const router = express.Router()

const Flight = require('../models/Flight')

// view available flights
router.get('/', (_, res) => {
    Flight.find({ status:'available' })
        .then(flights => {
            res.json(flights)
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = router
