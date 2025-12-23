const { createUser } = require('../services/users.services');

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

module.exports = { addUser };
