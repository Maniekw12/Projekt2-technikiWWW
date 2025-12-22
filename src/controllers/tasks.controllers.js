const service = require('../services/tasks.services');

const getTasks = async (req, res) => {
    const tasks = await service.getAllTasks();
    res.json(tasks);
};

const createTask = async (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const task = await service.createTask(title);
    res.status(201).json(task);
};

const deleteTask = async (req, res) => {
    await service.deleteTask(req.params.id);
    res.sendStatus(204);
};

const toggleTask = async (req, res) => {
    const task = await service.toggleTask(req.params.id);
    res.json(task);
};

module.exports = { getTasks, createTask, deleteTask, toggleTask };
