const mongoose = require('mongoose')

class Database {
    constructor() {
        const db = 'mongodb://localhost/lAirwaysDB'
        this._connect()
    }

    _connect() {
        mongoose.connect(db)
            .then(() => {
                console.log('[+] Connection to DB successful')
            })
            .catch((err) => {
                console.log('[!] Error : ', err)
            })
    }
}

module.exports = new Database()
