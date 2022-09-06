// sukurti routeri categories

// GET /api/categories - parsiuncia visas kategorijas

// GET /api/categories/count - parsiuncia kiek kurioje kategorijoje yra postu

const sql = `
  SELECT categories.name AS category, COUNT(posts.p_id)
  FROM categories
  LEFT JOIN posts
  ON posts.category_id = categories.c_id
  GROUP BY categories.name;
`;
