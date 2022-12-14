require('dotenv').config();
// susikuriam serveri
const express = require('express');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const morgan = require('morgan');
const mysql = require('mysql2/promise');
const dbConfig = require('./config');
const postsRouter = require('./routes/postsRoutes');
const categoriesRouter = require('./routes/categoriesRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
// prisidedam morgan/cors
// GET / - msg: server online

app.get('/', (req, res) => {
  res.json({
    msg: 'Server online',
  });
});

// ROUTES
app.use('/api/posts', postsRouter);
app.use('/api/categories', categoriesRouter);

// 404 - returns json
app.use((req, res) => {
  res.status(404).json({
    msg: 'Page not found',
  });
});

async function testDbConnection() {
  try {
    const conn = await mysql.createConnection(dbConfig);
    await conn.query('SELECT 1');
    // console.log('rows ===', rows);
    console.log(`Connected to MYSQL DB: ${dbConfig.database} `.bgCyan.bold);
    conn.end();
  } catch (error) {
    console.log(`Error connecting to db ${error.message}`.bgRed.bold);
    // console.log('error ===', error);
    if (error.code === 'ECONNREFUSED') {
      console.log('is Xammp running?'.yellow);
    }
  }
}

testDbConnection();

app.listen(port, () => console.log(`Server online on port ${port}`.bgYellow.bold));
