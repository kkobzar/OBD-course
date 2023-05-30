const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')


const app = express()
const server = http.createServer(app)
const io = socketio(server)

// socket connection logic
io.on('connection', socket => {
    console.log('New connection')
    socket.emit('message', 'Welcome!')

    socket.broadcast.emit('message', 'A user joined a chat!')

    socket.on('disconnect', ()=>{
        socket.emit('message', 'A user left a chat!')
    })

})

const PORT = 3000 || process.env.PORT

app.use(express.static(path.join(__dirname, 'public')))
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

