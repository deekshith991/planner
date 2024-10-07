
const mongoose = require('mongoose');

// Task Schema
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  completed: { type: Boolean, default: false },
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Professor who created the task
  branches: [{ type: String, required: true }], // Branches associated with the task
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);
