const { pool } = require('../db/db');

const usersQueries = {
    create: `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, username, email, created_at, updated_at
    `,

    findByEmail: `
        SELECT * FROM users WHERE email = $1
    `,

    findByUsername: `
        SELECT * FROM users WHERE username = $1
    `,

    findById: `
        SELECT id, username, email, created_at 
        FROM users 
        WHERE id = $1
    `,

    getAll: `
        SELECT u.id, u.username, u.created_at, COUNT(p.id) as post_count 
        FROM users u 
        LEFT JOIN posts p ON u.id = p.author_id 
        GROUP BY u.id
        ORDER BY post_count DESC
    `
};

module.exports = { pool, usersQueries };