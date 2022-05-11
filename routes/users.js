const express = require('express');
const router = express.Router();
const db = require('../model/db')


/* GET users listing. */
router.get('/', function(req, res) {
  db.query('select u_id, u_first_name from `collection_database`.`users`', function (err, result) {
    const users = {
       users: result
    }
    res.send(users)
  })
});

router.get("/:userId", function (req, res) {
  const id = req.params["userId"]
  db.query("select u_first_name from `collection_database`.`users` where u_id = '"+id+"'", function (err, result) {
    res.send(result)
  })
});

module.exports = router;
