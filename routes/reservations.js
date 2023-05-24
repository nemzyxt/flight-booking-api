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
    customer_id = req.body.flight_id

    // confirm that the flight id is valid
    Flight.findOne({ flight_id:flight_id }, (err, f) => {
        if(err) {
            res.send(err)
        } else {
            if(f) {
                const reservation = new Reservation({
                    reservation_id: uuidv4(),
                    flight_id: flight_id,
                    customer_id: customer_id,
                    ticket_number: utils.generateTicketNumber()
                })
                reservation.save()
                    .then(_ => {
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
                // no such flight :)
                res.send('invalid_flight_id')
            }
        }
    })
})

// view my reservations
router.get('/', verifyCjwt, (req, res) => {
    customer_id = req.body.customer_id

    Reservation.find({ customer_id:customer_id }, (err, r) => {
        if(err) {
            res.send(err)
        } else {
            if(r) {
                res.json(r)
            } else {
                res.send('no_reservations_done')
            }
        }
    })
})

module.exports = router
