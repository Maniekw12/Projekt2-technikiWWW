const express = require('express');
const router = express.Router();
const controller = require('../controllers/posts.controllers');

router.post('/', controller.addPost);
router.get('/', controller.listPosts);
router.delete('/:id', controller.removePost);

module.exports = router;
