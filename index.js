const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const db = require('./utils/db')
const userHelper = require('./utils/users')
const messageHelper = require('./utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// socket connection logic
io.on('connection', socket => {
    let userId = null

    socket.on('joinRoom', async ({username, room}) => {
        socket.broadcast.emit('message', `Hello, ${username}`)

        userId = await userHelper.createUser(username, room)
        console.log('user created')
        //userId = await userHelper.getUserId(username,room)
        console.log('user - ',userId)
    })
    console.log('New connection')
    socket.emit('message', 'Welcome!')


    socket.on('disconnect', ()=>{
        socket.emit('message', 'A user left a chat!')
    })

    //receive chat message
    socket.on('chatMessage',async msg => {
        console.log(msg)
        if(userId){
            console.log('Saved message to db')

            messageHelper.saveMessage(msg,userId)
        }
        io.emit('message', msg)
    })

})

const PORT = 3000 || process.env.PORT

app.use(express.static(path.join(__dirname, 'public')))
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

