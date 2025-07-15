const Task = require("../models/Task");

//POST /api/tasks
exports.createTask = async (req, res) => {
    const task = await Task.create({ ...req.body, owner: req.user.id});
    res.json(task);
};

//GET /api/tasks
exports.getMyTasks = async (req, res) => {
    const tasks = await Task.find({ owner: req.user.id });
    res.json(tasks);
}

//GET /api/tasks/:id
exports.getAllTasks = async (req, res) => {
    const task = await Task.find().populate("owner", "email");
    res.json(task);
}