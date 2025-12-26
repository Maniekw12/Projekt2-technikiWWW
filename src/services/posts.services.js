const { pool } = require('../db/db');
const { postsQueries } = require('../models/posts.models');

const createPost = async (title, content, authorId) => {
    const result = await pool.query(postsQueries.create, [
        title,
        content,
        authorId
    ]);
    return result.rows[0];
};

const getPosts = async (page = 1, limit = 10, sort = 'desc') => {
    const offset = (page - 1) * limit;
    const orderDirection = sort === 'asc' ? 'ASC' : 'DESC';

    const query = postsQueries.getAll + ` ${orderDirection} LIMIT $1 OFFSET $2`;

    const result = await pool.query(query, [limit, offset]);
    return result.rows;
};

const getPostById = async (id) => {
    const result = await pool.query(postsQueries.findById, [id]);
    return result.rows[0];
};

const deletePost = async (id) => {
    const result = await pool.query(postsQueries.delete, [id]);
    return result.rows[0];
};

const updatePost = async (id, title, content) => {
    const result = await pool.query(postsQueries.update, [
        title,
        content,
        id
    ]);
    return result.rows[0];
};

const getPostsByAuthorId = async (authorId) => {
    const { rows } = await pool.query(postsQueries.getByAuthorId, [authorId]);
    return rows;
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    deletePost,
    updatePost,
    getPostsByAuthorId
};