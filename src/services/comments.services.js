const { pool } = require('../db/db');
const { commentsQueries } = require('../models/comments.models');

const createComment = async (content, postId, authorId) => {
    const result = await pool.query(commentsQueries.create, [
        content,
        postId,
        authorId
    ]);
    return result.rows[0];
};

const getCommentsByPostId = async (postId) => {
    const result = await pool.query(commentsQueries.getByPostId, [postId]);
    return result.rows;
};

const deleteComment = async (id) => {
    const result = await pool.query(commentsQueries.delete, [id]);
    return result.rows[0];
};

const updateComment = async (id, content) => {
    const result = await pool.query(commentsQueries.update, [content, id]);
    return result.rows[0];
};

const getCommentById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM comments WHERE id = $1',
        [id]
    );
    return result.rows[0];
};

module.exports = {
    createComment,
    getCommentsByPostId,
    deleteComment,
    updateComment,
    getCommentById
};