// sukurti routeri categories
const express = require('express');
const {
  getAllCategries,
  getAllCategoriesCounts,
  deleteCategory,
} = require('../model/categoryModel');

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
    const catsAndCounts = await getAllCategoriesCounts();
    res.status(200).json(catsAndCounts);
  } catch (error) {
    console.log('error ===', error);
    res.status(500).json({ msg: 'some stuff went sideways' });
  }
});

// DELETE /api/categories/:id - istrinam irasa
categoriesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (await deleteCategory(id)) {
      res.status(200).json({
        msg: 'category deleted',
      });
    } else {
      res.status(400).json({
        msg: 'nothing deleted',
      });
    }
  } catch (error) {
    console.log('error ===', error);
    res.status(500).json({ msg: 'some stuff went sideways' });
  }
});

module.exports = categoriesRouter;
