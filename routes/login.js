const express = require("express")
const router = express.Router()
const db = require('../model/db')

/*app.use(
    cors({
        origin: 'http://localhost:8100',
        credentials: true,
    })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

 */

router.post("/", function (req, res ) {
    if(!req.body) req.sendStatus(404)
    const user = {
        Email: req.body.email,
        Password: req.body.password
    }
    db.query('select `u_id` from `collection_database`.`users` where u_email_name ="'+user.Email+'" and u_hex_name ="'+user.Password+'"', function (err, response) {
        if(err) console.log(err)
        console.log("db response = " + JSON.stringify(response))
        const responseData = {
            id: response[0].u_id,
            redirect: false
        }
        if(response.length !== 0){
            responseData.redirect = true
        }
        res.send(JSON.stringify(responseData))
    })
    console.log(user)
})

router.get("/", function (req, res) {
    res.send("something offf")
})
module.exports = router