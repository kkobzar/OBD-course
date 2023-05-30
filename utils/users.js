const db = require('./db')
function createUser(name, room){
    //check if username and room exists in db
    //to avoid duplicates
    return new Promise((res, rej) => {
        db.query(`SELECT id FROM users WHERE userName='${name}' AND roomId=${room}`
            ,(err, result) => {
                if(err){
                    console.log(err)
                    rej(err)
                }

                if(!result.length){
                    db.query(`INSERT INTO users (userName, roomId) VALUES ('${name}', ${room})`,
                        (e,r)=>{
                        if (e){
                            console.log(e)
                            rej(e)
                        }else{
                            res(r.insertId)
                        }
                        })
                }else{
                    res(result[0].id)
                }
            })
    })


}

//get user id by name and chatroom
function getUserId(name, id) {
    return new Promise((res,rej) =>{
        db.query(`SELECT id FROM users WHERE userName='${name}' and roomId=${id}`,
            (err, result)=>{
                if(err)
                    console.log(err)
                    rej(err)
                if(result.length){
                    console.log(result[0].id)
                    res(result[0].id)
                }
                rej('noRes')
            })
    })

}

module.exports = {
    createUser,
    getUserId
}