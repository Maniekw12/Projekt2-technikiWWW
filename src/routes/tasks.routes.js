const express = require('express');
const router = express.Router();
const controller = require('../controllers/tasks.controllers');

router.get('/', controller.getTasks);
router.post('/', controller.createTask);
router.delete('/:id', controller.deleteTask);
router.put('/:id/toggle', controller.toggleTask);

module.exports = router;
