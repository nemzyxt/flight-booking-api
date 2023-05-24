const express = require('express')
const { v4:uuidv4 } = require('uuid')
const router = express.Router()

const Flight = require('../models/Flight')
const Reservation = require('../models/Reservation')
const verifyCjwt = require('../middleware/verifyCjwt')
const utils = require('../utils/utils')

// create a new reservation
router.post('/', verifyCjwt, (req, res) => {
    flight_id = req.body.flight_id
    customer_id = req.body.customer_id

    // confirm that the flight id is valid
    Flight.findOne({ flight_id:flight_id })
        .then(f => {
            if(f) {
                reservation_id = uuidv4()
                ticket_number = utils.generateTicketNumber()
                const reservation = new Reservation({
                    reservation_id: reservation_id,
                    flight_id: flight_id,
                    customer_id: customer_id,
                    ticket_number: ticket_number
                })
                reservation.save()
                    .then(_ => {
                        console.log(utils.fullyBooked(flight_id))
                        res.send('flight_booking_success')
                    })
                    .catch(err => {
                        res.send(err)
                    })
                if (utils.fullyBooked(flight_id)) {
                    // update the flight status to 'ready
                    f.status = 'ready'
                }
            } else {
                // no flight with that flight_id
                res.send('invalid_flight_id')
            }
        })
        .catch(err => {
            res.send(err)
        })
})

// view my reservations
router.get('/', verifyCjwt, (req, res) => {
    customer_id = req.body.customer_id

    Reservation.find({ customer_id:customer_id })
        .then(r => {
            if(r.length == 0) {
                res.send('no_reservations')
            } else {
                res.json(r)
            }
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = router
