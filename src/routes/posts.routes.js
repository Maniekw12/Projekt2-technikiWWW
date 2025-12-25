const express = require('express');
const router = express.Router();
const controller = require('../controllers/posts.controllers'); // Upewnij się, że kontroler eksportuje listAuthorPosts

router.post('/', controller.addPost);
router.get('/', controller.listPosts);

router.get('/user/:id', controller.listAuthorPosts);

router.get('/:id', controller.getPost);
router.delete('/:id', controller.removePost);
router.put('/:id', controller.editPost);

module.exports = router;