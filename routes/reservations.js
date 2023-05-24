const express = require('express')
const { v4:uuidv4 } = require('uuid')
const router = express.Router()

const Flight = require('../models/Flight')
const Reservation = require('../models/Reservation')

const generateTicketNumber = () => {
    const uuid = uuidv4().replace(/-/g, '')
    return uuid.substring(0, 8).toUpperCase()
}

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

// create a new reservation
router.post('/', (req, res) => {
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
                    ticket_number: generateTicketNumber()
                })
                reservation.save()
                    .then(_ => {
                        res.send('flight_booking_success')
                    })
                    .catch(err => {
                        res.send(err)
                    })
                if (fullyBooked(flight_id)) {
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

module.exports = router
