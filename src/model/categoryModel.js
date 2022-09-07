// funkcijos skirtos darbui su duomenu baze

const db = require('../utils/db');

async function getAllCategries() {
  // Model
  const sql = 'SELECT * FROM categories';
  const [rows] = await db.query(sql);
  return rows;
}

async function getAllCategoriesCounts() {
  const sql = `
    SELECT categories.name AS category, COUNT(posts.p_id) AS postsCount
    FROM categories
    LEFT JOIN posts
    ON posts.category_id = categories.c_id
    GROUP BY categories.name;
  `;
  const [rows] = await db.query(sql);
  return rows;
}

// deleteCategory(id) - modelio funkcija prideti kategorijai
async function deleteCategory(id) {
  const sql = 'DELETE FROM categories WHERE c_id = ? LIMIT 1';
  const [rows] = await db.execute(sql, [id]);
  console.log('rows ===', rows);
  if (rows.affectedRows === 1) {
    return true;
  }
  return false;
}
// addNewCategory(newCatName) - modelio funkcija prideti kategorijai

/**
 * modelio funkcija prideti kategorijai
 * @param {string} newCatName
 * @returns true if success
 */
async function addNewCategory(newCatName) {
  const sql = 'INSERT INTO categories (name) VALUES (?)';
  const [rows] = await db.execute(sql, [newCatName]);
  // console.log('rows ===', rows);
  if (rows.affectedRows === 1) {
    return true;
  }
  return false;
}

module.exports = {
  getAllCategries,
  getAllCategoriesCounts,
  deleteCategory,
  addNewCategory,
};
