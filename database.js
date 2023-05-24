const mongoose = require('mongoose')

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(process.env.DB_URL)
            .then(() => {
                console.log('[+] Connection to DB successful')
            })
            .catch((err) => {
                console.log('[!] Error : ', err)
            })
    }
}

module.exports = new Database()
