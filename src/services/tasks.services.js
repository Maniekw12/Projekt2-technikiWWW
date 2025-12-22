const { pool } = require('../db/db');  // ⬅️ Zwróć uwagę na { pool }

const getAllTasks = async () => {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id');
    return result.rows;
};

const createTask = async (title) => {
    const result = await pool.query(
        'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
        [title]
    );
    return result.rows[0];
};

const deleteTask = async (id) => {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
};

const toggleTask = async (id) => {
    const result = await pool.query(
        'UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};

module.exports = {
    getAllTasks,
    createTask,
    deleteTask,
    toggleTask
};