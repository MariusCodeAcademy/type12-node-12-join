// sukurti routeri
const express = require('express');
const mysql = require('mysql2/promise');
const dbConfig = require('../config');

const postsRouter = express.Router();

// GET /api/posts - parsisiusti pilna postu info su category name
postsRouter.get('/', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT posts.p_id AS id, posts.title, posts.body, categories.name AS category
    FROM posts
    LEFT JOIN categories
    ON posts.category_id = categories.c_id
    `;
    const [rows] = await conn.query(sql);
    res.status(200).json(rows);
    await conn.end();
  } catch (error) {
    console.log('error ===', error);
    res.status(500).json({
      msg: 'Something went wrong',
    });
  }
});

// GET /api/posts/all-info
postsRouter.get('/all-info', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT posts.p_id, posts.title, posts.body, categories.name AS category, users.email, users.town
    FROM posts
    LEFT JOIN categories
    ON posts.category_id = categories.c_id
    LEFT JOIN users
    ON posts.user_id = users.u_id
    `;
    const [rows] = await conn.query(sql);
    res.status(200).json(rows);
    await conn.end();
  } catch (error) {
    console.log('error ===', error);
    res.status(500).json({
      msg: 'Something went wrong',
    });
  }
});

module.exports = postsRouter;
