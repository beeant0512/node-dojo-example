// get the client
var mysql = require('mysql');
var logger = require('./logger');
// create the connection to database
var connection = mysql.createConnection({host: 'localhost', user: 'root', password: '123456', database: 'nodeapi'});

connection.on('error', function (err) {
  if (err)
    logger.getLogger('sql').error(err.code, err);
});

connection.execute = function (sql, values, cb) {
  return connection.query(sql, values, function (err, rows, fields) {
    logger.getSqlLogger().debug("query: [ %s ] found: [ %s ]", this.sql, rows.length);
    cb(err, rows, fields);
  });
};

exports.mysql = connection;