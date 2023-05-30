const db = require('./db')
function createUser(name, room){
    //check if username and room exists in db
    //to avoid duplicates
    db.query(`SELECT id FROM users WHERE userName='${name}' AND roomId=${room}`
        ,(err, res) => {
            console.log(res)
            if(err)
                console.log(err)

            if(!res.length){
                db.query(`INSERT INTO users (userName, roomId) VALUES ('${name}', ${room})`)
            }
        })
}

module.exports = {
    createUser
}