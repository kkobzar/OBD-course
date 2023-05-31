const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const db = require('./utils/db')
const userHelper = require('./utils/users')
const messageHelper = require('./utils/messages')
const moment = require("moment");

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// socket connection logic
io.on('connection', socket => {
    let userId = null
    const d = moment()

    socket.on('joinRoom', async ({username, room}) => {
        socket.emit('message',{msg:`Hello, ${username}`, username:username, date:d.format('HH:mm')} )

        userId = await userHelper.createUser(username, room)


    })
    console.log('New connection')

    //socket.emit('message', {msg:'Welcome, !',username:'Chat Bot', date:d.format('HH:mm')})


    // socket.on('disconnect', ()=>{
    //     socket.emit('message', 'A user left a chat!')
    // })

    //receive chat message
    socket.on('chatMessage',async msg => {
        console.log(msg)
        const d = moment()
        let username = ''
        if(userId){
            console.log('Saved message to db')

            messageHelper.saveMessage(msg,userId)
            username = await userHelper.getUserName(userId)
            console.log(username.userName)
        }
        // console.log(`${d.getHours()}:${d.getMinutes()}`)
        io.emit('message', {msg, username:username.userName, date: d.format('HH:mm')})
    })

})

const PORT = 3000 || process.env.PORT

app.use(express.static(path.join(__dirname, 'public')))
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

