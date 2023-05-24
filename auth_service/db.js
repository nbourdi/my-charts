
const mysql = require('mysql');

const connection = mysql.createConnection({
    connectionLimit: 5,				// for the database to run we need host: 127.0.0.1 / user: root / password: (empty)
	host: "127.0.0.1",
	user: "root",
	password: "",
	database: 'user6',
	port: '3306'
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }

  console.log('Connected to database with ID: ' + connection.threadId);
});

const createTable = `CREATE TABLE IF NOT EXISTS users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  lastlogin DATETIME,
  credit INT(11) NOT NULL DEFAULT 9,
  PRIMARY KEY (id)
)`;

connection.query(createTable, function(err, results, fields) {
  if (err) {
    console.error('Error creating table: ' + err.stack);
    return;
  }

  console.log('Table created successfully');
});

module.exports = connection;
