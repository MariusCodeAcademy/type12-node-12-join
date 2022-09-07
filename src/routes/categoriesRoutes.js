// sukurti routeri categories
const express = require('express');
// const {
//   getAllCategries,
//   getAllCategoriesCounts,
//   deleteCategory,
//   addNewCategory,
// } = require('../model/categoryModel');
const controller = require('../controller/categoriesController');

const categoriesRouter = express.Router();

// /api/category/
categoriesRouter.get('/', controller.categoryIndex);
categoriesRouter.get('/count', controller.categoryCount);
categoriesRouter.delete('/:id', controller.categoryRemove);
categoriesRouter.post('/', controller.createCategory);

module.exports = categoriesRouter;
