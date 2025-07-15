const mongoose = require("mongooose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    completed: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }
});

module.export = mongoose.model("Task", taskSchema);