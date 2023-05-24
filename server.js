// Author : Nemuel Wainaina

const express = require('express')
require('./database')

const app = express()
app.use(express.json())

const customersRouter = require('./routes/customers')
const flightsRouter = require('./routes/flights')
const reservationsRouter = require('./routes/reservations')

app.use('/customers', customersRouter)
app.use('/flights', flightsRouter)
app.use('/bookings', reservationsRouter)

app.listen(8000, () => {
    console.log('[+] Server running ...')
})
