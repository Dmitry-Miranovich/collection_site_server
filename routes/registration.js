const express = require("express")
const router = express.Router()
const db = require("../model/db")

router.post('/', function(req, res){
    if(req.body){
        console.log("something has been done")
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            middle_name: req.body.middle_name,
            email: req.body.email,
            hex: req.body.hex,
            status: "0",
            permission: "0"
        }
        db.query('insert into `collection_database`.`user_permission`(p_name) values' +
            '("user")')
        db.query('insert into `collection_database`.`user_status`(s_status) values' +
            '("log_off")')
        db.query('insert into `collection_database`.`users`(u_first_name, u_last_name, u_middle_name, ' +
            'u_email_name, u_status, u_user_permission ,u_hex_name) values ("'+user.first_name+'","'+user.last_name+'","'+user.middle_name+'",' +
            '"'+user.email+'",(select s_id from `collection_database`.`user_status` where s_id = 1),(select p_id from `collection_database`.`user_permission` where p_id = 1),"'+user.hex+'")', function (err, result) {
            const message = {
                result: true
            }
            if(err){
                console.log(err)
                message.result = false
            }else{
                console.log(result)
                message.result = true;
                res.send(JSON.stringify(message))
            }
        })
    }else{
        res.sendStatus(404)
    }
})
router.get('/', function (req, res) {
    res.send("something")
})

module.exports = router