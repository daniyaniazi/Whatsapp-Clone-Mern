require('dotenv').config()
const express = require('express')
const http = require('http')
const cors = require('cors')
const router = require('./app/routes')


const PORT = process.env.PORT

const app = express()
const server = http.createServer(app)


app.use([cors(), express.static('uploads'), express.json(), express.urlencoded({ extended: false }), router])


server.listen(PORT, () => {
    console.log(`server is started on port ${PORT}`)
})