const { pool } = require('../db/db');

const createUser = async (username, email, password) => {
    const result = await pool.query(
        `INSERT INTO users (username, email, password)
     VALUES ($1, $2, $3)
     RETURNING *`,
        [username, email, password]
    );
    return result.rows[0];
};

const getAllUsers = async () => {
    const query = `
        SELECT u.id, u.username, u.created_at, COUNT(p.id) as post_count 
        FROM users u 
        LEFT JOIN posts p ON u.id = p.author_id 
        GROUP BY u.id
        ORDER BY post_count DESC
    `;
    const { rows } = await pool.query(query);
    return rows;
};

const getUserById = async (id) => {
    const query = 'SELECT id, username, email, created_at FROM users WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

module.exports = { createUser, getAllUsers, getUserById };