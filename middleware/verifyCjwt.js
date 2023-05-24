const jwt = require('jsonwebtoken')

const verifyCjwt = (req, res, next) => {
    const token = req.get('x-token')
    try {
        const payload = jwt.verify(token, process.env.JWT_KEY)
        req.body.customer_id = payload.customer_id
        req.body.email_addr = payload.email_addr
        next()
    } catch(err) {
        res.status(401).send('unauthorized :(')
    }
}

module.exports = verifyCjwt
