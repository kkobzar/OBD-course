const db = require('./db')

function getRoomMessages(id){
    db.query(`SELECT * FROM chat_rooms WHERE id=${id} SORT BY ts ASC LIMIT 30`)
}

function saveMessage(text,userId){

}

module.exports = {
    getRoomMessages,
    saveMessage
}