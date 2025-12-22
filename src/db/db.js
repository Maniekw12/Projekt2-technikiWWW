const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'programmer',
    password: 'password1234',
    database: 'users_data_base',
    port: 5432,
});

const initDatabase = async () => {
    try {
        await pool.query('SELECT NOW()');
        console.log('✅ Połączono z PostgreSQL');

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                completed BOOLEAN DEFAULT FALSE
            )
        `;
        await pool.query(createTableQuery);
        console.log('✅ Tabela tasks gotowa');
    } catch (err) {
        console.error('❌ Błąd połączenia z bazą:', err);
        throw err;
    }
};

module.exports = { pool, initDatabase };