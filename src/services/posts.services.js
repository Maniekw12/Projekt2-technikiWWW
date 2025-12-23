const { pool } = require('../db/db');

const createPost = async (title, content, authorId = null) => {
    const result = await pool.query(
        `INSERT INTO posts (title, content, author_id)
         VALUES ($1, $2, $3)
             RETURNING *`,
        [title, content, authorId]
    );
    return result.rows[0];
};

const getPosts = async (page = 1, limit = 10, sort = 'desc') => {
    const offset = (page - 1) * limit;
    const result = await pool.query(
        `SELECT * FROM posts 
     ORDER BY created_at ${sort === 'asc' ? 'ASC' : 'DESC'}
     LIMIT $1 OFFSET $2`,
        [limit, offset]
    );
    return result.rows;
};

const deletePost = async (id) => {
    const result = await pool.query(
        `DELETE FROM posts WHERE id = $1 RETURNING *`,
        [id]
    );
    return result.rows[0];
}

module.exports = { createPost, getPosts, deletePost };
