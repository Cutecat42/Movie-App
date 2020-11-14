const { Client } = require("pg");

let db = new Client({
  connectionString: 'postgresql:///movies'
});

db.connect();

module.exports = db;