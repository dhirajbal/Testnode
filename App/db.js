var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:'nodetest'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = con;