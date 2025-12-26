const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controllers');
const { authenticateToken } = require('../middlewares/auth.middleware');

// Public routes
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/', controller.listUsers);
router.get('/:id', controller.getUser);

// Protected routes
router.get('/me/profile', authenticateToken, controller.getProfile);

module.exports = router;