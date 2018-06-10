// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "us-cdbr-iron-east-04.cleardb.net",
    user: "bfc213ab204ea3",
    password: "babd161c",
    database: "heroku_c7bce2c43da625f"
});


////////////////////////////////////////////// Make connection
function handleDisconnect() {
    connection.connect(function (err) {
        if (err) {
            console.error("error connecting: " + err.stack);
            setTimeout(handleDisconnect, 1000);
            return;
        }
        console.log("connected as id " + connection.threadId);
    });

    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect()

// Export connection for our ORM to use.
module.exports = connection;