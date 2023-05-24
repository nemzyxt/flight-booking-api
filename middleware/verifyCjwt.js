const jwt = require('jsonwebtoken')

const verifyCjwt = (req, res, next) => {
    const token = req.get('x-token')
    try {
        const payload = jwt.verify(token, process.env.JWT_KEY)
        req.body.customer_id = payload.uuid
        next()
    } catch(err) {
        res.status(401).send('unauthorized :(')
    }
}

module.exports = verifyCjwt
