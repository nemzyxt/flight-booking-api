const { v4:uuidv4 } = require('uuid')
const express = require('express')
const router = express.Router()

const Customer = require('../models/Customer')

// create a new account
router.post('/new', (req, res) => {
    email_addr = req.body.email_addr
    first_name = req.body.first_name
    last_name = req.body.last_name
    
    // confirm that the email does not exist
    Customer.find({ email_addr:email_addr })
        .then(acct => {
            if(acct.length != 0) {
                res.send('email_exists')
            } else {

                // create new record
                customer_id = uuidv4()
                const customer = new Customer({
                    customer_id: customer_id,
                    first_name: first_name,
                    last_name: last_name,
                    email_addr: email_addr
                })
                customer.save()
                    .then(_ => {
                        res.send('success')
                    })
                    .catch(err => {
                        res.send(err)
                    })
            }
        })
})

// log in to existing account
router.post('/login', (req, res) => {
    email = req.body.email
    passwd = req.body.passwd

    Customer.findOne({ email_addr:email }, (err, c) => {
        if(err) {
            res.send(err)
        } else {
            if(c) {
                if(passwd == acct.passwd) {
                    // TODO: generate and include JWT token in response
                    // Include uuid in token
                    res.send('success')
                } else {
                    res.send('invalid_credentials')
                }
            } else {
                res.send('invalid_credentials')
            }
        }
    })
})
