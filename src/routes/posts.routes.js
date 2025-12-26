const express = require('express');
const router = express.Router();
const controller = require('../controllers/posts.controllers');
const { authenticateToken, optionalAuth } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', controller.listPosts);
router.get('/user/:id', controller.listAuthorPosts);
router.get('/:id', controller.getPost);

// Protected routes
router.post('/', authenticateToken, controller.addPost);
router.delete('/:id', authenticateToken, controller.removePost);
router.put('/:id', authenticateToken, controller.editPost);

module.exports = router;