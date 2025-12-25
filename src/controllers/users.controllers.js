const { createUser, getAllUsers, getUserById } = require('../services/users.services');

const addUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email and password required' });
    }

    try {
        const user = await createUser(username, email, password);
        const { password: _, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
    } catch (err) {
        console.error('Error:', err);
        if (err.code === '23505') {
            res.status(409).json({ error: 'User already exists' });
        } else {
            res.status(500).json({ error: 'Something went wrong, try again!' });
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

module.exports = { addUser, listUsers, getUser };