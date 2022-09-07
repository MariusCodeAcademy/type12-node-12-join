const mysql = require('mysql2');
const dbConfig = require('../config');

const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = pool.promise();

// await db.query('SELECT 1');

module.exports = db;
