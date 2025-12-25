const express = require('express');
const router = express.Router();
const controller = require('../controllers/comments.controllers');

router.post('/', controller.addComment);

router.get('/post/:postId', controller.listCommentsByPost);

router.delete('/:id', controller.removeComment);

router.put('/:id', controller.editComment);

module.exports = router;