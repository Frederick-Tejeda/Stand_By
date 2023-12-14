require('dotenv').config()

const mongoose = require('mongoose')

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {})

const connection = mongoose.connection

connection.once('open', () => {
    console.log('DB is connected')
})
