// sukurti routeri

//

// GET /api/posts - parsisiusti pilna postu info su category name

const sql = `
SELECT posts.p_id, posts.title, posts.body, categories.name 
FROM posts
LEFT JOIN categories
ON posts.category_id = categories.c_id
`;
