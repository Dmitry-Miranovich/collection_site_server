const express = require("express")
const router = express.Router()

router.get("/", function(request, response, next){
    response.send("Something have been done")
})
module.exports = router;