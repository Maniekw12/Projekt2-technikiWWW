const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'programmer',
    password: 'password1234',
    database: 'users_data_base',
    port: 5432,
});

const createTables = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
`;

const initDatabase = async () => {
    try {
        await pool.query('SELECT NOW()');
        console.log('Connected with PostgreSQL');

        await pool.query(createTables);
        console.log('Database structure is ready');
    } catch (err) {
        console.error('Error during database connection:', err);
        throw err;
    }
};

module.exports = { pool, initDatabase };