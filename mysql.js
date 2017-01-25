// get the client
var mysql = require('mysql2');
// create the connection to database
var connection = mysql.createConnection({host: 'localhost', user: 'root', password: '123456', database: 'nodeapi'});
exports.mysql = connection;