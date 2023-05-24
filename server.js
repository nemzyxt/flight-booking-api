// Author : Nemuel Wainaina

const express = require('express')
const parser = require('body-parser')
require('dotenv').config()
require('./database')

const app = express()
app.use(parser.json())

const customersRouter = require('./routes/customers')
const flightsRouter = require('./routes/flights')
const reservationsRouter = require('./routes/reservations')

app.use('/customers', customersRouter)
app.use('/flights', flightsRouter)
app.use('/bookings', reservationsRouter)

app.listen(8000, () => {
    console.log('[+] Server running ...')
})
