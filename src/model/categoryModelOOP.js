// funkcijos skirtos darbui su duomenu baze
const db = require('../utils/db');

class MyCategory {
  constructor(newCatName) {
    this.catName = newCatName;
  }

  async save() {
    if (this.catName.length === 0) {
      return false;
    }
    const sql = 'INSERT INTO categories (name) VALUES (?)';
    const [rows] = await db.execute(sql, [this.catName]);
    // console.log('rows ===', rows);
    if (rows.affectedRows === 1) {
      return true;
    }
    return false;
  }

  static async getAll() {
    const sql = 'SELECT * FROM categories';
    const [rows] = await db.query(sql);
    return rows;
  }

  static async getCounts() {
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

  static async delete(id) {
    const sql = 'DELETE FROM categories WHERE c_id = ? LIMIT 1';
    const [rows] = await db.execute(sql, [id]);
    console.log('rows ===', rows);
    if (rows.affectedRows === 1) {
      return true;
    }
    return false;
  }
}

module.exports = MyCategory;
