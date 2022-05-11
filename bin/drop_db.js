const mysql2 = require("mysql2")

const database_name = "collection_database"

const db = mysql2.createConnection({
        host: "127.0.0.1",
        database: database_name,
        user: "root",
        password: "root",
    }
)

const sql_drop_tables = [
    "DROP TABLE IF EXISTS `collection_database`.`users`",
    "DROP TABLE IF EXISTS `collection_database`.`user_status`",
    "DROP TABLE IF EXISTS `collection_database`.`user_permission`"
]

db.connect(function (err) {
    if(err) throw err
    dropTables()
    console.log("Success")
})


function dropTables(){
    sql_drop_tables.forEach(value => {
        db.query(value, ((err, result) => {
            if(err) throw err
            console.log(result)
        }))
    })
}