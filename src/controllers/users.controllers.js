const { createUser, loginUser, getAllUsers, getUserById } = require('../services/users.services');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email and password required' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    try {
        const user = await createUser(username, email, password);
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                created_at: user.created_at
            }
        });
    } catch (err) {
        console.error('Error:', err);
        if (err.code === '23505') {
            res.status(409).json({ error: 'User with this email or username already exists' });
        } else {
            res.status(500).json({ error: 'Something went wrong, try again!' });
        }
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }

    try {
        const result = await loginUser(email, password);
        res.status(200).json({
            message: 'Login successful',
            token: result.token,
            user: result.user
        });
    } catch (err) {
        console.error('Error:', err);
        if (err.message === 'Invalid credentials') {
            res.status(401).json({ error: 'Invalid email or password' });
        } else {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
};

const listUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await getUserById(req.user.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { register, login, listUsers, getUser, getProfile };