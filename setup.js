const _ = require('lodash')
require('dotenv').config()
require('./database')

const Flight = require('./models/Flight')

// data options
fromOptions = ['Kenya', 'Uganda', 'Russia', 'China', 'Australia']
toOptions = ['Kenya', 'Uganda', 'Russia', 'China', 'Australia']
seatOptions = [100, 150, 250]
costOptions = [75000, 70000, 100000]
statusOptions = ['available', 'cancelled', 'ready', 'airborne']

// util functions for this
const randDate = () => {
    const days = _.random(1, 10)
    const current = new Date()
    current.setDate(current.getDate() + days)
    const date = String(current.getDate()).padStart(2, '0')
    const month = String(current.getMonth()+1).padStart(2, '0')
    const year = String(current.getFullYear())

    return `${date}-${month}-${year}`
}

const randTime = () => {
    const randHr = _.random(0, 23).toString().padStart(2, '0')
    const randMin = _.random(0, 59).toString().padStart(2, '0')
    return `${randHr}:${randMin}`
}

// generating actual data and saving it
for(let i=0; i<10; i++) {
    const flight = new Flight({
        flight_id: _.uniqueId(),
        from: _.sample(fromOptions),
        to: _.sample(toOptions),
        date: randDate(),
        time: randTime(),
        seats: _.sample(seatOptions),
        ticket_cost: _.sample(costOptions),
        status: _.sample(statusOptions)
    })
    flight.save()
        .then(_ => {
            console.log("[+] Flight saved")
        })
        .catch(err => {
            console.log(err)
        })
}

console.log("[+] Sample data added successfully")
