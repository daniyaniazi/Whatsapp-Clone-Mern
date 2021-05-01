require('dotenv').config()
const express = require('express')
const http = require('http')
const cors = require('cors')
const router = require('./app/routes')


const PORT = process.env.PORT

const app = express()
const server = http.createServer(app)


app.use([cors(), express.static('uploads'), express.json(), express.urlencoded({ extended: false }), router])

const io = (module.exports.io = require('socket.io')(server))
const socketMangaer = require('./app/socketManager/socketManager')

io.on("connection", socketMangaer)

server.listen(PORT, () => {
    console.log(`server is started on port ${PORT}`)
})