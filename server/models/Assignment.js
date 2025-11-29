const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  points: { type: Number },
  teacherId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
