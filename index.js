const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const db = require('./utils/db')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// socket connection logic
io.on('connection', socket => {
    socket.on('joinRoom', ({username, room}) => {
        socket.broadcast.emit('message', 'A user joined a chat!')
        console.log(username, room)
        //check if username and room exists in db
        //to avoid duplicates
        db.query(`SELECT id FROM users WHERE userName='${username}' AND roomId=${room}`
        ,(err, res) => {
                console.log(res)
                if(err)
                    console.log(err)

                if(!res.length){
                    db.query(`INSERT INTO users (userName, roomId) VALUES ('${username}', ${room})`)
                }
        })
    })
    console.log('New connection')
    socket.emit('message', 'Welcome!')


    socket.on('disconnect', ()=>{
        socket.emit('message', 'A user left a chat!')
    })

    //receive chat message
    socket.on('chatMessage', msg => {
        console.log(msg)
        io.emit('message', msg)
    })

})

const PORT = 3000 || process.env.PORT

app.use(express.static(path.join(__dirname, 'public')))
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

