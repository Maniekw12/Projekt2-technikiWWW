const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool, usersQueries } = require('../models/users.models');
const { JWT_SECRET } = require('../middlewares/auth.middleware');

const SALT_ROUNDS = 10;

const createUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await pool.query(usersQueries.create, [
        username,
        email,
        hashedPassword
    ]);

    return result.rows[0];
};

const loginUser = async (email, password) => {
    const result = await pool.query(usersQueries.findByEmail, [email]);
    const user = result.rows[0];

    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
            username: user.username
        },
        JWT_SECRET,
        { expiresIn: '24h' }
    );

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            created_at: user.created_at
        }
    };
};

const getAllUsers = async () => {
    const { rows } = await pool.query(usersQueries.getAll);
    return rows;
};

const getUserById = async (id) => {
    const { rows } = await pool.query(usersQueries.findById, [id]);
    return rows[0];
};

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    getUserById
};