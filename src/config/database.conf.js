const mysql = require("mysql2");
const config = require("./config.js");

const pool = mysql.createPool({
  queueLimit: 10,
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.pass,
  database: config.db.database,
});

module.exports = pool;
