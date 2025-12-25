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
        `SELECT
             posts.id,
             posts.title,
             posts.content,
             posts.author_id,
             posts.created_at,
             posts.updated_at,
             users.username as author_name
         FROM posts
                  LEFT JOIN users ON posts.author_id = users.id
         ORDER BY posts.created_at ${sort === 'asc' ? 'ASC' : 'DESC'}
         LIMIT $1 OFFSET $2`,
        [limit, offset]
    );
    return result.rows;
};

const getPostById = async (id) => {
    const result = await pool.query(
        `SELECT
             posts.id,
             posts.title,
             posts.content,
             posts.author_id,
             posts.created_at,
             posts.updated_at,
             users.username as author_name
         FROM posts
                  LEFT JOIN users ON posts.author_id = users.id
         WHERE posts.id = $1`,
        [id]
    );
    return result.rows[0];
};

const deletePost = async (id) => {
    const result = await pool.query(
        `DELETE FROM posts WHERE id = $1 RETURNING *`,
        [id]
    );
    return result.rows[0];
}

const updatePost = async (id, title, content) => {
    const result = await pool.query(
        `UPDATE posts
         SET title = $1, content = $2, updated_at = NOW()
         WHERE id = $3
             RETURNING *`,
        [title, content, id]
    );
    return result.rows[0];
}


const getPostsByAuthorId = async (authorId) => {
    const query = `
        SELECT p.*, u.username as author_name 
        FROM posts p 
        JOIN users u ON p.author_id = u.id 
        WHERE p.author_id = $1 
        ORDER BY p.created_at DESC
    `;
    const { rows } = await pool.query(query, [authorId]);
    return rows;
};

module.exports = { createPost, getPosts, getPostById, deletePost, updatePost, getPostsByAuthorId };