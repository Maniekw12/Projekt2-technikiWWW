const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controllers');

router.post('/', controller.addUser);

module.exports = router;
