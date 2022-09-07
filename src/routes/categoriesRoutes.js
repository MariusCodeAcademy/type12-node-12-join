// sukurti routeri categories
const express = require('express');
const { getAllCategries } = require('../model/categoryModel');
const db = require('../utils/db');

const categoriesRouter = express.Router();

// GET /api/categories - parsiuncia visas kategorijas

categoriesRouter.get('/', async (req, res) => {
  try {
    // Model
    const categories = await getAllCategries();

    // controller
    res.status(200).json(categories);
  } catch (error) {
    console.log('error ===', error);
    res.status(500).json({ msg: 'some stuff went sideways' });
  }
});

// GET /api/categories/count - parsiuncia kiek kurioje kategorijoje yra postu su pool
categoriesRouter.get('/count', async (req, res) => {
  try {
    const sql = `
    SELECT categories.name AS category, COUNT(posts.p_id) AS postsCount
    FROM categories
    LEFT JOIN posts
    ON posts.category_id = categories.c_id
    GROUP BY categories.name;
  `;
    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    console.log('error ===', error);
    res.status(500).json({ msg: 'some stuff went sideways' });
  }
});

module.exports = categoriesRouter;
