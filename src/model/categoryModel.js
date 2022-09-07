// funkcijos skirtos darbui su duomenu baze

const db = require('../utils/db');

async function getAllCategries() {
  // Model
  try {
    const sql = 'SELECT * FROM categories';
    const [rows] = await db.query(sql);
    return rows;
  } catch (error) {
    console.log('error getAllCategries ===', error);
    return false;
  }
}

async function getAllCategoriesCounts() {}

module.exports = {
  getAllCategries,
};
