
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12555930",
  password: "BcdyE7cez4",
  database: 'sql12555930'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
});

module.exports = connection;

