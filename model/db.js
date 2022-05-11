const mysql = require("mysql2")

const database_name = "collection_database"

const sql_creation_queues = [
    "CREATE TABLE IF NOT EXISTS collection_database.users" +
    "(u_id INT NOT NULL AUTO_INCREMENT," +
    "u_first_name VARCHAR(30) NOT NULL," +
    "u_last_name VARCHAR(30) NOT NULL," +
    "u_middle_name VARCHAR(30) NOT NULL," +
    "u_email_name VARCHAR(30) NOT NULL," +
    "u_status INT NOT NULL ," +
    "u_user_permission INT NOT NULL," +
    "u_hex_name VARCHAR(30) NOT NULL," +
    "PRIMARY KEY(u_id))",

    "CREATE TABLE IF NOT EXISTS `collection_database`.`user_permission`\n" +
    "(\n" +
    "\t`p_id` INT NOT NULL AUTO_INCREMENT,\n" +
    "\t`p_name` VARCHAR(50) NOT NULL,\n" +
    "\tCONSTRAINT `PK_permission` PRIMARY KEY (`p_id` ASC)\n" +
    ");",
    "CREATE TABLE IF NOT EXISTS `collection_database`.`user_status`\n" +
    "(\n" +
    "\t`s_id` INT NOT NULL AUTO_INCREMENT,\n" +
    "\t`s_status` VARCHAR(50) NOT NULL,\n" +
    "\tCONSTRAINT `PK_status` PRIMARY KEY (`s_id` ASC)\n" +
    ")",
    "CREATE TABLE IF NOT EXISTS `collection_database`.`collections`" +
    "( ci_id INT NOT NULL AUTO_INCREMENT, " +
    "ci_name VARCHAR(30) NOT NULL," +
    "ci_date DATETIME NOT NULL," +
    "PRIMARY KEY(ci_id))",
    "CREATE TABLE IF NOT EXISTS  `collection_database`.`item`\n" +
    "(\n" +
    "\t`c_id` INT NOT NULL,\n" +
    "\t`c_name` VARCHAR(50) NULL,\n" +
    "\t`c_date` DATETIME NOT NULL,\n" +
    "\tPRIMARY KEY (`c_id`)\n" +
    ")",
    "CREATE TABLE IF NOT EXISTS `collection_database`.`m2m_items`\n" +
    "(\n" +
    "\t`mi_id` INT NOT NULL,\n" +
    "\t`mi_collections_id` INT NULL,\n" +
    "\t`mi_item_id` INT NULL,\n" +
    "\t`mi_user_id` INT NULL,\n" +
    "\t PRIMARY KEY (`mi_id`)\n" +
    ")"
]
const sql_foreign_keys = [
    "ALTER TABLE `collection_database`.`users` \n" +
    " ADD CONSTRAINT `FK_users_permission`\n" +
    "\tFOREIGN KEY (`u_user_permission`) REFERENCES `user_permission` (`p_id`) ON DELETE Restrict ON UPDATE Restrict\n" +
    ";",
    "ALTER TABLE `collection_database`.`users` \n" +
    " ADD CONSTRAINT `FK_users_status`\n" +
    "\tFOREIGN KEY (`u_status`) REFERENCES `user_status` (`s_id`) ON DELETE Restrict ON UPDATE Restrict\n" +
    ";",
    "ALTER TABLE `collection_database`.`m2m_items` \n" +
    " ADD CONSTRAINT `FK_m2m_items_collections_items`\n" +
    "\tFOREIGN KEY (`mi_collections_id`) REFERENCES `collections` (`ci_id`) ON DELETE Restrict ON UPDATE Restrict\n" +
    ";",
    "ALTER TABLE `collection_database`.`m2m_items` \n" +
    " ADD CONSTRAINT `FK_m2m_items_item`\n" +
    "\tFOREIGN KEY (`mi_item_id`) REFERENCES `item` (`c_id`) ON DELETE Restrict ON UPDATE Restrict\n" +
    ";",
    "ALTER TABLE `collection_database`.`m2m_items` \n" +
    " ADD CONSTRAINT `FK_m2m_items_users`\n" +
    "\tFOREIGN KEY (`mi_user_id`) REFERENCES `users` (`u_id`) ON DELETE Restrict ON UPDATE Restrict\n" +
    ";"
]
const db = mysql.createConnection({
    host: "127.0.0.1",
    database: database_name,
    user: "root",
    password: "root",
    }
)
db.connect(function (err) {
    if(err){
        console.log(err)
    }
    else{
        console.log("Подключение произошло успешно")
        sql_creation_queues.forEach(value => {
            db.query(value, function (err, result) {
                if(err) throw err;
                console.log(result);
            })
        })
        sql_foreign_keys.forEach(value => {
            db.query(value, function (err, result) {
                if(err){
                    console.log(err.message)
                }
            })
        })
    }
})

module.exports = db