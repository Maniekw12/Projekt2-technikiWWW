const { pool } = require('../db/db');

const createComment = async (content, postId, authorId = null) => {
    const result = await pool.query(
        `INSERT INTO comments (content, post_id, author_id)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [content, postId, authorId]
    );
    return result.rows[0];
};

const getCommentsByPostId = async (postId) => {
    const result = await pool.query(
        `SELECT
             comments.id,
             comments.content,
             comments.post_id,
             comments.author_id,
             comments.created_at,
             comments.updated_at,
             users.username as author_name
         FROM comments
         LEFT JOIN users ON comments.author_id = users.id
         WHERE comments.post_id = $1
         ORDER BY comments.created_at ASC`,
        [postId]
    );
    return result.rows;
};

const deleteComment = async (id) => {
    const result = await pool.query(
        `DELETE FROM comments WHERE id = $1 RETURNING *`,
        [id]
    );
    return result.rows[0];
};

const updateComment = async (id, content) => {
    const result = await pool.query(
        `UPDATE comments
         SET content = $1, updated_at = NOW()
         WHERE id = $2
         RETURNING *`,
        [content, id]
    );
    return result.rows[0];
};

module.exports = {
    createComment,
    getCommentsByPostId,
    deleteComment,
    updateComment
};