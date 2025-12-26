const express = require('express');
const router = express.Router();
const controller = require('../controllers/comments.controllers');
const { authenticateToken } = require('../middlewares/auth.middleware');

// Public routes
router.get('/post/:postId', controller.listCommentsByPost);

// Protected routes
router.post('/', authenticateToken, controller.addComment);
router.delete('/:id', authenticateToken, controller.removeComment);
router.put('/:id', authenticateToken, controller.editComment);

module.exports = router;